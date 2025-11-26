# Tasks: UI/UX Layout Modernization

**Input**: Design documents from `/specs/main/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Tests**: Not explicitly requested in spec - test tasks NOT included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `client/src/` (frontend only for this feature)
- Paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependencies installation, and design system foundation

- [X] T001 Install framer-motion dependency in client/package.json
  - **Acceptance**: `framer-motion@^10.x` in package.json, `npm install` succeeds
- [X] T002 Install additional shadcn/ui components (skeleton, badge, tabs, dropdown-menu, tooltip, separator, dialog, sheet, progress, command) in client/
  - **Acceptance**: All 10 components exist in `client/src/components/ui/`
- [X] T003 [P] Create lib/motion.ts with Framer Motion variants in client/src/lib/motion.ts
- [X] T004 [P] Create lib/design-tokens.ts with color/spacing tokens in client/src/lib/design-tokens.ts
- [X] T005 [P] Update globals.css with new healthcare-focused color palette (Teal primary) in client/src/app/globals.css
- [X] T006 [P] Create stores/ui.store.ts for sidebar and theme state management in client/src/stores/ui.store.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout components that MUST be complete before ANY page can be updated

**⚠️ CRITICAL**: No page updates can begin until this phase is complete

- [X] T007 Create components/layout/sidebar.tsx with collapsible navigation in client/src/components/layout/sidebar.tsx
  - **Acceptance**: Sidebar renders, collapses/expands, persists state to Zustand store
- [X] T008 [P] Create components/layout/sidebar-nav-item.tsx for navigation items in client/src/components/layout/sidebar-nav-item.tsx
- [X] T009 Create components/layout/header.tsx with search bar and user menu areas in client/src/components/layout/header.tsx
  - **Acceptance**: Header renders with placeholder search, notification bell, user menu
- [X] T010 [P] Create components/layout/user-menu.tsx dropdown component in client/src/components/layout/user-menu.tsx
- [X] T011 [P] Create components/layout/notification-bell.tsx with badge in client/src/components/layout/notification-bell.tsx
- [X] T012 Create components/layout/main-layout.tsx combining sidebar + header + content in client/src/components/layout/main-layout.tsx
  - **Acceptance**: MainLayout wraps children with sidebar and header, responsive on mobile
- [X] T013 [P] Create components/shared/page-header.tsx for consistent page headers in client/src/components/shared/page-header.tsx
- [X] T014 [P] Create components/shared/empty-state.tsx for empty states with icons in client/src/components/shared/empty-state.tsx
- [X] T015 [P] Create components/shared/loading-skeleton.tsx for loading states in client/src/components/shared/loading-skeleton.tsx
- [X] T016 [P] Create hooks/use-media-query.ts for responsive behavior in client/src/hooks/use-media-query.ts

**Checkpoint**: Foundation ready - page implementation can now begin

---

## Phase 3: User Story 1 - Dashboard Modernization (Priority: P1) 🎯 MVP

**Goal**: Modernizar o dashboard com cards de estatísticas, alertas visuais e layout sidebar

**Independent Test**: Dashboard deve exibir cards de estatísticas com ícones, tendências, sidebar de navegação funcional, e alertas visualmente distintos por severidade

### Implementation for User Story 1

- [X] T017 [P] [US1] Create components/dashboard/stat-card.tsx with icon, value, trend in client/src/components/dashboard/stat-card.tsx
- [X] T018 [P] [US1] Create components/dashboard/alert-banner.tsx with severity styling in client/src/components/dashboard/alert-banner.tsx
- [X] T019 [P] [US1] Create components/dashboard/appointment-item.tsx for appointments list in client/src/components/dashboard/appointment-item.tsx
- [X] T020 [P] [US1] Create components/dashboard/medication-item.tsx for medications list in client/src/components/dashboard/medication-item.tsx
- [X] T021 [US1] Update app/dashboard/page.tsx to use MainLayout wrapper in client/src/app/dashboard/page.tsx
- [X] T022 [US1] Update app/dashboard/page.tsx to use new StatCard components in client/src/app/dashboard/page.tsx
- [X] T023 [US1] Update app/dashboard/page.tsx to use AlertBanner for alerts section in client/src/app/dashboard/page.tsx
- [X] T024 [US1] Update app/dashboard/page.tsx with appointment and medication item components in client/src/app/dashboard/page.tsx
- [X] T025 [US1] Add Framer Motion animations to dashboard (fade-in, stagger) in client/src/app/dashboard/page.tsx

**Checkpoint**: Dashboard should display with modern layout, sidebar navigation, stat cards with icons/trends, and animated alerts

---

## Phase 4: User Story 2 - Chat UI Modernization (Priority: P2)

**Goal**: Melhorar interface do chat com message bubbles, indicador de typing e upload aprimorado

**Independent Test**: Chat deve exibir mensagens com bubbles estilizados (user vs assistant), indicador de typing animado, e lista de documentos com status visual

### Implementation for User Story 2

- [x] T026 [P] [US2] Create components/chat/message-bubble.tsx with role-based styling in client/src/components/chat/message-bubble.tsx
- [x] T027 [P] [US2] Create components/chat/typing-indicator.tsx with three-dot animation in client/src/components/chat/typing-indicator.tsx
- [x] T028 [P] [US2] Create components/chat/chat-input.tsx with auto-resize textarea in client/src/components/chat/chat-input.tsx
- [x] T029 [P] [US2] Create components/chat/document-list.tsx with status indicators in client/src/components/chat/document-list.tsx
- [x] T030 [US2] Update app/chat/page.tsx to use MainLayout wrapper in client/src/app/chat/page.tsx
- [x] T031 [US2] Update app/chat/page.tsx to use new MessageBubble component in client/src/app/chat/page.tsx
- [x] T032 [US2] Update app/chat/page.tsx to use TypingIndicator during loading in client/src/app/chat/page.tsx
- [x] T033 [US2] Update app/chat/page.tsx with new ChatInput component in client/src/app/chat/page.tsx
- [x] T034 [US2] Add Framer Motion animations to chat messages (slide-in) in client/src/app/chat/page.tsx

**Checkpoint**: Chat page should display with improved message bubbles, animated typing indicator, and modernized input area

---

## Phase 5: User Story 3 - Auth Pages Modernization (Priority: P3)

**Goal**: Melhorar páginas de login/register com split layout, ilustrações e animações de entrada

**Independent Test**: Páginas de auth devem exibir layout dividido com branding à esquerda, formulário à direita, inputs com ícones, e animações suaves de entrada

### Implementation for User Story 3

- [X] T035 [P] [US3] Create components/auth/auth-layout.tsx with split layout (branding + form) in client/src/components/auth/auth-layout.tsx
- [X] T036 [P] [US3] Create components/auth/auth-card.tsx with styled card wrapper in client/src/components/auth/auth-card.tsx
- [X] T037 [P] [US3] Create components/auth/auth-illustration.tsx with healthcare SVG illustration in client/src/components/auth/auth-illustration.tsx
- [X] T038 [US3] Update app/login/page.tsx to use AuthLayout and AuthCard in client/src/app/login/page.tsx
- [X] T039 [US3] Add icon inputs and improved styling to login form in client/src/app/login/page.tsx
- [X] T040 [US3] Add Framer Motion animations (fade-in, slide-up) to login page in client/src/app/login/page.tsx
- [X] T041 [US3] Update app/register/page.tsx to use AuthLayout and AuthCard in client/src/app/register/page.tsx
- [X] T042 [US3] Add icon inputs and improved styling to register form in client/src/app/register/page.tsx
- [X] T043 [US3] Add Framer Motion animations (fade-in, slide-up) to register page in client/src/app/register/page.tsx

**Checkpoint**: Auth pages should display with split layout, healthcare illustration, modern form styling, and smooth entry animations

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Dark mode, responsive behavior, accessibility, and final polish

- [X] T044 [P] Add dark mode toggle support to sidebar/header in client/src/components/layout/sidebar.tsx
- [X] T045 [P] Verify and fix dark mode colors across all new components
- [X] T046 Test and fix responsive behavior (mobile sidebar sheet) in client/src/components/layout/main-layout.tsx
- [X] T047 [P] Add ARIA labels to all icon-only buttons
- [X] T048 [P] Test keyboard navigation across sidebar and forms
- [X] T049 [P] Add skip-link for accessibility in client/src/app/layout.tsx
- [X] T050 [P] Optimize Framer Motion imports with LazyMotion in client/src/app/layout.tsx
- [X] T051 Run Lighthouse audit and fix performance issues
  - **Acceptance Criteria**: Performance score > 90, Accessibility score > 90, FCP < 1.5s, LCP < 2.5s, CLS < 0.1
  - Build successful, TypeScript passed, ESLint passed, no console errors
- [X] T052 Update root page.tsx redirect to use new layout context in client/src/app/page.tsx
- [X] T053 Run quickstart.md validation checklist
  - Colors render correctly in light/dark mode ✓
  - Sidebar collapses/expands smoothly ✓
  - All animations are smooth (60fps) ✓
  - Mobile responsive (< 768px) ✓
  - No layout shifts during loading ✓
  - Keyboard navigation works ✓
  - All forms have proper validation states ✓
  - Toast notifications appear correctly ✓

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 - Dashboard (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 - Chat (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 - Auth Pages (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories (auth pages don't use MainLayout)

### Within Each User Story

- Create components before updating pages
- Component tasks marked [P] can run in parallel
- Page updates depend on component creation
- Animations added after layout changes

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003, T004, T005, T006)
- All Foundational tasks marked [P] can run in parallel (T008, T010, T011, T013, T014, T015, T016)
- Once Foundational phase completes, all user stories can start in parallel
- All component creation tasks within a story marked [P] can run in parallel

---

## Parallel Example: Setup Phase

```bash
# After T001 and T002 complete, launch all parallel tasks:
Task T003: "Create lib/motion.ts with Framer Motion variants"
Task T004: "Create lib/design-tokens.ts with color/spacing tokens"
Task T005: "Update globals.css with new healthcare-focused color palette"
Task T006: "Create stores/ui.store.ts for sidebar and theme state"
```

## Parallel Example: Foundational Phase

```bash
# After T007 and T009 complete (main layout components), launch parallel tasks:
Task T008: "Create sidebar-nav-item.tsx"
Task T010: "Create user-menu.tsx"
Task T011: "Create notification-bell.tsx"
Task T013: "Create page-header.tsx"
Task T014: "Create empty-state.tsx"
Task T015: "Create loading-skeleton.tsx"
Task T016: "Create use-media-query.ts hook"
```

## Parallel Example: User Story 1 (Dashboard)

```bash
# Launch all dashboard component creation tasks together:
Task T017: "Create stat-card.tsx"
Task T018: "Create alert-banner.tsx"
Task T019: "Create appointment-item.tsx"
Task T020: "Create medication-item.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (6 tasks)
2. Complete Phase 2: Foundational (10 tasks) - CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 - Dashboard (9 tasks)
4. **STOP and VALIDATE**: Test dashboard independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Dashboard) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Chat) → Test independently → Deploy/Demo
4. Add User Story 3 (Auth) → Test independently → Deploy/Demo
5. Complete Phase 6 (Polish) → Final validation

### Parallel Team Strategy

With multiple developers after Foundational phase:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Dashboard)
   - Developer B: User Story 2 (Chat)
   - Developer C: User Story 3 (Auth)
3. Stories complete and integrate independently

---

## Summary

| Phase | Tasks | Parallel Tasks | Dependencies |
|-------|-------|----------------|--------------|
| Phase 1: Setup | 6 | 4 | None |
| Phase 2: Foundational | 10 | 7 | Setup |
| Phase 3: Dashboard (US1) | 9 | 4 | Foundational |
| Phase 4: Chat (US2) | 9 | 4 | Foundational |
| Phase 5: Auth (US3) | 9 | 3 | Foundational |
| Phase 6: Polish | 10 | 7 | All US complete |
| **Total** | **53** | **29** | - |

**MVP Scope**: Phase 1 + Phase 2 + Phase 3 = 25 tasks (Dashboard with new layout)  
**Parallel Opportunities**: 29 tasks (55%) can run in parallel  
**Independent Test Criteria per Story**: Each story has clear checkpoint validation
