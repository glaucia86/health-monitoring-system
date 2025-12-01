## ADR — Role-Aware Auth Flow (AccessType-aware Auth Flow)

**ID:** ADR-007
**Título:** Diferenciar fluxo de cadastro e login por tipo de acesso (cuidador x paciente)
**Status:** Proposto
**Data:** 2025-11-30
**Autor:** Glaucia + “Spec Kit Buddy” 😄

### 1. Contexto

* A Home Pública já exibe **cards de seleção de papel** “Sou Cuidador / Profissional” e “Sou Paciente”, com links para `/login?type=caregiver` e `/login?type=patient`.  
* O módulo `public-home-role-access` já define `VALID_ACCESS_TYPES = ['caregiver', 'patient']`, `AccessType` e helpers como `normalizeAccessType`. 
* O `RegisterRequest` no front já possui um campo opcional `role?: string`, que hoje é pouco usado para diferenciar o tipo de acesso. 
* No backend, o `RegisterDto` recebe uma `role` do enum Prisma `Role` (`ADMIN`, `VIEWER`, `DOCTOR`), com default `VIEWER`.  

**Problemas atuais:**

1. O usuário escolhe “Sou Paciente” na Home, mas ao clicar em **“Criar conta gratuita”** ou **“Cadastre-se”**, cai em `/register` **sem contexto** de tipo de acesso.
2. O botão **“Entrar”** pode levar para um fluxo que assume “cuidador” por padrão, mesmo se a intenção era “paciente”.
3. O sistema não deixa claro qual jornada está sendo iniciada (cuidador x paciente), o que é crítico num sistema de saúde.

### 2. Decisão

1. **Padronizar o uso de `AccessType` (`caregiver` | `patient`) em TODOS os links de login/cadastro**:

   * `Entrar` → `/login?type=caregiver` ou `/login?type=patient` (conforme origem).
   * `Cadastre-se` → `/register?type=caregiver` ou `/register?type=patient`.
   * `Criar conta gratuita` → idem.

2. **Registrar o tipo de acesso no front como `accessType` (separado de `role`)**:

   * `accessType` é um **conceito de UX** (jornada: cuidador vs paciente).
   * `role` no backend continuará como `Role.VIEWER` por padrão, até termos política de perfis mais complexa.

3. **A página de `/login` passa a ser “context-aware”**:

   * Lê `type` da query (`normalizeAccessType`).
   * Ajusta título, subtítulo e textos do formulário para “Login de Cuidador” ou “Login de Paciente”.
   * Mantém a lógica de autenticação **idêntica** (email/senha + JWT), pois quem autentica é `User`, não `Patient`.

4. **A página de `/register` passa a ser “context-aware”**:

   * Lê `type` da query (`normalizeAccessType`).
   * Ajusta:

     * copy (título, descrição, texto dos campos, CTA final),
     * conteúdo informativo (ex.: “Cadastre-se como cuidador/profissional” vs “Cadastre-se como paciente”).
   * Envia para o backend:

     * Os campos atuais de cadastro (nome, email, cpf, data de nascimento, etc.). 
     * Um **header ou claim no payload** como `accessType: 'caregiver' | 'patient'` (sem confundir com `role` do Prisma).

5. **Backend interpreta `accessType` apenas para fluxo de domínio, não para autorização**:

   * Para `accessType = caregiver` → apenas cria `User` (VIEWER / DOCTOR no futuro).
   * Para `accessType = patient` → cria `User` e, **num segundo passo ou job**, cria um `Patient` vinculado a esse `userId` (ou deixa isso planejado como “Phase 2”, se ainda não for implementar agora).

6. **Redirect pós login/cadastro preparado para o futuro**:

   * Hoje: continuar redirecionando para `/dashboard` (dashboard de cuidador). 
   * Futuro: com paciente pronto, criar:

     * `/dashboard/caregiver`
     * `/dashboard/patient`
     * e decidir redireto baseado em `accessType` da navegação ou em uma propriedade do usuário (ex.: possuir `patientId` no payload JWT). 

### 3. Alternativas Consideradas

1. **Ter rotas físicas separadas para tudo**:

   * `/login/caregiver`, `/login/patient`, `/register/caregiver`, `/register/patient`.
   * **Desvantagem:** duplicação de páginas, manutenção mais complexa, viola DRY e aumenta chance de divergência.

