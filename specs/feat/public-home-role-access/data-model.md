# Data Model: Public Home Page & Role-Based Login Flow

**Date**: 2024-11-30  
**Feature Branch**: `feat/public-home-role-access`

## Overview

This feature introduces frontend-only data models for handling access types and login context. No backend/database changes are required.

---

## Entities

### AccessType

Represents the type of user access. Maps to backend roles but is used for frontend UI contextualization only.

| Value       | Description                              | Backend Role | Implemented |
|-------------|------------------------------------------|--------------|-------------|
| `caregiver` | Healthcare professional or caregiver     | `CAREGIVER`  | ✅ Yes      |
| `patient`   | Patient accessing their health data      | `PATIENT`    | ✅ Yes      |
| `admin`     | System administrator (future)            | `ADMIN`      | ❌ No       |

**Constraints**:
- Only `caregiver` and `patient` are valid for this implementation
- `admin` is reserved for future use
- Unknown values fallback to `caregiver`

---

### LoginContext

Dynamic content configuration for the login page based on access type.

| Field       | Type     | Description                                     |
|-------------|----------|-------------------------------------------------|
| `type`      | string   | The access type (`caregiver` \| `patient`)      |
| `title`     | string   | H1 title displayed on login page                |
| `subtitle`  | string   | Descriptive text below the title                |
| `icon`      | string   | Lucide icon name for visual identification      |

**Instances**:

| Type        | Title                 | Subtitle                                                           | Icon          |
|-------------|-----------------------|--------------------------------------------------------------------|---------------|
| `caregiver` | Acesso do Cuidador    | Gerencie pacientes, relatórios e monitoramento diário.             | `Stethoscope` |
| `patient`   | Acesso do Paciente    | Consulte informações importantes sobre sua saúde com segurança.    | `User`        |

---

## Type Definitions (TypeScript)

```typescript
// src/types/access.types.ts

/**
 * Valid access types for login flow
 */
export const VALID_ACCESS_TYPES = ['caregiver', 'patient'] as const;

/**
 * Access type union (valid types only)
 */
export type AccessType = typeof VALID_ACCESS_TYPES[number];

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
  return VALID_ACCESS_TYPES.includes(value as AccessType);
}

/**
 * Normalize access type from URL parameter
 * Returns 'caregiver' for invalid/missing values (backward compatibility)
 */
export function normalizeAccessType(value: string | null): AccessType {
  const normalized = value?.toLowerCase();
  return isValidAccessType(normalized) ? normalized : 'caregiver';
}
```

---

## Configuration Data

```typescript
// src/config/login-contexts.ts

import type { AccessType, LoginContext } from '@/types/access.types';

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
```

---

## State Transitions

```
┌─────────────────────────────────────────────────────────────┐
│                       User Access Flow                       │
└─────────────────────────────────────────────────────────────┘

        ┌──────────────┐
        │  Unauthenticated │
        │    User          │
        └───────┬──────────┘
                │
                │ accesses /
                ▼
        ┌──────────────┐     authenticated?     ┌──────────────┐
        │  Home Page   │ ─────────────────────► │  /dashboard  │
        │     /        │         yes            │              │
        └───────┬──────┘                        └──────────────┘
                │ no
                │
        ┌───────┼───────┐
        │               │
   clicks          clicks
   caregiver       patient
   button          button
        │               │
        ▼               ▼
┌──────────────┐ ┌──────────────┐
│ /login?type= │ │ /login?type= │
│   caregiver  │ │   patient    │
└───────┬──────┘ └───────┬──────┘
        │               │
        └───────┬───────┘
                │
                │ login success
                ▼
        ┌──────────────┐
        │  /dashboard  │
        └──────────────┘
```

---

## URL Parameter Behavior

| URL                       | Parsed Type   | Context Used |
|---------------------------|---------------|--------------|
| `/login`                  | (null)        | `caregiver`  |
| `/login?type=caregiver`   | `caregiver`   | `caregiver`  |
| `/login?type=patient`     | `patient`     | `patient`    |
| `/login?type=CAREGIVER`   | `CAREGIVER`   | `caregiver`  |
| `/login?type=admin`       | `admin`       | `caregiver`  |
| `/login?type=invalid`     | `invalid`     | `caregiver`  |
| `/login?type=`            | (empty)       | `caregiver`  |

---

## Relationships

```
AccessType ──────┐
                 │ determines
                 ▼
           LoginContext ────► Login Page UI
                 │
                 │ type maps to
                 ▼
           Backend Role (at login time)
```

Note: The `type` parameter is purely for UI contextualization. The actual user role is determined by the backend based on authenticated user's stored role.
