'use client';

import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { slideUp } from '@/lib/motion';

interface AuthCardProps {
  /** Card title displayed at the top */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Form or content to display inside the card */
  children: React.ReactNode;
  /** Optional footer content (e.g., links to other auth pages) */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * AuthCard - Styled card wrapper for authentication forms
 * Features a clean design with subtle shadows and animations
 */
export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <m.div
      className={cn(
        'w-full space-y-6',
        className
      )}
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="text-center lg:text-left space-y-2">
        <m.h2
          className="text-2xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </m.h2>
        {description && (
          <m.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </m.p>
        )}
      </div>

      {/* Card Body */}
      <m.div
        className="bg-card border border-border/50 rounded-xl shadow-sm p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {children}
      </m.div>

      {/* Footer */}
      {footer && (
        <m.div
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {footer}
        </m.div>
      )}

      {/* Branding - Mobile Only */}
      <m.div
        className="lg:hidden text-center pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-xs text-muted-foreground">
          Sistema de Monitoramento de Saúde
        </p>
        <div className="flex items-center justify-center gap-4 mt-2 text-muted-foreground/60 text-xs">
          <span>Seguro</span>
          <span>•</span>
          <span>Confiável</span>
          <span>•</span>
          <span>Acessível</span>
        </div>
      </m.div>
    </m.div>
  );
}

export type { AuthCardProps };
