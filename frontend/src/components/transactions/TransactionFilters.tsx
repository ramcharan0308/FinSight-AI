'use client';

import React from 'react';
import { useTransactionStore } from '@/store/transaction-store';
import { useCategories } from '@/hooks/useCategories';
import { Search, RotateCcw, Filter } from 'lucide-react';

export function TransactionFilters() {
  const { filters, setFilter, resetFilters } = useTransactionStore();
  const { data: categories = [] } = useCategories();

  return (
    <div className="p-5 rounded-2xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm space-y-4 select-none">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-850/60">
        <Filter className="w-4 h-4 text-emerald-500" />
        <span className="text-xs font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider">
          Filter Ledger Records
        </span>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            Search Memo
          </label>
          <div className="relative mt-1.5">
            <input
              type="text"
              placeholder="Uber ride, utilities..."
              value={filters.search || ''}
              onChange={(e) => setFilter('search', e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => setFilter('category', e.target.value)}
            className="w-full px-3 py-2.5 mt-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-semibold"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            Flow Type
          </label>
          <select
            value={filters.type || ''}
            onChange={(e) => setFilter('type', e.target.value as 'INCOME' | 'EXPENSE' | '')}
            className="w-full px-3 py-2.5 mt-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-semibold"
          >
            <option value="">All Flows</option>
            <option value="INCOME">Income (+)</option>
            <option value="EXPENSE">Expense (-)</option>
          </select>
        </div>

        {/* Date From */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            From Date
          </label>
          <div className="relative mt-1.5">
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => setFilter('dateFrom', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-semibold"
            />
          </div>
        </div>

        {/* Date To */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            To Date
          </label>
          <div className="flex gap-2 items-center mt-1.5">
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => setFilter('dateTo', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-semibold"
            />
            <button
              onClick={resetFilters}
              title="Reset all filters"
              className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-950 hover:border-slate-350 dark:hover:border-slate-700 text-slate-500 hover:text-slate-850 dark:hover:text-white shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
