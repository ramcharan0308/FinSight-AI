import { Request, Response, NextFunction } from 'express';
import { TransactionService } from './transaction.service';
import { sendSuccess, sendPaginated } from '../../utils/response';

export class TransactionController {
  private transactionService = new TransactionService();

  getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { items, total, page, limit } = await this.transactionService.getTransactions(userId, req.query);
      sendPaginated(res, items, page, limit, total);
    } catch (error) {
      next(error);
    }
  };

  createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const transaction = await this.transactionService.createTransaction(userId, req.body);
      sendSuccess(res, transaction, 201);
    } catch (error) {
      next(error);
    }
  };

  updateTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const transactionId = req.params.id;
      const updated = await this.transactionService.updateTransaction(transactionId, userId, req.body);
      sendSuccess(res, updated, 200);
    } catch (error) {
      next(error);
    }
  };

  deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const transactionId = req.params.id;
      await this.transactionService.deleteTransaction(transactionId, userId);
      sendSuccess(res, { message: 'Transaction record deleted successfully' }, 200);
    } catch (error) {
      next(error);
    }
  };

  getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { dateFrom, dateTo } = req.query as { dateFrom?: string; dateTo?: string };
      const summary = await this.transactionService.getSummary(userId, dateFrom, dateTo);
      sendSuccess(res, summary, 200);
    } catch (error) {
      next(error);
    }
  };
}
