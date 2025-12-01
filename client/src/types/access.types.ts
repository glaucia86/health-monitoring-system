/**
 * Access Type Definitions for Role-Based Login Flow
 * @see specs/feat/public-home-role-access/data-model.md
 */

/**
 * Valid access types for login flow
 */
export const VALID_ACCESS_TYPES = ['caregiver', 'patient'] as const;

/**
 * Access type union (valid types only)
 */
export type AccessType = (typeof VALID_ACCESS_TYPES)[number];

/**
 * All possible access types (including future)
 */
export type AccessTypeAll = AccessType | 'admin';

/**
 * Login page context configuration
 */
export interface LoginContext {
  type: AccessType;
  title: string;
  subtitle: string;
  icon: string;
}

/**
 * Type guard to validate access type
 */
export function isValidAccessType(value: string | null): value is AccessType {
  if (!value) return false;
  return VALID_ACCESS_TYPES.includes(value.toLowerCase() as AccessType);
}

/**
 * Normalize access type from URL parameter
 * Returns 'caregiver' for invalid/missing values (backward compatibility)
 */
export function normalizeAccessType(value: string | null): AccessType {
  if (!value) return 'caregiver';
  const normalized = value.toLowerCase();
  return isValidAccessType(normalized) ? (normalized as AccessType) : 'caregiver';
}
