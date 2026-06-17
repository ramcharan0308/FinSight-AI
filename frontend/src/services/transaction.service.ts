import { apiClient } from '@/lib/axios';
import { Transaction, TransactionType } from '@/types';

export interface GetTransactionsResponse {
  success: boolean;
  data: Transaction[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export const transactionService = {
  async getTransactions(params: {
    category?: string;
    type?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    page: number;
    limit: number;
  }): Promise<GetTransactionsResponse> {
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== ''),
    );
    const response = await apiClient.get('/transactions', { params: cleanedParams });
    return response.data;
  },

  async createTransaction(data: {
    categoryId: string;
    amount: number;
    type: TransactionType;
    description?: string;
    date: string;
  }): Promise<Transaction> {
    const response = await apiClient.post('/transactions', data);
    return response.data.data;
  },

  async updateTransaction(
    id: string,
    data: {
      categoryId?: string;
      amount?: number;
      type?: TransactionType;
      description?: string;
      date?: string;
    },
  ): Promise<Transaction> {
    const response = await apiClient.put(`/transactions/${id}`, data);
    return response.data.data;
  },

  async deleteTransaction(id: string): Promise<void> {
    await apiClient.delete(`/transactions/${id}`);
  },

  async getSummary(dateFrom?: string, dateTo?: string) {
    const params: Record<string, string> = {};
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    const response = await apiClient.get('/transactions/summary', { params });
    return response.data.data;
  },
};
