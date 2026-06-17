export type UserRole = 'USER' | 'ADMIN';
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: TransactionType;
  description: string | null;
  date: string;
  category: Category;
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  startDate: string;
  endDate: string;
  category: Category;
  createdAt: string;
}

export interface BudgetStatus {
  budgetId: string;
  categoryId: string;
  categoryName: string;
  limitAmount: number;
  actualSpent: number;
  remainingAmount: number;
  percentageUsed: number;
  isOverBudget: boolean;
}

export interface MonthlyCategorySum {
  categoryId: string;
  categoryName: string;
  color: string;
  totalSpent: number;
}

export interface MonthlyTrendPoint {
  date: string;
  income: number;
  expense: number;
}

export interface MonthlySummaryResponse {
  thisMonth: { income: number; expense: number };
  lastMonth: { income: number; expense: number };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  suggestedQuestions: string[];
}

export interface AISummaryResponse {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  topCategories: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  budgetWarnings: {
    category: string;
    limit: number;
    spent: number;
    overage: number;
  }[];
  savingsRecommendations: string[];
  monthOverMonthInsights: string;
  overallSummary: string;
}
