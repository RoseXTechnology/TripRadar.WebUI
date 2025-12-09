export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
}

// Telegram Integration Types

/**
 * Data received from Telegram OAuth widget
 */
export interface TelegramData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

/**
 * Request to link Telegram account to user
 * Uses email to identify the user (from email confirmation or login error)
 */
export interface LinkTelegramRequest {
  email: string;
  telegramData: TelegramData;
}

/**
 * User data returned from API
 */
export interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  telegramId?: number;
  isEmailConfirmed?: boolean;
  profilePictureUrl?: string;
  timezone?: string;
  languageCode?: string;
  countryCode?: string;
  allowsMarketingEmails?: boolean;
  isActive?: boolean;
  tierName?: string;
}

/**
 * Extended response from linking Telegram account
 * Extends ActivateUserResponse from Swagger with actual user data returned by backend
 *
 * Note: Swagger defines token/refreshToken/email as nullable, but on successful response
 * they are always present. This type reflects the actual successful response structure.
 *
 * TODO: Update Swagger spec to include user object in ActivateUserResponse
 */
export interface LinkTelegramResponse {
  token: string;
  refreshToken: string;
  email: string;
  message?: string | null;
  user: User;
}

/**
 * Error response when Telegram linking is required
 */
export interface LoginErrorTelegramRequired {
  error: 'TELEGRAM_REQUIRED';
  message: string;
  email: string;
}
