import {
  apiClient,
  type CreateUserRequest,
  type CreateGoogleLoginRequest,
  type UserManagementResponse,
  type CreateLoginRequest,
} from 'shared/api';

// Response types from generated schema
export type RegisterResponse = UserManagementResponse;
export type LoginRequest = CreateLoginRequest;

// TODO: Replace with generated GetLoginResponse type when backend adds [ProducesResponseType] attributes
// Issue: Token controller endpoints missing ProducesResponseType - prevents OpenAPI schema generation
// After fix: export type LoginResponse = components['schemas']['GetLoginResponse'];
export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const authApi = {
  register: async (data: CreateUserRequest): Promise<RegisterResponse> => {
    return apiClient.post('/v1/users', data);
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiClient.post('/v1/tokens/sessions', data);
  },

  googleLogin: async (data: CreateGoogleLoginRequest): Promise<LoginResponse> => {
    return apiClient.post('/v1/tokens/sessions/google', data);
  },
};
