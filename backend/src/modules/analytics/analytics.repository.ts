import { TransactionType } from '@prisma/client';
import { prisma } from '../../config/prisma';

export class AnalyticsRepository {
  async getCategoryExpenses(userId: string, startDate: Date, endDate: Date) {
    return prisma.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        type: TransactionType.EXPENSE,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });
  }

  async getTransactionsInRange(userId: string, startDate: Date, endDate: Date) {
    return prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        type: true,
        date: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}
