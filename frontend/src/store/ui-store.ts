import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  sidebarWidth: number;
  expandedWidth: number;
  isDraggingSidebar: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarWidth: (width: number) => void;
  setExpandedWidth: (width: number) => void;
  setDraggingSidebar: (dragging: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      isMobileMenuOpen: false,
      sidebarWidth: 260,
      expandedWidth: 260,
      isDraggingSidebar: false,
      toggleSidebar: () =>
        set((state) => {
          const nextCollapsed = !state.isSidebarCollapsed;
          return {
            isSidebarCollapsed: nextCollapsed,
            sidebarWidth: nextCollapsed ? 72 : 260,
          };
        }),
      setSidebarCollapsed: (collapsed) =>
        set(() => ({
          isSidebarCollapsed: collapsed,
          sidebarWidth: collapsed ? 72 : 260,
        })),
      setSidebarWidth: (width) => set({ sidebarWidth: width }),
      setExpandedWidth: (width) => set({ expandedWidth: width }),
      setDraggingSidebar: (dragging) => set({ isDraggingSidebar: dragging }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'finsight-ui-store',
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        sidebarWidth: state.sidebarWidth,
        expandedWidth: state.expandedWidth,
      }),
    },
  ),
);
