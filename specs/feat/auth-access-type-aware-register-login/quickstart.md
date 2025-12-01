# Quickstart: Fluxo de Autenticação Sensível ao Tipo de Acesso

**Feature Branch**: `feat/auth-access-type-aware-register-login`  
**Date**: 2025-11-30  
**Status**: Ready for Implementation

---

## Overview

Este guia descreve os passos para implementar o fluxo de autenticação sensível ao tipo de acesso, permitindo que a jornada de login/cadastro mantenha o contexto do usuário (cuidador vs paciente).

---

## Prerequisites

- [ ] Branch `feat/auth-access-type-aware-register-login` checked out
- [ ] Dependencies instaladas (`npm install` em `client/` e `server/`)
- [ ] Servidor de desenvolvimento rodando

---

## Implementation Steps

### Step 1: Create Auth URL Helper (Frontend)

**File**: `client/src/lib/auth-url.ts`

```typescript
import { AccessType } from '@/types/access.types';

/**
 * Build authentication URLs with type parameter
 */
export function buildAuthUrl(path: '/login' | '/register', accessType: AccessType): string {
  return `${path}?type=${accessType}`;
}
```

---

### Step 2: Add RegisterContext Configuration (Frontend)

**File**: `client/src/config/login-contexts.ts`

Add after existing `loginContexts`:

```typescript
import { Stethoscope, User } from 'lucide-react';

export interface RegisterContext {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const registerContexts: Record<AccessType, RegisterContext> = {
  caregiver: {
    title: 'Criar conta de Cuidador',
    subtitle: 'Comece a monitorar pacientes em minutos',
    icon: Stethoscope,
  },
  patient: {
    title: 'Criar conta de Paciente',
    subtitle: 'Acompanhe sua saúde de forma simples',
    icon: User,
  },
};

export function getRegisterContext(accessType: AccessType): RegisterContext {
  return registerContexts[accessType] || registerContexts.caregiver;
}
```

---

### Step 3: Update Home Page URLs (Frontend)

**File**: `client/src/app/page.tsx`

Update header and CTA links:

```diff
// Header "Cadastrar" button
- <Link href="/register">Cadastrar</Link>
+ <Link href="/register?type=caregiver">Cadastrar</Link>

// CTA Section "Criar conta gratuita" button  
- <Link href="/register">
+ <Link href="/register?type=caregiver">
```

**Note**: Role cards already have correct URLs (`/login?type=caregiver` and `/login?type=patient`).

---

### Step 4: Make Register Page Context-Aware (Frontend)

**File**: `client/src/app/register/page.tsx`

```typescript
import { Suspense } from 'react';
import { normalizeAccessType } from '@/types/access.types';
import { getRegisterContext } from '@/config/login-contexts';
import { buildAuthUrl } from '@/lib/auth-url';

function RegisterContent({ searchParams }: { searchParams: { type?: string } }) {
  const accessType = normalizeAccessType(searchParams.type);
  const context = getRegisterContext(accessType);

  // Use context.title, context.subtitle, context.icon in JSX
  // Include accessType in form submission payload
  // Update "Já tem conta? Faça login" link to use buildAuthUrl('/login', accessType)
}

export default function RegisterPage({ searchParams }: { searchParams: { type?: string } }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterContent searchParams={searchParams} />
    </Suspense>
  );
}
```

---

### Step 5: Update Login Page Link (Frontend)

**File**: `client/src/app/login/page.tsx`

Update "Cadastre-se" link to preserve type:

```diff
- <Link href="/register">Cadastre-se</Link>
+ <Link href={buildAuthUrl('/register', accessType)}>Cadastre-se</Link>
```

---

### Step 6: Update Auth Service (Frontend)

**File**: `client/src/services/auth.service.ts`

Add accessType to register payload:

```typescript
interface RegisterData {
  email: string;
  password: string;
  name: string;
  birthdate: string;
  accessType?: 'caregiver' | 'patient';  // NEW
}

async register(data: RegisterData) {
  // Include accessType in API call
}
```

---

### Step 7: Update RegisterDto (Backend)

**File**: `server/src/auth/dto/register.dto.ts`

```typescript
import { IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  // ... existing fields ...

  @IsOptional()
  @IsIn(['caregiver', 'patient'])
  accessType?: 'caregiver' | 'patient';
}
```

---

### Step 8: Log AccessType for Telemetry (Backend)

**File**: `server/src/auth/auth.service.ts`

```typescript
async register(registerDto: RegisterDto) {
  // ... existing code ...

  // Log accessType for analytics
  if (registerDto.accessType) {
    this.logger.log(`User registered with accessType: ${registerDto.accessType}`);
    // Or use AuditService:
    // this.auditService.logRegistrationAccessType(user.id, registerDto.accessType);
  }

  // ... rest of registration ...
}
```

---

## Testing Checklist

### Manual Testing

- [ ] Home → Card Cuidador → "Entrar" → URL is `/login?type=caregiver`
- [ ] Home → Card Cuidador → Login page → "Cadastre-se" → URL is `/register?type=caregiver`
- [ ] Register page (caregiver) shows "Criar conta de Cuidador"
- [ ] Register page (patient) shows "Criar conta de Paciente"
- [ ] Form submission includes `accessType` in payload
- [ ] Direct `/login` (no type) defaults to caregiver context
- [ ] Direct `/register` (no type) defaults to caregiver context
- [ ] Invalid type (`?type=admin`) normalizes to caregiver

### API Testing

```bash
# Register as caregiver
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "birthdate": "1990-01-01",
    "accessType": "caregiver"
  }'

# Register as patient
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "password123",
    "name": "Patient User",
    "birthdate": "1985-05-15",
    "accessType": "patient"
  }'
```

---

## Success Criteria Verification

| Criteria | How to Verify |
|----------|---------------|
| SC-001: 100% paths preserve AccessType | Navigate all paths from Home → Login → Register |
| SC-002: Clear visual differentiation | Check titles/icons match selected type |
| SC-003: Old URLs work | Access `/login` and `/register` directly |
| SC-004: No breaking changes | Test existing caregiver login/register flow |
| SC-005: Telemetry captures accessType | Check server logs after registration |

---

## Rollback Plan

If issues are found:

1. Revert frontend changes (URLs and context-aware pages)
2. Backend DTO change is backward-compatible (optional field)
3. No database migrations to rollback
