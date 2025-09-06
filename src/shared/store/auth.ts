import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'app/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: updates => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'tripradar-auth',
    }
  )
);
