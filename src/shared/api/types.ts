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
 * Request to confirm email address
 */
export interface EmailConfirmationRequest {
  token: string;
}

/**
 * Response from email confirmation endpoint
 */
export interface EmailConfirmationResponse {
  success: true;
  linkToken: string;
}

/**
 * Request to link Telegram account to user
 */
export interface LinkTelegramRequest {
  linkToken: string;
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
 * Response from linking Telegram account
 */
export interface LinkTelegramResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Error response when Telegram linking is required
 */
export interface LoginErrorTelegramRequired {
  error: 'TELEGRAM_REQUIRED';
  message: string;
  linkToken: string;
}
