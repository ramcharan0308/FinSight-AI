import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middlewares/validate.middleware';
import { registerSchema, loginSchema } from './auth.schema';
import { authLimiter } from '../../middlewares/rateLimit.middleware';

const router = Router();
const controller = new AuthController();

router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  controller.register,
);

router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  controller.login,
);

export const authRoutes = router;
