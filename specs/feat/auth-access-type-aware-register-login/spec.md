# Feature Specification: Fluxo de Autenticação Sensível ao Tipo de Acesso

**Feature Branch**: `feat/auth-access-type-aware-register-login`  
**Created**: 2025-11-30  
**Status**: Draft  
**Input**: Análise do PRD_FEATURE_10.md - Role-Aware Auth Flow

---

## Visão Geral

Garantir que a jornada de **login e cadastro** se mantenha coerente com a intenção inicial do usuário (cuidador vs paciente), desde a Home Pública até o dashboard, utilizando o conceito de `AccessType` já existente no sistema.

### Objetivos

1. **Preservar o `AccessType`** em todos os caminhos de login/cadastro
2. **Diferenciar a experiência visual e textual** entre cuidador e paciente
3. **Não quebrar** o backend atual, mas **preparar** o domínio para expansão do fluxo de pacientes

### Escopo (Fase 1)

- Ajuste de todos os **links e botões** relacionados a login/cadastro
- Tornar `/login` e `/register` **context-aware** com query param `type`
- Codificar/decodificar `accessType` no fluxo de cadastro e login

### Fora de Escopo (Fase 1)

- Criação do dashboard completo de paciente
- Mudança de regras de autorização de roles no backend
- Implementação do fluxo de associação cuidador ↔ paciente
- Criação automática de `Patient` no backend

---

## User Scenarios & Testing

### User Story 1 - Login como Cuidador (Priority: P1)

Maria, uma cuidadora profissional de 42 anos, acessa a Home Pública e clica em "Sou Cuidador / Profissional". Ela quer fazer login para monitorar os pacientes que acompanha. Ao clicar em "Entrar", ela é direcionada para uma página de login que claramente indica que está acessando como cuidadora.

**Why this priority**: Este é o fluxo principal do sistema atual. A maioria dos usuários são cuidadores/profissionais de saúde, e manter a experiência consistente para eles é crítico.

**Independent Test**: Pode ser testado navegando da Home Pública → Card Cuidador → Entrar → Verificar que a página de login exibe contexto de cuidador.

**Acceptance Scenarios**:

1. **Given** usuário está na Home Pública, **When** clica no card "Sou Cuidador / Profissional" e depois em "Entrar", **Then** é redirecionado para `/login?type=caregiver` com título "Login de Cuidador"
2. **Given** usuário está na página `/login?type=caregiver`, **When** visualiza a página, **Then** vê título, subtítulo e ícone específicos para cuidador
3. **Given** usuário está na página de login de cuidador, **When** clica em "Cadastre-se", **Then** é redirecionado para `/register?type=caregiver`

---

### User Story 2 - Cadastro como Cuidador (Priority: P1)

Maria deseja criar uma nova conta como cuidadora. Ao clicar em "Criar conta gratuita" no card de cuidador, ela é direcionada para um formulário de cadastro que mantém o contexto de cuidador durante todo o processo.

**Why this priority**: Novos usuários cuidadores precisam ter uma experiência clara de onboarding. O cadastro é a primeira interação significativa com o sistema.

**Independent Test**: Navegação da Home Pública → Card Cuidador → Criar conta gratuita → Verificar formulário com contexto de cuidador → Completar cadastro.

**Acceptance Scenarios**:

1. **Given** usuário está na Home Pública, **When** clica no card "Sou Cuidador / Profissional" e depois em "Criar conta gratuita", **Then** é redirecionado para `/register?type=caregiver`
2. **Given** usuário está na página `/register?type=caregiver`, **When** visualiza a página, **Then** vê título "Criar conta de Cuidador" e descrição contextualizada
3. **Given** usuário está no formulário de cadastro de cuidador, **When** submete o formulário com dados válidos, **Then** o payload inclui `accessType: 'caregiver'`
4. **Given** usuário está na página de cadastro de cuidador, **When** clica em "Já tem uma conta? Faça login", **Then** é redirecionado para `/login?type=caregiver`

---

### User Story 3 - Login como Paciente (Priority: P2)

João, um paciente de 55 anos, acessa a Home Pública e clica em "Sou Paciente". Ele quer fazer login para acompanhar seus exames, consultas e medicações. Ao clicar em "Entrar", ele é direcionado para uma página de login que claramente indica que está acessando como paciente.

