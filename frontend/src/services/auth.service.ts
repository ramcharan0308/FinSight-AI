import { apiClient } from '@/lib/axios';
import { User } from '@/types';

export interface AuthPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async register(email: string, password: string, name?: string): Promise<AuthPayload> {
    const response = await apiClient.post('/auth/register', { email, password, name });
    return response.data.data;
  },

  async login(email: string, password: string): Promise<AuthPayload> {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data.data;
  },

  async updateProfile(name: string, email: string): Promise<User> {
    // Simulating API request delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      id: 'mock-id', // will be merged/overwritten by active user ID in hook or store
      email,
      name,
      role: 'USER',
      createdAt: new Date().toISOString(),
    };
  },
};
