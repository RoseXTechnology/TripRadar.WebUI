import { useMutation } from '@tanstack/react-query';
import type { CreateUserRequest } from 'shared/api';
import { authApi } from './authApi';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      // Registration only, no auto-login
      const response = await authApi.register(data);
      return { response, userData: data };
    },
    onSuccess: ({ response }) => {
      console.log('✅ Registration successful:', response.message);
      // Backend may include auto-generated username in response
      if (response.message) {
        console.log('📧 Email confirmation sent');
      }
    },
    onError: (error: Error) => {
      // Log error for debugging - error message is already displayed in UI
      console.error('❌ Registration failed:', error.message);
    },
  });
};
