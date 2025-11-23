import * as resources from '@pulumi/azure-native/resources';
import * as storage from '@pulumi/azure-native/storage';
import * as pulumi from '@pulumi/pulumi';
import { PROJECT_NAME, RESOURCE_SUFFIX, STATIC_WEBSITE_RESOURCE_NAME, HTML_DOCUMENT, DEFAULTS } from '../constants';
import { StorageBuilderOptions } from '../types';

export class StorageBuilder {
  private resourceGroup: resources.ResourceGroup;
  private options: StorageBuilderOptions;
  private storageAccount!: storage.StorageAccount;

  constructor(resourceGroup: resources.ResourceGroup, options: StorageBuilderOptions) {
    this.resourceGroup = resourceGroup;
    this.options = options;
  }

  public createStorageAccount(sku: storage.SkuName): this {
    const storageAccountName = `${DEFAULTS.STORAGE_ACCOUNT_PREFIX}${this.options.isProd ? 'prod' : 'dev'}`;
    const envSuffix = this.options.isProd ? 'production' : 'development';
    this.storageAccount = new storage.StorageAccount(`${PROJECT_NAME}${RESOURCE_SUFFIX.STORAGE_ACCOUNT}${envSuffix}`, {
      accountName: storageAccountName,
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      sku: { name: sku },
      kind: storage.Kind.StorageV2,
      allowBlobPublicAccess: true,
      minimumTlsVersion: storage.MinimumTlsVersion.TLS1_2,
      tags: this.options.tags,
    });

    return this;
  }

  public enableStaticWebsite(): this {
    if (!this.storageAccount) {
      throw new Error('Storage Account must be created before enabling static website.');
    }

    new storage.StorageAccountStaticWebsite(STATIC_WEBSITE_RESOURCE_NAME, {
      accountName: this.storageAccount.name,
      resourceGroupName: this.resourceGroup.name,
      indexDocument: HTML_DOCUMENT.INDEX,
      error404Document: HTML_DOCUMENT.INDEX,
    });

    return this;
  }

  public getStorageAccount(): storage.StorageAccount {
    return this.storageAccount;
  }

  public getPrimaryWebEndpoint(): pulumi.Output<string> {
    return this.storageAccount.primaryEndpoints.apply(e => e!.web!);
  }
}
