'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AvatarUpload } from './avatar-upload';
import { User } from '@/types';
import { cn, resolveAssetUrl } from '@/lib/utils';

interface ProfileHeaderProps {
  user: User;
  onAvatarUpload?: (file: File) => Promise<void>;
  onAvatarRemove?: () => Promise<void>;
  isAvatarUploading?: boolean;
  isAvatarRemoving?: boolean;
  className?: string;
}

/**
 * Generates initials from user name
 * Example: "John Doe" -> "JD"
 */
function getInitials(name: string | null): string {
  if (!name) return 'U';
  
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Maps role to display label
 */
function getRoleLabel(role: string): string {
  const roleLabels: Record<string, string> = {
    ADMIN: 'Administrador',
    CAREGIVER: 'Cuidador',
    VIEWER: 'Visualizador',
    PATIENT: 'Paciente',
  };
  return roleLabels[role] || role;
}

/**
 * Maps role to badge variant
 */
function getRoleBadgeVariant(role: string): 'default' | 'secondary' | 'outline' {
  switch (role) {
    case 'ADMIN':
      return 'default';
    case 'CAREGIVER':
      return 'secondary';
    default:
      return 'outline';
  }
}

export function ProfileHeader({
  user,
  onAvatarUpload,
  onAvatarRemove,
  isAvatarUploading = false,
  isAvatarRemoving = false,
  className,
}: ProfileHeaderProps) {
  const initials = getInitials(user.name);
  const roleLabel = getRoleLabel(user.role);
  const roleBadgeVariant = getRoleBadgeVariant(user.role);
  const avatarSrc = resolveAssetUrl(user.avatarUrl);

  // Format member since date
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  // Check if avatar editing is enabled (callbacks provided)
  const isEditable = Boolean(onAvatarUpload && onAvatarRemove);

  return (
    <header
      className={cn(
        'flex flex-col items-center gap-4 p-4 sm:p-6 md:flex-row md:items-start md:gap-6',
        className
      )}
      aria-label="Cabeçalho do perfil"
    >
      {/* Avatar - editable or static based on callbacks */}
      <div className="shrink-0">
        {isEditable ? (
          <AvatarUpload
            currentAvatarUrl={user.avatarUrl}
            userName={user.name}
            onUpload={onAvatarUpload!}
            onRemove={onAvatarRemove!}
            isUploading={isAvatarUploading}
            isRemoving={isAvatarRemoving}
          />
        ) : (
          <Avatar 
            className="h-20 w-20 border-4 border-primary/20 sm:h-24 sm:w-24 md:h-32 md:w-32"
            aria-label={`Foto de perfil${user.name ? ` de ${user.name}` : ''}`}
          >
            {avatarSrc && (
              <AvatarImage
                key={avatarSrc}
                src={avatarSrc}
                alt=""
                aria-hidden="true"
              />
            )}
            <AvatarFallback 
              className="bg-primary/10 text-xl font-semibold text-primary sm:text-2xl md:text-3xl"
              aria-label={`Iniciais: ${initials}`}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* User info */}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center md:items-start md:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            {user.name || 'Nome não informado'}
          </h1>
          <Badge 
            variant={roleBadgeVariant}
            aria-label={`Função: ${roleLabel}`}
          >
            {roleLabel}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground sm:text-base">
          <span className="sr-only">E-mail: </span>
          {user.email}
        </p>

        {memberSince && (
          <p className="text-xs text-muted-foreground sm:text-sm">
            <span className="sr-only">Data de cadastro: </span>
            Membro desde {memberSince}
          </p>
        )}

        {/* CPF (masked) */}
        {user.cpf && (
          <p className="text-xs text-muted-foreground sm:text-sm">
            <span className="sr-only">CPF: </span>
            CPF: {user.cpf}
          </p>
        )}
      </div>
    </header>
  );
}

export default ProfileHeader;
