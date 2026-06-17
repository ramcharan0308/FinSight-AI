import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this page. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-rose-100 dark:border-rose-950/20 bg-rose-50/20 dark:bg-rose-950/5 text-center min-h-[300px]">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-450 mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white dark:text-slate-900 rounded-xl transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Retry Request
        </button>
      )}
    </div>
  );
}
