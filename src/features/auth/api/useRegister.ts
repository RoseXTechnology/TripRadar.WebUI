import { useMutation } from '@tanstack/react-query';
import { authStorage } from 'shared/api';
import { createUserFromRegistration } from 'shared/lib/user-utils';
import { useAuthStore } from 'shared/store/auth';
import { authApi, RegisterRequest } from './authApi';

export function useRegisterMutation() {
  const login = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      // 1. Регистрируем пользователя
      await authApi.register(data);

      // 2. Автоматически логиним
      const loginResponse = await authApi.login({
        username: data.username,
        password: data.password,
      });

      return { loginResponse, userData: data };
    },
    onSuccess: ({ loginResponse, userData }) => {
      console.log('🔍 Login response:', loginResponse);

      // Сохраняем токены
      authStorage.setTokens({
        authToken: loginResponse.token,
        refreshToken: loginResponse.refreshToken,
      });

      // Обновляем auth store
      const user = createUserFromRegistration(userData);
      login(user);

      console.log('✅ Tokens saved and user logged in!');
    },
  });
}
