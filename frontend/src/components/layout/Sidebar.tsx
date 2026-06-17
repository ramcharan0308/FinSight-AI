'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/auth-store';
import { useUIStore } from '@/store/ui-store';
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  Sparkles,
  PanelLeftClose,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import React, { useEffect, useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Budgets', href: '/budgets', icon: PiggyBank },
  { name: 'AI Chat', href: '/chat', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  const rawSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const [mounted, setMounted] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<{
    left: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
    name: string;
    isProfile?: boolean;
    isToggle?: boolean;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSidebarCollapsed = mounted ? rawSidebarCollapsed : false;
  const currentWidth = isSidebarCollapsed ? 72 : 260;

  return (
    <>
      <aside
        className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 border-r border-[#0b1747] bg-[#020B2D] select-none z-45 overflow-x-hidden"
        style={{
          width: mounted ? `${currentWidth}px` : '260px',
          transition: 'width 250ms ease',
        }}
      >
        <div className="flex flex-col flex-grow pt-6 pb-4 overflow-y-auto overflow-x-hidden">
          {/* Top Header Section */}
          <div className="mb-8 flex-shrink-0">
            {isSidebarCollapsed ? (
              // Collapsed Header State: Logo only, centered
              <div className="flex justify-center px-2">
                <button
                  onClick={() => {
                    setHoveredRect(null);
                    toggleSidebar();
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#22D3A6] to-emerald-400 text-[#020B2D] shadow-md shadow-[#22D3A6]/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex-shrink-0"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredRect({
                      left: rect.left,
                      top: rect.top,
                      bottom: rect.bottom,
                      width: rect.width,
                      height: rect.height,
                      name: 'Open Sidebar',
                    });
                  }}
                  onMouseLeave={() => setHoveredRect(null)}
                  aria-label="Open Sidebar"
                >
                  <TrendingUp className="w-5.5 h-5.5 stroke-[2.5]" />
                </button>
              </div>
            ) : (
              // Expanded Header State: Logo + Branding (left) and Collapse Button (right) on the same row
              <div className="flex items-center justify-between px-5 w-full">
                {/* Branding (left) */}
                <Link
                  href="/"
                  className="flex items-center gap-3 min-w-0 overflow-hidden group/brand"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#22D3A6] to-emerald-400 text-[#020B2D] shadow-md shadow-[#22D3A6]/20 group-hover/brand:scale-105 transition-all duration-300 flex-shrink-0">
                    <TrendingUp className="w-5.5 h-5.5 stroke-[2.5]" />
                  </div>
                  <div className="animate-fadeIn overflow-hidden whitespace-nowrap min-w-0">
                    <h1 className="text-base font-black text-white tracking-tight leading-none">
                      FinSight AI
                    </h1>
                    <span className="text-[9px] font-extrabold text-[#22D3A6] uppercase tracking-widest mt-1 block">
                      Wealth Engine
                    </span>
                  </div>
                </Link>

                {/* Collapse Button (right) */}
                <button
                  onClick={() => {
                    setHoveredRect(null);
                    toggleSidebar();
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-450 hover:text-slate-200 hover:bg-[#07133a] transition-colors cursor-pointer flex-shrink-0"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredRect({
                      left: rect.left,
                      top: rect.top,
                      bottom: rect.bottom,
                      width: rect.width,
                      height: rect.height,
                      name: 'Close Sidebar',
                      isToggle: true,
                    });
                  }}
                  onMouseLeave={() => setHoveredRect(null)}
                  aria-label="Close Sidebar"
                >
                  <PanelLeftClose className="w-5.5 h-5.5 stroke-[2.2]" />
                </button>
              </div>
            )}
          </div>

          {/* User profile card */}
          {user && (
            <div
              className={cn(
                'px-4 mb-6 transition-all relative group/profile',
                isSidebarCollapsed && 'px-2 flex justify-center',
              )}
            >
              {isSidebarCollapsed ? (
                <div
                  className="w-10 h-10 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm uppercase cursor-default flex-shrink-0"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredRect({
                      left: rect.left,
                      top: rect.top,
                      bottom: rect.bottom,
                      width: rect.width,
                      height: rect.height,
                      name: '',
                      isProfile: true,
                    });
                  }}
                  onMouseLeave={() => setHoveredRect(null)}
                >
                  {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                </div>
              ) : (
                <div className="flex items-center rounded-2xl bg-[#07133a]/40 border border-[#0b1747] shadow-sm relative group p-3.5 gap-3 overflow-x-hidden min-w-0 w-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#22D3A6]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                  <div className="w-10 h-10 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm uppercase flex-shrink-0 z-10">
                    {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                  </div>
                  <div className="overflow-hidden min-w-0 animate-fadeIn z-10">
                    <p className="text-sm font-bold truncate text-slate-200 flex items-center gap-1.5 leading-snug">
                      {user.name || 'User'}
                      <Sparkles className="w-3.5 h-3.5 text-[#22D3A6] flex-shrink-0 animate-pulse" />
                    </p>
                    <p className="text-[10px] font-semibold text-slate-500 truncate leading-none mt-1">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation list */}
          <nav
            className={cn(
              'flex-1 space-y-1 pt-2 transition-all overflow-x-hidden',
              isSidebarCollapsed ? 'px-2' : 'px-4',
            )}
          >
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center text-xs font-bold rounded-xl transition-all duration-200 uppercase tracking-wider relative min-w-0 overflow-hidden cursor-pointer',
                    isSidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3',
                    isActive
                      ? 'bg-[#0f1b4c]/80 text-[#22D3A6] border-l-2 border-[#22D3A6] shadow-sm'
                      : 'text-slate-400 hover:bg-[#07133a]/50 hover:text-slate-100',
                  )}
                  onMouseEnter={(e) => {
                    if (isSidebarCollapsed) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredRect({
                        left: rect.left,
                        top: rect.top,
                        bottom: rect.bottom,
                        width: rect.width,
                        height: rect.height,
                        name: item.name,
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredRect(null)}
                  onClick={() => setHoveredRect(null)}
                >
                  <item.icon
                    className={cn(
                      'h-4.5 w-4.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105',
                      !isSidebarCollapsed && 'mr-3.5',
                      isActive ? 'text-[#22D3A6]' : 'text-slate-400 group-hover:text-slate-300',
                    )}
                  />
                  {!isSidebarCollapsed && (
                    <span className="animate-fadeIn truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout row container */}
        <div
          className={cn(
            'flex-shrink-0 flex border-t border-[#0b1747] bg-[#07133a]/20 transition-all overflow-x-hidden',
            isSidebarCollapsed ? 'p-2 justify-center' : 'p-4',
          )}
        >
          <button
            onClick={() => {
              void logout();
            }}
            className={cn(
              'group flex items-center text-xs font-bold text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 rounded-xl uppercase tracking-wider transition-all duration-250 relative min-w-0 overflow-hidden cursor-pointer',
              isSidebarCollapsed ? 'justify-center p-3' : 'w-full px-4 py-3',
            )}
            onMouseEnter={(e) => {
              if (isSidebarCollapsed) {
                const rect = e.currentTarget.getBoundingClientRect();
                setHoveredRect({
                  left: rect.left,
                  top: rect.top,
                  bottom: rect.bottom,
                  width: rect.width,
                  height: rect.height,
                  name: 'Sign Out',
                });
              }
            }}
            onMouseLeave={() => setHoveredRect(null)}
          >
            <LogOut
              className={cn(
                'h-4.5 w-4.5 text-rose-500 transition-transform',
                !isSidebarCollapsed
                  ? 'mr-3.5 group-hover:translate-x-0.5'
                  : 'group-hover:scale-105',
              )}
            />
            {!isSidebarCollapsed && <span className="animate-fadeIn truncate">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Hover Tooltip — outside aside to prevent overflow-x-hidden clipping */}
      {hoveredRect && (
        <span
          className={cn(
            'hidden lg:flex fixed z-[210] bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-xl tracking-wider uppercase border border-slate-800 dark:border-slate-700 pointer-events-none whitespace-nowrap flex-col gap-0.5 transition-all duration-150 animate-fadeIn',
            !isSidebarCollapsed && hoveredRect.isToggle ? '-translate-x-1/2' : '-translate-y-1/2',
          )}
          style={
            !isSidebarCollapsed && hoveredRect.isToggle
              ? {
                  left: `${hoveredRect.left + hoveredRect.width / 2}px`,
                  top: `${hoveredRect.bottom + 8}px`,
                }
              : {
                  left: `${hoveredRect.left + hoveredRect.width + 12}px`,
                  top: `${hoveredRect.top + hoveredRect.height / 2}px`,
                }
          }
        >
          {hoveredRect.isProfile ? (
            <>
              <span className="text-white font-extrabold">{user?.name || 'User'}</span>
              <span className="text-slate-400 text-[9px] font-semibold lowercase">
                {user?.email}
              </span>
            </>
          ) : (
            hoveredRect.name
          )}
        </span>
      )}
    </>
  );
}
