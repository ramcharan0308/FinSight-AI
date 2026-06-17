'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCategories } from '@/hooks/useCategories';
import { Transaction } from '@/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  categoryId: z.string().uuid('Please select a valid category'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  type: z.enum(['INCOME', 'EXPENSE'] as const),
  description: z.string().max(255).optional(),
  date: z.string().min(1, 'Date is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface TransactionFormProps {
  initialData?: Transaction | null;
  onSubmit: (data: {
    categoryId: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    description?: string;
    date: string;
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function TransactionForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: TransactionFormProps) {
  const { data: categories = [] } = useCategories();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
      amount: initialData?.amount || undefined,
      type: initialData?.type || 'EXPENSE',
      description: initialData?.description || '',
      date: initialData?.date
        ? initialData.date.split('T')[0]
        : new Date().toISOString().split('T')[0],
    },
  });

  const typeValue = watch('type');

  const handleFormSubmit = async (values: FormValues) => {
    // Convert date string back to ISO timestamp format
    const isoDate = new Date(values.date).toISOString();
    await onSubmit({
      ...values,
      date: isoDate,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Type Selector Toggle */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
          Flow Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['EXPENSE', 'INCOME'].map((t) => (
            <label
              key={t}
              className={`flex items-center justify-center p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                typeValue === t || (!initialData && t === 'EXPENSE')
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <input type="radio" value={t} {...register('type')} className="sr-only" />
              {t === 'INCOME' ? 'Income (+)' : 'Expense (-)'}
            </label>
          ))}
        </div>
      </div>

      {/* Amount & Date row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
          >
            Amount ($) <span className="text-rose-500">*</span>
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('amount')}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
          />
          {errors.amount && (
            <p className="mt-1 text-[10px] font-semibold text-rose-500">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
          >
            Date <span className="text-rose-500">*</span>
          </label>
          <input
            id="date"
            type="date"
            {...register('date')}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
          />
          {errors.date && (
            <p className="mt-1 text-[10px] font-semibold text-rose-500">{errors.date.message}</p>
          )}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label
          htmlFor="categoryId"
          className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
        >
          Category <span className="text-rose-500">*</span>
        </label>
        <select
          id="categoryId"
          {...register('categoryId')}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-[10px] font-semibold text-rose-500">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
        >
          Description / Memo
        </label>
        <input
          id="description"
          type="text"
          placeholder="Uber ride, electricity bill..."
          {...register('description')}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
        />
        {errors.description && (
          <p className="mt-1 text-[10px] font-semibold text-rose-500 font-medium">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 justify-end mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-650 rounded-xl transition-all shadow-md shadow-emerald-500/10 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {initialData ? 'Update Ledger' : 'Create Ledger'}
        </button>
      </div>
    </form>
  );
}
