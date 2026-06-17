'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';

import { useUIStore } from '@/store/ui-store';
import { MobileNav } from '@/components/layout/MobileNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const initialize = useAuthStore((state) => state.initialize);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initialize();
    setLoading(false);
    setMounted(true);
  }, [initialize]);

  const currentWidth = mounted ? (isSidebarCollapsed ? 72 : 260) : 260;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Securing your session...</p>
        </div>
      </div>
    );
  }

  const layoutStyle = {
    '--sidebar-width': `${currentWidth}px`,
    transition: 'padding-left 250ms ease',
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 flex overflow-x-hidden max-w-full">
      <Sidebar />
      <div
        className="flex-grow flex flex-col min-h-screen min-w-0 max-w-full overflow-x-hidden lg:pl-[var(--sidebar-width)]"
        style={layoutStyle}
      >
        <Header />
        <main className="flex-1 p-4 md:p-8 lg:p-10 xl:p-12 overflow-y-auto overflow-x-hidden max-w-full">
          <div className="max-w-7xl mx-auto w-full overflow-x-hidden">{children}</div>
        </main>
      </div>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  );
}
