# Quickstart Guide: UI/UX Modernization

**Date**: 2025-11-26  
**Branch**: feature/ui-ux-modernization

## Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Git

## 1. Install New Dependencies

```bash
cd client

# Animation library
pnpm add framer-motion

# Additional shadcn/ui components
pnpm dlx shadcn@latest add skeleton
pnpm dlx shadcn@latest add badge
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add tooltip
pnpm dlx shadcn@latest add separator
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add sheet
pnpm dlx shadcn@latest add command
pnpm dlx shadcn@latest add calendar
pnpm dlx shadcn@latest add progress
```

## 2. File Structure After Implementation

```
client/src/
├── app/
│   ├── globals.css          # Updated color palette
│   ├── layout.tsx            # Updated root layout
│   ├── (auth)/               # Auth route group
│   │   ├── layout.tsx        # AuthLayout
│   │   ├── login/page.tsx    # Updated login
│   │   └── register/page.tsx # Updated register
│   └── (app)/                # App route group
│       ├── layout.tsx        # MainLayout (Sidebar + Header)
│       ├── dashboard/page.tsx
│       ├── chat/page.tsx
│       └── ...
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── sidebar-nav-item.tsx
│   │   ├── header.tsx
│   │   ├── user-menu.tsx
│   │   ├── notification-bell.tsx
│   │   └── main-layout.tsx
│   ├── dashboard/
│   │   ├── stat-card.tsx
│   │   ├── alert-banner.tsx
│   │   ├── appointment-item.tsx
│   │   └── medication-item.tsx
│   ├── chat/
│   │   ├── message-bubble.tsx
│   │   ├── chat-input.tsx
│   │   ├── typing-indicator.tsx
│   │   └── document-list.tsx
│   ├── auth/
│   │   ├── auth-card.tsx
│   │   └── auth-illustration.tsx
│   ├── ui/                   # shadcn/ui components
│   └── shared/
│       ├── loading-skeleton.tsx
│       ├── empty-state.tsx
│       └── page-header.tsx
├── lib/
│   ├── motion.ts             # Animation variants
│   └── design-tokens.ts      # Color/spacing tokens
└── stores/
    └── ui.store.ts           # Sidebar, theme state
```

## 3. Implementation Order

### Phase 1: Foundation (Day 1)

1. **Update `globals.css`** with new color palette
2. **Create `lib/motion.ts`** with Framer Motion variants
3. **Create `lib/design-tokens.ts`** with design system
4. **Install shadcn/ui components**

### Phase 2: Layout (Day 2)

1. **Create `components/layout/sidebar.tsx`**
2. **Create `components/layout/header.tsx`**
3. **Create `stores/ui.store.ts`** for sidebar state
4. **Create route groups** `(auth)` and `(app)`
5. **Create layout files** for each route group

### Phase 3: Components (Day 3)

1. **Create `components/dashboard/stat-card.tsx`**
2. **Create `components/dashboard/alert-banner.tsx`**
3. **Create `components/shared/empty-state.tsx`**
4. **Create `components/shared/loading-skeleton.tsx`**

### Phase 4: Pages (Day 4)

1. **Update login/register** with AuthLayout
2. **Update dashboard** with new components
3. **Update chat** with improved bubbles

### Phase 5: Polish (Day 5)

1. Add animations to all pages
2. Test responsive behavior
3. Dark mode verification
4. Accessibility audit

## 4. Key Commands

```bash
# Development
cd client && pnpm dev

# Type checking
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build
```

## 5. Verification Checklist

- [ ] Colors render correctly in light/dark mode
- [ ] Sidebar collapses/expands smoothly
- [ ] All animations are smooth (60fps)
- [ ] Mobile responsive (< 768px)
- [ ] No layout shifts during loading
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] All forms have proper validation states
- [ ] Toast notifications appear correctly

## 6. Testing URLs

| Feature | URL | Expected |
|---------|-----|----------|
| Login | `/login` | Split layout, illustration |
| Register | `/register` | Multi-step form |
| Dashboard | `/dashboard` | Sidebar + stat cards |
| Chat | `/chat` | Chat bubbles + sidebar |

## 7. Rollback

If issues occur:

```bash
# Revert to previous commit
git revert HEAD --no-commit

# Or reset to main
git checkout main
```

---

## Notes

- All new components use `"use client"` directive
- Animation imports are lazy-loaded to reduce bundle
- Sidebar state persists in localStorage
