'use client';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export interface LoadingSkeletonProps {
  variant: 'card' | 'list' | 'text' | 'avatar' | 'stat-card';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({
  variant,
  count = 1,
  className,
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = (index: number) => {
    switch (variant) {
      case 'card':
        return (
          <div
            key={index}
            className={cn(
              'rounded-lg border bg-card p-4 space-y-3',
              className
            )}
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        );

      case 'list':
        return (
          <div
            key={index}
            className={cn(
              'flex items-center gap-4 p-4 rounded-lg border bg-card',
              className
            )}
          >
            <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
            <div className="space-y-2 flex-1 min-w-0">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20 flex-shrink-0" />
          </div>
        );

      case 'text':
        return (
          <div key={index} className={cn('space-y-2', className)}>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        );

      case 'avatar':
        return (
          <div key={index} className={cn('flex items-center gap-3', className)}>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        );

      case 'stat-card':
        return (
          <div
            key={index}
            className={cn(
              'rounded-xl border bg-card p-6 space-y-4',
              className
            )}
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (count === 1) {
    return renderSkeleton(0);
  }

  return (
    <div
      className={cn(
        variant === 'stat-card' && 'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        variant === 'list' && 'space-y-3',
        variant === 'card' && 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {items.map(renderSkeleton)}
    </div>
  );
}
