import * as cdn from '@pulumi/azure-native/cdn';
import * as network from '@pulumi/azure-native/network';
import * as resources from '@pulumi/azure-native/resources';
import * as pulumi from '@pulumi/pulumi';
import {
  PROJECT_NAME,
  RESOURCE_SUFFIX,
  CDN_RESOURCE_NAMES,
  CDN_LOCATION,
  REGEX_PATTERNS,
  HTTPS_PROTOCOL,
} from '../constants';
import { CdnBuilderOptions } from '../types';
import { parseAllowedIps } from '../utils';

export class CdnBuilder {
  private resourceGroup: resources.ResourceGroup;
  private options: CdnBuilderOptions;
  private profile!: cdn.Profile;
  private endpoint!: cdn.AFDEndpoint;
  private originGroup!: cdn.AFDOriginGroup;
  private origin!: cdn.AFDOrigin;
  private customDomain!: cdn.AFDCustomDomain;
  private ipRuleSet?: cdn.RuleSet;
  private allowRule?: cdn.Rule;
  private blockRule?: cdn.Rule;

  constructor(resourceGroup: resources.ResourceGroup, options: CdnBuilderOptions) {
    this.resourceGroup = resourceGroup;
    this.options = options;
  }

  public createProfile(): this {
    const profileName = `${PROJECT_NAME}-${RESOURCE_SUFFIX.CDN_PROFILE}-${this.options.isProd ? 'prod' : 'dev'}`;

    this.profile = new cdn.Profile(CDN_RESOURCE_NAMES.PROFILE, {
      profileName,
      resourceGroupName: this.resourceGroup.name,
      location: CDN_LOCATION,
      sku: { name: this.options.envConfig.cdnSku },
      tags: this.options.tags,
    });

    return this;
  }

  public createOrigin(): this {
    const originHostName = pulumi
      .output(this.options.storageAccountWebEndpoint)
      .apply(url => url.replace(REGEX_PATTERNS.REMOVE_HTTPS, '').replace(REGEX_PATTERNS.REMOVE_TRAILING_SLASH, ''));

    this.originGroup = new cdn.AFDOriginGroup(CDN_RESOURCE_NAMES.ORIGIN_GROUP, {
      originGroupName: CDN_RESOURCE_NAMES.ORIGIN_GROUP_NAME,
      profileName: this.profile.name,
      resourceGroupName: this.resourceGroup.name,
      loadBalancingSettings: {
        sampleSize: 4,
        successfulSamplesRequired: 3,
        additionalLatencyInMilliseconds: 50,
      },
      healthProbeSettings: {
        probePath: '/',
        probeRequestType: 'GET',
        probeProtocol: 'Https',
        probeIntervalInSeconds: 100,
      },
    });

    this.origin = new cdn.AFDOrigin(CDN_RESOURCE_NAMES.ORIGIN, {
      originName: CDN_RESOURCE_NAMES.ORIGIN_NAME,
      originGroupName: this.originGroup.name,
      profileName: this.profile.name,
      resourceGroupName: this.resourceGroup.name,
      hostName: originHostName,
      httpPort: 80,
      httpsPort: 443,
      originHostHeader: originHostName,
      priority: 1,
      weight: 1000,
      enabledState: 'Enabled',
    });

    return this;
  }

  public createEndpoint(): this {
    this.endpoint = new cdn.AFDEndpoint(CDN_RESOURCE_NAMES.ENDPOINT, {
      endpointName: `${PROJECT_NAME}-${this.options.isProd ? 'prod' : 'dev'}`,
      profileName: this.profile.name,
      resourceGroupName: this.resourceGroup.name,
      enabledState: 'Enabled',
      tags: this.options.tags,
    });

    return this;
  }

