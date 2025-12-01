'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { m } from '@/lib/motion-provider';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  Calendar,
  CreditCard,
  MapPin,
  UserPlus,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

import { useAuthStore } from '@/stores/auth.store';
import { authService } from '@/services/auth.service';
import { AuthLayout, AuthCard } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { toast } from 'sonner';
import { formatCPF, unformatCPF } from '@/lib/formatCpf';
import { formatPhoneBR, unformatPhoneBR } from '@/lib/phone';
import { normalizeAccessType } from '@/types/access.types';
import { getRegisterContext } from '@/config/login-contexts';
import { buildAuthUrl } from '@/lib/auth-url';

// Zod validation schema
const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (formato: 000.000.000-00)'),
  birthdate: z
    .string()
    .min(1, 'Data de nascimento é obrigatória'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Register form content component (uses useSearchParams)
 */
function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  // Get access type from URL and resolve context
  const accessType = normalizeAccessType(searchParams.get('type'));
  const context = getRegisterContext(accessType);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      birthdate: '',
      phone: '',
      password: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuth(data.access_token, data.user);
      toast.success('Cadastro realizado com sucesso!', {
        description: `Bem-vindo, ${data.user.name}!`,
      });
      router.push('/dashboard');
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error('Erro ao fazer cadastro', {
        description: error.response?.data?.message || 'Verifique os dados e tente novamente.',
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    // Strip CPF and phone masks before sending to API and include accessType
    const payload = {
      ...data,
      cpf: unformatCPF(data.cpf),
      phone: data.phone ? unformatPhoneBR(data.phone) : data.phone,
      emergencyPhone: data.emergencyPhone ? unformatPhoneBR(data.emergencyPhone) : data.emergencyPhone,
      accessType,
    };
    registerMutation.mutate(payload);
  };

  return (
    <AuthLayout illustrationSide="right">
      <AuthCard
        title={context.title}
        description={context.subtitle}
        footer={
          <p>
            Já tem uma conta?{' '}
            <Link
              href={buildAuthUrl('/login', accessType)}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Faça login
            </Link>
          </p>
        }
      >
        <m.form
          onSubmit={handleSubmit(onSubmit)}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {/* Personal Info Section */}
          <m.div variants={staggerItem}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Informações Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome Completo *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="João Silva"
                    {...register('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className="pl-10"
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="pl-10"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm font-medium">
                  CPF *
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={field.value}
                        onChange={(e) => {
                          const formatted = formatCPF(e.target.value);
                          field.onChange(formatted);
                        }}
                        onBlur={field.onBlur}
                        aria-invalid={!!errors.cpf}
                        aria-describedby={errors.cpf ? 'cpf-error' : undefined}
                        className="pl-10"
                        maxLength={14}
                      />
                    )}
                  />
                </div>
                {errors.cpf && (
                  <p id="cpf-error" className="text-sm text-destructive" role="alert">
                    {errors.cpf.message}
                  </p>
                )}
              </div>

              {/* Birthdate */}
              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-sm font-medium">
                  Data de Nascimento *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="birthdate"
                    type="date"
                    {...register('birthdate')}
                    aria-invalid={!!errors.birthdate}
                    aria-describedby={errors.birthdate ? 'birthdate-error' : undefined}
                    className="pl-10"
                  />
                </div>
                {errors.birthdate && (
                  <p id="birthdate-error" className="text-sm text-destructive" role="alert">
                    {errors.birthdate.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Telefone *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="phone"
                        placeholder="(00) 00000-0000"
                        value={field.value}
                        onChange={(e) => {
                          const formatted = formatPhoneBR(e.target.value);
                          field.onChange(formatted);
                        }}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className="pl-10"
                        maxLength={15}
                      />
                    )}
                  />
                </div>
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-destructive" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    className="pl-10 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-destructive" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </m.div>

          <m.div variants={staggerItem}>
            <Separator />
          </m.div>

          {/* Optional Info Section */}
          <m.div variants={staggerItem}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Informações Adicionais (opcional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Endereço
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="Rua, número, bairro, cidade"
                    {...register('address')}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-sm font-medium">
                  Contato de Emergência
                </Label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="emergencyContact"
                    placeholder="Nome do contato"
                    {...register('emergencyContact')}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Emergency Phone */}
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-sm font-medium">
                  Telefone de Emergência
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="emergencyPhone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="emergencyPhone"
                        placeholder="(00) 00000-0000"
                        value={field.value || ''}
                        onChange={(e) => {
                          const formatted = formatPhoneBR(e.target.value);
                          field.onChange(formatted);
                        }}
                        className="pl-10"
                        maxLength={15}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </m.div>

          {/* Submit Button */}
          <m.div variants={staggerItem}>
            <Button
              type="submit"
              className="w-full h-11"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <m.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Cadastrando...</span>
                </m.div>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Criar Conta
                </span>
              )}
            </Button>
          </m.div>

          {/* Terms */}
          <m.p 
            variants={staggerItem}
            className="text-xs text-center text-muted-foreground"
          >
            Ao criar uma conta, você concorda com nossos{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            .
          </m.p>
        </m.form>
      </AuthCard>
    </AuthLayout>
  );
}

/**
 * Register page loading fallback
 */
function RegisterLoading() {
  return (
    <AuthLayout illustrationSide="right">
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </AuthLayout>
  );
}

/**
 * Register page wrapper with Suspense for useSearchParams SSR compatibility
 */
export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterFormContent />
    </Suspense>
  );
}
