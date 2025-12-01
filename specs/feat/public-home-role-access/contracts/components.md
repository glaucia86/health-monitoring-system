# Component Contracts: Public Home Page & Role-Based Login Flow

**Date**: 2024-11-30  
**Feature Branch**: `feat/public-home-role-access`

## Overview

This document defines the component interfaces and props contracts for the feature implementation.

---

## 1. Home Page Component

### File: `src/app/page.tsx`

No new props required. Component uses internal hooks:

```typescript
// Internal dependencies
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

// Behavior:
// - If isAuthenticated === true, redirect to /dashboard
// - Otherwise, render public home with role selection buttons
```

---

## 2. Login Page Component

### File: `src/app/login/page.tsx`

Uses `useSearchParams` for URL parameter access:

```typescript
// Internal dependencies
import { useSearchParams } from 'next/navigation';
import { normalizeAccessType } from '@/types/access.types';
import { getLoginContext } from '@/config/login-contexts';

// URL Contract:
// - /login                  → type = null    → context = caregiver
// - /login?type=caregiver   → type = caregiver → context = caregiver
// - /login?type=patient     → type = patient → context = patient
// - /login?type=<invalid>   → type = <invalid> → context = caregiver
```

---

## 3. AuthCard Component Enhancement

### File: `src/components/auth/auth-card.tsx`

Current props (no changes needed, but documenting for clarity):

```typescript
export interface AuthCardProps {
  title: string;           // Dynamic based on access type
  description: string;     // Dynamic based on access type
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

**Usage in Login Page**:
```tsx
const context = getLoginContext(accessType);

<AuthCard
  title={context.title}
  description={context.subtitle}
  footer={...}
>
  {/* form */}
</AuthCard>
```

---

## 4. Role Selection Button Props

### Pattern (inline, not a separate component):

```typescript
// Home page role selection buttons
interface RoleButtonConfig {
  type: AccessType;
  label: string;
  href: string;
  icon: LucideIcon;
  variant: 'default' | 'outline';
}

const ROLE_BUTTONS: RoleButtonConfig[] = [
  {
    type: 'caregiver',
    label: 'Sou cuidador / profissional',
    href: '/login?type=caregiver',
    icon: Stethoscope,
    variant: 'default',
  },
  {
    type: 'patient',
    label: 'Sou paciente',
    href: '/login?type=patient',
    icon: User,
    variant: 'outline',
  },
];
```

---

## 5. Type Exports Contract

### File: `src/types/access.types.ts` (new file)

```typescript
// Constants
export const VALID_ACCESS_TYPES: readonly ['caregiver', 'patient'];

// Types
export type AccessType = 'caregiver' | 'patient';
export type AccessTypeAll = AccessType | 'admin';

export interface LoginContext {
  type: AccessType;
  title: string;
  subtitle: string;
  icon: string;
}

// Functions
export function isValidAccessType(value: string | null): value is AccessType;
export function normalizeAccessType(value: string | null): AccessType;
```

---

## 6. Configuration Exports Contract

### File: `src/config/login-contexts.ts` (new file)

```typescript
// Constants
export const LOGIN_CONTEXTS: Record<AccessType, LoginContext>;

// Functions
export function getLoginContext(type: AccessType): LoginContext;
```

---

## 7. URL Contracts

### Home Page Links

| Element                   | Target URL                |
|---------------------------|---------------------------|
| Caregiver button          | `/login?type=caregiver`   |
| Patient button            | `/login?type=patient`     |
| Header "Entrar" button    | `/login` (unchanged)      |
| Header "Cadastrar" button | `/register` (unchanged)   |

### Login Page Query Parameters

| Parameter | Required | Values                        | Default     |
|-----------|----------|-------------------------------|-------------|
| `type`    | No       | `caregiver`, `patient`        | `caregiver` |

---

## 8. Middleware Contract

### File: `src/middleware.ts`

Current behavior (no changes needed):

```typescript
// Current matcher - does NOT include root '/'
export const config = {
  matcher: ['/dashboard/:path*', '/chat/:path*', '/login', '/register'],
};

// Behavior:
// - Protected pages redirect to /login if no token
// - Auth pages redirect to /dashboard if token exists
// - Home page (/) is not in matcher → client-side auth check
```

---

## Summary

| File                              | Action   | Description                               |
|-----------------------------------|----------|-------------------------------------------|
| `src/types/access.types.ts`       | Create   | Type definitions and validators           |
| `src/config/login-contexts.ts`    | Create   | Login context configuration               |
| `src/app/page.tsx`                | Modify   | Add role selection buttons, auth redirect |
| `src/app/login/page.tsx`          | Modify   | Dynamic title/subtitle from URL param     |
| `src/components/auth/auth-card.tsx`| None    | Already supports dynamic title/desc       |
| `src/middleware.ts`               | None     | No changes needed                         |
