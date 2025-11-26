/**
 * UI State Store for Health Monitoring System
 * 
 * Manages global UI state including sidebar collapse, theme, and mobile menu.
 * Uses Zustand with persist middleware for localStorage persistence.
 * 
 * Usage:
 * import { useUIStore, useSidebar, useTheme } from '@/stores/ui.store';
 * 
 * const { collapsed, toggle } = useSidebar();
 * const { theme, setTheme } = useTheme();
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

export interface Notification {
  id: string;
  type: 'appointment' | 'medication' | 'alert' | 'info';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface UIState {
  // Sidebar state
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  
  // Theme state
  theme: Theme;
  
  // Notification panel
  notificationPanelOpen: boolean;
  
  // Notifications list
  notifications: Notification[];
  
  // Command palette (for future use)
  commandPaletteOpen: boolean;
}

interface UIActions {
  // Sidebar actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setSidebarMobileOpen: (open: boolean) => void;
  toggleSidebarMobile: () => void;
  
  // Theme actions
  setTheme: (theme: Theme) => void;
  
  // Notification panel actions
  setNotificationPanelOpen: (open: boolean) => void;
  toggleNotificationPanel: () => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  
  // Command palette actions
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  
  // Reset
  reset: () => void;
}

const initialState: UIState = {
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  theme: 'system',
  notificationPanelOpen: false,
  notifications: [],
  commandPaletteOpen: false,
};

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Sidebar actions
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
      toggleSidebarMobile: () => set((state) => ({ sidebarMobileOpen: !state.sidebarMobileOpen })),
      
      // Theme actions
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        applyTheme(theme);
      },
      
      // Notification panel actions
      setNotificationPanelOpen: (open) => set({ notificationPanelOpen: open }),
      toggleNotificationPanel: () => 
        set((state) => ({ notificationPanelOpen: !state.notificationPanelOpen })),
      
      // Notification actions
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: crypto.randomUUID(),
            read: false,
            createdAt: new Date(),
          },
          ...state.notifications,
        ],
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      })),
      clearNotifications: () => set({ notifications: [] }),
      
      // Command palette actions
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      toggleCommandPalette: () => 
        set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      
      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        // Apply theme on rehydration
        if (state?.theme) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

/**
 * Apply theme to document root
 */
function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  root.classList.remove('light', 'dark');
  
  if (theme === 'system') {
    root.classList.add(systemPrefersDark ? 'dark' : 'light');
  } else {
    root.classList.add(theme);
  }
}

/**
 * Initialize theme on app load (call in layout.tsx useEffect)
 */
export function initializeTheme(): void {
  const state = useUIStore.getState();
  applyTheme(state.theme);
  
  // Listen for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (useUIStore.getState().theme === 'system') {
        applyTheme('system');
      }
    });
  }
}

// ============================================================================
// Convenience Hooks
// ============================================================================

/**
 * Sidebar state and actions
 */
export function useSidebar() {
  const collapsed = useUIStore((state) => state.sidebarCollapsed);
  const mobileOpen = useUIStore((state) => state.sidebarMobileOpen);
  const setCollapsed = useUIStore((state) => state.setSidebarCollapsed);
  const toggle = useUIStore((state) => state.toggleSidebar);
  const setMobileOpen = useUIStore((state) => state.setSidebarMobileOpen);
  const toggleMobile = useUIStore((state) => state.toggleSidebarMobile);
  
  return {
    collapsed,
    mobileOpen,
    setCollapsed,
    toggle,
    setMobileOpen,
    toggleMobile,
  };
}

/**
 * Theme state and actions
 */
export function useTheme() {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);
  
  return {
    theme,
    setTheme,
    isDark: theme === 'dark' || 
      (theme === 'system' && 
        typeof window !== 'undefined' && 
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
}

/**
 * Notification panel state and actions
 */
export function useNotificationPanel() {
  const open = useUIStore((state) => state.notificationPanelOpen);
  const setOpen = useUIStore((state) => state.setNotificationPanelOpen);
  const toggle = useUIStore((state) => state.toggleNotificationPanel);
  
  return { open, setOpen, toggle };
}

/**
 * Command palette state and actions
 */
export function useCommandPalette() {
  const open = useUIStore((state) => state.commandPaletteOpen);
  const setOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const toggle = useUIStore((state) => state.toggleCommandPalette);
  
  return { open, setOpen, toggle };
}
