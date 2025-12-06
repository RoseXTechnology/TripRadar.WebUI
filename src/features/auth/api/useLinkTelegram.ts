import { useMutation } from '@tanstack/react-query';
import type { LinkTelegramRequest, LinkTelegramResponse } from 'shared/api/types';
import { authApi } from './authApi';

/**
 * Hook for linking a Telegram account to a user after email confirmation.
 *
 * This mutation accepts a linkToken (from email confirmation) and telegramData
 * (from Telegram OAuth widget), sends them to the backend for verification,
 * and returns JWT tokens and user data on success.
 *
 * Backend endpoint: POST /api/v1/internals/users/activation
 *
 * Requirements: 3.4, 3.5
 *
 * @returns Mutation object with mutate function and status
 *
 * @example
 * const { mutate, isPending, isError } = useLinkTelegramMutation();
 *
 * const handleTelegramAuth = (telegramData: TelegramData) => {
 *   mutate(
 *     { linkToken, telegramData },
 *     {
 *       onSuccess: ({ accessToken, refreshToken, user }) => {
 *         // Store tokens and redirect
 *       },
 *       onError: (error) => {
 *         // Show error message
 *       }
 *     }
 *   );
 * };
 */
export const useLinkTelegramMutation = () => {
  return useMutation({
    mutationFn: async (data: LinkTelegramRequest): Promise<LinkTelegramResponse> => {
      return authApi.linkTelegram(data);
    },
    onSuccess: response => {
      console.log('✅ Telegram linked successfully:', {
        username: response.user.username,
        email: response.user.email,
        telegramId: response.user.telegramId,
      });
    },
    onError: error => {
      console.error('❌ Telegram linking failed:', error);
      // Error details are logged for debugging
      // UI will handle displaying user-friendly error messages
    },
  });
};
