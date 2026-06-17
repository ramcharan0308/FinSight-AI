import { Router } from 'express';
import { TransactionController } from './transaction.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import {
  createTransactionSchema,
  updateTransactionSchema,
  getTransactionsSchema,
  deleteTransactionSchema,
  getTransactionSummarySchema,
} from './transaction.schema';

const router = Router();
const controller = new TransactionController();

router.use(authMiddleware);

router.get(
  '/',
  validate(getTransactionsSchema),
  controller.getTransactions,
);

router.get(
  '/summary',
  validate(getTransactionSummarySchema),
  controller.getSummary,
);

router.post(
  '/',
  validate(createTransactionSchema),
  controller.createTransaction,
);

router.put(
  '/:id',
  validate(updateTransactionSchema),
  controller.updateTransaction,
);

router.delete(
  '/:id',
  validate(deleteTransactionSchema),
  controller.deleteTransaction,
);

export const transactionRoutes = router;
