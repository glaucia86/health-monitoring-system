'use client';

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { m, AnimatePresence } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type AlertSeverity = 'info' | 'warning' | 'error' | 'success';

export interface AlertBannerProps {
  severity: AlertSeverity;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const severityConfig: Record<AlertSeverity, { 
  icon: typeof AlertCircle; 
  bgColor: string; 
  borderColor: string; 
  iconColor: string;
  textColor: string;
}> = {
  info: {
    icon: Info,
    bgColor: 'bg-info/10',
    borderColor: 'border-info/30',
    iconColor: 'text-info',
    textColor: 'text-info',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    iconColor: 'text-warning',
    textColor: 'text-warning',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/30',
    iconColor: 'text-destructive',
    textColor: 'text-destructive',
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
    iconColor: 'text-success',
    textColor: 'text-success',
  },
};

export function AlertBanner({
  severity,
  title,
  description,
  action,
  dismissible = false,
  onDismiss,
  className,
}: AlertBannerProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border',
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', config.iconColor)} />
      
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium', config.textColor)}>
          {title}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {action && (
          <Button
            variant="link"
            size="sm"
            onClick={action.onClick}
            className={cn('h-auto p-0 mt-2 font-medium', config.textColor)}
          >
            {action.label}
          </Button>
        )}
      </div>

      {dismissible && onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="h-6 w-6 flex-shrink-0 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </Button>
      )}
    </m.div>
  );
}

// Alert container for multiple alerts
interface AlertListProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertList({ children, className }: AlertListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </div>
  );
}
