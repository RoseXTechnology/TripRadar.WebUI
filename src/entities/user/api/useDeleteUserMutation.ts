import { useMutation } from '@tanstack/react-query';
import { apiClient } from 'shared/api';

/**
 * Hook for deleting current user account
 * This is an internal/admin operation for development purposes
 * Uses the internal API endpoint with X-Internal-Auth header
 */
export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: (username: string): Promise<{ message: string }> =>
      apiClient.internalDelete(`/api/v1/internals/users/${encodeURIComponent(username)}`),
    onSuccess: () => {
      // User deleted successfully
    },
    onError: () => {
      // Failed to delete user
    },
  });
};
