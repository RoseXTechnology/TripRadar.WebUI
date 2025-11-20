export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const;

export const LOCATION = {
  WEST_EUROPE: 'westeurope',
  EAST_US: 'eastus',
} as const;

export const PROJECT_NAME = 'tripradar-webui';

export const RESOURCE_SUFFIX = {
  RESOURCE_GROUP: 'rg',
  STORAGE_ACCOUNT: 'sa',
  CDN_PROFILE: 'cdn',
} as const;

export const HTML_DOCUMENT = {
  INDEX: 'index.html',
} as const;

export const CONTENT_TYPES = {
  PLAIN: 'text/plain',
  HTML: 'text/html',
  CSS: 'text/css',
  JS: 'text/javascript',
  APP_JS: 'application/javascript',
  JSON: 'application/json',
} as const;

export const CDN_LOCATION = 'Global';

export const CDN_ORIGIN_NAME = 'storage-origin';

export const CDN_RESOURCE_NAMES = {
  PROFILE: 'cdn-profile',
  ENDPOINT: 'cdn-endpoint',
} as const;

export const HTTPS_PROTOCOL = 'https://';

export const REGEX_PATTERNS = {
  REMOVE_HTTPS: /^https:\/\//,
  REMOVE_TRAILING_SLASH: /\/$/,
} as const;

export const TAG_KEYS = {
  ENVIRONMENT: 'Environment',
  PROJECT: 'Project',
  MANAGED_BY: 'ManagedBy',
  COST_CENTER: 'CostCenter',
} as const;

export const TAG_VALUES = {
  PROJECT_NAME: 'TripRadar.WebUI',
  MANAGED_BY_PULUMI: 'Pulumi',
  COST_CENTER_PROD: 'Production',
  COST_CENTER_DEV: 'Development',
} as const;

export const STATIC_WEBSITE_RESOURCE_NAME = 'static-website';
