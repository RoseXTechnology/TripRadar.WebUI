import { create } from 'zustand';
import { User } from 'app/types';
import { authStorage } from 'shared/lib';
import { getUsernameFromToken } from 'shared/lib/jwt-utils';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: user =>
    set({
      user: {
        ...user,
        subscription: user.subscription || 'free',
      },
      isAuthenticated: true,
    }),

  logout: () => {
    // Clear tokens and state
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
    set({ isLoading: true });

    const token = authStorage.getToken();
    if (!token) {
      set({ isLoading: false });
      return;
    }

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

        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      // Очищаем невалидные токены
      authStorage.clearTokens();
      set({ isLoading: false });
    }
  },
}));
