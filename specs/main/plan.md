# Implementation Plan: UI/UX Layout Modernization

**Branch**: `main` | **Date**: 2025-11-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/main/spec.md`

## Summary

Modernizar a UI/UX da aplicação de monitoramento de saúde, implementando um design system consistente com paleta de cores voltada para saúde, componentes visuais atraentes, animações suaves e micro-interações. O foco é criar uma experiência mais acolhedora e profissional para familiares/cuidadores de pacientes com câncer.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+  
**Primary Dependencies**: Next.js 15, React 19, Tailwind CSS 4, shadcn/ui (new-york), Framer Motion  
**Storage**: N/A (apenas frontend)  
**Testing**: Jest + React Testing Library  
**Target Platform**: Web (Desktop-first, Mobile-responsive)  
**Project Type**: Web application (monorepo frontend/backend)  
**Performance Goals**: Lighthouse Score > 90, FCP < 1.5s, LCP < 2.5s  
**Constraints**: WCAG 2.1 AA compliance, SSR-compatible animations  
**Scale/Scope**: 6 páginas principais, ~15 novos componentes, 1 design system

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| Library-First | ✅ Pass | Reusable components in `/components/` |
| Accessibility-First | ✅ Pass | WCAG 2.1 AA compliance required |
| Design System Consistency | ✅ Pass | Design tokens in `contracts/design-tokens.md` |
| Performance Standards | ✅ Pass | Lighthouse Performance > 90, FCP < 1.5s, LCP < 2.5s |
| Simplicity | ✅ Pass | Using existing libraries (shadcn/ui, Framer Motion) |

> **Post Phase-1 Re-check**: All gates passed. Constitution.md now fully configured with project principles.

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (component architecture)
├── quickstart.md        # Phase 1 output
└── contracts/           # Phase 1 output (design tokens, component API)
```

### Source Code (repository root)

```text
client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Design tokens (Tailwind CSS variables)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home redirect
│   │   ├── login/              # Auth pages
│   │   ├── register/
│   │   ├── dashboard/
│   │   └── chat/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui base components
│   │   ├── layout/             # NEW: Layout components
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── main-layout.tsx
│   │   ├── dashboard/          # NEW: Dashboard components
│   │   │   ├── stat-card.tsx
│   │   │   ├── alert-banner.tsx
│   │   │   └── timeline.tsx
│   │   ├── chat/               # NEW: Chat components
│   │   │   ├── message-bubble.tsx
│   │   │   └── typing-indicator.tsx
│   │   └── shared/             # NEW: Shared components
│   │       ├── empty-state.tsx
│   │       └── skeleton.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── motion.ts           # NEW: Framer Motion variants
│   └── styles/
│       └── animations.css      # NEW: CSS animations
└── tests/
    └── components/             # Component tests
```

**Structure Decision**: Web application structure using existing `client/` folder with Next.js App Router. New components organized by domain (layout, dashboard, chat, shared).

## Complexity Tracking

> No constitution violations identified. Implementation uses existing patterns and established libraries.

| Item | Justification |
|------|---------------|
| Framer Motion | Standard library for React animations, SSR-compatible |
| Additional shadcn/ui components | Official components, consistent with existing setup |
