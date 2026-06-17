import { z } from 'zod';
import { TransactionType } from '@prisma/client';

export const createTransactionSchema = z.object({
  body: z.object({
    categoryId: z.string().uuid('Invalid Category UUID'),
    amount: z.number().positive('Amount must be positive'),
    type: z.nativeEnum(TransactionType),
    description: z.string().max(255).optional(),
    date: z.string().datetime('Invalid ISO Date format'),
  }),
});

export const updateTransactionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Transaction ID'),
  }),
  body: z.object({
    categoryId: z.string().uuid('Invalid Category UUID').optional(),
    amount: z.number().positive('Amount must be positive').optional(),
    type: z.nativeEnum(TransactionType).optional(),
    description: z.string().max(255).optional(),
    date: z.string().datetime('Invalid ISO Date format').optional(),
  }),
});

export const getTransactionsSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    type: z.nativeEnum(TransactionType).optional(),
    search: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const deleteTransactionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Transaction ID'),
  }),
});
export const getTransactionSummarySchema = z.object({
  query: z.object({
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
  }),
});
