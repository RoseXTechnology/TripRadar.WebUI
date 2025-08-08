import { useState } from 'react';
import { useApi } from 'shared/lib';
import { authApi } from '../api/authApi';

interface LoginData {
  email: string;
  password: string;
}

interface SignupData extends LoginData {
  name: string;
  confirmPassword: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth_token'));
  const { execute: loginExecute, loading: loginLoading } = useApi();
  const { execute: signupExecute, loading: signupLoading } = useApi();

  const login = async (data: LoginData) => {
    const response = await loginExecute(() => authApi.login(data));
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      setIsAuthenticated(true);
    }
    return response;
  };

  const signup = async (data: SignupData) => {
    const response = await signupExecute(() => authApi.signup(data));
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      setIsAuthenticated(true);
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    signup,
    logout,
    loginLoading,
    signupLoading,
  };
}
