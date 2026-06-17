import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetService } from '@/services/budget.service';

export const useBudgets = (statusDate?: string) => {
  const queryClient = useQueryClient();

  const budgetsQuery = useQuery({
    queryKey: ['budgets'],
    queryFn: () => budgetService.getBudgets(),
    staleTime: 30_000,
  });

  const budgetStatusQuery = useQuery({
    queryKey: ['budgets-status', statusDate],
    queryFn: () => budgetService.getBudgetStatus(statusDate),
    staleTime: 30_000,
  });

  const createMutation = useMutation({
    mutationFn: (data: {
      categoryId: string;
      amount: number;
      startDate: string;
      endDate: string;
    }) => budgetService.createBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['budgets-status'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        categoryId?: string;
        amount?: number;
        startDate?: string;
        endDate?: string;
      };
    }) => budgetService.updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['budgets-status'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => budgetService.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['budgets-status'] });
    },
  });

  return {
    budgets: budgetsQuery.data || [],
    isLoadingBudgets: budgetsQuery.isLoading,

    budgetStatuses: budgetStatusQuery.data || [],
    isLoadingStatus: budgetStatusQuery.isLoading,

    createBudget: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateBudget: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteBudget: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
