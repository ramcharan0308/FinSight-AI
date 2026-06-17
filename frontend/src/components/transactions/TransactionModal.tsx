import React from 'react';
import { X } from 'lucide-react';
import { Transaction } from '@/types';
import { TransactionForm } from './TransactionForm';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    categoryId: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    description?: string;
    date: string;
  }) => Promise<void>;
  initialData?: Transaction | null;
  isSubmitting: boolean;
}

export function TransactionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: TransactionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            {initialData ? 'Edit Transaction Ledger' : 'Add Transaction Ledger'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <TransactionForm
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
