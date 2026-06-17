import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Provide a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    name: z.string().min(1, 'Name is required').max(100).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Provide a valid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});
