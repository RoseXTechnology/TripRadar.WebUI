/**
 * Error message mapping and handling utilities
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */

import { ROUTES } from 'shared/config/routes';

export interface ErrorAction {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

export interface ErrorConfig {
  title: string;
  message: string;
  actions?: ErrorAction[];
  severity: 'error' | 'warning' | 'info';
}

export type ErrorCode =
  | 'EMAIL_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'INVALID_EMAIL'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'TELEGRAM_REQUIRED'
  | 'EMAIL_NOT_CONFIRMED'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED';

/**
 * Navigation helper: Navigate to login page with optional email pre-fill
 */
export const navigateToLogin = (email?: string) => {
  const url = new URL(window.location.origin + ROUTES.LOGIN);
  if (email) {
    url.searchParams.set('email', email);
  }
  window.location.href = url.toString();
};

/**
 * Navigation helper: Navigate to password reset page with optional email pre-fill
 */
export const navigateToPasswordReset = (email?: string) => {
  const url = new URL(window.location.origin + '/forgot-password');
  if (email) {
    url.searchParams.set('email', email);
  }
  window.location.href = url.toString();
};

/**
 * Navigation helper: Navigate to signup page
 */
export const navigateToSignup = () => {
  window.location.href = ROUTES.SIGNUP;
};

interface ErrorContext {
  email?: string;
  [key: string]: unknown;
}

/**
 * Error message mapping for all error codes
 */
export const ERROR_MESSAGES: Record<ErrorCode, (context?: ErrorContext) => ErrorConfig> = {
  EMAIL_ALREADY_EXISTS: context => ({
    title: 'Email Already Registered',
    message: 'This email is already in use. Please log in or reset your password.',
    severity: 'warning',
    actions: [
      {
        label: 'Log In',
        onClick: () => navigateToLogin(context?.email),
        variant: 'primary',
      },
      {
        label: 'Reset Password',
        onClick: () => navigateToPasswordReset(context?.email),
        variant: 'secondary',
      },
    ],
  }),

  WEAK_PASSWORD: () => ({
    title: 'Password Too Weak',
    message:
      'Your password must be at least 9 characters and include an uppercase letter, a digit, and a special character.',
    severity: 'error',
  }),

  INVALID_EMAIL: () => ({
    title: 'Invalid Email',
    message: 'Please enter a valid email address.',
    severity: 'error',
  }),

  NETWORK_ERROR: () => ({
    title: 'Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection and try again.',
    severity: 'error',
  }),

  SERVER_ERROR: () => ({
    title: 'Server Error',
    message: 'Something went wrong on our end. Please try again in a few moments.',
    severity: 'error',
  }),

  TELEGRAM_REQUIRED: () => ({
    title: 'Telegram Connection Required',
    message: 'Please connect your Telegram account to complete registration.',
    severity: 'info',
  }),

  EMAIL_NOT_CONFIRMED: () => ({
    title: 'Email Not Confirmed',
    message: 'Please check your email and click the confirmation link before logging in.',
    severity: 'warning',
  }),

  INVALID_TOKEN: () => ({
    title: 'Invalid Link',
    message: 'This confirmation link is invalid or has already been used.',
    severity: 'error',
    actions: [
      {
        label: 'Back to Signup',
        onClick: () => navigateToSignup(),
        variant: 'primary',
      },
    ],
  }),

  TOKEN_EXPIRED: () => ({
    title: 'Link Expired',
    message: 'This confirmation link has expired. Please register again to receive a new link.',
    severity: 'warning',
    actions: [
      {
        label: 'Register Again',
        onClick: () => navigateToSignup(),
        variant: 'primary',
      },
    ],
  }),
};

interface BackendError {
  response?: {
    data?: {
      code?: string;
      [key: string]: unknown;
    };
  };
  code?: string;
  message?: string;
}

/**
 * Parse backend error and return user-friendly error config
 * @param error - Error object from API call
 * @returns ErrorConfig with title, message, severity, and optional actions
 */
export const parseBackendError = (error: BackendError): ErrorConfig => {
  // Try to extract error code from response
  const errorCode = error?.response?.data?.code || error?.code;

  // Check if we have a mapping for this error code
  if (errorCode && ERROR_MESSAGES[errorCode as ErrorCode]) {
    const context = (error?.response?.data || {}) as ErrorContext;
    return ERROR_MESSAGES[errorCode as ErrorCode](context);
  }

  // Fallback to generic error
  return {
    title: 'Error',
    message: error?.message || 'An unexpected error occurred. Please try again.',
    severity: 'error',
  };
};