**Why this priority**: Habilitar o fluxo de pacientes é o objetivo principal desta feature. Embora o dashboard de paciente não esteja no escopo, o fluxo de autenticação precisa estar preparado.

**Independent Test**: Pode ser testado navegando da Home Pública → Card Paciente → Entrar → Verificar que a página de login exibe contexto de paciente.

**Acceptance Scenarios**:

1. **Given** usuário está na Home Pública, **When** clica no card "Sou Paciente" e depois em "Entrar", **Then** é redirecionado para `/login?type=patient` com título "Login de Paciente"
2. **Given** usuário está na página `/login?type=patient`, **When** visualiza a página, **Then** vê título, subtítulo e ícone específicos para paciente
3. **Given** usuário está na página de login de paciente, **When** clica em "Cadastre-se", **Then** é redirecionado para `/register?type=patient`

---

### User Story 4 - Cadastro como Paciente (Priority: P2)

João deseja criar uma nova conta como paciente. Ao clicar em "Criar conta gratuita" no card de paciente, ele é direcionado para um formulário de cadastro que mantém o contexto de paciente durante todo o processo.

**Why this priority**: Completar o fluxo de onboarding para pacientes é essencial para a expansão do sistema.

**Independent Test**: Navegação da Home Pública → Card Paciente → Criar conta gratuita → Verificar formulário com contexto de paciente → Completar cadastro.

**Acceptance Scenarios**:

1. **Given** usuário está na Home Pública, **When** clica no card "Sou Paciente" e depois em "Criar conta gratuita", **Then** é redirecionado para `/register?type=patient`
2. **Given** usuário está na página `/register?type=patient`, **When** visualiza a página, **Then** vê título "Criar conta de Paciente" e descrição contextualizada
3. **Given** usuário está no formulário de cadastro de paciente, **When** submete o formulário com dados válidos, **Then** o payload inclui `accessType: 'patient'`
4. **Given** usuário está na página de cadastro de paciente, **When** clica em "Já tem uma conta? Faça login", **Then** é redirecionado para `/login?type=patient`

---

### User Story 5 - Fallback para URLs sem tipo (Priority: P3)

Um usuário acessa diretamente `/login` ou `/register` sem o parâmetro `type` na URL (ex: vindo de um bookmark antigo ou link externo). O sistema deve assumir `caregiver` como padrão para manter compatibilidade.

**Why this priority**: Garantir retrocompatibilidade é importante, mas é um cenário secundário.

**Independent Test**: Acessar diretamente `/login` ou `/register` sem query params e verificar que o contexto de cuidador é aplicado.

**Acceptance Scenarios**:

1. **Given** usuário acessa `/login` sem query param `type`, **When** a página carrega, **Then** o sistema assume `type=caregiver` e exibe contexto de cuidador
2. **Given** usuário acessa `/register` sem query param `type`, **When** a página carrega, **Then** o sistema assume `type=caregiver` e exibe contexto de cuidador
3. **Given** usuário acessa `/login?type=invalid`, **When** a página carrega, **Then** o sistema normaliza para `caregiver`

---

### Edge Cases

- **URL com tipo inválido**: Se `type=xyz` (valor não reconhecido), o sistema deve normalizar para `caregiver`
- **Navegação via botão voltar**: Se o usuário navegar de `/register?type=patient` para `/login?type=patient` e pressionar "voltar", o contexto deve ser preservado
- **Refresh da página**: Ao atualizar a página, o contexto `type` deve ser mantido (está na URL)
- **Deep link compartilhado**: URLs como `/login?type=patient` compartilhadas devem funcionar corretamente

---

## Requirements

### Functional Requirements

#### Navegação e URLs (Frontend)

