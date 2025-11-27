'use client';

import { useState } from 'react';
import { m } from '@/lib/motion-provider';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  CheckCheck, 
  AlertCircle, 
  Bot, 
  User, 
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw
} from 'lucide-react';
import { slideInLeft, slideInRight } from '@/lib/motion';
import { toast } from 'sonner';

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
  onRegenerate?: () => void;
}

export function MessageBubble({
  role,
  content,
  timestamp,
  status = 'sent',
  avatar,
  className,
  onRegenerate,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const isUser = role === 'user';
  const isAssistant = role === 'assistant';

  const formattedTime = timestamp.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('Copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Erro ao copiar texto');
    }
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    toast.success(type === 'up' ? 'Obrigado pelo feedback!' : 'Agradecemos seu feedback!');
  };

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
      <div className="flex flex-col gap-1 max-w-[75%]">
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-sm',
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

        {/* Action Buttons - Only for assistant messages */}
        {isAssistant && (
          <div className="flex items-center gap-1 ml-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
              title="Copiar resposta"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7",
                feedback === 'up' 
                  ? "text-green-500" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleFeedback('up')}
              title="Boa resposta"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7",
                feedback === 'down' 
                  ? "text-red-500" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleFeedback('down')}
              title="Resposta ruim"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>
            {onRegenerate && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={onRegenerate}
                title="Regenerar resposta"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
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
