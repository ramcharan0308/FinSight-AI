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
