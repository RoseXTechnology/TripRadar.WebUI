import * as resources from '@pulumi/azure-native/resources';
import * as storage from '@pulumi/azure-native/storage';
import * as cdn from '@pulumi/azure-native/cdn';
import * as pulumi from '@pulumi/pulumi';
import {
  ENVIRONMENT,
  LOCATION,
  RESOURCE_SUFFIX,
  TAG_KEYS,
  TAG_VALUES,
  HTTPS_PROTOCOL,
  DEFAULTS,
  PROJECT_NAME,
} from './constants';
import { EnvConfig, StorageBuilderOptions, CdnBuilderOptions } from './types';
import { StorageBuilder } from './builders/StorageBuilder';
import { CdnBuilder } from './builders/CdnBuilder';

const config = new pulumi.Config();
const environment = config.get('environment') ?? ENVIRONMENT.DEVELOPMENT;
const location = config.get('location') ?? LOCATION.WEST_EUROPE;
const isProd = environment === ENVIRONMENT.PRODUCTION;

const envConfig: EnvConfig = {
  storageSku: isProd ? storage.SkuName.Standard_GRS : storage.SkuName.Standard_LRS,
  enableCdn: true,
  cdnSku: cdn.SkuName.Standard_AzureFrontDoor,
  cacheTtl: isProd ? 31_536_000 : 300,
  enableIpRestrictions: !isProd,
};

const baseTags = {
  [TAG_KEYS.ENVIRONMENT]: environment,
  [TAG_KEYS.PROJECT]: TAG_VALUES.PROJECT_NAME,
  [TAG_KEYS.MANAGED_BY]: TAG_VALUES.MANAGED_BY_PULUMI,
  [TAG_KEYS.COST_CENTER]: isProd ? TAG_VALUES.COST_CENTER_PROD : TAG_VALUES.COST_CENTER_DEV,
};

// Create Resource Group
const rgName = `${PROJECT_NAME}-${isProd ? 'prod' : 'dev'}-${RESOURCE_SUFFIX.RESOURCE_GROUP}`;
const resourceGroup = new resources.ResourceGroup(rgName, {
  resourceGroupName: rgName,
  location,
  tags: baseTags,
});

// Create Storage Account and Static Website
const storageBuilderOptions: StorageBuilderOptions = {
  resourceGroupName: rgName,
  location,
  tags: baseTags,
  isProd,
};

const storageBuilder = new StorageBuilder(resourceGroup, storageBuilderOptions)
  .createStorageAccount(envConfig.storageSku)
  .enableStaticWebsite();

const storageAccount = storageBuilder.getStorageAccount();

// Output Storage Account Keys (optional, but good for debugging/access if needed)
pulumi
  .all([resourceGroup.name, storageAccount.name])
  .apply(([rg, sa]) =>
    storage.listStorageAccountKeys({ resourceGroupName: rg, accountName: sa }).then(keys => keys.keys[0].value)
  );

let publicEndpoint: pulumi.Output<string>;

if (envConfig.enableCdn) {
  const cdnBuilderOptions: CdnBuilderOptions = {
    resourceGroupName: rgName,
    location,
    tags: baseTags,
    isProd,
    storageAccountName: storageAccount.name,
    storageAccountWebEndpoint: storageBuilder.getPrimaryWebEndpoint(),
    envConfig,
  };

  const cdnBuilder = new CdnBuilder(resourceGroup, cdnBuilderOptions)
    .createProfile()
    .createOrigin()
    .createEndpoint()
    .setupIpRestrictions();

  // DNS and Custom Domain setup
  const dnsZoneResourceGroup = config.get('dnsZoneResourceGroup') || DEFAULTS.DNS_ZONE_RG;
  const dnsZoneName = config.get('dnsZoneName') || DEFAULTS.DNS_ZONE_NAME;
  
  cdnBuilder.setupCustomDomain(dnsZoneResourceGroup, dnsZoneName);
  
  cdnBuilder.createRoute();

  publicEndpoint = cdnBuilder.getEndpointUrl();
} else {
  publicEndpoint = storageBuilder.getPrimaryWebEndpoint();
}

export const url = publicEndpoint;
