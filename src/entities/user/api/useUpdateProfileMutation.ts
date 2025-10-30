import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateUserProfileRequest } from 'shared/api';
import { profileApi } from './profileApi';

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, data }: { username: string; data: UpdateUserProfileRequest }) =>
      profileApi.updateProfile(username, data),
    onSuccess: async (_, { username }) => {
      await queryClient.invalidateQueries({ queryKey: ['profile', username] });
    },
  });
};
