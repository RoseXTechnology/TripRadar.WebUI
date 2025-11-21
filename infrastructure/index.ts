import * as cdn from '@pulumi/azure-native/cdn';
import * as network from '@pulumi/azure-native/network';
import * as resources from '@pulumi/azure-native/resources';
import * as storage from '@pulumi/azure-native/storage';
import * as pulumi from '@pulumi/pulumi';
import {
  ENVIRONMENT,
  LOCATION,
  PROJECT_NAME,
  RESOURCE_SUFFIX,
  HTML_DOCUMENT,
  CDN_LOCATION,
  CDN_RESOURCE_NAMES,
  HTTPS_PROTOCOL,
  REGEX_PATTERNS,
  TAG_KEYS,
  TAG_VALUES,
  STATIC_WEBSITE_RESOURCE_NAME,
} from './constants';

const config = new pulumi.Config();
const environment = config.get('environment') ?? ENVIRONMENT.DEVELOPMENT;
const location = config.get('location') ?? LOCATION.WEST_EUROPE;

const isProd = environment === ENVIRONMENT.PRODUCTION;

const envConfig = {
  storageSku: isProd ? storage.SkuName.Standard_GRS : storage.SkuName.Standard_LRS,
  enableCdn: true, // Always enable CDN for custom domains
  cdnSku: cdn.SkuName.Standard_AzureFrontDoor, // Use Azure Front Door (new CDN)
  cacheTtl: isProd ? 31_536_000 : 300, // 1 year vs 5 minutes
};

const baseTags = {
  [TAG_KEYS.ENVIRONMENT]: environment,
  [TAG_KEYS.PROJECT]: TAG_VALUES.PROJECT_NAME,
  [TAG_KEYS.MANAGED_BY]: TAG_VALUES.MANAGED_BY_PULUMI,
  [TAG_KEYS.COST_CENTER]: isProd ? TAG_VALUES.COST_CENTER_PROD : TAG_VALUES.COST_CENTER_DEV,
};

const rgName = `tripradar-webui-${isProd ? 'prod' : 'dev'}-${RESOURCE_SUFFIX.RESOURCE_GROUP}`;

const resourceGroup = new resources.ResourceGroup(rgName, {
  resourceGroupName: rgName,
  location,
  tags: baseTags,
});

const storageAccountName = `tripradarwebui${isProd ? 'prod' : 'dev'}`;

const storageAccount = new storage.StorageAccount(`${PROJECT_NAME}${RESOURCE_SUFFIX.STORAGE_ACCOUNT}${environment}`, {
  accountName: storageAccountName,
  resourceGroupName: resourceGroup.name,
  location: resourceGroup.location,
  sku: { name: envConfig.storageSku },
  kind: storage.Kind.StorageV2,
  allowBlobPublicAccess: true,
  minimumTlsVersion: storage.MinimumTlsVersion.TLS1_2,
  tags: baseTags,
});

new storage.StorageAccountStaticWebsite(STATIC_WEBSITE_RESOURCE_NAME, {
  accountName: storageAccount.name,
  resourceGroupName: resourceGroup.name,
  indexDocument: HTML_DOCUMENT.INDEX,
  error404Document: HTML_DOCUMENT.INDEX,
});

pulumi
  .all([resourceGroup.name, storageAccount.name])
  .apply(([rg, sa]) =>
    storage.listStorageAccountKeys({ resourceGroupName: rg, accountName: sa }).then(keys => keys.keys[0].value)
  );

let publicEndpoint: pulumi.Output<string>;

