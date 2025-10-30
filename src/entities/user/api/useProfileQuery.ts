import { useQuery } from '@tanstack/react-query';
import { profileApi } from './profileApi';

export const useProfileQuery = (username: string) => {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => profileApi.getProfile(username),
    enabled: !!username,
  });
};
