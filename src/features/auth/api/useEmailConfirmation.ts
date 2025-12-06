import { useMutation } from '@tanstack/react-query';
import { apiClient } from 'shared/api';
import type { EmailConfirmationRequest, EmailConfirmationResponse } from 'shared/api/types';

/**
 * Hook for confirming user email address
 *
 * Makes a POST request to /api/v1/email-confirmations with the confirmation token
 * Returns a linkToken that can be used to link the user's Telegram account
 *
 * @example
 * const { mutate, isPending, error } = useEmailConfirmation();
 * mutate({ token: 'abc123' });
 */
export const useEmailConfirmation = () => {
  return useMutation({
    mutationFn: async (data: EmailConfirmationRequest): Promise<EmailConfirmationResponse> => {
      return apiClient.post<EmailConfirmationResponse, EmailConfirmationRequest>('/api/v1/email-confirmations', data);
    },
    onSuccess: response => {
      console.log('✅ Email confirmation successful:', response);
    },
    onError: (error: Error) => {
      console.error('❌ Email confirmation failed:', error.message);
    },
  });
};
