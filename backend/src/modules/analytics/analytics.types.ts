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
