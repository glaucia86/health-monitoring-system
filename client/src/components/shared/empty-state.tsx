'use client';

import { LucideIcon, FileQuestion } from 'lucide-react';
import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { fadeIn, scaleIn } from '@/lib/motion';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = FileQuestion,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <m.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
    >
      <m.div
        variants={scaleIn}
        initial="initial"
        animate="animate"
        className="flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-4"
      >
        <Icon className="h-8 w-8 text-muted-foreground" />
      </m.div>

      <h3 className="text-lg font-semibold text-foreground mb-1">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          {description}
        </p>
      )}

      {action && (
        <Button onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </m.div>
  );
}
