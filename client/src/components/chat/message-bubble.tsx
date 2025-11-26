'use client';

import { m } from '@/lib/motion-provider';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, CheckCheck, AlertCircle, Bot, User } from 'lucide-react';
import { slideInLeft, slideInRight } from '@/lib/motion';

type MessageRole = 'user' | 'assistant';
type MessageStatus = 'sending' | 'sent' | 'error';

export interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  avatar?: {
    src?: string;
    fallback: string;
  };
  className?: string;
}

export function MessageBubble({
  role,
  content,
  timestamp,
  status = 'sent',
  avatar,
  className,
}: MessageBubbleProps) {
  const isUser = role === 'user';
  const isAssistant = role === 'assistant';

  const formattedTime = timestamp.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <m.div
      variants={isUser ? slideInRight : slideInLeft}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex gap-3',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      {/* Assistant Avatar */}
      {isAssistant && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          {avatar?.src && <AvatarImage src={avatar.src} alt="Assistente" />}
          <AvatarFallback className="bg-primary text-primary-foreground">
            {avatar?.fallback || <Bot className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-foreground rounded-bl-md'
        )}
      >
        {/* Content */}
        {isAssistant ? (
          <div className="text-sm prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-2 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        )}

        {/* Timestamp and Status */}
        <div
          className={cn(
            'flex items-center justify-end gap-1 mt-1',
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          <span className="text-xs">{formattedTime}</span>
          {isUser && <MessageStatus status={status} />}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          {avatar?.src && <AvatarImage src={avatar.src} alt="Você" />}
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {avatar?.fallback || <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
      )}
    </m.div>
  );
}

function MessageStatus({ status }: { status: MessageStatus }) {
  switch (status) {
    case 'sending':
      return (
        <m.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Check className="h-3 w-3" />
        </m.div>
      );
    case 'sent':
      return <CheckCheck className="h-3 w-3" />;
    case 'error':
      return <AlertCircle className="h-3 w-3 text-destructive" />;
    default:
      return null;
  }
}
