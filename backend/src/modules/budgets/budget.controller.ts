import { Request, Response, NextFunction } from 'express';
import { BudgetService } from './budget.service';
import { sendSuccess } from '../../utils/response';

export class BudgetController {
  private budgetService = new BudgetService();

  getBudgets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const budgets = await this.budgetService.getBudgets(userId);
      sendSuccess(res, budgets, 200);
    } catch (error) {
      next(error);
    }
  };

  createBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const budget = await this.budgetService.createBudget(userId, req.body);
      sendSuccess(res, budget, 201);
    } catch (error) {
      next(error);
    }
  };

  updateBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const budgetId = req.params.id;
      const updated = await this.budgetService.updateBudget(budgetId, userId, req.body);
      sendSuccess(res, updated, 200);
    } catch (error) {
      next(error);
    }
  };

  deleteBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const budgetId = req.params.id;
      await this.budgetService.deleteBudget(budgetId, userId);
      sendSuccess(res, { message: 'Budget limit config deleted successfully' }, 200);
    } catch (error) {
      next(error);
    }
  };

  getBudgetStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const targetDate = req.query.date as string | undefined;
      const status = await this.budgetService.getBudgetStatus(userId, targetDate);
      sendSuccess(res, status, 200);
    } catch (error) {
      next(error);
    }
  };
}
