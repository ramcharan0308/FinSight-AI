import React from 'react';
import { Budget, BudgetStatus } from '@/types';
import { Edit2, Trash2, Calendar, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { BudgetProgressBar } from './BudgetProgressBar';
import { cn } from '@/lib/utils';

interface BudgetCardProps {
  budget: Budget;
  status?: BudgetStatus;
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

export function BudgetCard({ budget, status, onEdit, onDelete }: BudgetCardProps) {
  const actualSpent = status ? status.actualSpent : 0;
  const isOver = actualSpent > budget.amount;
  const percentage = budget.amount > 0 ? (actualSpent / budget.amount) * 100 : 0;
  const remaining = budget.amount - actualSpent;

  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={cn(
        'p-6 rounded-3xl border bg-white dark:bg-slate-900 flex flex-col justify-between gap-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 select-none relative overflow-hidden',
        isOver
          ? 'border-rose-500/30 dark:border-rose-500/20 shadow-sm shadow-rose-500/[0.02]'
          : 'border-slate-200/65 dark:border-slate-800/80 shadow-sm',
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Category bullet indicator */}
          <span
            className="w-3.5 h-3.5 rounded-full flex-shrink-0 border border-white dark:border-slate-900 shadow-sm"
            style={{ backgroundColor: budget.category.color }}
          />
          <div className="overflow-hidden">
            <h4 className="text-base font-extrabold text-slate-800 dark:text-white truncate flex items-center gap-2 font-sans tracking-tight leading-snug">
              {budget.category.name}
            </h4>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1 uppercase tracking-wide">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {formatDate(budget.startDate)} – {formatDate(budget.endDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Action icons row */}
        <div className="flex gap-1.5 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(budget)}
            title="Edit limit"
            className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-950 hover:border-slate-350 dark:hover:border-slate-700 text-slate-500 dark:text-slate-450 shadow-sm transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            title="Wipe configuration"
            className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-200 dark:hover:border-rose-900/30 text-rose-500 shadow-sm transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-4 pt-1.5">
        <BudgetProgressBar spent={actualSpent} limit={budget.amount} />

        <div className="flex justify-between items-center text-xs border-t border-slate-100 dark:border-slate-850/60 pt-3">
          <div className="flex items-center gap-1.5">
            {isOver ? (
              <span className="flex items-center gap-1 text-[10px] font-black text-rose-500 uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded-full">
                <AlertOctagon className="w-3 h-3 stroke-[2.5]" /> Over limit
              </span>
            ) : percentage > 80 ? (
              <span className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-full">
                Overage Warning
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> Healthy
              </span>
            )}
          </div>

          <span className="text-slate-500 font-medium">
            {remaining >= 0 ? (
              <>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">
                  {formatValue(remaining)}
                </span>{' '}
                left
              </>
            ) : (
              <>
                <span className="font-extrabold text-rose-600 dark:text-rose-400">
                  {formatValue(Math.abs(remaining))}
                </span>{' '}
                over limit
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
