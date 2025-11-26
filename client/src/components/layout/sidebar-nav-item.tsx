'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
  active?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
}

export function SidebarNavItem({
  icon: Icon,
  label,
  href,
  badge,
  active: activeProp,
  disabled = false,
  collapsed = false,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = activeProp ?? pathname === href;

  const content = (
    <m.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
        'cursor-pointer select-none',
        collapsed && 'justify-center px-3',
        isActive && 'bg-primary/10 text-primary border-l-2 border-primary',
        !isActive && !disabled && 'hover:bg-muted text-muted-foreground hover:text-foreground',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-primary')} />
      
      {!collapsed && (
        <>
          <span className="flex-1 text-sm font-medium truncate">{label}</span>
          {badge !== undefined && badge > 0 && (
            <Badge 
              variant={isActive ? 'default' : 'secondary'} 
              className="ml-auto h-5 min-w-[20px] flex items-center justify-center text-xs"
            >
              {badge > 99 ? '99+' : badge}
            </Badge>
          )}
        </>
      )}
    </m.div>
  );

  if (disabled) {
    return collapsed ? (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <p>{label} (desabilitado)</p>
        </TooltipContent>
      </Tooltip>
    ) : (
      content
    );
  }

  const linkElement = (
    <Link href={href} className="block">
      {content}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <div className="flex items-center gap-2">
            <p>{label}</p>
            {badge !== undefined && badge > 0 && (
              <Badge variant="secondary" className="h-5 min-w-[20px]">
                {badge > 99 ? '99+' : badge}
              </Badge>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkElement;
}