2. **Inferir tipo somente pela estrutura de dados (se tem `Patient` → paciente)**:

   * Não considerar query param `type`.
   * **Desvantagem:** perde-se UX clara na entrada, e o usuário não entende a jornada que está escolhendo.

**Decisão final:**
Manter **rotas únicas** (`/login`, `/register`) e controlar contexto via `AccessType` + `?type=…`, em linha com o que já foi feito para a Home Pública.

### 4. Consequências

**Positivas:**

* UX consistente: usuário escolhe jornada na Home e ela é preservada até o login/cadastro.
* Não quebra o modelo de segurança atual (JWT, roles, guards) .
* Prepara o terreno para dashboards separados de paciente/cuidador.
* Mantém baixo acoplamento entre **camada de apresentação** (`AccessType`) e **modelo de autorização** (`Role`).

**Negativas / Trade-offs:**

* Backend precisa aceitar e logar `accessType` no fluxo de cadastro (apesar de simples).
* É mais um conceito (AccessType) para o time entender ao lado de `Role`.
* Requer ajuste cuidadoso em todos os CTAs para evitar inconsciências.

---

## PRD — Fluxo de Cadastro e Login Sensível ao Tipo de Acesso

### 1. Visão Geral

**Resumo:**
Garantir que a jornada de **entrar/cadastrar** se mantenha coerente com a intenção inicial do usuário (cuidador x paciente), desde a Home Pública até o dashboard, usando o conceito de `AccessType` já existente.

**Objetivos:**

1. **Preservar o `AccessType`** em todos os caminhos de login/cadastro.
2. **Diferenciar a experiência visual e textual** de cuidador vs paciente.
3. **Não quebrar** o backend atual, mas **preparar** o domínio para expansão do fluxo de pacientes.

**Escopo (Fase 1):**

* Ajuste de todos os **links e botões** relacionados a login/cadastro.
* Tornar `/login` e `/register` **context-aware** com `type`.
* Encoder/decodificar `accessType` no fluxo de cadastro e login (minimamente, para logs e futura lógica de negócios).

**Fora de escopo (Fase 1):**

* Criação do dashboard completo de paciente.
* Mudar regras de autorização de roles no backend.
* Implementar fluxo de associação cuidador ↔ paciente.

---

### 2. Personas e Histórias de Usuário

**Persona 1 — Cuidador Profissional (Maria, 42 anos)**

* *“Quero acessar o sistema como cuidadora para cadastrar/monitorar os pacientes que acompanho.”*

**User Story 1:**

> Como **cuidadora**, ao clicar em “Sou Cuidador / Profissional” e depois em “Criar conta gratuita”,
> quero que o sistema mantenha essa escolha e mostre um cadastro de cuidador,
> para que eu tenha clareza de que meu acesso será como cuidadora.

**Critérios de Aceite:**

* “Criar conta gratuita” leva a `/register?type=caregiver`.
* A página de registro exibe título e descrição específicos para cuidador.
* No login, a copy e o contexto também são de cuidador.

---

**Persona 2 — Paciente (João, 55 anos)**

* *“Quero acessar o sistema para acompanhar meus exames, consultas e medicações.”*

**User Story 2:**

> Como **paciente**, ao clicar em “Sou Paciente” e depois em “Criar conta gratuita” ou “Cadastre-se”,
> quero que o sistema mantenha essa escolha e me conduza a um fluxo claro de paciente,
> para não achar que estou criando uma conta de cuidador.

**Critérios de Aceite:**

* “Criar conta gratuita”/“Cadastre-se” leva a `/register?type=patient`.
* A página de registro muda o texto para paciente.
* No futuro, após login, poderei ser redirecionado ao dashboard específico de paciente.

---

### 3. Requisitos Funcionais

#### 3.1 Frontend — Navegação e URLs

1. **Home Pública:**

   * Card “Sou Cuidador / Profissional”:

     * Botão “Entrar” → `/login?type=caregiver`.
     * Botão “Criar conta gratuita” → `/register?type=caregiver`.
   * Card “Sou Paciente”:

     * Botão “Entrar” → `/login?type=patient`.
     * Botão “Criar conta gratuita” → `/register?type=patient`.

