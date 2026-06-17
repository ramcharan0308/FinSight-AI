import { User, UserRole } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

export interface AuthResponse {
  user: UserWithoutPassword;
  accessToken: string;
  refreshToken: string;
}

export interface UserSession {
  id: string;
  email: string;
  role: UserRole;
}
