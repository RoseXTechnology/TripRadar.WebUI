interface LoginData {
  email: string;
  password: string;
}

interface SignupData extends LoginData {
  name: string;
  confirmPassword: string;
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
  login: async (data: LoginData): Promise<AuthResponse> => {
    // Mock implementation - replace with actual API call
    return {
      token: 'mock-token',
      user: {
        id: '1',
        name: 'User',
        email: data.email,
      },
    };
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    // Mock implementation - replace with actual API call
    return {
      token: 'mock-token',
      user: {
        id: '1',
        name: data.name,
        email: data.email,
      },
    };
  },
};