import { prisma } from '../../config/prisma';

export class AIRepository {
  async getTransactionsForMonth(userId: string, year: number, month: number) {
    const start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const end = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    return prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      include: {
        category: {
          select: { name: true },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async getBudgetsForUser(userId: string) {
    return prisma.budget.findMany({
      where: { userId },
      include: {
        category: {
          select: { name: true },
        },
      },
    });
  }

  async getThreeMonthTransactions(userId: string) {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return prisma.transaction.findMany({
      where: {
        userId,
        date: { gte: threeMonthsAgo },
      },
      include: {
        category: {
          select: { name: true },
        },
      },
      orderBy: { date: 'desc' },
    });
  }
}
