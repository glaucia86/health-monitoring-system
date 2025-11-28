'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, User, Upload, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { profileService } from '@/services/profile.service';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProfileHistoryEntry {
  id: string;
  action: string;
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
  changedAt: string;
  ipAddress: string | null;
}

export function ProfileHistory() {
  const { data: history, isLoading, error } = useQuery<ProfileHistoryEntry[]>({
    queryKey: ['profile-history'],
    queryFn: profileService.getHistory,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <p>Erro ao carregar histórico. Tente novamente.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-8">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma alteração registrada ainda.</p>
            <p className="text-sm mt-2">Quando você editar seu perfil, as mudanças aparecerão aqui.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'avatar_upload':
        return <Upload className="h-4 w-4" />;
      case 'avatar_remove':
        return <Trash2 className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'avatar_upload':
        return 'Upload de Foto';
      case 'avatar_remove':
        return 'Remoção de Foto';
      case 'update':
        return 'Atualização';
      default:
        return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'avatar_upload':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'avatar_remove':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Alterações</CardTitle>
          <CardDescription>
            Registro completo de todas as modificações realizadas no seu perfil
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {history.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${getActionColor(entry.action)}`}>
                  {getActionIcon(entry.action)}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={getActionColor(entry.action)}>
                      {getActionLabel(entry.action)}
                    </Badge>
                    {entry.fieldName && (
                      <span className="text-sm font-medium">{entry.fieldName}</span>
                    )}
                  </div>

                  {entry.action === 'update' && (
                    <div className="text-sm space-y-1">
                      {entry.oldValue && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">De:</span>
                          <span className="font-mono bg-muted px-2 py-0.5 rounded">
                            {entry.oldValue}
                          </span>
                        </div>
                      )}
                      {entry.newValue && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Para:</span>
                          <span className="font-mono bg-muted px-2 py-0.5 rounded">
                            {entry.newValue}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {(entry.action === 'avatar_upload' || entry.action === 'avatar_remove') && (
                    <div className="text-sm text-muted-foreground">
                      {entry.oldValue && <span>{entry.oldValue}</span>}
                      {entry.newValue && entry.oldValue && <span> → </span>}
                      {entry.newValue && <span>{entry.newValue}</span>}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {format(parseISO(entry.changedAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                    {entry.ipAddress && (
                      <span className="font-mono text-xs">IP: {entry.ipAddress}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
