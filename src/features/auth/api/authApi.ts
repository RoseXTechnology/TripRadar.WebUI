import {
  apiClient,
  type CreateGoogleLoginRequest,
  type CreateLoginRequest,
  type CreateUserRequest,
  type GetLoginResponse,
  type UserManagementResponse,
} from 'shared/api';
import type { LinkTelegramRequest, LinkTelegramResponse } from 'shared/api/types';

export const authApi = {
  register: async (data: CreateUserRequest): Promise<UserManagementResponse> => {
    return apiClient.post('/api/v1/users', data);
  },

  // TODO: Handle EmailNotConfirmed error when backend adds email verification check
  // When backend returns 400 with "EmailNotConfirmed" error:
  // - Show user-friendly message: "Please confirm your email before logging in"
  // - Provide link to resend confirmation email
  login: async (data: CreateLoginRequest): Promise<GetLoginResponse> => {
    return apiClient.post('/api/v1/tokens/sessions', data);
  },

  googleLogin: async (data: CreateGoogleLoginRequest): Promise<GetLoginResponse> => {
    return apiClient.post('/api/v1/tokens/sessions/google', data);
  },

  linkTelegram: async (data: LinkTelegramRequest): Promise<LinkTelegramResponse> => {
    return apiClient.internalPost('/api/v1/internals/users/activation', data);
  },
};
