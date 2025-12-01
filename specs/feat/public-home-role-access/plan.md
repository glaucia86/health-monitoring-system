# Implementation Plan: Public Home Page & Role-Based Login Flow

**Branch**: `feat/public-home-role-access` | **Date**: 2024-11-30 | **Spec**: N/A (PRD-derived feature)
**Input**: Feature specification derived from PRD_FEATURE_06.md

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a public home page with role-based access selection (Caregiver vs Patient) and update the login flow to interpret `type` URL parameter for context-aware login experience. Implementation uses existing Next.js App Router patterns, shadcn/ui components, and Tailwind CSS 4 design tokens.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.0.4, React 19.2.0  
**Primary Dependencies**: Tailwind CSS 4, shadcn/ui (Radix), Framer Motion 12.23.24, Zustand 5.0.8, React Hook Form 7.66.1, Zod 4.1.13, Lucide React 0.554.0  
**Storage**: N/A (client-only feature)  
**Testing**: Vitest (if configured), manual testing per quickstart.md  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: web (client/server structure - this feature is client-only)  
**Performance Goals**: <100ms LCP, 60 fps animations  
**Constraints**: Must work offline-capable for landing page, SSR-friendly  
**Scale/Scope**: 2 roles (caregiver, patient), 2 pages modified, 2 files created

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Evidence |
|------|--------|----------|
| **Library-First** | ✅ PASS | Uses existing shadcn/ui Button, lucide-react icons, next/navigation hooks |
| **Accessibility-First** | ✅ PASS | Radix primitives provide ARIA, keyboard navigation; semantic HTML structure |
| **Design System Consistency** | ✅ PASS | All colors from design-tokens.ts (oklch), spacing follows Tailwind scale |
| **Performance Standards** | ✅ PASS | No new dependencies; SSR-friendly; minimal JS for role selection |
| **Simplicity** | ✅ PASS | 2 new files, 2 modified files; no new patterns introduced |

**Re-check after Phase 1**: All gates remain PASS. Design artifacts confirm:
- Type definitions use simple union types, no external validation libraries
- Login context config is static object, no runtime complexity
- Component changes are additive, not architectural

## Project Structure

### Documentation (this feature)

```text
specs/feat/public-home-role-access/
├── plan.md              # This file
├── research.md          # Phase 0 output - 10 technology decisions
├── data-model.md        # Phase 1 output - AccessType, LoginContext
├── quickstart.md        # Phase 1 output - step-by-step implementation guide
├── contracts/           
│   └── components.md    # Phase 1 output - component interfaces
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
client/
├── src/
│   ├── app/
│   │   ├── page.tsx           # ✏️ MODIFY: Add role selection buttons
│   │   └── login/
│   │       └── page.tsx       # ✏️ MODIFY: Dynamic title/subtitle from URL
│   ├── config/
│   │   └── login-contexts.ts  # ✅ CREATE: LoginContext configuration
│   └── types/
│       └── access.types.ts    # ✅ CREATE: AccessType definitions
```

**Structure Decision**: Web application structure (client/server). This feature is client-only, modifying existing pages and adding 2 new configuration files. No backend changes required.

## Complexity Tracking

> No constitution violations. All gates passed.

| Metric | Target | Actual |
|--------|--------|--------|
| New files | ≤5 | 2 |
| Modified files | ≤5 | 2 |
| New dependencies | 0 | 0 |
| New patterns | 0 | 0 |

## Phase 0 Artifacts

- [research.md](./research.md) - 10 technology decisions documented

## Phase 1 Artifacts

- [data-model.md](./data-model.md) - Type definitions (AccessType, LoginContext)
- [contracts/components.md](./contracts/components.md) - Component interfaces and URL contracts
- [quickstart.md](./quickstart.md) - Step-by-step implementation guide

## Next Steps

Run `/speckit.tasks` to generate tasks.md with implementation task breakdown.
