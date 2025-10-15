import { useMutation } from '@tanstack/react-query';
import { apiClient } from 'shared/api';

interface ConfirmEmailRequest {
  username: string;
  token: string;
}

interface ConfirmEmailResponse {
  message: string;
}

export function useConfirmEmailMutation() {
  return useMutation({
    mutationFn: async ({ username, token }: ConfirmEmailRequest): Promise<ConfirmEmailResponse> => {
      return apiClient.get(`/v1/users/${username}/email-confirmations?token=${encodeURIComponent(token)}`);
    },
  });
}
