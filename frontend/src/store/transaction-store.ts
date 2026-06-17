import { create } from 'zustand';

interface TransactionFilters {
  category?: string;
  type?: 'INCOME' | 'EXPENSE' | '';
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  page: number;
  limit: number;
}

interface TransactionStore {
  filters: TransactionFilters;
  setFilter: <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => void;
  resetFilters: () => void;
}

const initialFilters: TransactionFilters = {
  category: '',
  type: '',
  search: '',
  dateFrom: '',
  dateTo: '',
  page: 1,
  limit: 10,
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  filters: initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        // Reset page to 1 when search or category filter updates
        ...(key !== 'page' ? { page: 1 } : {}),
      },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));
