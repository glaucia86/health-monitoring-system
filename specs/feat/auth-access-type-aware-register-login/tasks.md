
# Tasks: Fluxo de Autenticação Sensível ao Tipo de Acesso

**Input**: Design documents from `/specs/feat/auth-access-type-aware-register-login/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Not requested - implementation tasks only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `client/src/` (frontend), `server/src/` (backend)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create reusable helpers and configurations used by all user stories

- [X] T001 [P] Create auth URL helper in client/src/lib/auth-url.ts
- [X] T002 [P] Add RegisterContext interface and config in client/src/config/login-contexts.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Backend changes that MUST be complete before frontend stories can fully work

**⚠️ CRITICAL**: Backend DTO must be ready to accept accessType from frontend

- [X] T003 Add accessType field to RegisterDto in server/src/auth/dto/register.dto.ts
- [X] T004 Log accessType for telemetry in server/src/auth/auth.service.ts

**Checkpoint**: Backend ready to receive accessType - frontend implementation can proceed

---

## Phase 3: User Story 1 - Login como Cuidador (Priority: P1) 🎯 MVP

**Goal**: Cuidador navega Home → Login com contexto preservado, link "Cadastre-se" também preserva tipo

**Independent Test**: Home → Card Cuidador → Entrar → Verificar página de login exibe contexto de cuidador → Clicar "Cadastre-se" → Verificar URL é /register?type=caregiver

### Implementation for User Story 1

- [X] T005 [US1] Update login page "Cadastre-se" link to preserve type param in client/src/app/login/page.tsx

**Checkpoint**: Login como cuidador funcional com link de registro preservando contexto

---

## Phase 4: User Story 2 - Cadastro como Cuidador (Priority: P1)

**Goal**: Cuidador acessa página de registro com contexto visual correto e payload inclui accessType

**Independent Test**: Home → Card Cuidador → Criar conta gratuita → Verificar título "Criar conta de Cuidador" → Submeter formulário → Verificar payload inclui accessType

### Implementation for User Story 2

- [X] T006 [US2] Make register page context-aware in client/src/app/register/page.tsx
- [X] T007 [US2] Update auth service to include accessType in register payload in client/src/services/auth.service.ts
- [X] T008 [US2] Update Home page header nav "Cadastrar" button (near line 145) to `/register?type=caregiver` in client/src/app/page.tsx
- [X] T009 [US2] Update Home page CTA section "Criar conta gratuita" button (near line 380) to `/register?type=caregiver` in client/src/app/page.tsx

**Checkpoint**: Cadastro como cuidador funcional com contexto visual e payload correto

---

## Phase 5: User Story 3 - Login como Paciente (Priority: P2)

**Goal**: Paciente navega Home → Login com contexto de paciente preservado

**Independent Test**: Home → Card Paciente → Entrar → Verificar página de login exibe contexto de paciente → Clicar "Cadastre-se" → Verificar URL é /register?type=patient

### Implementation for User Story 3

> **Note**: This story is already functional after T005 implementation. The login page already supports both caregiver and patient contexts via LoginContext. No additional tasks needed.

- [ ] T010 [US3] Verify login page displays patient context correctly (manual validation only)

**Checkpoint**: Login como paciente funcional

---

## Phase 6: User Story 4 - Cadastro como Paciente (Priority: P2)

**Goal**: Paciente acessa página de registro com contexto visual de paciente e payload inclui accessType

**Independent Test**: Home → Card Paciente → Criar conta gratuita → Verificar título "Criar conta de Paciente" → Submeter formulário → Verificar payload inclui accessType: 'patient'

### Implementation for User Story 4

> **Note**: This story is already functional after T006-T007 implementation. The register page will support both contexts via RegisterContext. No additional tasks needed.

- [ ] T011 [US4] Verify register page displays patient context correctly (manual validation only)

**Checkpoint**: Cadastro como paciente funcional

---

## Phase 7: User Story 5 - Fallback para URLs sem tipo (Priority: P3)

**Goal**: URLs sem ?type param defaultam para cuidador, URLs com tipo inválido normalizam para cuidador

**Independent Test**: Acessar /login diretamente → Verificar contexto de cuidador | Acessar /register?type=invalid → Verificar contexto de cuidador

### Implementation for User Story 5

> **Note**: This story is already covered by existing `normalizeAccessType()` function. The implementation in T005 and T006 automatically handles fallback via this helper.

- [ ] T012 [US5] Verify fallback behavior for URLs without type param (manual validation only)
- [ ] T013 [US5] Verify normalization for invalid type values (manual validation only)
- [ ] T014 [US5] Verify browser back button preserves context between /login and /register (manual validation only)

**Checkpoint**: Fallback e normalização funcionando corretamente

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validations and documentation

- [ ] T015 Run quickstart.md manual testing checklist
- [ ] T016 Verify all success criteria from spec.md
- [ ] T017 [P] Update any affected component documentation

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational - Backend)
    ↓
Phase 3-7 (User Stories - Frontend)
    ↓
Phase 8 (Polish)
```

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS user stories that need backend
- **User Story 1 (Phase 3)**: Depends on T001 (buildAuthUrl)
- **User Story 2 (Phase 4)**: Depends on T001, T002, T003-T004 (backend ready)
- **User Stories 3-5 (Phase 5-7)**: Automatically work after US1/US2 implementation
- **Polish (Phase 8)**: Depends on all user stories

