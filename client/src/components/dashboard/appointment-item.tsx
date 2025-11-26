'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { listItem } from '@/lib/motion';

type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed';

export interface AppointmentItemProps {
  doctor: {
    name: string;
    specialty: string;
    avatar?: string;
  };
  datetime: Date;
  location: string;
  status: AppointmentStatus;
  onClick?: () => void;
  className?: string;
}

const statusConfig: Record<AppointmentStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  scheduled: { label: 'Agendada', variant: 'secondary' },
  confirmed: { label: 'Confirmada', variant: 'default' },
  cancelled: { label: 'Cancelada', variant: 'destructive' },
  completed: { label: 'Concluída', variant: 'outline' },
};

export function AppointmentItem({
  doctor,
  datetime,
  location,
  status,
  onClick,
  className,
}: AppointmentItemProps) {
  const statusInfo = statusConfig[status];
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
        status === 'cancelled' && 'opacity-60',
        className
      )}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={doctor.avatar} alt={doctor.name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(doctor.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-foreground truncate">
            {doctor.name}
          </h4>
          <Badge variant={statusInfo.variant} className="flex-shrink-0">
            {statusInfo.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {doctor.specialty}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(datetime)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTime(datetime)}
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </span>
        </div>
      </div>
    </m.div>
  );
}
