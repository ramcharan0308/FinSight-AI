export interface SummaryRequest {
  userId: string;
  month: number;
  year: number;
}

export interface CategoryBreakdownPoint {
  category: string;
  amount: number;
  percentage: number;
}

export interface BudgetWarningPoint {
  category: string;
  limit: number;
  spent: number;
  overage: number;
}

export interface SummaryResponse {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  topCategories: CategoryBreakdownPoint[];
  budgetWarnings: BudgetWarningPoint[];
  savingsRecommendations: string[];
  monthOverMonthInsights: string;
  overallSummary: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  userId: string;
  message: string;
  conversationHistory: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  suggestedQuestions: string[];
}
