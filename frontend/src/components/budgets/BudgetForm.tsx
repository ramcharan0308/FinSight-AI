'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCategories } from '@/hooks/useCategories';
import { Budget } from '@/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  categoryId: z.string().uuid('Please select a valid category'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface BudgetFormProps {
  initialData?: Budget | null;
  onSubmit: (data: {
    categoryId: string;
    amount: number;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function BudgetForm({ initialData, onSubmit, onCancel, isSubmitting }: BudgetFormProps) {
  const { data: categories = [] } = useCategories();

  // Default ranges: first day to last day of this month
  const today = new Date();
  const defaultStart = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split('T')[0];
  const defaultEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
      amount: initialData?.amount || undefined,
      startDate: initialData?.startDate ? initialData.startDate.split('T')[0] : defaultStart,
      endDate: initialData?.endDate ? initialData.endDate.split('T')[0] : defaultEnd,
    },
  });

  const handleFormSubmit = async (values: FormValues) => {
    const isoStart = new Date(values.startDate).toISOString();
    const isoEnd = new Date(values.endDate).toISOString();
    await onSubmit({
      ...values,
      startDate: isoStart,
      endDate: isoEnd,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Category Selection */}
      <div>
        <label
          htmlFor="categoryId"
          className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
        >
          Target Category <span className="text-rose-500">*</span>
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

      {/* Amount limit */}
      <div>
        <label
          htmlFor="amount"
          className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
        >
          Monthly Limit Amount ($) <span className="text-rose-500">*</span>
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          placeholder="500.00"
          {...register('amount')}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
        />
        {errors.amount && (
          <p className="mt-1 text-[10px] font-semibold text-rose-500">{errors.amount.message}</p>
        )}
      </div>

      {/* Start & End dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
          >
            Start Date <span className="text-rose-500">*</span>
          </label>
          <input
            id="startDate"
            type="date"
            {...register('startDate')}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
          />
          {errors.startDate && (
            <p className="mt-1 text-[10px] font-semibold text-rose-500">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5"
          >
            End Date <span className="text-rose-500">*</span>
          </label>
          <input
            id="endDate"
            type="date"
            {...register('endDate')}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs"
          />
          {errors.endDate && (
            <p className="mt-1 text-[10px] font-semibold text-rose-500">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Form Controls */}
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
          {initialData ? 'Update Limit' : 'Set Limit'}
        </button>
      </div>
    </form>
  );
}
