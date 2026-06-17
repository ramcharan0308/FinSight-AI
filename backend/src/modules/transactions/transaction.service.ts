import { TransactionRepository } from './transaction.repository';
import { getPaginationParams } from '../../utils/pagination';
import { CustomError } from '../../middlewares/error.middleware';
import { TransactionFilters, TransactionSummary } from './transaction.types';
import { prisma } from '../../config/prisma';
import { Transaction } from '@prisma/client';

export class TransactionService {
  private transactionRepository = new TransactionRepository();

  private async verifyCategoryExists(categoryId: string): Promise<void> {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new CustomError('Target transaction category does not exist', 400, 'CATEGORY_NOT_FOUND');
    }
  }

  private async verifyOwnership(transactionId: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findById(transactionId);
    if (!transaction) {
      throw new CustomError('Transaction record not found', 404, 'TRANSACTION_NOT_FOUND');
    }
    if (transaction.userId !== userId) {
      throw new CustomError('Unauthorized access to this ledger entry', 403, 'FORBIDDEN');
    }
    return transaction;
  }

  async getTransactions(userId: string, filters: TransactionFilters) {
    const { page, limit, skip, take } = getPaginationParams({
      page: filters.page ? Number(filters.page) : undefined,
      limit: filters.limit ? Number(filters.limit) : undefined,
    });

    const items = await this.transactionRepository.findMany(userId, filters, skip, take);
    const total = await this.transactionRepository.count(userId, filters);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async getTransactionById(id: string, userId: string): Promise<Transaction> {
    return this.verifyOwnership(id, userId);
  }

  async createTransaction(userId: string, data: { categoryId: string; amount: number; type: 'INCOME' | 'EXPENSE'; description?: string; date: string }): Promise<Transaction> {
    await this.verifyCategoryExists(data.categoryId);
    return this.transactionRepository.create({
      userId,
      categoryId: data.categoryId,
      amount: data.amount,
      type: data.type,
      description: data.description || null,
      date: new Date(data.date),
    });
  }

  async updateTransaction(id: string, userId: string, data: { categoryId?: string; amount?: number; type?: 'INCOME' | 'EXPENSE'; description?: string; date?: string }): Promise<Transaction> {
    await this.verifyOwnership(id, userId);
    
    if (data.categoryId) {
      await this.verifyCategoryExists(data.categoryId);
    }

    return this.transactionRepository.update(id, {
      categoryId: data.categoryId,
      amount: data.amount,
      type: data.type,
      description: data.description,
      date: data.date ? new Date(data.date) : undefined,
    });
  }

  async deleteTransaction(id: string, userId: string): Promise<void> {
    await this.verifyOwnership(id, userId);
    await this.transactionRepository.delete(id);
  }

  async getSummary(userId: string, dateFrom?: string, dateTo?: string): Promise<TransactionSummary> {
    const sums = await this.transactionRepository.sumGroupedByType(userId, dateFrom, dateTo);
    
    let totalIncome = 0;
    let totalExpense = 0;

    for (const group of sums) {
      const sumVal = group._sum.amount ? Number(group._sum.amount) : 0;
      if (group.type === 'INCOME') {
        totalIncome = sumVal;
      } else if (group.type === 'EXPENSE') {
        totalExpense = sumVal;
      }
    }

    return {
      totalIncome,
      totalExpense,
      netSavings: totalIncome - totalExpense,
    };
  }
}
