import { Prisma, Transaction } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { TransactionFilters } from './transaction.types';

export class TransactionRepository {
  private buildWhereClause(userId: string, filters: TransactionFilters): Prisma.TransactionWhereInput {
    const where: Prisma.TransactionWhereInput = { userId };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.category) {
      where.category = {
        name: {
          equals: filters.category,
          mode: 'insensitive',
        },
      };
    }

    if (filters.dateFrom || filters.dateTo) {
      const dateFilter: Prisma.DateTimeFilter = {};
      if (filters.dateFrom) {
        dateFilter.gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        dateFilter.lte = new Date(filters.dateTo);
      }
      where.date = dateFilter;
    }

    if (filters.search) {
      where.description = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }

    return where;
  }

  async findMany(
    userId: string,
    filters: TransactionFilters,
    skip: number,
    take: number,
  ): Promise<Transaction[]> {
    const where = this.buildWhereClause(userId, filters);
    return prisma.transaction.findMany({
      where,
      skip,
      take,
      orderBy: {
        date: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
      },
    });
  }

  async count(userId: string, filters: TransactionFilters): Promise<number> {
    const where = this.buildWhereClause(userId, filters);
    return prisma.transaction.count({ where });
  }

  async findById(id: string): Promise<Transaction | null> {
    return prisma.transaction.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction> {
    return prisma.transaction.create({
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.TransactionUncheckedUpdateInput): Promise<Transaction> {
    return prisma.transaction.update({
      where: { id },
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<Transaction> {
    return prisma.transaction.delete({
      where: { id },
    });
  }

  async sumGroupedByType(
    userId: string,
    dateFrom?: string,
    dateTo?: string,
  ): Promise<any[]> {
    const where: Prisma.TransactionWhereInput = { userId };

    if (dateFrom || dateTo) {
      const dateFilter: Prisma.DateTimeFilter = {};
      if (dateFrom) {
        dateFilter.gte = new Date(dateFrom);
      }
      if (dateTo) {
        dateFilter.lte = new Date(dateTo);
      }
      where.date = dateFilter;
    }

    return prisma.transaction.groupBy({
      by: ['type'],
      where,
      _sum: {
        amount: true,
      },
    }) as any;
  }
}
