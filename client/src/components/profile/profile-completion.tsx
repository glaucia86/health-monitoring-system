'use client';

import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Trophy, Target, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileCompletionProps {
  user: User | null;
  className?: string;
}

interface ProfileField {
  key: keyof User;
  label: string;
  weight: number;
}

const PROFILE_FIELDS: ProfileField[] = [
  { key: 'name', label: 'Nome completo', weight: 15 },
  { key: 'email', label: 'E-mail', weight: 15 },
  { key: 'cpf', label: 'CPF', weight: 10 },
  { key: 'birthDate', label: 'Data de nascimento', weight: 10 },
  { key: 'phone', label: 'Telefone', weight: 15 },
  { key: 'address', label: 'Endereço', weight: 10 },
  { key: 'emergencyContact', label: 'Contato de emergência', weight: 15 },
  { key: 'emergencyPhone', label: 'Telefone de emergência', weight: 10 },
];

export function ProfileCompletion({ user, className }: ProfileCompletionProps) {
  if (!user) return null;

  // Calculate completion percentage
  const { completedFields, missingFields, percentage } = calculateCompletion(user);

  // Determine completion level
  const level = getCompletionLevel(percentage);

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Completude do Perfil
            </CardTitle>
            <CardDescription>
              {percentage}% completo
            </CardDescription>
          </div>
          <Badge 
            variant={level.variant as "default" | "secondary" | "destructive" | "outline"}
            className={cn('gap-1', level.color)}
          >
            {level.icon}
            {level.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={percentage} className="h-3" />
          <p className="text-xs text-muted-foreground text-center">
            {completedFields.length} de {PROFILE_FIELDS.length} campos preenchidos
          </p>
        </div>

        {/* Motivational Message */}
        {percentage < 100 && (
          <div className="p-4 bg-muted/50 rounded-lg border">
            <p className="text-sm font-medium mb-2">
              {level.message}
            </p>
            {missingFields.length > 0 && (
              <>
                <p className="text-xs text-muted-foreground mb-3">
                  Complete os campos abaixo para melhorar seu perfil:
                </p>
                <div className="space-y-2">
                  {missingFields.map((field) => (
                    <div key={field.key} className="flex items-center gap-2 text-sm">
                      <Circle className="h-3 w-3 text-muted-foreground" />
                      <span>{field.label}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        +{field.weight}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Achievement Badge */}
        {percentage === 100 && (
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-semibold text-primary mb-1">
              🎉 Perfil Completo!
            </p>
            <p className="text-xs text-muted-foreground">
              Parabéns! Você preencheu todas as informações do seu perfil.
            </p>
          </div>
        )}

        {/* Completed Fields (collapsed) */}
        {completedFields.length > 0 && percentage < 100 && (
          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Ver campos preenchidos ({completedFields.length})</span>
            </summary>
            <div className="mt-3 space-y-2 pl-6">
              {completedFields.map((field) => (
                <div key={field.key} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span>{field.label}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Calculate profile completion percentage
 */
function calculateCompletion(user: User) {
  const completedFields: ProfileField[] = [];
  const missingFields: ProfileField[] = [];
  let totalWeight = 0;
  let completedWeight = 0;

  PROFILE_FIELDS.forEach((field) => {
    totalWeight += field.weight;
    const value = user[field.key];
    const isCompleted = value !== null && value !== undefined && value !== '';

    if (isCompleted) {
      completedFields.push(field);
      completedWeight += field.weight;
    } else {
      missingFields.push(field);
    }
  });

  const percentage = Math.round((completedWeight / totalWeight) * 100);

  return { completedFields, missingFields, percentage };
}

/**
 * Get completion level with gamification elements
 */
function getCompletionLevel(percentage: number) {
  if (percentage === 100) {
    return {
      label: 'Mestre',
      icon: <Star className="h-3 w-3" />,
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
      variant: 'default',
      message: 'Perfil completo! Você é um mestre!',
    };
  }

  if (percentage >= 80) {
    return {
      label: 'Avançado',
      icon: <Trophy className="h-3 w-3" />,
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      variant: 'secondary',
      message: 'Quase lá! Complete mais alguns campos para alcançar 100%.',
    };
  }

  if (percentage >= 60) {
    return {
      label: 'Intermediário',
      icon: <Target className="h-3 w-3" />,
      color: 'bg-teal-500/10 text-teal-700 border-teal-500/20',
      variant: 'secondary',
      message: 'Bom progresso! Continue preenchendo seu perfil.',
    };
  }

  if (percentage >= 40) {
    return {
      label: 'Iniciante',
      icon: <Circle className="h-3 w-3" />,
      color: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      variant: 'secondary',
      message: 'Você está começando! Preencha mais informações.',
    };
  }

  return {
    label: 'Incompleto',
    icon: <Circle className="h-3 w-3" />,
    color: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
    variant: 'destructive',
    message: 'Seu perfil precisa de atenção. Complete as informações básicas.',
  };
}

export default ProfileCompletion;
