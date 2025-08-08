import { api } from 'shared/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest extends LoginRequest {
  name: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authApi = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),

  signup: (data: SignupRequest) => api.post<AuthResponse>('/auth/signup', data),

  refreshToken: () => api.post<{ token: string }>('/auth/refresh'),

  forgotPassword: (email: string) => api.post<{ message: string }>('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post<{ message: string }>('/auth/reset-password', { token, password }),
};
