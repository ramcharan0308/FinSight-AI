import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  initialize: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setAuth: (user, accessToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      document.cookie = `accessToken=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
    }
    set({ user, accessToken, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    }
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
  initialize: () => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      const cookieToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (accessToken && userStr) {
        try {
          const user = JSON.parse(userStr) as User;
          set({ user, accessToken, isAuthenticated: true });
          if (!cookieToken) {
            document.cookie = `accessToken=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
          }
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          document.cookie =
            'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
          set({ user: null, accessToken: null, isAuthenticated: false });
        }
      } else {
        // If localStorage is empty, make sure the cookie is cleared to prevent redirect loops
        if (cookieToken) {
          document.cookie =
            'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        }
        set({ user: null, accessToken: null, isAuthenticated: false });
      }
    }
  },
  updateUser: (updatedUser) => {
    set((state) => {
      if (!state.user) return state;
      const newUser = { ...state.user, ...updatedUser };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      return { user: newUser };
    });
  },
}));
