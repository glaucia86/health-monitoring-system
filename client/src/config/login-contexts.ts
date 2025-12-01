/**
 * Login Context Configuration for Role-Based Login Flow
 * @see specs/feat/public-home-role-access/data-model.md
 * @see specs/feat/auth-access-type-aware-register-login/data-model.md
 */

import type { AccessType, LoginContext } from '@/types/access.types';

/**
 * Static configuration for login page contextualization
 */
export const LOGIN_CONTEXTS: Record<AccessType, LoginContext> = {
  caregiver: {
    type: 'caregiver',
    title: 'Acesso do Cuidador',
    subtitle: 'Gerencie pacientes, relatórios e monitoramento diário.',
    icon: 'Stethoscope',
  },
  patient: {
    type: 'patient',
    title: 'Acesso do Paciente',
    subtitle: 'Consulte informações importantes sobre sua saúde com segurança.',
    icon: 'User',
  },
} as const;

/**
 * Get login context for a given access type
 */
export function getLoginContext(type: AccessType): LoginContext {
  return LOGIN_CONTEXTS[type];
}

/**
 * Register page context configuration
 */
export interface RegisterContext {
  title: string;
  subtitle: string;
  icon: string;
}

/**
 * Static configuration for register page contextualization
 */
export const REGISTER_CONTEXTS: Record<AccessType, RegisterContext> = {
  caregiver: {
    title: 'Criar conta de Cuidador',
    subtitle: 'Comece a monitorar pacientes em minutos',
    icon: 'Stethoscope',
  },
  patient: {
    title: 'Criar conta de Paciente',
    subtitle: 'Acompanhe sua saúde de forma simples',
    icon: 'User',
  },
} as const;

/**
 * Get register context for a given access type
 */
export function getRegisterContext(type: AccessType): RegisterContext {
  return REGISTER_CONTEXTS[type];
}
