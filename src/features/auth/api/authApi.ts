import {
  apiClient,
  type CreateUserRequest,
  type CreateGoogleLoginRequest,
  type UserManagementResponse,
  type CreateLoginRequest,
  type GetLoginResponse,
} from 'shared/api';

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
};
