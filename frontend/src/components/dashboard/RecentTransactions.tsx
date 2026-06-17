import React from 'react';
import { Transaction } from '@/types';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatValue = (val: number, type: 'INCOME' | 'EXPENSE') => {
    const prefix = type === 'INCOME' ? '+' : '-';
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
    return `${prefix}${formatted}`;
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
    <div className="p-6 rounded-2xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm flex flex-col h-[380px] select-none">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Recent Ledger
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Your latest income and expense operations
          </p>
        </div>
        <Link
          href="/transactions"
          className="text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-0.5 hover:underline decoration-emerald-500/30 underline-offset-4"
        >
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex-1 mt-6 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-850/60 pr-1.5 scrollbar-thin">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center text-sm text-slate-400 font-semibold italic">
            No transactions recorded yet
          </div>
        ) : (
          transactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3.5 group hover:bg-slate-50/35 dark:hover:bg-slate-900/40 rounded-xl px-2 -mx-2 transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {/* Category colored indicator pill */}
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-900 shadow-sm flex-shrink-0"
                  style={{ backgroundColor: tx.category.color }}
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                    {tx.description || tx.category.name}
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mt-0.5">
                    {tx.category.name} • {formatDate(tx.date)}
                  </span>
                </div>
              </div>

              <span
                className={`text-sm font-black flex-shrink-0 font-mono ${
                  tx.type === 'INCOME' ? 'text-emerald-500' : 'text-slate-800 dark:text-slate-150'
                }`}
              >
                {formatValue(tx.amount, tx.type)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
