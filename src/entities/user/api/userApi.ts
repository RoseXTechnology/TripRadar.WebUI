import { api } from 'shared/api';
import type { User, UserProfile } from '../model/types';

export const userApi = {
  getCurrentUser: () => api.get<User>('/user/me'),

  getUserProfile: (id: string) => api.get<UserProfile>(`/user/${id}`),

  updateProfile: (data: Partial<UserProfile>) => api.put<UserProfile>('/user/profile', data),

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.request<{ avatarUrl: string }>('/user/avatar', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  },
};