2. **Página `/login`**:

   * Deve ler `type` via `searchParams` e normalizar usando `normalizeAccessType` (`caregiver` padrão). 
   * Com base em `type`, configurar um `LoginContext` (já existe no módulo de role-access) com:

     * `title`, `subtitle`, `icon`.
   * O link de footer **“Cadastre-se”** deve apontar para `/register?type=<type normalizado>`. 

3. **Página `/register`**:

   * Deve ler `type` via `searchParams` e normalizar com o mesmo helper.
   * Ajustar:

     * Título: “Criar conta de Cuidador” vs “Criar conta de Paciente”.
     * Descrição: texto contextualizado com cada jornada.
   * O link **“Já tem uma conta? Faça login”** deve apontar para `/login?type=<type normalizado>`. 

4. **Componente utilitário recomendado**:

   * Criar um helper `buildAuthUrl(path: '/login' | '/register', type?: AccessTypeAll)`:

     * Garante que **toda** construção de URL de auth respeita `AccessType`.
     * Ajuda a manter o código DRY e aderente à Single Responsibility.

#### 3.2 Frontend — Formulários

1. **`RegisterPage`**:

   * Manter o schema com Zod como está para os dados pessoais. 
   * Acrescentar a noção de `accessType` no payload:

     ```ts
     const accessType = normalizeAccessType(searchParams.get('type'));

     const payload = {
       ...data,
       cpf: unformatCPF(data.cpf),
       accessType, // novo campo enviado para o backend
     };
     ```
   * Aceitar cenário de fallback: se não houver `type` na URL, assumir `caregiver`.

2. **`LoginPage`**:

   * Similar: ler `accessType` da query e, opcionalmente, logar isso (para telemetria/futuras decisões de redirect).
   * Não é necessário enviar `accessType` para o backend no login agora, pois a autenticação é só por email/senha; mas pode ser útil enviar num header para logging.

#### 3.3 Backend — Auth Service / Register

1. **`RegisterDto`**:

   * (Opcional na Fase 1) Acrescentar um campo opcional `accessType?: 'caregiver' | 'patient'` **como string**, sem acoplar ao enum `Role`.

2. **AuthService.register()**:

   * Logar `accessType` para métricas.
   * Fase 1 (mínimo): comportar-se igual hoje, sempre criando `User` com `Role.VIEWER`.
   * Fase 2 (planejada):

     * Para `accessType = patient`: criar `Patient` vinculado a `userId`, usando `name`, `birthDate` etc. da request.

3. **JWT Strategy / Payload**:

   * Mantém como está: `sub`, `email`, `role`, `patientId`. 
   * Em Fase 2, quando criarmos automaticamente o `Patient`, o `JwtStrategy` continuará preenchendo `patientId` ao validar o token, sem mudança de contrato para o frontend. 

---

### 4. Requisitos Não Funcionais

1. **Clean Architecture / SOLID**

   * `AccessType` continua sendo um conceito de **camada de apresentação** (tipagem e UX).
   * `Role` (Prisma) permanece como conceito de **domínio/autorização**.
   * Helpers de URL e de contexto em módulos próprios para não “sujar” componentes com lógica de roteamento.

2. **Segurança**

   * Nenhuma informação sensível adicional é exposta no token.
   * `accessType` não define autorização; é apenas contexto de UX.

3. **Telemetria**

   * Logar quantos cadastros foram iniciados por `accessType` (para medir adoção de paciente vs cuidador).
   * Em Fase 2, medir quantos logins de paciente vs cuidador.

4. **Compatibilidade**

   * URLs antigas `/login` e `/register` sem `type` continuam funcionando com default `caregiver`.

---

### 5. Plano de Entrega (Fatiamento)

1. **Slice 1 — Frontend URLs e contexto básico**

   * Ajustar botões na Home (`/login?type=...`, `/register?type=...`).
   * Ajustar footer da página de login (`Cadastre-se` com `type`).
   * Adicionar leitura de `type` em `/login` e alterar textos.

2. **Slice 2 — `/register` context-aware**

   * Ler `type`, ajustar copy, links e redirecionamentos.
   * Adicionar `accessType` no payload do cadastro (somente frontend).

3. **Slice 3 — Backend-aware (opcional em Fase 1)**

   * Backend receber e logar `accessType`.
   * (Fase 2) Criar `Patient` automaticamente para `accessType = patient`.
