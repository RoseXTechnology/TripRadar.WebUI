import { apiClient } from 'shared/api';

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  hasDataStorageConsent: boolean;
}

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

export interface GoogleLoginRequest {
  id_token: string;
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return apiClient.post('/v1/users', data);
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiClient.post('/v1.0/tokens/login', data);
  },

  googleLogin: async (data: GoogleLoginRequest): Promise<LoginResponse> => {
    return apiClient.post('/v1/tokens/google-login', data);
  },
};
