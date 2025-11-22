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
export const CDN_RESOURCE_NAMES = {
  PROFILE: 'cdn-profile',
  ENDPOINT: 'afd-endpoint',
  ORIGIN_GROUP: 'afd-origin-group',
  ORIGIN_GROUP_NAME: 'storage-origin-group',
  ORIGIN: 'afd-origin',
  ORIGIN_NAME: 'storage-origin',
  RULE_SET: 'ip-restriction-ruleset',
  RULE_SET_NAME: 'IPRestriction',
  ALLOW_RULE: 'allow-whitelisted-ips',
  ALLOW_RULE_NAME: 'AllowWhitelistedIPs',
  BLOCK_RULE: 'block-unauthorized-ips',
  BLOCK_RULE_NAME: 'BlockUnauthorizedIPs',
  CUSTOM_DOMAIN: 'custom-domain',
  DNS_CNAME: 'dns-cname',
  DNS_TXT: 'dns-validation-txt',
  ROUTE: 'afd-route',
  ROUTE_NAME: 'default-route',
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

export const DEFAULTS = {
  DNS_ZONE_RG: 'tripradar-shared-rg',
  DNS_ZONE_NAME: 'tripradar.io',
  STORAGE_ACCOUNT_PREFIX: 'tripradarwebui',
} as const;
