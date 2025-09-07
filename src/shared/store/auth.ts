import { create } from 'zustand';
import { User } from 'app/types';
import { authStorage } from 'shared/api';
import { getUsernameFromToken } from 'shared/lib/jwt-utils';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: user =>
    set({
      user: {
        ...user,
        subscription: user.subscription || 'free',
      },
      isAuthenticated: true,
    }),

  logout: () => {
    authStorage.clearTokens();
    set({ user: null, isAuthenticated: false });
  },

  updateUser: updates => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updates } });
    }
  },

  // Восстанавливаем состояние из токенов при загрузке
  initializeAuth: () => {
    const token = authStorage.getToken();
    if (!token) return;

    try {
      // Получаем username из JWT токена
      const username = getUsernameFromToken(token);

      if (username) {
        // Создаем минимальный user объект
        const user: User = {
          username,
          name: username, // Пока используем username как имя
          email: '', // Пустое значение, можно загрузить позже
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6366f1&color=fff`,
          subscription: 'free',
        };

        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      // Очищаем невалидные токены
      authStorage.clearTokens();
    }
  },
}));
