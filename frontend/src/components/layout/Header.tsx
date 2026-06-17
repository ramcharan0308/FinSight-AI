'use client';

import { useAuthStore } from '@/store/auth-store';
import { Menu, Sun, Moon, LogOut, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/ui-store';

export function Header() {
  const user = useAuthStore((state) => state.user);
  const themeObj = useTheme();
  const theme = themeObj.theme;
  const setTheme = themeObj.setTheme;
  const { logout } = useAuth();
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md transition-all duration-300">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 lg:hidden"
            title="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Context Header */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-slate-500 font-medium">Hello,</span>
          <span className="font-semibold text-slate-800 dark:text-white">
            {user?.name || 'Friend'}
          </span>
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            AI Enabled
          </span>
        </div>

        {/* Utility Items */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Light/Dark Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 transition-colors"
          >
            <Sun className="w-5 h-5 dark:hidden" />
            <Moon className="w-5 h-5 hidden dark:block" />
          </button>

          {/* Quick Profile Actions */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                void logout();
              }}
              className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 lg:hidden"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-400">Default Wallet</span>
              <span className="text-sm font-bold text-emerald-500">USD Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
