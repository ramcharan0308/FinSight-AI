'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { BudgetCard } from '@/components/budgets/BudgetCard';
import { BudgetModal } from '@/components/budgets/BudgetModal';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useBudgets } from '@/hooks/useBudgets';
import { Budget } from '@/types';
import { CardSkeleton } from '@/components/shared/LoadingSkeleton';
import { Plus } from 'lucide-react';

interface BudgetFormInput {
  categoryId: string;
  amount: number;
  startDate: string;
  endDate: string;
}

export default function BudgetsPage() {
  const { budgets, budgetStatuses, isLoadingBudgets, createBudget, updateBudget, deleteBudget } =
    useBudgets();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeletingModalOpen, setDeletingModalOpen] = useState(false);

  const handleCreateClick = () => {
    setEditingBudget(null);
    setModalOpen(true);
  };

  const handleEditClick = (budget: Budget) => {
    setEditingBudget(budget);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setDeletingModalOpen(true);
  };

  const handleModalSubmit = async (values: BudgetFormInput) => {
    try {
      if (editingBudget) {
        await updateBudget({ id: editingBudget.id, data: values });
      } else {
        await createBudget(values);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to submit budget:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      try {
        await deleteBudget(deletingId);
        setDeletingModalOpen(false);
        setDeletingId(null);
      } catch (error) {
        console.error('Failed to delete budget:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budgets Configurations"
        description="Set maximum spending limits per category and track progress."
        action={
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-650/10"
          >
            <Plus className="w-4 h-4" />
            Set Budget Limit
          </button>
        }
      />

      {isLoadingBudgets ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : budgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center min-h-[300px]">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            You have no budget configurations yet.
          </p>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
          >
            <Plus className="w-4 h-4" /> Create Budget
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const status = budgetStatuses.find((s) => s.categoryId === budget.categoryId);
            return (
              <BudgetCard
                key={budget.id}
                budget={budget}
                status={status}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            );
          })}
        </div>
      )}

      {/* Budget config modal form */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingBudget}
        isSubmitting={false}
      />

      {/* Delete budget check */}
      <ConfirmDialog
        isOpen={isDeletingModalOpen}
        title="Wipe Budget Limit Configuration"
        description="Are you sure you want to delete this category budget limit? Active spending overage notifications for this category will be turned off."
        confirmLabel="Remove Budget"
        isDestructive
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingModalOpen(false)}
      />
    </div>
  );
}
