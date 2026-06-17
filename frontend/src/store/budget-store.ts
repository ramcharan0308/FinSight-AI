import { create } from 'zustand';

interface BudgetStore {
  selectedBudgetId: string | null;
  isCreateModalOpen: boolean;
  isUpdateModalOpen: boolean;
  setSelectedBudgetId: (id: string | null) => void;
  setCreateModalOpen: (open: boolean) => void;
  setUpdateModalOpen: (open: boolean) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  selectedBudgetId: null,
  isCreateModalOpen: false,
  isUpdateModalOpen: false,
  setSelectedBudgetId: (id) => set({ selectedBudgetId: id }),
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  setUpdateModalOpen: (open) => set({ isUpdateModalOpen: open }),
}));
