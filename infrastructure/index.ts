import * as cdn from '@pulumi/azure-native/cdn';
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

  // AFD Route (depends on origin being ready)
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
    },
    { dependsOn: [origin] }
  );

  publicEndpoint = pulumi.interpolate`${HTTPS_PROTOCOL}${afdEndpoint.hostName}`;
} else {
  publicEndpoint = storageAccount.primaryEndpoints.apply(e => e!.web!);
}
