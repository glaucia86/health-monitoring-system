# Tasks: Bug Fixes from Usability Testing

**Input**: Design documents from `/specs/bug-fixes-01/`  
**Prerequisites**: plan.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Not requested - manual Playwright MCP verification will be used.

**Organization**: Tasks organized by bug priority (P0 = High, P1 = Medium).

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `client/src/` (Next.js App Router)
- **Utilities**: `client/src/lib/`
- **Pages**: `client/src/app/`

---

## Phase 1: Setup

**Purpose**: Create utility functions needed by multiple pages

- [x] T001 Create CPF formatting utilities in `client/src/lib/formatCpf.ts`
- [x] T002 [P] Add `truncateId` function to `client/src/lib/utils.ts`

**Checkpoint**: Utilities ready for use in page implementations

**Note**: All form libraries (react-hook-form, zod, @hookform/resolvers) are already installed.

---

## Phase 2: Login Form Validation (Priority: P0) 🎯

**Goal**: Add inline validation error messages to login form

**Independent Test**: Submit empty login form → See 2 error messages (email, password)

### Implementation

- [x] T003 Import useForm, zodResolver, and z in `client/src/app/login/page.tsx`
- [x] T004 Define loginSchema with Zod validation rules in `client/src/app/login/page.tsx`
- [x] T005 Replace useState with useForm hook in `client/src/app/login/page.tsx`
- [x] T006 Add error message display below email Input in `client/src/app/login/page.tsx`
- [x] T007 Add error message display below password Input in `client/src/app/login/page.tsx`
- [x] T008 Add aria-invalid and aria-describedby attributes for accessibility in `client/src/app/login/page.tsx`

**Checkpoint**: Login form shows validation errors on empty/invalid submit

---

## Phase 3: Register Form Validation + CPF Mask (Priority: P0)

**Goal**: Add CPF input mask and inline validation error messages to register form

**Independent Test**: 
1. Type "12345678901" in CPF field → See "123.456.789-01"
2. Submit empty form → See 6 error messages

### Implementation

- [x] T009 Import useForm, zodResolver, z, and formatCPF in `client/src/app/register/page.tsx`
- [x] T010 Define registerSchema with Zod validation rules including CPF regex in `client/src/app/register/page.tsx`
- [x] T011 Replace useState with useForm hook in `client/src/app/register/page.tsx`
- [x] T012 Add CPF onChange handler that applies formatCPF mask in `client/src/app/register/page.tsx`
- [x] T013 Add error message display below each form field (6 fields) in `client/src/app/register/page.tsx`
- [x] T014 Add aria-invalid and aria-describedby attributes for accessibility in `client/src/app/register/page.tsx`
- [x] T015 Strip CPF mask (unformatCPF) before sending to API in `client/src/app/register/page.tsx`

**Checkpoint**: Register form shows CPF mask while typing and validation errors on invalid submit

---

## Phase 4: Chat Conversation ID Display (Priority: P1)

**Goal**: Truncate conversation ID on mobile and add copy-to-clipboard functionality

**Independent Test**: 
1. View chat on mobile (375px width) → ID displays truncated
2. Click copy button → Full ID copied to clipboard with visual feedback

### Implementation

- [x] T016 Import truncateId from utils and Copy/Check icons in `client/src/app/chat/page.tsx`
- [x] T017 Add useState for copy feedback state in `client/src/app/chat/page.tsx`
- [x] T018 Create handleCopyId function with clipboard API in `client/src/app/chat/page.tsx`
- [x] T019 Update conversation ID display with truncateId and title tooltip in `client/src/app/chat/page.tsx`
- [x] T020 Add copy button with visual feedback (Check icon on success) in `client/src/app/chat/page.tsx`

**Checkpoint**: Conversation ID truncates on mobile and can be copied with one click

---

## Phase 5: Polish & Verification

**Purpose**: Final validation and cleanup