### User Story Dependencies

- **User Story 1 (P1)**: Modifica apenas login page → Independente
- **User Story 2 (P1)**: Modifica register page, auth service, home page → Depende de Setup + Backend
- **User Story 3 (P2)**: Validação apenas → Depende de US1
- **User Story 4 (P2)**: Validação apenas → Depende de US2
- **User Story 5 (P3)**: Validação apenas → Depende de US1 e US2

### Parallel Opportunities

- T001 and T002 can run in parallel (different files)
- T003 and T004 are sequential (same service flow)
- T008 and T009 are sequential (same file - client/src/app/page.tsx)
- Validation tasks (T010-T014) are independent

---

## Parallel Example: Setup Phase

```bash
# Launch all Setup tasks together:
Task: "Create auth URL helper in client/src/lib/auth-url.ts"
Task: "Add RegisterContext interface and config in client/src/config/login-contexts.ts"
```

---

## Implementation Strategy

### MVP First (User Stories 1-2 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete Phase 2: Foundational (T003, T004)
3. Complete Phase 3: User Story 1 (T005)
4. Complete Phase 4: User Story 2 (T006-T009)
5. **STOP and VALIDATE**: Test caregiver flow end-to-end
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Infrastructure ready
2. Add User Story 1 + 2 → Test caregiver flow → Deploy (MVP!)
3. Validate User Stories 3 + 4 → Confirm patient flow works → Deploy
4. Validate User Story 5 → Confirm fallback behavior → Deploy
5. Each story adds value without breaking previous stories

---

## Task Summary

| Phase | Tasks | Files Modified |
|-------|-------|----------------|
| 1. Setup | T001, T002 | 2 new files |
| 2. Foundational | T003, T004 | 2 backend files |
| 3. US1 - Login Cuidador | T005 | 1 file |
| 4. US2 - Cadastro Cuidador | T006-T009 | 3 files |
| 5. US3 - Login Paciente | T010 | validation only |
| 6. US4 - Cadastro Paciente | T011 | validation only |
| 7. US5 - Fallback | T012-T014 | validation only |
| 8. Polish | T015-T017 | documentation |

**Total Implementation Tasks**: 9 (T001-T009)  
**Total Validation Tasks**: 5 (T010-T014)  
**Total Polish Tasks**: 3 (T015-T017)  
**Grand Total**: 17 tasks

---

## Notes

- Tasks T010-T013 são validações manuais que verificam que a implementação anterior cobre automaticamente os cenários
- A maior parte do trabalho está em Setup (T001-T002) e User Story 2 (T006-T009)
- O código existente (`normalizeAccessType`, `LoginContext`) é reutilizado maximamente
- Nenhuma migração de banco de dados necessária
- Rollback simples: todas as mudanças são localizadas

````