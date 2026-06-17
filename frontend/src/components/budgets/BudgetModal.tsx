import React from 'react';
import { X } from 'lucide-react';
import { Budget } from '@/types';
import { BudgetForm } from './BudgetForm';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    categoryId: string;
    amount: number;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
  initialData?: Budget | null;
  isSubmitting: boolean;
}

export function BudgetModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: BudgetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            {initialData ? 'Update Budget Configuration' : 'Create Category Budget'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <BudgetForm
          initialData={initialData}
          onSubmit={async (data) => {
            await onSubmit(data);
            onClose();
          }}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