- [x] T021 [P] TypeScript compilation check - PASSED (no errors)
- [x] T022 [P] ESLint validation - PASSED (no errors or warnings)
- [x] T023 [P] Development server startup - PASSED (running on localhost:3000)
- [x] T024 Manual UI verification available at http://localhost:3000

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ────────┬──────────────────────────────────────┐
   │                    │                                      │
   ▼                    ▼                                      ▼
Phase 2 (Login)    Phase 3 (Register)                   Phase 4 (Chat)
   │                    │                                      │
   └────────────────────┴──────────────────────────────────────┘
                                      │
                                      ▼
                              Phase 5 (Polish)
```

- **Phase 1**: No dependencies - can start immediately
- **Phase 2 (Login)**: No dependencies on other phases - can start after Phase 1
- **Phase 3 (Register)**: Depends on T001 (formatCpf.ts) from Phase 1
- **Phase 4 (Chat)**: Depends on T002 (truncateId) from Phase 1
- **Phase 5**: Depends on Phases 2, 3, 4 completion

### Parallel Opportunities

**Phase 1 (Both tasks in parallel):**
```bash
Task T001: Create formatCpf.ts
Task T002: Add truncateId to utils.ts
# Different files, no dependencies
```

**Phases 2, 3, 4 (All in parallel after Phase 1):**
```bash
Task T003-T008: Login form (client/src/app/login/page.tsx)
Task T009-T015: Register form (client/src/app/register/page.tsx)
Task T016-T020: Chat page (client/src/app/chat/page.tsx)
# Different files, no cross-dependencies
```

**Phase 5 (Verification in parallel):**
```bash
Task T021: Verify login
Task T022: Verify register
Task T023: Verify chat
# Independent verification tasks
```

---

## Parallel Example: Maximum Efficiency

### Step 1: Launch Phase 1 in parallel
```bash
# Both can run simultaneously:
T001: Create client/src/lib/formatCpf.ts
T002: Add truncateId to client/src/lib/utils.ts
```

### Step 2: Launch Phases 3, 4, 5 in parallel
```bash
# All three pages can be modified simultaneously:
T003-T008: Modify client/src/app/login/page.tsx
T009-T015: Modify client/src/app/register/page.tsx
T016-T020: Modify client/src/app/chat/page.tsx
```

### Step 3: Verify all in parallel
```bash
# All verification can run simultaneously:
T021: Test login at /login
T022: Test register at /register
T023: Test chat at /chat
```

---

## Implementation Strategy

### MVP First (Quick Wins)

1. Complete Phase 1 (utilities) - **15 min**
2. Complete Phase 3 (login validation) - **45 min** → Test immediately
3. Complete Phase 4 (register + CPF) - **45 min** → Test immediately
4. Complete Phase 5 (chat ID) - **15 min** → Test immediately

### Time Estimates

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| Phase 1: Setup | T001, T002 | 15 min |
| Phase 2: Login | T003-T008 | 45 min |
| Phase 3: Register | T009-T015 | 45 min |
| Phase 4: Chat | T016-T020 | 15 min |
| Phase 5: Polish | T021-T024 | 15 min |
| **Total** | **24 tasks** | **~2h 15min** |

---

## Notes

- All [P] tasks can run in parallel (different files)
- No new npm packages required - all dependencies pre-installed
- Test credentials: teste@teste.com / Teste@123
- Mobile test viewport: 375x667
- Backend must be running on localhost:3001 for full testing

---

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 24 |
| Phase 1 (Setup) | 2 tasks |
| Phase 2 (Login) | 6 tasks |
| Phase 3 (Register) | 7 tasks |
| Phase 4 (Chat) | 5 tasks |
| Phase 5 (Polish) | 4 tasks |
| Parallel Opportunities | 12 tasks (50%) |
| Files Created | 1 (`formatCpf.ts`) |
| Files Modified | 4 (`utils.ts`, `login/page.tsx`, `register/page.tsx`, `chat/page.tsx`) |
| Estimated Duration | ~2h 15min |
