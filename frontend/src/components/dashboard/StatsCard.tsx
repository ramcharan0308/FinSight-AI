import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'savings';
  change?: number;
}

export function StatsCard({ title, value, type, change }: StatsCardProps) {
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getDetails = () => {
    switch (type) {
      case 'income':
        return {
          icon: ArrowUpRight,
          colorClass:
            'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/10 dark:border-emerald-400/10',
          badgeClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400',
        };
      case 'expense':
        return {
          icon: ArrowDownRight,
          colorClass:
            'text-rose-500 bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/10 dark:border-rose-400/10',
          badgeClass: 'text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400',
        };
      case 'savings':
        return {
          icon: Wallet,
          colorClass:
            'text-indigo-650 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/10 dark:border-indigo-400/10',
          badgeClass: 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400',
        };
    }
  };

  const { icon: Icon, colorClass, badgeClass } = getDetails();

  return (
    <div className="group relative p-4 md:p-6 rounded-2xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100/50 dark:hover:shadow-none hover:-translate-y-0.5 select-none overflow-hidden">
      {/* Subtle top light overlay glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-200/40 dark:via-slate-800/60 to-transparent" />

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            {title}
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1 transition-all group-hover:scale-[1.01]">
            {formatValue(value)}
          </h3>
        </div>

        <div
          className={cn(
            'flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-xl border shadow-sm transition-transform duration-300 group-hover:scale-105',
            colorClass,
          )}
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5 stroke-[2.2]" />
        </div>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-2 mt-3 md:mt-4 pt-2.5 md:pt-3 border-t border-slate-100 dark:border-slate-850/60 text-xs">
          <div
            className={cn(
              'flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold text-[10px]',
              badgeClass,
            )}
          >
            {change >= 0 ? '+' : ''}
            {change.toFixed(1)}%
          </div>
          <span className="text-slate-450 dark:text-slate-500 font-medium">vs last month</span>
        </div>
      )}
    </div>
  );
}