if (envConfig.enableCdn) {
  const profileName = `${PROJECT_NAME}-${RESOURCE_SUFFIX.CDN_PROFILE}-${isProd ? 'prod' : 'dev'}`;

  const cdnProfile = new cdn.Profile(CDN_RESOURCE_NAMES.PROFILE, {
    profileName,
    resourceGroupName: resourceGroup.name,
    location: CDN_LOCATION,
    sku: { name: envConfig.cdnSku },
    tags: baseTags,
  });

  const originHostName = storageAccount.primaryEndpoints.apply(e =>
    e!.web!.replace(REGEX_PATTERNS.REMOVE_HTTPS, '').replace(REGEX_PATTERNS.REMOVE_TRAILING_SLASH, '')
  );

  // Azure Front Door Origin Group
  const originGroup = new cdn.AFDOriginGroup('afd-origin-group', {
    originGroupName: 'storage-origin-group',
    profileName: cdnProfile.name,
    resourceGroupName: resourceGroup.name,
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

  // Azure Front Door Origin
  const origin = new cdn.AFDOrigin('afd-origin', {
    originName: 'storage-origin',
    originGroupName: originGroup.name,
    profileName: cdnProfile.name,
    resourceGroupName: resourceGroup.name,
    hostName: originHostName,
    httpPort: 80,
    httpsPort: 443,
    originHostHeader: originHostName,
    priority: 1,
    weight: 1000,
    enabledState: 'Enabled',
  });

  // Azure Front Door Endpoint
  const afdEndpoint = new cdn.AFDEndpoint('afd-endpoint', {
    endpointName: `${PROJECT_NAME}-${isProd ? 'prod' : 'dev'}`,
    profileName: cdnProfile.name,
    resourceGroupName: resourceGroup.name,
    enabledState: 'Enabled',
    tags: baseTags,
  });

  // IP Restriction using AFD Rules Engine
  const allowedIps = parseAllowedIps(process.env.ALLOWED_IP_RANGES);

  // RuleSet for IP-based access control
  const ipRuleSet = new cdn.RuleSet('ip-restriction-ruleset', {
    ruleSetName: 'IPRestriction',
    profileName: cdnProfile.name,
    resourceGroupName: resourceGroup.name,
  });

  // Rule 1: Allow whitelisted IPs (order 0 = highest priority)
  new cdn.Rule(
    'allow-whitelisted-ips',
    {
      ruleName: 'AllowWhitelistedIPs',
      profileName: cdnProfile.name,
      resourceGroupName: resourceGroup.name,
      ruleSetName: ipRuleSet.name,
      order: 0,
      matchProcessingBehavior: 'Stop', // Stop processing if IP is allowed
      conditions: [
        {
          name: 'RemoteAddress',
          parameters: {
            typeName: 'DeliveryRuleRemoteAddressConditionParameters',
            operator: 'IPMatch',
            matchValues: allowedIps,
            negateCondition: false,
          },
        },
      ],
      actions: [
        {
          name: 'ModifyResponseHeader',
          parameters: {
            typeName: 'DeliveryRuleHeaderActionParameters',
            headerAction: 'Append',
            headerName: 'X-IP-Allowed',
            value: 'true',
          },
        },
      ],
    },
    { dependsOn: [ipRuleSet] }
  );

  // Rule 2: Block all other IPs (order 1)
  new cdn.Rule(
    'block-unauthorized-ips',
    {
      ruleName: 'BlockUnauthorizedIPs',
      profileName: cdnProfile.name,
      resourceGroupName: resourceGroup.name,
      ruleSetName: ipRuleSet.name,
      order: 1,
      matchProcessingBehavior: 'Continue',
      conditions: [
        {
          name: 'UrlPath',
          parameters: {
            typeName: 'DeliveryRuleUrlPathConditionParameters',
            operator: 'Equal',
            path: '/403.html',
            matchType: 'Literal',
            negateCondition: true, // Negate to exclude /403.html from blocking
          },
        },
      ],
      actions: [
        {
          name: 'UrlRedirect',
          parameters: {
            typeName: 'DeliveryRuleUrlRedirectActionParameters',
            redirectType: 'Found', // 302
            destinationProtocol: 'MatchRequest',
            customPath: '/403.html',
          },
        },
      ],
    },
    { dependsOn: [ipRuleSet] }
  );

  // DNS Record Management
  // This automatically creates the CNAME record in your existing Azure DNS Zone.
  // NOTE: The Service Principal must have "DNS Zone Contributor" permissions on the DNS Zone's Resource Group.
  const dnsZoneResourceGroup = config.get('dnsZoneResourceGroup') || 'tripradar-shared-rg';
  const dnsZoneName = config.get('dnsZoneName') || 'tripradar.io';
  const subdomain = isProd ? '@' : 'dev';

  const cnameRecord = new network.RecordSet('dns-cname', {
    resourceGroupName: dnsZoneResourceGroup,
    zoneName: dnsZoneName,
    relativeRecordSetName: subdomain,
    recordType: 'CNAME',
    ttl: 300,
    cnameRecord: {
      cname: afdEndpoint.hostName,
    },
  });

  // Custom Domain
  // Now that we manage the DNS record, we can create this resource immediately.
  const domainName = isProd ? dnsZoneName : `${subdomain}.${dnsZoneName}`;
  const customDomain = new cdn.AFDCustomDomain(
    'custom-domain',
    {
      customDomainName: domainName.replace(/\./g, '-'),
      hostName: domainName,
      profileName: cdnProfile.name,
      resourceGroupName: resourceGroup.name,
      tlsSettings: {
        certificateType: 'ManagedCertificate',
        minimumTlsVersion: 'TLS12',
      },
    },
    { dependsOn: [cnameRecord] } // Wait for DNS record to be created
  );

  // DNS TXT record for domain validation
  const txtRecord = new network.RecordSet('dns-validation-txt', {
    resourceGroupName: dnsZoneResourceGroup,
    zoneName: dnsZoneName,
    relativeRecordSetName: `_dnsauth.${subdomain}`,
    recordType: 'TXT',
    ttl: 300,
    txtRecords: [
      {
        value: [customDomain.validationProperties.apply(vp => vp!.validationToken!)],
      },
    ],
  });


  // AFD Route
  new cdn.Route(
    'afd-route',
    {
      routeName: 'default-route',
      endpointName: afdEndpoint.name,
      profileName: cdnProfile.name,
      resourceGroupName: resourceGroup.name,
      originGroup: {
        id: originGroup.id,
      },
      supportedProtocols: ['Https', 'Http'],
      patternsToMatch: ['/*'],
      forwardingProtocol: 'HttpsOnly',
      linkToDefaultDomain: 'Enabled',
      httpsRedirect: 'Enabled',
      customDomains: [{ id: customDomain.id }],
      ruleSets: [{ id: ipRuleSet.id }], // Apply IP restriction rules
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
    { dependsOn: [origin, customDomain, txtRecord, ipRuleSet] }
  );

  publicEndpoint = pulumi.interpolate`${HTTPS_PROTOCOL}${afdEndpoint.hostName}`;
} else {
  publicEndpoint = storageAccount.primaryEndpoints.apply(e => e!.web!);
}

export const url = publicEndpoint;

/**
 * Parses the ALLOWED_IP_RANGES environment variable.
 * Expected format: "Name|IP|Description;Name|IP|Description"
 * Example: "Anton|79.100.209.184/32|Office;Vadim|178.51.119.80/32|Home"
 */
function parseAllowedIps(ipRangesString: string | undefined): string[] {
  const fallbackIp = '127.0.0.1/32'; // Dummy IP to prevent empty matchValue

  if (!ipRangesString) {
    console.warn('⚠️ ALLOWED_IP_RANGES is not set. WAF will block all requests (fallback to dummy IP).');
    return [fallbackIp];
  }

  try {
    const ips = ipRangesString
      .split(';')
      .map(entry => {
        const parts = entry.split('|');
        // Format is Name|IP|Description, so IP is at index 1
        if (parts.length >= 2) {
          return parts[1].trim();
        }
        return null;
      })
      .filter((ip): ip is string => !!ip && ip.length > 0);

    if (ips.length === 0) {
      console.warn('⚠️ No valid IPs found in ALLOWED_IP_RANGES. WAF will block all requests.');
      return [fallbackIp];
    } else {
      console.log(`✅ Configured WAF with ${ips.length} allowed IPs.`);
    }

    return ips;
  } catch (error) {
    console.error('❌ Failed to parse ALLOWED_IP_RANGES:', error);
    return [fallbackIp];
  }
}
