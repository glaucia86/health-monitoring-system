'use client';

import { useMemo } from 'react';
import { Pill, Clock, AlertTriangle } from 'lucide-react';
import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { listItem } from '@/lib/motion';

type MedicationStatus = 'active' | 'paused' | 'completed';

export interface MedicationItemProps {
  name: string;
  dosage: string;
  frequency: string;
  nextDose?: Date;
  status: MedicationStatus;
  alerts?: string[];
  onClick?: () => void;
  className?: string;
}

const statusConfig: Record<MedicationStatus, { label: string; variant: 'default' | 'secondary' | 'outline'; color: string }> = {
  active: { label: 'Ativo', variant: 'default', color: 'bg-success' },
  paused: { label: 'Pausado', variant: 'secondary', color: 'bg-warning' },
  completed: { label: 'Finalizado', variant: 'outline', color: 'bg-muted' },
};

export function MedicationItem({
  name,
  dosage,
  frequency,
  nextDose,
  status,
  alerts,
  onClick,
  className,
}: MedicationItemProps) {
  const statusInfo = statusConfig[status];

  const { formattedNextDose, isOverdue, isUrgent } = useMemo(() => {
    if (!nextDose) {
      return { formattedNextDose: '', isOverdue: false, isUrgent: false };
    }
    
    const now = new Date();
    const nowTime = now.getTime();
    const nextDoseTime = nextDose.getTime();
    const diff = nextDoseTime - nowTime;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    let formatted: string;
    if (diff < 0) {
      formatted = 'Atrasado';
    } else if (hours < 1) {
      formatted = `em ${minutes}min`;
    } else if (hours < 24) {
      formatted = `em ${hours}h ${minutes > 0 ? `${minutes}min` : ''}`;
    } else {
      formatted = new Intl.DateTimeFormat('pt-BR', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(nextDose);
    }

    return {
      formattedNextDose: formatted,
      isOverdue: nextDoseTime < nowTime,
      isUrgent: diff >= 0 && diff < 3600000, // Less than 1 hour
    };
  }, [nextDose]);

  return (
    <m.div
      variants={listItem}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg border bg-card transition-all',
        'hover:shadow-md hover:border-primary/30',
        onClick && 'cursor-pointer',
        status === 'paused' && 'opacity-75',
        status === 'completed' && 'opacity-60',
        isOverdue && 'border-destructive/50 bg-destructive/5',
        className
      )}
    >
      <div className={cn(
        'flex items-center justify-center h-12 w-12 rounded-lg flex-shrink-0',
        isOverdue ? 'bg-destructive/10' : 'bg-primary/10'
      )}>
        <Pill className={cn('h-6 w-6', isOverdue ? 'text-destructive' : 'text-primary')} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-foreground truncate">
            {name}
          </h4>
          <Badge variant={statusInfo.variant} className="flex-shrink-0">
            {statusInfo.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {dosage} • {frequency}
        </p>
        
        {status === 'active' && nextDose && (
          <div className={cn(
            'flex items-center gap-1 text-xs',
            isOverdue ? 'text-destructive font-medium' : isUrgent ? 'text-warning font-medium' : 'text-muted-foreground'
          )}>
            <Clock className="h-3 w-3" />
            Próxima dose: {formattedNextDose}
          </div>
        )}

        {alerts && alerts.length > 0 && (
          <div className="mt-2 space-y-1">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-warning"
              >
                <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{alert}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </m.div>
  );
}
