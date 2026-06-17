import { Router } from 'express';
import { AIController } from './ai.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { generateSummarySchema, chatSchema } from './ai.schema';

const router = Router();
const controller = new AIController();

router.use(authMiddleware);

router.post(
  '/summary',
  validate(generateSummarySchema),
  controller.generateSummary,
);

router.post(
  '/chat',
  validate(chatSchema),
  controller.chat,
);

export const aiRoutes = router;
