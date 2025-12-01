# Data Model: Fluxo de Autenticação Sensível ao Tipo de Acesso

**Feature Branch**: `feat/auth-access-type-aware-register-login`  
**Date**: 2025-11-30  
**Status**: Complete

---

## Overview

Esta feature não introduz novas entidades no banco de dados. O `accessType` é um conceito de UX separado do `Role` do Prisma. Esta documentação descreve os modelos de dados em uso e suas relações.

---

## Entities

### 1. AccessType (Frontend Only)

**Definição**: Tipo de acesso escolhido pelo usuário na jornada de autenticação.

| Field | Type | Description |
|-------|------|-------------|
| value | `'caregiver' \| 'patient'` | Tipo de acesso normalizado |

**Notas**:
- Não é persistido no banco de dados
- Usado para UX e telemetria
- Normalizado via `normalizeAccessType()` helper

**Localização**: `client/src/types/access.types.ts`

```typescript
export const VALID_ACCESS_TYPES = ['caregiver', 'patient'] as const;
export type AccessType = (typeof VALID_ACCESS_TYPES)[number];
```

---

### 2. LoginContext (Frontend Only)

**Definição**: Configuração visual para páginas de autenticação baseada no AccessType.

| Field | Type | Description |
|-------|------|-------------|
| title | `string` | Título principal da página |
| subtitle | `string` | Subtítulo/descrição |
| icon | `LucideIcon` | Ícone do Lucide React |
| color | `string` (optional) | Classe de cor Tailwind |

**Localização**: `client/src/config/login-contexts.ts`

```typescript
export interface LoginContext {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color?: string;
}
```

---

### 3. RegisterContext (Frontend Only - Novo)

**Definição**: Configuração visual para página de registro baseada no AccessType.

| Field | Type | Description |
|-------|------|-------------|
| title | `string` | Título da página de registro |
| subtitle | `string` | Descrição/call-to-action |
| icon | `LucideIcon` | Ícone do Lucide React |

**Proposta de implementação**:
```typescript
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
```

---

### 4. User (Existente - Sem alterações)

**Definição**: Entidade principal de autenticação no Prisma.

| Field | Type | Description |
|-------|------|-------------|
| id | `String (UUID)` | Identificador único |
| email | `String` | Email único do usuário |
| password | `String` | Senha hasheada (bcrypt) |
| name | `String` | Nome completo |
| role | `Role` | Role do Prisma (ADMIN, VIEWER, DOCTOR) |
| createdAt | `DateTime` | Data de criação |
| updatedAt | `DateTime` | Última atualização |

**Nota**: `accessType` **não** é persistido na tabela `User`. O campo `role` do Prisma permanece separado.

---

### 5. RegisterDto (Backend - Modificação)

**Definição**: DTO para requisição de registro de usuário.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | `string` | ✅ | Email do usuário |
| password | `string` | ✅ | Senha (min 6 chars) |
| name | `string` | ✅ | Nome completo |
| birthdate | `string` | ✅ | Data de nascimento |
| role | `string` | ❌ | Role (default: VIEWER) |
| **accessType** | `'caregiver' \| 'patient'` | ❌ | **NOVO** - Tipo de acesso para métricas |

**Validação proposta**:
```typescript
@IsOptional()
@IsIn(['caregiver', 'patient'])
accessType?: 'caregiver' | 'patient';
```

---

## Relationships

```
┌─────────────────┐     ┌─────────────────┐
│   AccessType    │────▶│  LoginContext   │
│   (UX concept)  │     │  (Config)       │
└─────────────────┘     └─────────────────┘
        │                       
        │               ┌─────────────────┐
        └──────────────▶│ RegisterContext │
                        │  (Config)       │
                        └─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│   RegisterDto   │────▶│      User       │
│   (API Input)   │     │   (Database)    │
│   + accessType  │     │   (no change)   │
└─────────────────┘     └─────────────────┘
```

---

## Validation Rules

### AccessType
- Must be one of: `'caregiver'`, `'patient'`
- Default: `'caregiver'` (via `normalizeAccessType`)
- Case-insensitive normalization

### RegisterDto.accessType
- Optional field
- If provided, must be `'caregiver'` or `'patient'`
- Validated via `@IsIn` decorator (class-validator)

---

## State Transitions

### URL Flow with AccessType

```
[Home Page]
    │
    ├─ Card "Sou Cuidador" ──▶ /login?type=caregiver
    │                              │
    │                              ├─ "Cadastre-se" ──▶ /register?type=caregiver
    │                              │
    │                              └─ Submit ──▶ API register { accessType: 'caregiver' }
    │
    └─ Card "Sou Paciente" ──▶ /login?type=patient
                                   │
                                   ├─ "Cadastre-se" ──▶ /register?type=patient
                                   │
                                   └─ Submit ──▶ API register { accessType: 'patient' }
```

---

## Notes

1. **AccessType vs Role**: São conceitos separados. `AccessType` é para UX/métricas, `Role` é para autorização.
2. **Sem migração**: Nenhuma alteração no schema Prisma é necessária.
3. **Backward compatible**: URLs sem `?type` usam default `'caregiver'`.
