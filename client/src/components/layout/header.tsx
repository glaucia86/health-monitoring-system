'use client';

import { ReactNode } from 'react';
import { Menu, Search } from 'lucide-react';
import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  onMenuClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export function Header({
  title,
  showSearch = true,
  onMenuClick,
  children,
  className,
}: HeaderProps) {
  return (
    <m.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-center justify-between h-16 px-4 md:px-6',
        'bg-background/95 backdrop-blur-sm border-b border-border',
        'sticky top-0 z-40',
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>

        {/* Title */}
        {title && (
          <h1 className="text-lg font-semibold text-foreground hidden sm:block">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar */}
        {showSearch && (
          <div className="hidden md:flex relative w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-9 h-9 bg-muted/50 border-transparent focus:border-primary/50"
            />
          </div>
        )}

        {/* Header Actions (children slot) */}
        {children}
      </div>
    </m.header>
  );
}

// Header Actions Container
interface HeaderActionsProps {
  children: ReactNode;
  className?: string;
}

export function HeaderActions({ children, className }: HeaderActionsProps) {
  return (
    <div className={cn('flex items-center gap-1 md:gap-2', className)}>
      {children}
    </div>
  );
}