- **FR-001**: Sistema DEVE atualizar o botão "Entrar" no card "Sou Cuidador / Profissional" para apontar para `/login?type=caregiver`
- **FR-002**: Sistema DEVE atualizar o botão "Criar conta gratuita" no card "Sou Cuidador / Profissional" para apontar para `/register?type=caregiver`
- **FR-003**: Sistema DEVE atualizar o botão "Entrar" no card "Sou Paciente" para apontar para `/login?type=patient`
- **FR-004**: Sistema DEVE atualizar o botão "Criar conta gratuita" no card "Sou Paciente" para apontar para `/register?type=patient`
- **FR-005**: Sistema DEVE criar um helper `buildAuthUrl(path, type)` para construção padronizada de URLs de autenticação

#### Página de Login (Frontend)

- **FR-006**: Página `/login` DEVE ler o parâmetro `type` da URL usando `searchParams`
- **FR-007**: Página `/login` DEVE normalizar o valor de `type` usando `normalizeAccessType` (default: `caregiver`)
- **FR-008**: Página `/login` DEVE exibir título, subtítulo e ícone específicos baseados no `AccessType`
- **FR-009**: Link "Cadastre-se" na página de login DEVE preservar o `type` atual ao redirecionar para `/register`
- **FR-010**: Contexto de login (textos, ícones) DEVE ser configurável via `LoginContext`

#### Página de Cadastro (Frontend)

- **FR-011**: Página `/register` DEVE ler o parâmetro `type` da URL usando `searchParams`
- **FR-012**: Página `/register` DEVE normalizar o valor de `type` usando `normalizeAccessType` (default: `caregiver`)
- **FR-013**: Página `/register` DEVE exibir título "Criar conta de Cuidador" ou "Criar conta de Paciente" conforme o tipo
- **FR-014**: Página `/register` DEVE exibir descrição contextualizada para cada tipo de acesso
- **FR-015**: Link "Já tem uma conta? Faça login" DEVE preservar o `type` atual ao redirecionar para `/login`
- **FR-016**: Formulário de cadastro DEVE incluir `accessType` no payload enviado ao backend

#### Backend (Fase 1 - Mínimo)

- **FR-017**: `RegisterDto` DEVE aceitar campo opcional `accessType` do tipo `'caregiver' | 'patient'`
- **FR-018**: `AuthService.register()` DEVE logar o valor de `accessType` recebido para métricas/telemetria
- **FR-019**: Backend DEVE continuar criando `User` com `Role.VIEWER` independente do `accessType` (comportamento atual mantido)

### Key Entities

- **AccessType**: Conceito de UX que define a jornada do usuário (`caregiver` | `patient`). Separado de `Role` do Prisma.
- **LoginContext**: Objeto de configuração contendo `title`, `subtitle`, `icon` e outros textos específicos por tipo de acesso.
- **User**: Entidade principal de autenticação. Possui `role` (Role do Prisma: ADMIN, VIEWER, DOCTOR).
- **Patient**: Entidade de domínio para pacientes (não será criada automaticamente na Fase 1).

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% dos caminhos de login/cadastro partindo da Home Pública preservam o `AccessType` escolhido pelo usuário
- **SC-002**: Usuários conseguem identificar claramente se estão no fluxo de cuidador ou paciente através dos textos e ícones exibidos
- **SC-003**: URLs antigas (`/login`, `/register` sem `type`) continuam funcionando com comportamento padrão (cuidador)
- **SC-004**: Zero quebras no fluxo de autenticação existente (login/cadastro de cuidadores)
- **SC-005**: Telemetria captura corretamente a distribuição de cadastros por `accessType` para análise futura
- **SC-006**: Tempo para completar cadastro não aumenta em mais de 5% comparado ao fluxo atual

---

## Assumptions

1. O módulo `public-home-role-access` já define `VALID_ACCESS_TYPES`, `AccessType` e `normalizeAccessType` - serão reutilizados
2. O componente `LoginContext` já existe e pode ser estendido para suportar configurações por tipo de acesso
3. O backend atual não requer mudanças de autorização - `accessType` é apenas para UX e telemetria
4. O redirecionamento pós-login continuará para `/dashboard` (sem diferenciação por tipo na Fase 1)
5. A estrutura de formulários de cadastro permanece a mesma - apenas textos e payload mudam

---

## Dependencies

- Módulo `public-home-role-access` com helpers de `AccessType`
- Componentes de UI existentes (cards da Home, formulários de login/cadastro)
- Serviço de autenticação do backend (`AuthService`)
