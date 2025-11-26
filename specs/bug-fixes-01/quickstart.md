# Quickstart Guide: Bug Fixes from Usability Testing

**Date**: 2025-11-26  
**Branch**: `bug-fixes-01`

---

## Prerequisites

- Node.js 18+
- pnpm (or npm)
- Git
- Backend running on localhost:3001

---

## 1. Setup

```bash
# Ensure you're on the correct branch
git checkout bug-fixes-01

# Install dependencies (none new required)
cd client && pnpm install
```

**Note**: All required dependencies are already installed:
- `react-hook-form@7.66.1`
- `zod@4.1.13`
- `@hookform/resolvers@5.2.2`

---

## 2. Files to Create

### 2.1 CPF Formatter Utility

**File**: `client/src/lib/formatCpf.ts`

```typescript
/**
 * CPF Formatting Utilities
 * Brazilian Individual Taxpayer Registry (CPF) mask and validation
 */

/**
 * Formats a string as CPF (Brazilian ID)
 * @param value - Raw input string
 * @returns Formatted CPF string (xxx.xxx.xxx-xx)
 */
export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/**
 * Removes CPF mask for API submission
 * @param value - Formatted CPF string
 * @returns Raw digits only
 */
export function unformatCPF(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validates CPF format (not checksum)
 * @param value - CPF string to validate
 * @returns true if format is valid
 */
export function isValidCPFFormat(value: string): boolean {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
}
```

---

## 3. Files to Modify

### 3.1 Add truncateId to utils.ts

**File**: `client/src/lib/utils.ts`

Add the following function:

```typescript
/**
 * Truncates a string ID for display
 * @param id - Full ID string
 * @param showChars - Number of chars to show on each side (default: 8)
 * @returns Truncated string with ellipsis
 */
export function truncateId(id: string, showChars: number = 8): string {
  if (id.length <= showChars * 2 + 3) return id;
  return `${id.slice(0, showChars)}...${id.slice(-showChars)}`;
}
```

### 3.2 Login Page

**File**: `client/src/app/login/page.tsx`

Key changes:
1. Replace `useState` with `useForm`
2. Add Zod validation schema
3. Display error messages below fields

### 3.3 Register Page

**File**: `client/src/app/register/page.tsx`

Key changes:
1. Replace `useState` with `useForm`
2. Add Zod validation schema with CPF regex
3. Add CPF onChange handler with `formatCPF`
4. Display error messages below fields
5. Strip CPF mask before API call

### 3.4 Chat Page

**File**: `client/src/app/chat/page.tsx`

Key changes:
1. Import `truncateId` from utils
2. Add copy-to-clipboard functionality
3. Show truncated ID with copy button

---

## 4. Validation Schemas Reference

### Login Schema

```typescript
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória'),
});
```

### Register Schema

```typescript
import { z } from 'zod';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const registerSchema = z.object({
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
```

---

## 5. Error Display Pattern

```tsx
{/* Standard error message display */}
{errors.fieldName && (
  <p 
    className="text-sm text-destructive mt-1" 
    role="alert"
    id="fieldName-error"
  >
    {errors.fieldName.message}
  </p>
)}

{/* Input with error state */}
<Input
  {...register('fieldName')}
  aria-invalid={!!errors.fieldName}
  aria-describedby={errors.fieldName ? 'fieldName-error' : undefined}
  className={errors.fieldName ? 'border-destructive' : ''}
/>
```

---

## 6. Testing Commands

```bash
# Start development server
cd client && pnpm dev

# Open in browser
# http://localhost:3000/login
# http://localhost:3000/register
# http://localhost:3000/chat
```

---

## 7. Manual Test Checklist

### Login Page (/login)

- [ ] Submit empty form → Shows 2 error messages
- [ ] Enter invalid email → Shows "Email inválido"
- [ ] Enter valid credentials → Redirects to dashboard

### Register Page (/register)

- [ ] Submit empty form → Shows 6 error messages
- [ ] Type "12345678901" in CPF → Shows "123.456.789-01"
- [ ] Submit with incomplete CPF → Shows CPF error
- [ ] Complete registration → Redirects successfully

### Chat Page (/chat)

- [ ] Resize to mobile (375px) → ID truncates
- [ ] Click copy button → Shows success feedback
- [ ] Paste in notepad → Full ID is copied

---

## 8. Accessibility Verification

- [ ] Tab through forms - focus order is logical
- [ ] Submit invalid form - focus moves to first error
- [ ] Screen reader announces error messages
- [ ] Error messages disappear when field is corrected

---

## 9. Rollback

```bash
# If issues occur, revert to main
git checkout main

# Or revert the commit
git revert HEAD
```

---

## 10. Files Summary

| Action | File | Description |
|--------|------|-------------|
| CREATE | `lib/formatCpf.ts` | CPF formatting utilities |
| MODIFY | `lib/utils.ts` | Add truncateId function |
| MODIFY | `app/login/page.tsx` | Add form validation |
| MODIFY | `app/register/page.tsx` | Add validation + CPF mask |
| MODIFY | `app/chat/page.tsx` | Truncate ID + copy button |
