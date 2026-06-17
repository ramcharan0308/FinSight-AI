import React from 'react';

interface BudgetProgressBarProps {
  spent: number;
  limit: number;
}

export function BudgetProgressBar({ spent, limit }: BudgetProgressBarProps) {
  const percentage = limit > 0 ? (spent / limit) * 100 : 0;
  const progress = Math.min(100, percentage);

  return (
    <div className="space-y-2.5 w-full select-none">
      <div className="flex justify-between items-baseline text-xs font-bold text-slate-450 dark:text-slate-500">
        <span>Usage Track</span>
        <span className="font-mono text-slate-900 dark:text-white">{percentage.toFixed(0)}%</span>
      </div>

      <div className="relative w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            percentage > 100
              ? 'bg-gradient-to-r from-rose-500 to-red-650 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
              : percentage > 80
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {percentage > 100 && (
        <div className="flex justify-end items-center text-[10px] font-bold text-rose-500 bg-rose-500/5 dark:bg-rose-500/[0.02] border border-rose-500/10 px-3 py-1 rounded-xl animate-fadeIn">
          <span>Overage details: +${(spent - limit).toFixed(0)}</span>
        </div>
      )}
    </div>
  );
}
