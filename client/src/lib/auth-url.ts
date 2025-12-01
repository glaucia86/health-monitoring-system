/**
 * Auth URL Helper Functions
 *
 * Provides utilities for building authentication-related URLs with
 * preserved access type context (caregiver vs patient).
 *
 * @see specs/feat/auth-access-type-aware-register-login/plan.md
 */

import type { AccessType } from '@/types/access.types';

/**
 * Build an auth-related URL with the access type query parameter.
 *
 * @param path - The target path (e.g., '/login', '/register')
 * @param accessType - The access type to preserve in the URL
 * @returns URL string with ?type= query parameter
 *
 * @example
 * buildAuthUrl('/register', 'caregiver')
 * // returns '/register?type=caregiver'
 *
 * @example
 * buildAuthUrl('/login', 'patient')
 * // returns '/login?type=patient'
 */
export function buildAuthUrl(path: string, accessType: AccessType): string {
  return `${path}?type=${accessType}`;
}
