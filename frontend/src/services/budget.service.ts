import { apiClient } from '@/lib/axios';
import { Budget, BudgetStatus } from '@/types';

export const budgetService = {
  async getBudgets(): Promise<Budget[]> {
    const response = await apiClient.get('/budgets');
    return response.data.data;
  },

  async createBudget(data: {
    categoryId: string;
    amount: number;
    startDate: string;
    endDate: string;
  }): Promise<Budget> {
    const response = await apiClient.post('/budgets', data);
    return response.data.data;
  },

  async updateBudget(
    id: string,
    data: {
      categoryId?: string;
      amount?: number;
      startDate?: string;
      endDate?: string;
    },
  ): Promise<Budget> {
    const response = await apiClient.put(`/budgets/${id}`, data);
    return response.data.data;
  },

  async deleteBudget(id: string): Promise<void> {
    await apiClient.delete(`/budgets/${id}`);
  },

  async getBudgetStatus(date?: string): Promise<BudgetStatus[]> {
    const params: Record<string, string> = {};
    if (date) params.date = date;
    const response = await apiClient.get('/budgets/status', { params });
    return response.data.data;
  },
};
