import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/transaction.service';
import { useTransactionStore } from '@/store/transaction-store';
import { TransactionType } from '@/types';

export const useTransactions = (options?: { fetchSummary?: boolean }) => {
  const queryClient = useQueryClient();
  const filters = useTransactionStore((state) => state.filters);

  // 1. Fetch transactions list
  const transactionsQuery = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionService.getTransactions(filters),
    staleTime: 30_000,
  });

  // 2. Fetch summary calculations
  const summaryQuery = useQuery({
    queryKey: ['transactions-summary', filters.dateFrom, filters.dateTo],
    queryFn: () => transactionService.getSummary(filters.dateFrom, filters.dateTo),
    enabled: !!options?.fetchSummary,
  });

  // 3. Create mutation
  const createMutation = useMutation({
    mutationFn: (data: {
      categoryId: string;
      amount: number;
      type: TransactionType;
      description?: string;
      date: string;
    }) => transactionService.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions-summary'] });
      queryClient.invalidateQueries({ queryKey: ['budgets-status'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });

  // 4. Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        categoryId?: string;
        amount?: number;
        type?: TransactionType;
        description?: string;
        date?: string;
      };
    }) => transactionService.updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions-summary'] });
      queryClient.invalidateQueries({ queryKey: ['budgets-status'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });

  // 5. Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => transactionService.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions-summary'] });
      queryClient.invalidateQueries({ queryKey: ['budgets-status'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });

  return {
    transactions: transactionsQuery.data?.data || [],
    meta: transactionsQuery.data?.meta,
    isLoading: transactionsQuery.isLoading,
    isError: transactionsQuery.isError,
    refetch: transactionsQuery.refetch,

    summary: summaryQuery.data || { totalIncome: 0, totalExpense: 0, netSavings: 0 },
    isSummaryLoading: summaryQuery.isLoading,

    createTransaction: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateTransaction: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteTransaction: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
