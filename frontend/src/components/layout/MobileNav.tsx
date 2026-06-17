'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  LayoutDashboard,
  Receipt,
  Wallet,
  SlidersHorizontal,
  LogOut,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Budgets', href: '/budgets', icon: Wallet },
  { name: 'AI Advisor', href: '/chat', icon: Sparkles },
  { name: 'Settings', href: '/settings', icon: SlidersHorizontal },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[1000] lg:hidden transition-all duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      {/* Backdrop overlay — fully opaque dark */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over drawer panel */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out overflow-x-hidden overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        style={{ width: 'min(85vw, 320px)' }}
      >
        {/* Drawer header with brand + close button */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-sm flex-shrink-0">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-lg font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tracking-tight leading-none">
                FinSight AI
              </h1>
              <span className="text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-0.5 block">
                Wealth Engine
              </span>
            </div>
          </div>
          {/* Close button — 44x44 minimum touch target */}
          <button
            onClick={onClose}
            className="flex items-center justify-center w-11 h-11 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User profile card */}
        {user && (
          <div className="px-4 py-3 flex-shrink-0">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 flex items-center justify-center font-black text-sm uppercase tracking-wide flex-shrink-0">
                {user.name ? user.name.charAt(0) : user.email.charAt(0)}
              </div>
              <div className="overflow-hidden min-w-0">
                <p className="text-sm font-bold truncate text-slate-800 dark:text-white flex items-center gap-1.5 leading-snug">
                  {user.name || 'User'}
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                </p>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate leading-none mt-0.5">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'group flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-white',
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300',
                  )}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex-shrink-0 bg-slate-50/20 dark:bg-slate-900/30">
          <button
            onClick={() => {
              onClose();
              void logout();
            }}
            className="flex items-center w-full px-4 py-3.5 text-sm font-semibold text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-rose-500 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
