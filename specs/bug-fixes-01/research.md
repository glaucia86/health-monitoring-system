# Research: Bug Fixes from Usability Testing

**Date**: 2025-01-27  
**Feature Branch**: `bug-fixes-01`  
**Source**: Playwright MCP Usability Testing Report  
**Status**: Complete

---

## 1. Research Summary

This document consolidates research findings for fixing usability issues identified during automated testing with Playwright MCP browser automation.

---

## 2. Issue Analysis

### 2.1 CPF Input Mask (High Priority)

**Problem**: CPF field in registration form lacks automatic formatting (xxx.xxx.xxx-xx)

**Research Findings**:

| Approach | Library | Bundle Size | Pros | Cons |
|----------|---------|-------------|------|------|
| Custom Hook | None | 0 KB | Full control, no dependency | More code to maintain |
| react-input-mask | `react-input-mask` | ~5 KB | Simple API | Not maintained, React 19 issues |
| react-imask | `imask` + `react-imask` | ~15 KB | Powerful, well-maintained | Larger bundle |
| Vanilla regex | None | 0 KB | Lightweight | Manual implementation |

**Decision**: Custom utility function with vanilla regex
- **Rationale**: Zero bundle impact, full control, aligns with Constitution principle of simplicity (YAGNI)
- **Alternatives Rejected**: 
  - `react-input-mask`: Compatibility concerns with React 19
  - `react-imask`: Overkill for single CPF field

**Implementation Pattern**:
```typescript
// Mask: 123.456.789-00
const formatCPF = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};
```

---

### 2.2 Form Validation Error Messages (High Priority)

**Problem**: Login and Register forms don't display validation error messages when submitting with invalid/empty fields

**Current Behavior Analysis**:
- Forms use native HTML5 `required` attribute
- No visual feedback for validation errors
- Error messages only appear via toast on API error (after submission)

**Dependency Check** ✅:
```json
// Already installed in package.json:
"@hookform/resolvers": "^5.2.2",
"react-hook-form": "^7.66.1", 
"zod": "^4.1.13"
```

**Decision**: React Hook Form + Zod (already installed)
- **Rationale**: 
  - Dependencies already present - no new installations needed
  - Type-safe validation schemas
  - Built-in error handling and field states
  - Industry standard for React forms

**Implementation Pattern**:
```typescript
// Zod schema for login
const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Zod schema for register
const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  cpf: z.string().min(14, 'CPF inválido').regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido'),
  birthdate: z.string().min(1, 'Data de nascimento é obrigatória'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
```

---

### 2.3 Conversation ID Display on Mobile (Medium Priority)

**Problem**: Conversation ID is too long for mobile viewport (375x667)

**Current Implementation**:
```tsx
<p className="text-xs font-mono text-foreground break-all bg-muted/50 p-2 rounded">
  {conversationId}
</p>
```

**Research Findings**:

| Approach | UX Impact | Complexity |
|----------|-----------|------------|
| Truncate with ellipsis | Good | Low |
| Show first/last 8 chars | Good | Low |
| Collapsible/expandable | Better | Medium |
| Hide on mobile | Acceptable | Low |
| Copy button only | Best | Low |

**Decision**: Truncate with copy button
- **Rationale**: 
  - Users rarely need to read full ID
  - Copy-to-clipboard provides full access when needed
  - Minimal UI footprint on mobile
- **Alternatives Rejected**:
  - Hide on mobile: Users might want to reference ID for support
  - Collapsible: Over-engineering for minor feature

**Implementation Pattern**:
```typescript
const truncateId = (id: string, maxLength: number = 20) => {
  if (id.length <= maxLength) return id;
  return `${id.slice(0, 8)}...${id.slice(-8)}`;
};
```

---

### 2.4 Mobile Document Panel (Low Priority - Deferred)

**Problem**: Document upload panel takes up valuable space on mobile chat view

**Decision**: Defer to future enhancement
- **Rationale**: 
  - Current implementation is functional
  - Would require significant UX redesign
  - Not a bug, more of an enhancement
  - Out of scope for bug-fixes-01

---

## 3. Components to Create/Modify

### New Files

| File | Path | Purpose |
|------|------|---------|
| `formatCpf.ts` | `lib/formatCpf.ts` | CPF formatting utility |

### Modified Files

| File | Path | Changes |
|------|------|---------|
| Login Page | `app/login/page.tsx` | Add RHF + Zod validation with error display |
| Register Page | `app/register/page.tsx` | Add RHF + Zod validation + CPF mask |
| Chat Page | `app/chat/page.tsx` | Truncate conversation ID, add copy button |

---

## 4. Accessibility Considerations

Per Constitution requirements (WCAG 2.1 AA):

- ✅ Error messages must be announced to screen readers (`aria-describedby`)
- ✅ Error states must have sufficient color contrast (use `text-destructive`)
- ✅ Form fields must have proper `aria-invalid` attribute when in error
- ✅ Focus must move to first error field on submit (RHF handles this)

---

## 5. Testing Validation

### Playwright Test Scenarios

| Scenario | Expected Result |
|----------|-----------------|
| Submit login with empty email | Show "Email é obrigatório" error |
| Submit login with invalid email | Show "Email inválido" error |
| Submit login with empty password | Show "Senha é obrigatória" error |
| Type CPF in register | Show formatted as "123.456.789-01" |
| Submit register with incomplete CPF | Show "CPF inválido" error |
| View conversation ID on mobile | Show truncated ID with copy button |
| Click copy button | Copy full ID to clipboard |

---

## 6. Open Questions - RESOLVED

| Question | Resolution |
|----------|------------|
| CPF validation: Server-side or client-side? | Client-side mask + validation, server accepts raw digits |
| Phone field mask needed? | Out of scope for this bug fix |
| Password strength requirements? | Minimum 6 characters (existing backend validation) |
| Dependencies needed? | None - RHF, Zod, @hookform/resolvers already installed |

---

## Summary of Decisions

| Issue | Decision | Complexity | Priority |
|-------|----------|------------|----------|
| CPF Mask | Custom formatCpf utility | Low | High |
| Form Validation | RHF + Zod (existing deps) | Medium | High |
| Conversation ID | Truncate + Copy button | Low | Medium |
| Document Panel | Deferred | N/A | Deferred |
