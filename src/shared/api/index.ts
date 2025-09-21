// Import and re-export generated types
import type { components } from './generated-types';
export type { components } from './generated-types';

// Commonly used types
export type UserTierType = components['schemas']['UserTierType'];
export type BillingPeriod = components['schemas']['BillingPeriod'];
export type CreateUserRequest = components['schemas']['CreateUserRequest'];
export type CreateGoogleLoginRequest = components['schemas']['CreateGoogleLoginRequest'];
export type CreateSubscriptionCheckoutRequest = components['schemas']['CreateSubscriptionCheckoutRequest'];
export type CreateSubscriptionCheckoutResponse = components['schemas']['CreateSubscriptionCheckoutResponse'];
export type GetUserProfileResponse = components['schemas']['GetUserProfileResponse'];
export type PricesResponse = components['schemas']['PricesResponse'];
export type PriceResponse = components['schemas']['PriceResponse'];

// Export existing API client
export * from './interceptors';
