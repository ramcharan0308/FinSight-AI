import { Response } from 'express';

export interface SuccessResponseEnvelope<T> {
  success: true;
  data: T;
}

export interface ErrorResponseEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200): Response => {
  const envelope: SuccessResponseEnvelope<T> = {
    success: true,
    data,
  };
  return res.status(statusCode).json(envelope);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  code = 'INTERNAL_SERVER_ERROR',
  details?: unknown,
): Response => {
  const envelope: ErrorResponseEnvelope = {
    success: false,
    error: {
      code,
      message,
      details,
    },
  };
  return res.status(statusCode).json(envelope);
};
export const sendPaginated = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  totalItems: number,
  statusCode = 200,
): Response => {
  const totalPages = Math.ceil(totalItems / limit);
  return res.status(statusCode).json({
    success: true,
    data,
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  });
};
