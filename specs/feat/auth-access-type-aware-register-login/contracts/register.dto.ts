/**
 * Register DTO Contract
 * 
 * Feature: Fluxo de Autenticação Sensível ao Tipo de Acesso
 * Branch: feat/auth-access-type-aware-register-login
 * 
 * This contract defines the expected shape of the RegisterDto
 * after implementing the accessType field.
 */

import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

/**
 * DTO for user registration request
 * 
 * Changes from current implementation:
 * - Added optional `accessType` field to track user intent
 */
export class RegisterDto {
  /**
   * User's email address
   * @example "user@example.com"
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User's password (minimum 6 characters)
   * @example "securePassword123"
   */
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  /**
   * User's full name
   * @example "Maria Silva"
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * User's birthdate in ISO format
   * @example "1990-05-15"
   */
  @IsString()
  @IsNotEmpty()
  birthdate: string;

  /**
   * User's role (default: VIEWER)
   * @example "VIEWER"
   */
  @IsOptional()
  @IsString()
  role?: string;

  /**
   * NEW FIELD: Access type chosen during registration flow
   * Used for UX personalization and analytics/telemetry
   * Does NOT affect user role or permissions
   * 
   * @example "caregiver"
   * @example "patient"
   */
  @IsOptional()
  @IsIn(['caregiver', 'patient'])
  accessType?: 'caregiver' | 'patient';
}

/**
 * Type definition for frontend usage
 */
export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  birthdate: string;
  role?: string;
  accessType?: 'caregiver' | 'patient';
};

/**
 * API Response after successful registration
 */
export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  access_token: string;
}
