# Quickstart: Public Home Page & Role-Based Login Flow

**Feature Branch**: `feat/public-home-role-access`  
**Estimated Time**: 2-3 hours

## Prerequisites

- Node.js 18+
- pnpm/npm/yarn
- Project cloned and dependencies installed

## Quick Setup

```bash
# 1. Switch to feature branch
git checkout feat/public-home-role-access

# 2. Install dependencies (if needed)
cd client
npm install

# 3. Start development server
npm run dev
```

## Implementation Order

### Step 1: Create Type Definitions (15 min)

Create `src/types/access.types.ts`:

```typescript
export const VALID_ACCESS_TYPES = ['caregiver', 'patient'] as const;
export type AccessType = typeof VALID_ACCESS_TYPES[number];

export interface LoginContext {
  type: AccessType;
  title: string;
  subtitle: string;
  icon: string;
}

export function isValidAccessType(value: string | null): value is AccessType {
  return VALID_ACCESS_TYPES.includes(value as AccessType);
}

export function normalizeAccessType(value: string | null): AccessType {
  const normalized = value?.toLowerCase();
  return isValidAccessType(normalized) ? normalized : 'caregiver';
}
```

### Step 2: Create Login Configuration (10 min)

Create `src/config/login-contexts.ts`:

```typescript
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
};

export function getLoginContext(type: AccessType): LoginContext {
  return LOGIN_CONTEXTS[type];
}
```

### Step 3: Update Home Page (30 min)

Modify `src/app/page.tsx`:

1. Add `useRouter` and `useEffect` for auth redirect
2. Replace CTA buttons with role selection buttons
3. Add icons: `Stethoscope`, `User` from lucide-react

Key changes:
- Add redirect effect for authenticated users
- Update hero buttons to link to `/login?type=caregiver` and `/login?type=patient`

### Step 4: Update Login Page (45 min)

Modify `src/app/login/page.tsx`:

1. Import `useSearchParams` from `next/navigation`
2. Import type utilities and config
3. Get `type` param and normalize it
4. Get context from config
5. Pass dynamic title/description to `AuthCard`

Key changes:
```typescript
const searchParams = useSearchParams();
const accessType = normalizeAccessType(searchParams.get('type'));
const context = getLoginContext(accessType);

<AuthCard
  title={context.title}
  description={context.subtitle}
  // ... rest
>
```

### Step 5: Test All Scenarios (30 min)

| Test Case | URL | Expected Result |
|-----------|-----|-----------------|
| Home page | `/` | Shows role selection buttons |
| Auth redirect | `/` (logged in) | Redirects to `/dashboard` |
| Caregiver login | `/login?type=caregiver` | Shows "Acesso do Cuidador" |
| Patient login | `/login?type=patient` | Shows "Acesso do Paciente" |
| Direct login | `/login` | Shows caregiver context |
| Invalid type | `/login?type=xyz` | Falls back to caregiver |
| Case insensitive | `/login?type=PATIENT` | Shows patient context |

### Step 6: Responsive Check (15 min)

Test at these breakpoints:
- Mobile: 320px, 375px
- Tablet: 768px
- Desktop: 1024px, 1280px

## Files Changed Summary

| File | Action |
|------|--------|
| `src/types/access.types.ts` | ✅ Create |
| `src/config/login-contexts.ts` | ✅ Create |
| `src/app/page.tsx` | ✅ Modify |
| `src/app/login/page.tsx` | ✅ Modify |

## Common Issues

### `useSearchParams` causing hydration error

Wrap component with `Suspense` if needed:
```tsx
import { Suspense } from 'react';

function LoginPageContent() { /* component using useSearchParams */ }

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginPageContent />
    </Suspense>
  );
}
```

### Auth redirect loop

Ensure `useEffect` dependencies are correct:
```typescript
useEffect(() => {
  if (isAuthenticated) {
    router.replace('/dashboard');
  }
}, [isAuthenticated, router]);
```

## Definition of Done

- [ ] Home page shows role selection buttons
- [ ] Caregiver button → `/login?type=caregiver`
- [ ] Patient button → `/login?type=patient`
- [ ] Login page title/subtitle changes based on type
- [ ] `/login` without params shows caregiver context
- [ ] Invalid type falls back to caregiver
- [ ] Authenticated users redirected from home to dashboard
- [ ] Responsive on all breakpoints
- [ ] No TypeScript errors
- [ ] No console errors
