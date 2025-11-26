'use client';

import { m, AnimatePresence } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export interface TypingIndicatorProps {
  visible: boolean;
  className?: string;
}

export function TypingIndicator({ visible, className }: TypingIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={cn('flex items-start gap-3', className)}
        >
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((index) => (
                <m.span
                  key={index}
                  className="h-2 w-2 rounded-full bg-muted-foreground/50"
                  animate={{
                    y: [-2, 2, -2],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
