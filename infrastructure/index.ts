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
  CONTENT_TYPES,
  CDN_LOCATION,
  CDN_ORIGIN_NAME,
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
  enableCdn: isProd,
  cdnSku: cdn.SkuName.Standard_Microsoft,
  cacheTtl: isProd ? 31_536_000 : 300, // 1 year vs 5 minutes
};

const baseTags = {
  [TAG_KEYS.ENVIRONMENT]: environment,
  [TAG_KEYS.PROJECT]: TAG_VALUES.PROJECT_NAME,
  [TAG_KEYS.MANAGED_BY]: TAG_VALUES.MANAGED_BY_PULUMI,
  [TAG_KEYS.COST_CENTER]: isProd ? TAG_VALUES.COST_CENTER_PROD : TAG_VALUES.COST_CENTER_DEV,
};

const rgName = `${PROJECT_NAME}-${RESOURCE_SUFFIX.RESOURCE_GROUP}-${isProd ? 'prod' : 'dev'}`;

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

  const cdnEndpoint = new cdn.Endpoint(CDN_RESOURCE_NAMES.ENDPOINT, {
    endpointName: `${PROJECT_NAME}-${isProd ? 'prod' : 'dev'}`,
    resourceGroupName: resourceGroup.name,
    profileName: cdnProfile.name,
    isHttpAllowed: false,
    isHttpsAllowed: true,
    originHostHeader: originHostName,
    queryStringCachingBehavior: cdn.QueryStringCachingBehavior.IgnoreQueryString,
    origins: [
      {
        name: CDN_ORIGIN_NAME,
        hostName: originHostName,
      },
    ],
    isCompressionEnabled: true,
    contentTypesToCompress: [
      CONTENT_TYPES.PLAIN,
      CONTENT_TYPES.HTML,
      CONTENT_TYPES.CSS,
      CONTENT_TYPES.JS,
      CONTENT_TYPES.APP_JS,
      CONTENT_TYPES.JSON,
    ],
    tags: baseTags,
  });

  publicEndpoint = pulumi.interpolate`${HTTPS_PROTOCOL}${cdnEndpoint.hostName}`;
} else {
  publicEndpoint = storageAccount.primaryEndpoints.apply(e => e!.web!);
}
