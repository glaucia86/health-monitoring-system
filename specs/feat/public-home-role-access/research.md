# Research: Public Home Page & Role-Based Login Flow

**Date**: 2024-11-30  
**Feature Branch**: `feat/public-home-role-access`

## 1. URL Query Parameter Handling in Next.js 15 App Router

### Decision: Use `useSearchParams()` hook from `next/navigation`

### Rationale
- Native Next.js solution for reading URL query parameters in Client Components
- Automatically handles SSR/CSR boundary correctly
- Provides reactive updates when URL changes
- Returns `URLSearchParams` instance for easy manipulation

### Pattern
```typescript
'use client';
import { useSearchParams } from 'next/navigation';

function LoginPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'caregiver';
}
```

### Alternatives Considered
- **Server-side `searchParams` prop**: Rejected - login page requires client-side interactivity
- **Manual `window.location` parsing**: Rejected - breaks SSR, not React-idiomatic

---

## 2. Login Context Configuration Pattern

### Decision: Static configuration object with type-based lookup

### Rationale
- Simple, maintainable, easy to extend for future types (admin)
- Type-safe with TypeScript
- No external dependencies
- Easy to internationalize later

### Pattern
```typescript
const LOGIN_CONTEXTS = {
  caregiver: {
    title: 'Acesso do Cuidador',
    subtitle: 'Gerencie pacientes, relatórios e monitoramento diário.',
  },
  patient: {
    title: 'Acesso do Paciente',
    subtitle: 'Consulte informações importantes sobre sua saúde com segurança.',
  },
} as const;

type AccessType = keyof typeof LOGIN_CONTEXTS;
```

### Alternatives Considered
- **Database-driven config**: Rejected - over-engineering for static content
- **Context API**: Rejected - unnecessary complexity for single-page state

---

## 3. Invalid Type Parameter Handling

### Decision: Fallback to 'caregiver' with visual indicator for invalid types

### Rationale
- Maintains backward compatibility (original requirement)
- Prevents broken user experience
- Simple redirect could confuse users who manually typed URL
- Showing selection options adds complexity without clear benefit

### Pattern
```typescript
const VALID_TYPES = ['caregiver', 'patient'] as const;

function normalizeType(type: string | null): AccessType {
  const normalized = type?.toLowerCase();
  return VALID_TYPES.includes(normalized as AccessType) 
    ? (normalized as AccessType) 
    : 'caregiver';
}
```

### Alternatives Considered
- **Redirect to home**: Rejected - disruptive to user who may have typo
- **Show type selector on login page**: Rejected - adds complexity, home already does this

---

## 4. Authenticated User Redirect on Home Page

### Decision: Client-side redirect using `useRouter` and `useAuthStore`

### Rationale
- Current middleware only protects `/dashboard` and `/chat`
- Home page at `/` is not in middleware matcher
- Zustand store already tracks authentication state
- Keeps auth logic consistent with existing patterns

### Pattern
```typescript
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';

function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);
}
```

### Alternatives Considered
- **Middleware redirect**: Viable but would require middleware changes; current approach is simpler
- **Server Component check**: Rejected - auth state is in client-side Zustand store

---

## 5. Component Architecture for Home Page

### Decision: Refactor existing `page.tsx` with enhanced hero section

### Rationale
- Home page already exists with good structure
- Keep changes minimal and focused
- Reuse existing Button component and design tokens
- Hero section modification is the primary change needed

### Key Changes
1. Update hero section with role-selection buttons
2. Add visual distinction between caregiver and patient buttons
3. Maintain existing header/footer structure
4. Keep feature cards (optional - for visual appeal)

### Alternatives Considered
- **Complete redesign**: Rejected - existing page is already well-structured
- **Separate landing page route**: Rejected - complicates routing unnecessarily

---

## 6. Button Styling for Role Selection

### Decision: Use existing Button variants with custom icon pairing

### Rationale
- Follows Design System Consistency principle from constitution
- Uses existing shadcn/ui Button component
- Lucide icons for visual differentiation
- Primary variant for caregiver (main flow), outline for patient

### Pattern
```tsx
<Button size="lg" asChild className="gap-2">
  <Link href="/login?type=caregiver">
    <Stethoscope className="h-5 w-5" />
    Sou cuidador / profissional
  </Link>
</Button>

<Button size="lg" variant="outline" asChild className="gap-2">
  <Link href="/login?type=patient">
    <User className="h-5 w-5" />
    Sou paciente
  </Link>
</Button>
```

---

## 7. Responsive Design Strategy

### Decision: Mobile-first with flexbox column-to-row pattern

### Rationale
- Follows Mobile-First Responsive principle from constitution
- Standard Tailwind responsive pattern
- Buttons stack on mobile, side-by-side on desktop

### Pattern
```tsx
<div className="flex flex-col sm:flex-row gap-4">
  {/* Buttons */}
</div>
```

---

## 8. Accessibility Considerations

### Decision: Ensure ARIA compliance and keyboard navigation

### Rationale
- Constitution mandates WCAG 2.1 AA compliance
- Buttons are inherently accessible when using native elements
- Focus management handled by Next.js Link component

### Checklist
- [x] Buttons use semantic `<a>` tags via `asChild` + `Link`
- [x] Color contrast meets 4.5:1 ratio (using design tokens)
- [x] Icons have `aria-hidden` by default (Lucide behavior)
- [x] Page title updates for login variations (consider adding)

---

## 9. Framer Motion Animations

### Decision: Apply subtle entrance animations consistent with existing patterns

### Rationale
- Constitution allows Framer Motion for complex animations
- Existing login page uses `staggerContainer` and `staggerItem`
- Keep animations subtle and SSR-compatible

### Pattern
```tsx
import { m } from '@/lib/motion-provider';
import { staggerContainer, staggerItem } from '@/lib/motion';

<m.div variants={staggerContainer} initial="hidden" animate="visible">
  <m.div variants={staggerItem}>{/* content */}</m.div>
</m.div>
```

---

## 10. Testing Strategy

### Decision: Manual testing with defined test cases

### Rationale
- No existing E2E testing framework in project
- Feature is primarily UI/UX focused
- Clear acceptance criteria enable manual verification

### Test Cases
1. Access `/` → see home with role selection buttons
2. Click caregiver button → `/login?type=caregiver` with correct title
3. Click patient button → `/login?type=patient` with correct title
4. Direct access `/login` → treated as caregiver
5. Access `/login?type=invalid` → fallback to caregiver
6. Access `/login?type=CAREGIVER` → normalized to caregiver
7. Authenticated user at `/` → redirected to dashboard
8. Responsive check at 320px, 768px, 1280px widths

---

## Summary

All clarifications resolved. Key decisions:
- URL params via `useSearchParams()` hook
- Static config object for login contexts
- Fallback to caregiver for invalid/missing type
- Client-side auth redirect on home page
- Refactor existing home page rather than rebuild
- Follow existing animation and component patterns
