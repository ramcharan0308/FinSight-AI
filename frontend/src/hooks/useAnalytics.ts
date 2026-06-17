import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analytics.service';

export const useAnalytics = (dateFrom?: string, dateTo?: string) => {
  const monthlySummaryQuery = useQuery({
    queryKey: ['analytics-monthly-summary'],
    queryFn: () => analyticsService.getMonthlySummary(),
    staleTime: 30_000,
  });

  const categoriesQuery = useQuery({
    queryKey: ['analytics-categories', dateFrom, dateTo],
    queryFn: () => analyticsService.getCategoryBreakdown(dateFrom, dateTo),
    staleTime: 30_000,
  });

  const trendsQuery = useQuery({
    queryKey: ['analytics-trends', dateFrom, dateTo],
    queryFn: () => analyticsService.getTrends(dateFrom, dateTo),
    staleTime: 30_000,
  });

  return {
    monthlySummary: monthlySummaryQuery.data || null,
    isLoadingSummary: monthlySummaryQuery.isLoading,

    categoryBreakdowns: categoriesQuery.data || [],
    isLoadingCategories: categoriesQuery.isLoading,

    trends: trendsQuery.data || [],
    isLoadingTrends: trendsQuery.isLoading,
  };
};
