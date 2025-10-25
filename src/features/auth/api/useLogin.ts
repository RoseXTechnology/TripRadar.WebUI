import { useMutation } from '@tanstack/react-query';
import type { CreateLoginRequest, GetLoginResponse } from 'shared/api';
import { authApi } from './authApi';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateLoginRequest): Promise<GetLoginResponse> => {
      return authApi.login(data);
    },
    onSuccess: response => {
      console.log('✅ Login successful:', response);
    },
    onError: error => {
      console.error('❌ Login failed:', error);
    },
  });
};
