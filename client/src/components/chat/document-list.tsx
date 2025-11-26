'use client';

import { m, AnimatePresence } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Image as ImageIcon, 
  File, 
  Trash2, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Upload
} from 'lucide-react';
import { staggerContainer, listItem } from '@/lib/motion';
import { EmptyState } from '@/components/shared';

type DocumentStatus = 'uploading' | 'processing' | 'ready' | 'error';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: DocumentStatus;
}

export interface DocumentListProps {
  documents: Document[];
  onSelect?: (doc: Document) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
  className?: string;
}

export function DocumentList({
  documents,
  onSelect,
  onDelete,
  loading = false,
  className,
}: DocumentListProps) {
  if (loading) {
    return (
      <div className={cn('space-y-2', className)}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted animate-pulse"
          >
            <div className="h-8 w-8 rounded bg-muted-foreground/20" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-muted-foreground/20" />
              <div className="h-3 w-1/2 rounded bg-muted-foreground/20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Nenhum documento"
        description="Envie documentos médicos para análise pela IA."
        className={className}
      />
    );
  }

  return (
    <m.ul
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn('space-y-2 max-h-60 overflow-y-auto', className)}
    >
      <AnimatePresence mode="popLayout">
        {documents.map((doc) => (
          <m.li
            key={doc.id}
            variants={listItem}
            layout
            exit={{ opacity: 0, x: -20 }}
          >
            <DocumentItem
              document={doc}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          </m.li>
        ))}
      </AnimatePresence>
    </m.ul>
  );
}

interface DocumentItemProps {
  document: Document;
  onSelect?: (doc: Document) => void;
  onDelete?: (id: string) => void;
}

function DocumentItem({ document, onSelect, onDelete }: DocumentItemProps) {
  const { id, name, type, size, uploadedAt, status } = document;

  const formattedDate = uploadedAt.toLocaleDateString('pt-BR');
  const formattedSize = formatFileSize(size);

  const handleClick = () => {
    if (status === 'ready' && onSelect) {
      onSelect(document);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg border transition-colors',
        'bg-card hover:bg-accent/50',
        status === 'ready' && onSelect && 'cursor-pointer',
        status === 'error' && 'border-destructive/50 bg-destructive/5'
      )}
    >
      {/* File Icon */}
      <div className="flex-shrink-0">
        <DocumentIcon type={type} status={status} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{formattedSize}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Delete Button */}
      {onDelete && status !== 'uploading' && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="flex-shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remover documento</span>
        </Button>
      )}
    </div>
  );
}

function DocumentIcon({ type, status }: { type: string; status: DocumentStatus }) {
  const iconClass = 'h-8 w-8 p-1.5 rounded-lg';
  
  if (status === 'uploading') {
    return (
      <div className={cn(iconClass, 'bg-primary/10 text-primary')}>
        <Upload className="h-full w-full animate-pulse" />
      </div>
    );
  }

  if (type.includes('pdf')) {
    return (
      <div className={cn(iconClass, 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400')}>
        <FileText className="h-full w-full" />
      </div>
    );
  }

  if (type.includes('image')) {
    return (
      <div className={cn(iconClass, 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400')}>
        <ImageIcon className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className={cn(iconClass, 'bg-muted text-muted-foreground')}>
      <File className="h-full w-full" />
    </div>
  );
}

function StatusBadge({ status }: { status: DocumentStatus }) {
  const statusConfig: Record<DocumentStatus, { icon: typeof Loader2; label: string; className: string }> = {
    uploading: {
      icon: Loader2,
      label: 'Enviando...',
      className: 'text-primary',
    },
    processing: {
      icon: Loader2,
      label: 'Processando...',
      className: 'text-warning',
    },
    ready: {
      icon: CheckCircle,
      label: 'Pronto',
      className: 'text-success',
    },
    error: {
      icon: AlertCircle,
      label: 'Erro',
      className: 'text-destructive',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-1 mt-1', config.className)}>
      <Icon className={cn('h-3 w-3', status === 'uploading' || status === 'processing' ? 'animate-spin' : '')} />
      <span className="text-xs">{config.label}</span>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
