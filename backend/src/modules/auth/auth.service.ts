import { UserRepository } from './auth.repository';
import { hashPassword, comparePassword } from '../../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { CustomError } from '../../middlewares/error.middleware';
import { AuthResponse, UserWithoutPassword } from './auth.types';
import { registerSchema, loginSchema } from './auth.schema';
import { z } from 'zod';

type RegisterInput = z.infer<typeof registerSchema>['body'];
type LoginInput = z.infer<typeof loginSchema>['body'];

export class AuthService {
  private userRepository = new UserRepository();

  private sanitizeUser(user: any): UserWithoutPassword {
    const { password, ...sanitized } = user;
    return sanitized;
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new CustomError('Email address already exists in our records', 400, 'EMAIL_EXISTS');
    }

    const hashedPassword = await hashPassword(input.password);
    const createdUser = await this.userRepository.create({
      email: input.email,
      password: hashedPassword,
      name: input.name || null,
      role: 'USER',
    });

    const payload = {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      user: this.sanitizeUser(createdUser),
      accessToken,
      refreshToken,
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new CustomError('Invalid email or password credentials provided', 401, 'INVALID_CREDENTIALS');
    }

    const isPasswordValid = await comparePassword(input.password, user.password);
    if (!isPasswordValid) {
      throw new CustomError('Invalid email or password credentials provided', 401, 'INVALID_CREDENTIALS');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      user: this.sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  }
}
