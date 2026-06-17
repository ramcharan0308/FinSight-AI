'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { Transaction } from '@/types';

interface CSVExportButtonProps {
  transactions: Transaction[];
}

export function CSVExportButton({ transactions }: CSVExportButtonProps) {
  const handleExport = () => {
    if (transactions.length === 0) return;

    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
    const rows = transactions.map((t) => [
      t.date.split('T')[0],
      t.type,
      t.category.name,
      t.description || '',
      t.amount.toString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        headers.join(','),
        ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      disabled={transactions.length === 0}
      className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );
}
