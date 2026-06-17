'use client';

import React from 'react';
import { Transaction } from '@/types';
import { Edit2, Trash2, Calendar, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function TransactionTable({
  transactions,
  onEdit,
  onDelete,
  page,
  totalPages,
  onPageChange,
}: TransactionTableProps) {
  const formatValue = (val: number, type: 'INCOME' | 'EXPENSE') => {
    const prefix = type === 'INCOME' ? '+' : '-';
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
    return `${prefix}${formatted}`;
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/65 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm overflow-hidden select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-850/60 text-slate-450 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/40">
              <th className="py-4 px-2 sm:px-6 font-bold uppercase tracking-wider text-[10px]">
                Date
              </th>
              <th className="py-4 px-2 sm:px-6 font-bold uppercase tracking-wider text-[10px]">
                Category
              </th>
              <th className="hidden sm:table-cell py-4 px-6 font-bold uppercase tracking-wider text-[10px]">
                Description
              </th>
              <th className="py-4 px-2 sm:px-6 font-bold uppercase tracking-wider text-[10px] text-right">
                Amount
              </th>
              <th className="py-4 px-2 sm:px-6 font-bold uppercase tracking-wider text-[10px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 font-sans">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-slate-400 dark:text-slate-500 font-semibold italic"
                >
                  No transaction records match the filters.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="group hover:bg-slate-50/30 dark:hover:bg-slate-900/30 transition-colors"
                >
                  {/* Date Column */}
                  <td className="py-4 px-2 sm:px-6 text-slate-600 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-2">
                      <Calendar className="hidden sm:block w-3.5 h-3.5 text-slate-400 opacity-60" />
                      {formatDate(tx.date)}
                    </span>
                  </td>

                  {/* Category Badge Column */}
                  <td className="py-4 px-2 sm:px-6">
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] font-black uppercase tracking-wider border"
                      style={{
                        backgroundColor: `${tx.category.color}15`,
                        color: tx.category.color,
                        borderColor: `${tx.category.color}30`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: tx.category.color }}
                      />
                      {tx.category.name}
                    </span>
                  </td>

                  {/* Description Column */}
                  <td className="hidden sm:table-cell py-4.5 px-6 text-slate-700 dark:text-slate-300 font-medium max-w-xs truncate">
                    {tx.description ? (
                      <span className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400 opacity-50" />
                        {tx.description}
                      </span>
                    ) : (
                      <span className="italic text-slate-400">No description</span>
                    )}
                  </td>

                  {/* Amount Column */}
                  <td
                    className={`py-4 px-2 sm:px-6 font-black text-right text-sm font-mono ${
                      tx.type === 'INCOME' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {formatValue(tx.amount, tx.type)}
                  </td>

                  {/* Actions Column */}
                  <td className="py-4 px-2 sm:px-6 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(tx)}
                        title="Edit entry"
                        className="p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 text-slate-550 dark:text-slate-400 shadow-sm transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(tx.id)}
                        title="Delete entry"
                        className="p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-200 dark:hover:border-rose-900/30 text-rose-500 shadow-sm transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4.5 border-t border-slate-100 dark:border-slate-850/60 text-xs">
          <span className="text-slate-500 font-bold dark:text-slate-400">
            Page <span className="font-black text-slate-900 dark:text-white">{page}</span> of{' '}
            {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-2 border border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:hover:bg-transparent shadow-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-2 border border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:hover:bg-transparent shadow-sm transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
