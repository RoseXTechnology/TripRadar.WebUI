import { useMutation } from '@tanstack/react-query';
import type { CreateLoginRequest, GetLoginResponse } from 'shared/api';
import { authApi } from './authApi';

/**
 * Custom error type that includes email for TELEGRAM_REQUIRED errors
 */
export interface LoginError extends Error {
  email?: string;
  isTelegramRequired?: boolean;
  statusCode?: number;
}

/**
 * Login mutation hook with TELEGRAM_REQUIRED error handling
 *
 * When login fails with TELEGRAM_REQUIRED error (403 status), the error object
 * will include:
 * - isTelegramRequired: true
 * - email: string (user's email to link with Telegram account)
 *
 * Requirements: 4.1, 4.2
 */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateLoginRequest): Promise<GetLoginResponse> => {
      return authApi.login(data);
    },
    onSuccess: response => {
      console.log('✅ Login successful:', response);
    },
    onError: (error: LoginError) => {
      if (error.isTelegramRequired && error.email) {
        console.log('🔗 Telegram linking required for email:', error.email);
      } else {
        console.error('❌ Login failed:', error);
      }
    },
  });
};
