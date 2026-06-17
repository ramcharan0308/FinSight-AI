import { z } from 'zod';

export const createBudgetSchema = z.object({
  body: z.object({
    categoryId: z.string().uuid('Invalid Category UUID'),
    amount: z.number().positive('Amount must be positive'),
    startDate: z.string().datetime('Invalid ISO Date format'),
    endDate: z.string().datetime('Invalid ISO Date format'),
  }),
});

export const updateBudgetSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Budget ID'),
  }),
  body: z.object({
    categoryId: z.string().uuid('Invalid Category UUID').optional(),
    amount: z.number().positive('Amount must be positive').optional(),
    startDate: z.string().datetime('Invalid ISO Date format').optional(),
    endDate: z.string().datetime('Invalid ISO Date format').optional(),
  }),
});

export const deleteBudgetSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Budget ID'),
  }),
});

export const getBudgetStatusSchema = z.object({
  query: z.object({
    date: z.string().optional(),
  }),
});
