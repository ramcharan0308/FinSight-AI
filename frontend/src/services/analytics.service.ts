import { apiClient } from '@/lib/axios';
import { MonthlySummaryResponse, MonthlyCategorySum, MonthlyTrendPoint } from '@/types';

export const analyticsService = {
  async getMonthlySummary(): Promise<MonthlySummaryResponse> {
    const response = await apiClient.get('/analytics/monthly');
    return response.data.data;
  },

  async getCategoryBreakdown(dateFrom?: string, dateTo?: string): Promise<MonthlyCategorySum[]> {
    const params: Record<string, string> = {};
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    const response = await apiClient.get('/analytics/categories', { params });
    return response.data.data;
  },

  async getTrends(dateFrom?: string, dateTo?: string): Promise<MonthlyTrendPoint[]> {
    const params: Record<string, string> = {};
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    const response = await apiClient.get('/analytics/trends', { params });
    return response.data.data;
  },
};
