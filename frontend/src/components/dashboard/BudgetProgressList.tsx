import React from 'react';
import { BudgetStatus } from '@/types';
import Link from 'next/link';
import { AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface BudgetProgressListProps {
  statuses: BudgetStatus[];
}

export function BudgetProgressList({ statuses }: BudgetProgressListProps) {
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm flex flex-col h-[380px] select-none">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Active Budgets
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Limit configurations and monthly spending caps
          </p>
        </div>
        <Link
          href="/budgets"
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-750 dark:hover:text-indigo-350 flex items-center gap-0.5 hover:underline decoration-indigo-500/30 underline-offset-4"
        >
          Manage <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex-1 mt-6 overflow-y-auto space-y-4.5 pr-1.5 scrollbar-thin">
        {statuses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center text-sm text-slate-400 font-semibold italic">
            No active budget configurations
          </div>
        ) : (
          statuses.slice(0, 4).map((budget) => {
            const progress = Math.min(100, budget.percentageUsed);
            const isNearLimit = budget.percentageUsed > 80 && !budget.isOverBudget;

            return (
              <div key={budget.budgetId} className="space-y-2 group">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-350">
                      {budget.categoryName}
                    </span>
                    {budget.isOverBudget ? (
                      <span className="flex items-center gap-1 text-[9px] font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <AlertCircle className="w-3 h-3 stroke-[2.5]" /> Limit Exceeded
                      </span>
                    ) : isNearLimit ? (
                      <span className="flex items-center gap-1 text-[9px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Warning
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> Healthy
                      </span>
                    )}
                  </div>

                  <span className="text-slate-450 dark:text-slate-500 font-medium">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {formatValue(budget.actualSpent)}
                    </span>{' '}
                    / {formatValue(budget.limitAmount)}
                  </span>
                </div>

                {/* Styled progress gauge track wrapper */}
                <div className="relative w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-500 group-hover:brightness-105 ${
                      budget.isOverBudget
                        ? 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.2)]'
                        : isNearLimit
                          ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.2)]'
                          : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
