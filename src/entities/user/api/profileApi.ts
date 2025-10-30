import { apiClient } from 'shared/api';
import type { GetUserProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from 'shared/api';

export const profileApi = {
  getProfile: async (username: string): Promise<GetUserProfileResponse> => {
    return apiClient.get(`/v1/users/${username}/profile`);
  },

  updateProfile: async (username: string, data: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
    return apiClient.put(`/v1/users/${username}/profile`, data);
  },
};
