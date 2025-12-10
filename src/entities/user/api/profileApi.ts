import type { GetUserProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from 'shared/api';
import { apiClient } from 'shared/api';

export const profileApi = {
  getProfile: async (username: string): Promise<GetUserProfileResponse> => {
    return apiClient.get(`/api/v1/users/${encodeURIComponent(username)}/profile`);
  },

  updateProfile: async (username: string, data: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
    return apiClient.put(`/api/v1/users/${encodeURIComponent(username)}/profile`, data);
  },
};
