import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { CustomError } from './error.middleware';
import { prisma } from '../config/prisma';

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError('No authentication token provided', 401, 'UNAUTHORIZED');
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      throw new CustomError('Authentication token is invalid or expired', 401, 'INVALID_TOKEN');
    }

    const userExists = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true },
    });

    if (!userExists) {
      throw new CustomError('User account associated with token no longer exists', 401, 'USER_DELETED');
    }

    req.user = {
      id: userExists.id,
      email: userExists.email,
      role: userExists.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};
