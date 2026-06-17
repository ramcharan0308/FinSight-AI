'use client';

import React from 'react';
import { useToastStore, ToastType } from '@/store/toast-store';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons: Record<ToastType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles: Record<ToastType, { wrapper: string; icon: string; close: string }> = {
  success: {
    wrapper: 'border-emerald-500/30 bg-white/95 dark:bg-slate-900/95 shadow-emerald-500/5',
    icon: 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20',
    close: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200',
  },
  error: {
    wrapper: 'border-rose-500/30 bg-white/95 dark:bg-slate-900/95 shadow-rose-500/5',
    icon: 'text-rose-500 bg-rose-500/10 dark:bg-rose-500/20',
    close: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200',
  },
  warning: {
    wrapper: 'border-amber-500/30 bg-white/95 dark:bg-slate-900/95 shadow-amber-500/5',
    icon: 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/20',
    close: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200',
  },
  info: {
    wrapper: 'border-sky-500/30 bg-white/95 dark:bg-slate-900/95 shadow-sky-500/5',
    icon: 'text-sky-500 bg-sky-500/10 dark:bg-sky-500/20',
    close: 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200',
  },
};

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-md w-full sm:w-96 px-4 sm:px-0">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        const style = styles[toast.type];

        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-lg transition-all duration-300 animate-slideInRight',
              style.wrapper,
            )}
            role="alert"
          >
            <div className={cn('p-1.5 rounded-lg flex items-center justify-center', style.icon)}>
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className={cn('p-1 rounded-lg transition-colors', style.close)}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
