'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Pill, 
  MessageCircle, 
  FileText, 
  FlaskConical,
  ClipboardList,
  Bell as BellIcon
} from 'lucide-react';
import { m, AnimatePresence } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { useUIStore, initializeTheme } from '@/stores/ui.store';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarNav, 
  SidebarSection, 
  SidebarFooter 
} from './sidebar';
import { SidebarNavItem } from './sidebar-nav-item';
import { Header, HeaderActions } from './header';
import { UserMenu } from './user-menu';
import { NotificationBell } from './notification-bell';
import { ThemeToggle } from './theme-toggle';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { pageTransition } from '@/lib/motion';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

// Navigation configuration
const mainNavItems = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    href: '/dashboard' 
  },
  { 
    icon: Calendar, 
    label: 'Consultas', 
    href: '/appointments',
    badge: 2 
  },
  { 
    icon: Pill, 
    label: 'Medicamentos', 
    href: '/medications' 
  },
  { 
    icon: FlaskConical, 
    label: 'Exames', 
    href: '/exams' 
  },
  { 
    icon: ClipboardList, 
    label: 'Prontuário', 
    href: '/intakes' 
  },
  { 
    icon: FileText, 
    label: 'Documentos', 
    href: '/documents' 
  },
];

const supportNavItems = [
  { 
    icon: MessageCircle, 
    label: 'Chat com IA', 
    href: '/chat' 
  },
  { 
    icon: BellIcon, 
    label: 'Lembretes', 
    href: '/notifications' 
  },
];

export function MainLayout({
  children,
  title,
  showSearch = true,
  showNotifications = true,
}: MainLayoutProps) {
  const pathname = usePathname();
  const { 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    sidebarMobileOpen, 
    setSidebarMobileOpen 
  } = useUIStore();

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setSidebarMobileOpen(false);
  }, [pathname, setSidebarMobileOpen]);

  // Desktop sidebar content
  const sidebarContent = (
    <>
      <SidebarHeader />
      <SidebarNav>
        <SidebarSection title="Principal">
          {mainNavItems.map((item) => (
            <SidebarNavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              badge={item.badge}
              collapsed={sidebarCollapsed}
            />
          ))}
        </SidebarSection>
        <SidebarSection title="Suporte">
          {supportNavItems.map((item) => (
            <SidebarNavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              collapsed={sidebarCollapsed}
            />
          ))}
        </SidebarSection>
      </SidebarNav>
      <SidebarFooter>
        <div className={cn(
          'flex items-center',
          sidebarCollapsed ? 'justify-center' : 'justify-between px-2'
        )}>
          <ThemeToggle variant={sidebarCollapsed ? 'compact' : 'icon'} />
          {!sidebarCollapsed && (
            <span className="text-xs text-muted-foreground">
              © 2025 CareMonitor
            </span>
          )}
        </div>
      </SidebarFooter>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        >
          {sidebarContent}
        </Sidebar>
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={sidebarMobileOpen} onOpenChange={setSidebarMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar collapsed={false} className="border-0">
            {sidebarContent}
          </Sidebar>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          title={title}
          showSearch={showSearch}
          onMenuClick={() => setSidebarMobileOpen(true)}
        >
          <HeaderActions>
            {showNotifications && <NotificationBell />}
            <UserMenu />
          </HeaderActions>
        </Header>

        {/* Page Content */}
        <main id="main-content" className="flex-1 overflow-y-auto" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <m.div
              key={pathname}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full"
            >
              <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl h-full">
                {children}
              </div>
            </m.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
