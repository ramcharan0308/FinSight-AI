import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service';
import { sendSuccess } from '../../utils/response';

export class AnalyticsController {
  private analyticsService = new AnalyticsService();

  getMonthly = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const data = await this.analyticsService.getMonthlySummary(userId);
      sendSuccess(res, data, 200);
    } catch (error) {
      next(error);
    }
  };

  getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { dateFrom, dateTo } = req.query as { dateFrom?: string; dateTo?: string };
      const data = await this.analyticsService.getCategoryBreakdown(userId, dateFrom, dateTo);
      sendSuccess(res, data, 200);
    } catch (error) {
      next(error);
    }
  };

  getTrends = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { dateFrom, dateTo } = req.query as { dateFrom?: string; dateTo?: string };
      const data = await this.analyticsService.getTrends(userId, dateFrom, dateTo);
      sendSuccess(res, data, 200);
    } catch (error) {
      next(error);
    }
  };
}
