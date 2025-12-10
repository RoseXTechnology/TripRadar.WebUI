import { useMutation } from '@tanstack/react-query';
import { apiClient } from 'shared/api';
import type { components } from 'shared/api/generated-types';
import type { LinkTelegramResponse } from 'shared/api/types';

type ActivateUserRequest = components['schemas']['ActivateUserRequest'];

export const useLinkTelegramMutation = () => {
  return useMutation({
    mutationFn: (data: ActivateUserRequest): Promise<LinkTelegramResponse> =>
      apiClient.patch('/api/v1/users/activation', data),
  });
};
