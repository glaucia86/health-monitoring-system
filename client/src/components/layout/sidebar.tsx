'use client';

import { createContext, useContext, ReactNode } from 'react';
import { m, AnimatePresence } from '@/lib/motion-provider';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
// Motion variants available in @/lib/motion if needed

// Sidebar Context
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar');
  }
  return {
    ...context,
    toggle: () => context.setCollapsed(!context.collapsed),
  };
}

// Sidebar Props
export interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  className?: string;
  children: ReactNode;
}

// Main Sidebar Component
export function Sidebar({
  collapsed = false,
  onCollapse,
  className,
  children,
}: SidebarProps) {
  const setCollapsed = (value: boolean) => {
    onCollapse?.(value);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <TooltipProvider delayDuration={0}>
        <m.aside
          initial={false}
          animate={{ width: collapsed ? 72 : 280 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cn(
            'flex flex-col h-full bg-card border-r border-border',
            'relative overflow-hidden',
            className
          )}
        >
          {children}

          {/* Collapse Toggle Button */}
          <div className="absolute top-20 -right-3 z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCollapsed(!collapsed)}
                  className="h-6 w-6 rounded-full bg-background border shadow-sm hover:bg-muted"
                  aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
                >
                  {collapsed ? (
                    <ChevronRight className="h-3 w-3" />
                  ) : (
                    <ChevronLeft className="h-3 w-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {collapsed ? 'Expandir menu' : 'Recolher menu'}
              </TooltipContent>
            </Tooltip>
          </div>
        </m.aside>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

// Sidebar Header
interface SidebarHeaderProps {
  className?: string;
}

export function SidebarHeader({ className }: SidebarHeaderProps) {
  const { collapsed } = useSidebar();

  return (
    <div className={cn('flex items-center h-16 px-4 border-b border-border', className)}>
      <m.div
        className="flex items-center gap-3"
        animate={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
          <Heart className="h-5 w-5 text-primary" />
        </div>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <m.div
              key="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col"
            >
              <span className="font-semibold text-foreground leading-tight">
                CareMonitor
              </span>
              <span className="text-xs text-muted-foreground">
                Cuidados com amor
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}

// Sidebar Navigation Container
interface SidebarNavProps {
  children: ReactNode;
  className?: string;
}

export function SidebarNav({ children, className }: SidebarNavProps) {
  return (
    <nav className={cn('flex-1 overflow-y-auto py-4 px-3', className)}>
      <div className="space-y-1">{children}</div>
    </nav>
  );
}

// Sidebar Section (for grouping nav items)
interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  const { collapsed } = useSidebar();

  return (
    <div className={cn('py-2', className)}>
      {title && !collapsed && (
        <h4 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h4>
      )}
      {title && collapsed && <Separator className="my-2" />}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

// Sidebar Footer
interface SidebarFooterProps {
  children?: ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  const { collapsed } = useSidebar();

  return (
    <div className={cn('border-t border-border p-3', className)}>
      {children || (
        <div className={cn('text-center', collapsed && 'px-0')}>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <m.p
                key="footer-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground"
              >
                © 2025 CareMonitor
              </m.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
