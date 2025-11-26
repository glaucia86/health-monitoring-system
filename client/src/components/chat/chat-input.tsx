'use client';

import { useRef, useEffect, KeyboardEvent } from 'react';
import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onAttach?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
  className?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onAttach,
  placeholder = 'Digite sua mensagem...',
  disabled = false,
  loading = false,
  maxLength,
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled && !loading) {
        onSubmit();
      }
    }
  };

  const isDisabled = disabled || loading;
  const canSubmit = value.trim() && !isDisabled;

  return (
    <div className={cn('border-t bg-background p-4', className)}>
      <div className="flex items-end gap-2">
        {/* Attach Button */}
        {onAttach && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onAttach}
                  disabled={isDisabled}
                  className="flex-shrink-0 h-10 w-10 text-muted-foreground hover:text-foreground"
                >
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Anexar arquivo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Anexar documento</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Input Area */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isDisabled}
            maxLength={maxLength}
            rows={1}
            className={cn(
              'min-h-[44px] max-h-[150px] resize-none pr-4',
              'focus-visible:ring-primary/50',
              'placeholder:text-muted-foreground/60'
            )}
          />
          {maxLength && (
            <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
              {value.length}/{maxLength}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <m.div
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0"
        >
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={!canSubmit}
            size="icon"
            className="h-10 w-10"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">
              {loading ? 'Enviando...' : 'Enviar mensagem'}
            </span>
          </Button>
        </m.div>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground mt-2">
        Pressione <kbd className="px-1 py-0.5 bg-muted rounded text-xs font-mono">Enter</kbd> para enviar,{' '}
        <kbd className="px-1 py-0.5 bg-muted rounded text-xs font-mono">Shift+Enter</kbd> para nova linha
      </p>
    </div>
  );
}
