import { apiClient, type CreateUserRequest, type CreateGoogleLoginRequest } from 'shared/api';

// Custom types not in Swagger
export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const authApi = {
  register: async (data: CreateUserRequest): Promise<RegisterResponse> => {
    return apiClient.post('/v1/users', data);
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiClient.post('/v1/tokens/login', data);
  },

  googleLogin: async (data: CreateGoogleLoginRequest): Promise<LoginResponse> => {
    return apiClient.post('/v1/tokens/google-login', data);
  },
};
