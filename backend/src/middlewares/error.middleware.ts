import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from '../utils/response';

export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_SERVER_ERROR',
    public details?: unknown,
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Log critical unexpected errors
  if (process.env.NODE_ENV === 'development' || !(err instanceof CustomError || err instanceof ZodError)) {
    console.error('💥 Error Intercepted:', err);
  }

  // Handle Input Schema Zod Validation Failures
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    sendError(res, 'Validation failed', 400, 'VALIDATION_ERROR', formattedErrors);
    return;
  }

  // Handle Domain/Business Custom Errors
  if (err instanceof CustomError) {
    sendError(res, err.message, err.statusCode, err.code, err.details);
    return;
  }

  // Handle Prisma Known/Unknown Exceptions
  if (err.name === 'PrismaClientKnownRequestError') {
    sendError(res, 'Database operation constraints violated', 400, 'DATABASE_CONSTRAINT_ERROR');
    return;
  }

  // Default Fallback
  sendError(
    res,
    process.env.NODE_ENV === 'production' ? 'A system error occurred' : err.message,
    500,
    'INTERNAL_SERVER_ERROR',
  );
};
