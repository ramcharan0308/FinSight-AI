import { BudgetRepository } from './budget.repository';
import { CustomError } from '../../middlewares/error.middleware';
import { BudgetStatus } from './budget.types';
import { prisma } from '../../config/prisma';

export class BudgetService {
  private budgetRepository = new BudgetRepository();

  private async verifyCategoryExists(categoryId: string): Promise<void> {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new CustomError('Target category for budget limit does not exist', 400, 'CATEGORY_NOT_FOUND');
    }
  }

  private async verifyOwnership(budgetId: string, userId: string) {
    const budget = await this.budgetRepository.findById(budgetId);
    if (!budget) {
      throw new CustomError('Budget record not found', 404, 'BUDGET_NOT_FOUND');
    }
    if (budget.userId !== userId) {
      throw new CustomError('Unauthorized access to this budget limit configuration', 403, 'FORBIDDEN');
    }
    return budget;
  }

  async getBudgets(userId: string) {
    return this.budgetRepository.findMany(userId);
  }

  async createBudget(userId: string, data: { categoryId: string; amount: number; startDate: string; endDate: string }) {
    await this.verifyCategoryExists(data.categoryId);
    return this.budgetRepository.create({
      userId,
      categoryId: data.categoryId,
      amount: data.amount,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  }

  async updateBudget(id: string, userId: string, data: { categoryId?: string; amount?: number; startDate?: string; endDate?: string }) {
    await this.verifyOwnership(id, userId);

    if (data.categoryId) {
      await this.verifyCategoryExists(data.categoryId);
    }

    return this.budgetRepository.update(id, {
      categoryId: data.categoryId,
      amount: data.amount,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });
  }

  async deleteBudget(id: string, userId: string): Promise<void> {
    await this.verifyOwnership(id, userId);
    await this.budgetRepository.delete(id);
  }

  async getBudgetStatus(userId: string, targetDateStr?: string): Promise<BudgetStatus[]> {
    const targetDate = targetDateStr ? new Date(targetDateStr) : new Date();
    
    // 1. Fetch active budgets for current window
    const activeBudgets = await this.budgetRepository.findActiveBudgets(userId, targetDate);

    if (activeBudgets.length === 0) {
      return [];
    }

    // 2. Fetch total actual expense per category in a SINGLE query (not N+1)
    const categoryIds = activeBudgets.map((b) => b.categoryId);

    // Single groupBy aggregation for all budget categories at once
    const expenseGroups = await prisma.transaction.groupBy({
      by: ['categoryId'],
      _sum: { amount: true },
      where: {
        userId,
        categoryId: { in: categoryIds },
        type: 'EXPENSE',
        date: {
          gte: new Date(
            Math.min(...activeBudgets.map((b) => b.startDate.getTime())),
          ),
          lte: new Date(
            Math.max(...activeBudgets.map((b) => b.endDate.getTime())),
          ),
        },
      },
    });

    const expenseMap = new Map(
      expenseGroups.map((g) => [g.categoryId, Number(g._sum.amount) || 0]),
    );

    const results: BudgetStatus[] = activeBudgets.map((budget) => {
      const actualSpent = expenseMap.get(budget.categoryId) || 0;
      const limitAmount = Number(budget.amount);
      const remainingAmount = limitAmount - actualSpent;
      const percentageUsed = limitAmount > 0 ? (actualSpent / limitAmount) * 100 : 0;

      return {
        budgetId: budget.id,
        categoryId: budget.categoryId,
        categoryName: budget.category.name,
        limitAmount,
        actualSpent,
        remainingAmount,
        percentageUsed,
        isOverBudget: actualSpent > limitAmount,
      };
    });

    return results;
  }
}
