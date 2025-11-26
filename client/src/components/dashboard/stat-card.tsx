'use client';

import { LucideIcon } from 'lucide-react';
import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { scaleIn } from '@/lib/motion';

type TrendDirection = 'up' | 'down' | 'neutral';
type StatCardVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend?: {
    direction: TrendDirection;
    value: string;
    description?: string;
  };
  variant?: StatCardVariant;
  loading?: boolean;
  className?: string;
}

const variantStyles: Record<StatCardVariant, { iconBg: string; iconColor: string; trendColor: Record<TrendDirection, string> }> = {
  default: {
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
    trendColor: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-muted-foreground',
    },
  },
  primary: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    trendColor: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-muted-foreground',
    },
  },
  success: {
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    trendColor: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-muted-foreground',
    },
  },
  warning: {
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    trendColor: {
      up: 'text-warning',
      down: 'text-success',
      neutral: 'text-muted-foreground',
    },
  },
  danger: {
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
    trendColor: {
      up: 'text-destructive',
      down: 'text-success',
      neutral: 'text-muted-foreground',
    },
  },
};

const TrendIcon = ({ direction }: { direction: TrendDirection }) => {
  if (direction === 'up') {
    return (
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L10 6L8.5 6L8.5 10L3.5 10L3.5 6L2 6L6 2Z" fill="currentColor" />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10L2 6L3.5 6L3.5 2L8.5 2L8.5 6L10 6L6 10Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  variant = 'default',
  loading = false,
  className,
}: StatCardProps) {
  const styles = variantStyles[variant];

  if (loading) {
    return (
      <div className={cn('rounded-xl border bg-card p-6', className)}>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-8 w-24 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  return (
    <m.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        'rounded-xl border bg-card p-6 transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn('flex items-center justify-center h-10 w-10 rounded-lg', styles.iconBg)}>
          <Icon className={cn('h-5 w-5', styles.iconColor)} />
        </div>
        {trend && (
          <div className={cn('flex items-center gap-1 text-sm font-medium', styles.trendColor[trend.direction])}>
            <TrendIcon direction={trend.direction} />
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-3xl font-bold tracking-tight text-foreground">
          {value}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {trend?.description && (
          <p className="text-xs text-muted-foreground">{trend.description}</p>
        )}
      </div>
    </m.div>
  );
}
