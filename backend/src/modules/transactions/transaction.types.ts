import { TransactionType } from '@prisma/client';

export interface TransactionFilters {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
  search?: string;
  page?: string;
  limit?: string;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
}
