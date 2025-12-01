# Implementation Plan: Fluxo de Autenticação Sensível ao Tipo de Acesso

**Branch**: `feat/auth-access-type-aware-register-login` | **Date**: 2025-11-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/feat/auth-access-type-aware-register-login/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Garantir que a jornada de login e cadastro se mantenha coerente com a intenção inicial do usuário (cuidador vs paciente), desde a Home Pública até o dashboard, utilizando o conceito de `AccessType` já existente no sistema. A implementação foca em:

1. Atualizar URLs na Home Pública para incluir `?type=caregiver` ou `?type=patient`
2. Tornar a página de registro context-aware (já implementado em login)
3. Adicionar `accessType` opcional no DTO de registro do backend

## Technical Context

**Language/Version**: TypeScript 5.x (Frontend: React 19, Backend: Node.js)  
**Primary Dependencies**: 
- Frontend: Next.js 15 (App Router), Tailwind CSS 4, shadcn/ui, Framer Motion, Zustand, React Query
- Backend: NestJS 10.x, Prisma ORM, JWT  
**Storage**: PostgreSQL (via Prisma)  
**Testing**: Jest (backend), Vitest (frontend - when added)  
**Target Platform**: Web (Desktop + Mobile responsive)  
**Project Type**: Web application (monorepo: `client/` + `server/`)  
**Performance Goals**: Lighthouse >90, FCP <1.5s, LCP <2.5s  
**Constraints**: WCAG 2.1 AA compliance, SSR-compatible animations, <0.1 CLS  
**Scale/Scope**: ~20 screens, 2 access types (caregiver, patient)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Library-First** | ✅ PASS | Reutiliza componentes existentes (shadcn/ui Button, Card) e helpers (`normalizeAccessType`, `LoginContext`) |
| **II. Accessibility-First** | ✅ PASS | Links e botões já usam semântica correta; textos contextuais melhoram compreensão |
| **III. Design System Consistency** | ✅ PASS | Usa tokens de cor existentes (primary, muted); não introduz novas cores |
| **IV. Performance Standards** | ✅ PASS | Nenhum JS adicional significativo; apenas atualização de strings e URLs |
| **V. Simplicity (YAGNI)** | ✅ PASS | Usa query params em vez de rotas separadas; aproveita código existente |

**Gate Result**: ✅ PASS - Pode prosseguir para Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/feat/auth-access-type-aware-register-login/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── register.dto.ts  # Updated DTO contract
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
client/                           # Frontend Next.js 15
├── src/
│   ├── app/
│   │   ├── page.tsx             # [MODIFY] Home - update role card URLs
│   │   ├── login/
│   │   │   └── page.tsx         # [ALREADY DONE] Already reads ?type param
│   │   └── register/
│   │       └── page.tsx         # [MODIFY] Make context-aware
│   ├── components/
│   │   └── auth/                # [NO CHANGE] Existing components
│   ├── config/
│   │   └── login-contexts.ts    # [ALREADY DONE] LoginContext config exists
│   ├── lib/
│   │   └── auth-url.ts          # [CREATE] buildAuthUrl helper
│   ├── services/
│   │   └── auth.service.ts      # [MODIFY] Include accessType in payload
│   └── types/
│       └── access.types.ts      # [ALREADY DONE] AccessType definitions exist

server/                           # Backend NestJS
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   └── register.dto.ts  # [MODIFY] Add accessType field
│   │   └── auth.service.ts      # [MODIFY] Log accessType for telemetry
│   └── prisma/
│       └── schema.prisma        # [NO CHANGE] No schema changes needed
```

**Structure Decision**: Web application with `client/` (Next.js) and `server/` (NestJS) directories. Feature touches auth flow in both layers but requires minimal changes.

## Constitution Check (Post-Design)

*Re-evaluation after Phase 1 design completion*

| Principle | Status | Post-Design Notes |
|-----------|--------|-------------------|
| **I. Library-First** | ✅ PASS | `RegisterContext` reutiliza padrão de `LoginContext`; `buildAuthUrl` é helper reutilizável |
| **II. Accessibility-First** | ✅ PASS | Textos contextuais melhoram compreensão; nenhum novo componente visual |
| **III. Design System Consistency** | ✅ PASS | Usa mesmos ícones (Lucide) e estrutura de dados de LoginContext |
| **IV. Performance Standards** | ✅ PASS | Zero impacto - apenas strings e query params |
| **V. Simplicity (YAGNI)** | ✅ PASS | Minimal changes; máximo reuso de código existente |

**Post-Design Gate Result**: ✅ PASS - Pronto para Phase 2 (tasks)

---

## Complexity Tracking

> No Constitution violations - table not required.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
