import { AnalyticsRepository } from './analytics.repository';
import { prisma } from '../../config/prisma';
import { MonthlyCategorySum, MonthlyTrendPoint } from './analytics.types';

export class AnalyticsService {
  private analyticsRepository = new AnalyticsRepository();

  async getCategoryBreakdown(userId: string, dateFrom?: string, dateTo?: string): Promise<MonthlyCategorySum[]> {
    const end = dateTo ? new Date(dateTo) : new Date();
    const start = dateFrom ? new Date(dateFrom) : new Date(end.getFullYear(), end.getMonth() - 1, 1);

    const aggregates = await this.analyticsRepository.getCategoryExpenses(userId, start, end);
    const categories = await prisma.category.findMany({});

    return aggregates.map((item) => {
      const cat = categories.find((c) => c.id === item.categoryId);
      return {
        categoryId: item.categoryId,
        categoryName: cat?.name || 'Unknown',
        color: cat?.color || '#9CA3AF',
        totalSpent: item._sum.amount ? Number(item._sum.amount) : 0,
      };
    });
  }

  async getTrends(userId: string, dateFrom?: string, dateTo?: string): Promise<MonthlyTrendPoint[]> {
    const end = dateTo ? new Date(dateTo) : new Date();
    const start = dateFrom ? new Date(dateFrom) : new Date(end.getFullYear(), end.getMonth(), end.getDate() - 30);

    const transactions = await this.analyticsRepository.getTransactionsInRange(userId, start, end);

    const trendMap: Record<string, { income: number; expense: number }> = {};

    // Generate dates timeline array
    const current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      trendMap[dateStr] = { income: 0, expense: 0 };
      current.setDate(current.getDate() + 1);
    }

    for (const t of transactions) {
      const dateStr = t.date.toISOString().split('T')[0];
      if (!trendMap[dateStr]) {
        trendMap[dateStr] = { income: 0, expense: 0 };
      }
      const val = Number(t.amount);
      if (t.type === 'INCOME') {
        trendMap[dateStr].income += val;
      } else {
        trendMap[dateStr].expense += val;
      }
    }

    return Object.entries(trendMap)
      .map(([date, values]) => ({
        date,
        income: values.income,
        expense: values.expense,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async getMonthlySummary(
    userId: string,
  ): Promise<{
    thisMonth: { income: number; expense: number };
    lastMonth: { income: number; expense: number };
  }> {
    const today = new Date();

    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59);

    const [thisMonthTx, lastMonthTx] = await Promise.all([
      this.analyticsRepository.getTransactionsInRange(userId, startOfThisMonth, endOfThisMonth),
      this.analyticsRepository.getTransactionsInRange(userId, startOfLastMonth, endOfLastMonth),
    ]);

    const calcTotals = (txs: { amount: unknown; type: string }[]) => {
      let income = 0;
      let expense = 0;
      for (const t of txs) {
        const val = Number(t.amount);
        if (t.type === 'INCOME') {
          income += val;
        } else {
          expense += val;
        }
      }
      return { income, expense };
    };

    return {
      thisMonth: calcTotals(thisMonthTx),
      lastMonth: calcTotals(lastMonthTx),
    };
  }
}