  public setupIpRestrictions(): this {
    if (!this.options.envConfig.enableIpRestrictions) {
      return this;
    }

    const allowedIps = parseAllowedIps(process.env.ALLOWED_IP_RANGES);

    this.ipRuleSet = new cdn.RuleSet(CDN_RESOURCE_NAMES.RULE_SET, {
      ruleSetName: CDN_RESOURCE_NAMES.RULE_SET_NAME,
      profileName: this.profile.name,
      resourceGroupName: this.resourceGroup.name,
    });

    this.blockRule = new cdn.Rule(
      CDN_RESOURCE_NAMES.BLOCK_RULE,
      {
        ruleName: CDN_RESOURCE_NAMES.BLOCK_RULE_NAME,
        profileName: this.profile.name,
        resourceGroupName: this.resourceGroup.name,
        ruleSetName: this.ipRuleSet.name,
        order: 0,
        matchProcessingBehavior: 'Continue',
        conditions: [
          {
            name: 'UrlPath',
            parameters: {
              typeName: 'DeliveryRuleUrlPathMatchConditionParameters',
              operator: 'Equal',
              matchValues: ['/blocked.html'],
              negateCondition: true,
              transforms: [],
            },
          },
          {
            name: 'RemoteAddress',
            parameters: {
              typeName: 'DeliveryRuleRemoteAddressConditionParameters',
              operator: 'IPMatch',
              matchValues: allowedIps,
              negateCondition: true,
            },
          },
        ],
        actions: [
          {
            name: 'UrlRedirect',
            parameters: {
              typeName: 'DeliveryRuleUrlRedirectActionParameters',
              redirectType: 'Found',
              destinationProtocol: 'MatchRequest',
              customPath: '/blocked.html',
            },
          },
        ],
      },
      { dependsOn: [this.ipRuleSet] }
    );

    return this;
  }

  public setupCustomDomain(dnsZoneResourceGroup: string, dnsZoneName: string): this {
    const subdomain = this.options.isProd ? '@' : 'dev';

    const cnameRecord = new network.RecordSet(CDN_RESOURCE_NAMES.DNS_CNAME, {
      resourceGroupName: dnsZoneResourceGroup,
      zoneName: dnsZoneName,
      relativeRecordSetName: subdomain,
      recordType: 'CNAME',
      ttl: 300,
      cnameRecord: {
        cname: this.endpoint.hostName,
      },
    });

    const domainName = this.options.isProd ? dnsZoneName : `${subdomain}.${dnsZoneName}`;

    this.customDomain = new cdn.AFDCustomDomain(
      CDN_RESOURCE_NAMES.CUSTOM_DOMAIN,
      {
        customDomainName: domainName.replace(/\./g, '-'),
        hostName: domainName,
        profileName: this.profile.name,
        resourceGroupName: this.resourceGroup.name,
        tlsSettings: {
          certificateType: 'ManagedCertificate',
          minimumTlsVersion: 'TLS12',
        },
      },
      { dependsOn: [cnameRecord] }
    );

    // DNS TXT record for validation
    new network.RecordSet(CDN_RESOURCE_NAMES.DNS_TXT, {
      resourceGroupName: dnsZoneResourceGroup,
      zoneName: dnsZoneName,
      relativeRecordSetName: `_dnsauth.${subdomain}`,
      recordType: 'TXT',
      ttl: 300,
      txtRecords: [
        {
          value: [this.customDomain.validationProperties.apply(vp => vp!.validationToken!)],
        },
      ],
    });

    return this;
  }

  public createRoute(): this {
    const ruleSets =
      this.options.envConfig.enableIpRestrictions && this.ipRuleSet ? [{ id: this.ipRuleSet.id }] : undefined;

    const dependencies: pulumi.Resource[] = [this.origin, this.customDomain];
    if (this.ipRuleSet) dependencies.push(this.ipRuleSet);
    if (this.blockRule) dependencies.push(this.blockRule);

    new cdn.Route(
      CDN_RESOURCE_NAMES.ROUTE,
      {
        routeName: CDN_RESOURCE_NAMES.ROUTE_NAME,
        endpointName: this.endpoint.name,
        profileName: this.profile.name,
        resourceGroupName: this.resourceGroup.name,
        originGroup: {
          id: this.originGroup.id,
        },
        supportedProtocols: ['Https', 'Http'],
        patternsToMatch: ['/*'],
        forwardingProtocol: 'HttpsOnly',
        linkToDefaultDomain: 'Enabled',
        httpsRedirect: 'Enabled',
        customDomains: [{ id: this.customDomain.id }],
        ruleSets: ruleSets,
        cacheConfiguration: {
          queryStringCachingBehavior: 'IgnoreQueryString',
          compressionSettings: {
            contentTypesToCompress: [
              'text/html',
              'text/css',
              'text/javascript',
              'application/javascript',
              'application/json',
            ],
            isCompressionEnabled: true,
          },
        },
      },
      { dependsOn: dependencies }
    );

    return this;
  }

  public getEndpointUrl(): pulumi.Output<string> {
    return pulumi.interpolate`${HTTPS_PROTOCOL}${this.endpoint.hostName}`;
  }
}
