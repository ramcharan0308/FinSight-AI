import { z } from 'zod';

export const generateSummarySchema = z.object({
  body: z.object({
    month: z.coerce.number().min(1, 'Month must be between 1 and 12').max(12, 'Month must be between 1 and 12'),
    year: z.coerce.number().min(2000, 'Year must be after 2000').max(2100, 'Year must be before 2100'),
  }),
});

export const chatSchema = z.object({
  body: z.object({
    message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message cannot exceed 1000 characters'),
    conversationHistory: z
      .array(
        z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string().min(1, 'Content cannot be empty'),
        }),
      )
      .default([]),
  }),
});
