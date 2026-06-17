'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 animate-pulse animate-duration-1000"
          />
        ))}
      </div>
    );
  }

  const options = [
    {
      value: 'light',
      label: 'Light Mode',
      description: 'Clean, high-contrast UI for bright environments.',
      icon: Sun,
      color:
        'text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-200/55 dark:border-amber-900/20',
      activeColor: 'ring-amber-500 border-amber-500 dark:border-amber-500',
    },
    {
      value: 'dark',
      label: 'Dark Mode',
      description: 'Elegant dark layout that is comfortable for your eyes.',
      icon: Moon,
      color: 'text-emerald-400 bg-emerald-950/20 border-emerald-900/20',
      activeColor: 'ring-emerald-500 border-emerald-500 dark:border-emerald-500',
    },
    {
      value: 'system',
      label: 'System Default',
      description: 'Syncs automatically with your operating system settings.',
      icon: Monitor,
      color:
        'text-slate-500 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800',
      activeColor: 'ring-slate-500 border-slate-500 dark:border-slate-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            className={cn(
              'group relative flex flex-col justify-between text-left p-5 rounded-2xl border bg-white dark:bg-slate-900 transition-all duration-300 outline-none',
              isActive
                ? 'border-emerald-500 ring-2 ring-emerald-500/20 dark:ring-emerald-400/10 shadow-lg shadow-emerald-500/5'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5',
            )}
          >
            <div className="flex items-start justify-between w-full mb-4">
              <div
                className={cn(
                  'p-3 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm',
                  opt.color,
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              {isActive && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20 animate-scaleIn">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{opt.label}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                {opt.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
