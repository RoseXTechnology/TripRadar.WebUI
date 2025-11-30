import * as cdn from '@pulumi/azure-native/cdn';
import * as storage from '@pulumi/azure-native/storage';
import * as pulumi from '@pulumi/pulumi';

export interface EnvConfig {
  storageSku: storage.SkuName;
  enableCdn: boolean;
  cdnSku: cdn.SkuName;
  cacheTtl: number;
  enableIpRestrictions: boolean;
}

export interface BaseTags {
  [key: string]: string;
}

export interface StorageBuilderOptions {
  resourceGroupName: string;
  location: string;
  tags: BaseTags;
  isProd: boolean;
}

export interface CdnBuilderOptions {
  resourceGroupName: string;
  location: string;
  tags: BaseTags;
  isProd: boolean;
  storageAccountName: pulumi.Input<string>;
  storageAccountWebEndpoint: pulumi.Input<string>;
  envConfig: EnvConfig;
}
