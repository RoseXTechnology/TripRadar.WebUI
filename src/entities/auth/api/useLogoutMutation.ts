import { useMutation } from '@tanstack/react-query';
import { apiClient } from 'shared/api';

/**
 * Logout mutation hook
 * Calls the logout API endpoint to invalidate tokens on server
 */
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async (username: string) => {
      const response = await apiClient.post(`/api/v1/users/${username}/logout`);
      return response.data;
    },
    onError: error => {
      console.warn('Logout API call failed:', error);
    },
  });
};
