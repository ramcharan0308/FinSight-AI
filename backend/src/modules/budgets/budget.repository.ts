import { Prisma, Budget } from '@prisma/client';
import { prisma } from '../../config/prisma';

export class BudgetRepository {
  async findMany(userId: string) {
    return prisma.budget.findMany({
      where: { userId },
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
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async findById(id: string) {
    return prisma.budget.findUnique({
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

  async create(data: Prisma.BudgetUncheckedCreateInput) {
    return prisma.budget.create({
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

  async update(id: string, data: Prisma.BudgetUncheckedUpdateInput) {
    return prisma.budget.update({
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

  async delete(id: string): Promise<Budget> {
    return prisma.budget.delete({
      where: { id },
    });
  }

  async findActiveBudgets(userId: string, date: Date) {
    return prisma.budget.findMany({
      where: {
        userId,
        startDate: {
          lte: date,
        },
        endDate: {
          gte: date,
        },
      },
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
}
