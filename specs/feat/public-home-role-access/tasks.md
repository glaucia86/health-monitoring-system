# Tasks: Public Home Page & Role-Based Login Flow

**Input**: Design documents from `/specs/feat/public-home-role-access/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not explicitly requested - manual testing per quickstart.md

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Web app structure**: `client/src/` for frontend
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create foundational type definitions and configuration shared by all user stories

- [X] T001 [P] Create AccessType definitions and validators in client/src/types/access.types.ts
- [X] T002 [P] Create LoginContext configuration in client/src/config/login-contexts.ts

**Checkpoint**: Type system and configuration ready for component implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: This feature has no blocking infrastructure - types/config created in Setup enable all stories

**⚠️ Note**: All user stories can proceed after Phase 1 completion

---

## Phase 3: User Story 1 - Caregiver Accesses System via Public Home (Priority: P1) 🎯 MVP

**Goal**: Caregiver can access home page, click "Sou cuidador / profissional", and see contextualized login

**Independent Test**: Access `/`, click caregiver button → verify `/login?type=caregiver` shows "Acesso do Cuidador" title

### Implementation for User Story 1

- [X] T003 [US1] Add useRouter and useEffect auth redirect to client/src/app/page.tsx (implements FR-013: authenticated user redirect)
- [X] T004 [US1] Add caregiver role selection button with Stethoscope icon in client/src/app/page.tsx
- [X] T005 [US1] Import useSearchParams and normalize type param in client/src/app/login/page.tsx
- [X] T006 [US1] Update AuthCard to use dynamic title/subtitle from LoginContext in client/src/app/login/page.tsx
- [X] T007 [US1] Wrap login form with Suspense for useSearchParams SSR compatibility in client/src/app/login/page.tsx

**Checkpoint**: Caregiver flow complete - can demo `/` → click caregiver → `/login?type=caregiver` with correct title

---

## Phase 4: User Story 2 - Patient Accesses System via Public Home (Priority: P2)

**Goal**: Patient can click "Sou paciente" and see patient-specific login context

**Independent Test**: Access `/`, click patient button → verify `/login?type=patient` shows "Acesso do Paciente" title

### Implementation for User Story 2

- [X] T008 [US2] Add patient role selection button with User icon in client/src/app/page.tsx

**Checkpoint**: Patient flow complete - both role buttons work and show appropriate context

---

## Phase 5: User Story 3 - Backward Compatibility for Direct Login (Priority: P1)

**Goal**: Direct `/login` access (no params) works as before, defaulting to caregiver

**Independent Test**: Access `/login` directly → verify shows "Acesso do Cuidador" (same as caregiver)

### Implementation for User Story 3

- [X] T009 [US3] Verify normalizeAccessType returns 'caregiver' for null/missing type (covered by T001)
- [X] T010 [US3] Test direct `/login` access shows caregiver context (manual verification)

**Checkpoint**: Backward compatibility verified - existing bookmarks and integrations work

---

## Phase 6: User Story 4 - Invalid Type Parameter Handling (Priority: P2)

**Goal**: Invalid type values fallback gracefully to caregiver context

**Independent Test**: Access `/login?type=invalid` → verify shows "Acesso do Cuidador" (fallback)

### Implementation for User Story 4

- [X] T011 [US4] Verify normalizeAccessType handles case-insensitive normalization (covered by T001)

> **Note**: Per research.md §3, invalid types silently fallback to 'caregiver' without displaying a message (backward compatibility priority).

- [X] T012 [US4] Test invalid type URLs fallback correctly (manual verification)

**Checkpoint**: Invalid URLs handled gracefully without errors

---

## Phase 7: User Story 5 - Responsive Design Across Devices (Priority: P2)

**Goal**: Home and login pages render correctly on mobile, tablet, and desktop

**Independent Test**: Resize browser to 320px, 768px, 1280px → verify layout adapts correctly

### Implementation for User Story 5

- [X] T013 [US5] Apply mobile-first flex layout to role selection buttons in client/src/app/page.tsx
- [X] T014 [US5] Verify responsive breakpoints at 320px, 768px, 1280px widths (manual verification)

**Checkpoint**: Responsive design complete across all target breakpoints

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [X] T015 [P] Verify no TypeScript errors in modified files
- [X] T016 [P] Verify no console errors during navigation flows
- [X] T017 Run complete quickstart.md validation checklist
- [X] T018 [P] Update any affected component exports if needed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **User Stories (Phases 3-7)**: All depend on Phase 1 completion
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Requires T001, T002 → Core caregiver flow
- **User Story 2 (P2)**: Requires T001, T002, T004 → Extends home page with patient button
- **User Story 3 (P1)**: Requires T001 → Tests default fallback behavior
- **User Story 4 (P2)**: Requires T001 → Tests invalid type handling
- **User Story 5 (P2)**: Requires T003, T004, T008 → Responsive layout verification

### Within Each User Story

- Setup tasks (T001, T002) must complete first
- Home page changes (T003, T004, T008) can be done together
- Login page changes (T005, T006, T007) can be done together
- Manual verification tasks (T010, T012, T014) after implementation

### Parallel Opportunities

Within Phase 1:
- T001 and T002 create different files → can run in parallel

Within User Story 1:
- T003 and T004 modify same file → sequential
- T005, T006, T007 modify same file → sequential

Across User Stories:
- After Phase 1, US1 and US2 page modifications → sequential (same file)
- Login page modifications (US1) → can start while testing US2 button

---

## Parallel Example: Setup Phase

```bash
# Launch both setup tasks together:
Task T001: "Create AccessType definitions in client/src/types/access.types.ts"
Task T002: "Create LoginContext configuration in client/src/config/login-contexts.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete Phase 3: User Story 1 (T003-T007)
3. **STOP and VALIDATE**: Test caregiver flow end-to-end
4. Demo ready: `/` → click caregiver → contextualized login

### Incremental Delivery

1. Setup → Foundation ready
2. Add User Story 1 → Caregiver flow works → MVP!
3. Add User Story 2 → Patient flow works
4. Verify User Story 3 → Backward compatibility confirmed
5. Verify User Story 4 → Invalid params handled
6. Add User Story 5 → Responsive design verified
7. Polish → Production ready

### Single Developer Strategy

Recommended execution order:
1. T001, T002 (parallel) - Setup
2. T003, T004, T008 (sequential) - Home page complete
3. T005, T006, T007 (sequential) - Login page complete
4. T009-T012 (verification) - Edge cases
5. T013-T014 (verification) - Responsive
6. T015-T018 (cleanup) - Polish

---

## Task Summary

| Phase | Tasks | Parallel | Est. Time |
|-------|-------|----------|-----------|
| Setup | T001-T002 | 2 | 25 min |
| US1: Caregiver | T003-T007 | 0 | 45 min |
| US2: Patient | T008 | 0 | 10 min |
| US3: Backward Compat | T009-T010 | 0 | 10 min |
| US4: Invalid Handling | T011-T012 | 0 | 10 min |
| US5: Responsive | T013-T014 | 0 | 20 min |
| Polish | T015-T018 | 3 | 20 min |
| **Total** | **18 tasks** | **5** | **~2.5 hrs** |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- T009, T010, T011, T012 are verification tasks - behavior implemented in earlier tasks
- Manual testing replaces automated tests (not explicitly requested)
- Commit after each phase or logical group
- Stop at any checkpoint to validate story independently
