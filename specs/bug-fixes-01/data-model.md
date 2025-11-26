# Data Model: Bug Fixes from Usability Testing

**Date**: 2025-11-26  
**Feature Branch**: `bug-fixes-01`

---

## 1. Overview

This bug fix batch does not introduce new database entities. It focuses on **client-side improvements** for form validation and UX enhancements.

---

## 2. Affected Data Structures

### 2.1 Form Validation Schemas (New - Client-side only)

These are Zod schemas for client-side validation, not database models.

#### Login Schema

```typescript
// Location: client/src/app/login/page.tsx (inline)
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

#### Register Schema

```typescript
// Location: client/src/app/register/page.tsx (inline)
import { z } from 'zod';

// CPF regex: 123.456.789-01
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .regex(cpfRegex, 'CPF inválido (formato: 123.456.789-01)'),
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
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
```

---

## 3. Utility Functions (New)

### 3.1 CPF Formatter

```typescript
// Location: client/src/lib/formatCpf.ts

/**
 * Formats a string as CPF (Brazilian ID)
 * Input: "12345678901" or partial
 * Output: "123.456.789-01" or partial formatted
 */
export function formatCPF(value: string): string {
  // Remove non-digits
  const digits = value.replace(/\D/g, '');
  
  // Limit to 11 digits
  const truncated = digits.slice(0, 11);
  
  // Apply mask progressively
  return truncated
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/**
 * Removes CPF mask for API submission
 * Input: "123.456.789-01"
 * Output: "12345678901"
 */
export function unformatCPF(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validates CPF format (not checksum)
 */
export function isValidCPFFormat(value: string): boolean {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
}
```

### 3.2 ID Truncator

```typescript
// Location: client/src/lib/utils.ts (add to existing)

/**
 * Truncates a string ID for display
 * Shows first N and last N characters with ellipsis
 */
export function truncateId(id: string, showChars: number = 8): string {
  if (id.length <= showChars * 2 + 3) return id;
  return `${id.slice(0, showChars)}...${id.slice(-showChars)}`;
}
```

---

## 4. State Changes

### 4.1 Form Error State

React Hook Form manages error state internally. The following changes in component state:

#### Before (Login)
```typescript
const [formData, setFormData] = useState({
  email: '',
  password: '',
});
```

#### After (Login)
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
// errors.email?.message, errors.password?.message
```

#### Before (Register)
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  cpf: '',
  birthdate: '',
  phone: '',
  password: '',
});
```

#### After (Register)
```typescript
const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),
});
// errors.name?.message, errors.email?.message, etc.
```

---

## 5. API Contracts

### 5.1 No Changes to API

The backend API contracts remain unchanged. The fixes are purely client-side:

| Endpoint | Method | Changes |
|----------|--------|---------|
| `/auth/login` | POST | None - client validates before sending |
| `/auth/register` | POST | None - CPF sent without mask (digits only) |

---

## 6. Component Props

### 6.1 Error Message Display Pattern

```typescript
// Pattern for displaying field errors
interface FieldErrorProps {
  message?: string;
}

// Usage in JSX
{errors.fieldName && (
  <p className="text-sm text-destructive mt-1" role="alert">
    {errors.fieldName.message}
  </p>
)}
```

---

## 7. Migration Notes

**No database migrations required** - all changes are client-side only.

---

## 8. Entity Relationship Diagram

```
No changes to database schema.

This bug fix affects only:
┌─────────────────────────────────────────┐
│            CLIENT SIDE ONLY             │
├─────────────────────────────────────────┤
│  ┌─────────────┐    ┌────────────────┐  │
│  │ Login Form  │    │ Register Form  │  │
│  │ + Zod       │    │ + Zod          │  │
│  │ + RHF       │    │ + RHF          │  │
│  │ + Errors    │    │ + CPF Mask     │  │
│  └─────────────┘    │ + Errors       │  │
│                     └────────────────┘  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Chat Page                       │    │
│  │ + Truncate conversation ID      │    │
│  │ + Copy to clipboard button      │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```
