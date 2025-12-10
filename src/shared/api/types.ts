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
 * Response from linking Telegram account
 * This interface represents the actual response structure from the API when linking succeeds.
 * The API returns token, refreshToken, email, and optional message, but does not include
 * a user object in the response.
 */
export interface LinkTelegramResponse {
  token: string;
  refreshToken: string;
  email: string;
  message?: string | null;
}

/**
 * Error response when Telegram linking is required
 */
export interface LoginErrorTelegramRequired {
  error: 'TELEGRAM_REQUIRED';
  message: string;
  email: string;
}
