import { Router } from 'express';
import { BudgetController } from './budget.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import {
  createBudgetSchema,
  updateBudgetSchema,
  deleteBudgetSchema,
  getBudgetStatusSchema,
} from './budget.schema';

const router = Router();
const controller = new BudgetController();

router.use(authMiddleware);

router.get(
  '/',
  controller.getBudgets,
);

router.get(
  '/status',
  validate(getBudgetStatusSchema),
  controller.getBudgetStatus,
);

router.post(
  '/',
  validate(createBudgetSchema),
  controller.createBudget,
);

router.put(
  '/:id',
  validate(updateBudgetSchema),
  controller.updateBudget,
);

router.delete(
  '/:id',
  validate(deleteBudgetSchema),
  controller.deleteBudget,
);

export const budgetRoutes = router;
