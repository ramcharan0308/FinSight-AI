import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { CustomError } from './error.middleware';

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new CustomError('User session not authenticated', 401, 'UNAUTHORIZED'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new CustomError('Insufficient access permissions', 403, 'FORBIDDEN'));
    }

    next();
  };
};
