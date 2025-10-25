import { useMutation } from '@tanstack/react-query';
import type { CreateUserRequest } from 'shared/api';
import { authApi } from './authApi';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      // Только регистрация, без автологина
      const response = await authApi.register(data);
      return { response, userData: data };
    },
    onSuccess: ({ response }) => {
      console.log('✅ Registration successful:', response.message);
    },
  });
};
