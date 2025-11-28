'use client';

import { useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/schemas/profile.schema';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User as UserIcon, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Save, 
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormDraft, useUnsavedChangesWarning } from '@/hooks';

interface ProfileFormProps {
  user: User | null;
  onSubmit: (data: ProfileFormData) => void;
  isLoading?: boolean;
  className?: string;
}

export function ProfileForm({
  user,
  onSubmit,
  isLoading = false,
  className,
}: ProfileFormProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  
  const defaultValues: ProfileFormData = {
    name: user?.name || '',
    // Ensure phone numbers are in E.164 format for the input component
    // If the number doesn't start with +, assume it's a Brazilian number (legacy data)
    phone: user?.phone 
      ? (user.phone.startsWith('+') ? user.phone : `+55${user.phone.replace(/\D/g, '')}`) 
      : '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || '',
    emergencyPhone: user?.emergencyPhone 
      ? (user.emergencyPhone.startsWith('+') ? user.emergencyPhone : `+55${user.emergencyPhone.replace(/\D/g, '')}`) 
      : '',
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Use custom hooks for draft management and unsaved changes warning
  const { hasDraft, clearDraft } = useFormDraft({
    draftKey: 'profile-form-draft',
    isDirty,
    watch,
    reset,
    autoSaveIntervalMs: 30000, // 30 seconds
  });

  useUnsavedChangesWarning(isDirty);

  // Focus first input when form mounts
  useEffect(() => {
    // Small delay to ensure form is fully rendered
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = (data: ProfileFormData) => {
    // Transform empty strings to null to properly clear fields
    const transformedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === '' ? null : value
      ])
    ) as ProfileFormData;

    onSubmit(transformedData);
    // Clear draft after successful submit
    clearDraft();
  };

  // Get the register props and merge with ref
  const nameRegister = register('name');

  return (
    <>
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isDirty && !isLoading && 'Formulário com alterações não salvas'}
        {!isDirty && !isLoading && 'Nenhuma alteração pendente'}
        {isLoading && 'Salvando alterações...'}
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('space-y-6', className)}
        aria-label="Formulário de edição de perfil"
      >
      {/* Personal Information Section */}
      <fieldset className="space-y-4">
        <legend className="flex items-center gap-2 text-lg font-semibold">
          <UserIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          Informações Pessoais
        </legend>

        <div className="space-y-2">
          <Label htmlFor="name">
            Nome completo
          </Label>
          <div className="relative">
            <Input
              id="name"
              {...nameRegister}
              ref={(e) => {
                nameRegister.ref(e);
                (firstInputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
              }}
              placeholder="Seu nome completo"
              aria-describedby={errors.name ? 'name-hint name-error' : 'name-hint'}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-required="false"
              autoComplete="name"
              className={cn(
                errors.name && 'pr-10'
              )}
            />
            {errors.name && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
              </div>
            )}
          </div>
          <p id="name-hint" className="text-xs text-muted-foreground">
            Digite seu nome completo como consta em documentos oficiais
          </p>
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive mt-1.5 flex items-start gap-1.5" role="alert">
              <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{errors.name.message}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user?.email || ''}
              disabled
              className="bg-muted text-muted-foreground"
              aria-label="Email (não editável)"
            />
            <p className="text-xs text-muted-foreground">
              O email não pode ser alterado.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input
              id="birthDate"
              value={user?.birthDate ? new Date(user.birthDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ''}
              disabled
              className="bg-muted text-muted-foreground"
              aria-label="Data de Nascimento (não editável)"
            />
            <p className="text-xs text-muted-foreground">
              Para alterar a data de nascimento, contate o suporte.
            </p>
          </div>
        </div>
      </fieldset>

      {/* Contact Section */}
      <fieldset className="space-y-4">
        <legend className="flex items-center gap-2 text-lg font-semibold">
          <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
          Contato
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="phone"
                    placeholder="+55 (99) 99999-9999"
                    value={field.value}
                    onChange={(value: string | undefined) => field.onChange(value || '')}
                    disabled={isLoading}
                    aria-describedby={errors.phone ? 'phone-hint phone-error' : 'phone-hint'}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-required="false"
                    autoComplete="tel"
                    className={cn(
                      errors.phone && 'pr-10'
                    )}
                  />
                )}
              />
              {errors.phone && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive pointer-events-none">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </div>
            <p id="phone-hint" className="text-xs text-muted-foreground">
              Formato: código do país + DDD + número (ex: +55 11 99999-9999)
            </p>
            {errors.phone && (
              <p id="phone-error" className="text-xs text-destructive mt-1.5 flex items-start gap-1.5" role="alert">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{errors.phone.message}</span>
              </p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              Endereço
            </Label>
            <div className="relative">
              <Textarea
                id="address"
                {...register('address')}
                placeholder="Rua, número, bairro, cidade - UF"
                rows={2}
                aria-describedby={errors.address ? 'address-hint address-error' : 'address-hint'}
                aria-invalid={errors.address ? 'true' : 'false'}
                aria-required="false"
                autoComplete="street-address"
                className={cn(
                  errors.address && 'pr-10'
                )}
              />
              {errors.address && (
                <div className="absolute right-3 top-3 text-destructive">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </div>
            <p id="address-hint" className="text-xs text-muted-foreground">
              Informe seu endereço completo incluindo rua, número, bairro, cidade e estado
            </p>
            {errors.address && (
              <p id="address-error" className="text-xs text-destructive mt-1.5 flex items-start gap-1.5" role="alert">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{errors.address.message}</span>
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Emergency Contact Section */}
      <fieldset className="space-y-4">
        <legend className="flex items-center gap-2 text-lg font-semibold">
          <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
          Contato de Emergência
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Nome do contato</Label>
            <div className="relative">
              <Input
                id="emergencyContact"
                {...register('emergencyContact')}
                placeholder="Nome da pessoa"
                aria-describedby={
                  errors.emergencyContact ? 'emergencyContact-hint emergencyContact-error' : 'emergencyContact-hint'
                }
                aria-invalid={errors.emergencyContact ? 'true' : 'false'}
                aria-required="false"
                autoComplete="off"
                className={cn(
                  errors.emergencyContact && 'pr-10'
                )}
              />
              {errors.emergencyContact && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </div>
            <p id="emergencyContact-hint" className="text-xs text-muted-foreground">
              Nome de uma pessoa para contato em caso de emergência
            </p>
            {errors.emergencyContact && (
              <p id="emergencyContact-error" className="text-xs text-destructive mt-1.5 flex items-start gap-1.5" role="alert">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{errors.emergencyContact.message}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyPhone">Telefone de emergência</Label>
            <div className="relative">
              <Controller
                name="emergencyPhone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="emergencyPhone"
                    placeholder="+55 (99) 99999-9999"
                    value={field.value}
                    onChange={(value: string | undefined) => field.onChange(value || '')}
                    disabled={isLoading}
                    aria-describedby={
                      errors.emergencyPhone ? 'emergencyPhone-hint emergencyPhone-error' : 'emergencyPhone-hint'
                    }
                    aria-invalid={errors.emergencyPhone ? 'true' : 'false'}
                    aria-required="false"
                    autoComplete="off"
                    className={cn(
                      errors.emergencyPhone && 'pr-10'
                    )}
                  />
                )}
              />
              {errors.emergencyPhone && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive pointer-events-none">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </div>
            <p id="emergencyPhone-hint" className="text-xs text-muted-foreground">
              Telefone do contato de emergência no formato internacional
            </p>
            {errors.emergencyPhone && (
              <p id="emergencyPhone-error" className="text-xs text-destructive mt-1.5 flex items-start gap-1.5" role="alert">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{errors.emergencyPhone.message}</span>
              </p>
            )}
          </div>
        </div>
      </fieldset>



      {/* Submit Button */}
      <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          disabled={isLoading || !isDirty}
          className="w-full sm:w-auto sm:min-w-[140px]"
          aria-describedby={!isDirty ? 'submit-hint' : undefined}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Salvando...</span>
              <span className="sr-only">Por favor aguarde</span>
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              Salvar Alterações
            </>
          )}
        </Button>
        {!isDirty && (
          <p id="submit-hint" className="sr-only">
            Faça alterações no formulário para habilitar o botão de salvar
          </p>
        )}
      </div>
    </form>
    </>
  );
}

export default ProfileForm;
