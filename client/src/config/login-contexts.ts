/**
 * Login Context Configuration for Role-Based Login Flow
 * @see specs/feat/public-home-role-access/data-model.md
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
