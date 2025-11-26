# Feature Specification: Bug Fixes from Usability Testing

**Date**: 2025-11-26  
**Author**: Copilot  
**Status**: Ready for Implementation  
**Branch**: `bug-fixes-01`  
**Source**: Playwright MCP Browser Usability Testing Session

---

## 1. Overview

### 1.1 Problem Statement

Durante testes automatizados de usabilidade com Playwright MCP, foram identificados **4 problemas de UX** nas páginas de login, registro e chat que impactam a experiência do usuário:

1. **Campo CPF sem máscara** - Usuários não recebem feedback visual do formato esperado
2. **Login sem mensagens de erro** - Formulário não indica campos inválidos antes do submit
3. **Registro sem mensagens de erro** - Formulário não indica campos inválidos antes do submit
4. **ID de conversa muito longo** - Difícil de visualizar em dispositivos móveis

### 1.2 Objective

Corrigir os 4 bugs de usabilidade identificados, melhorando a experiência de preenchimento de formulários e a visualização de informações em dispositivos móveis, mantendo conformidade com WCAG 2.1 AA.

### 1.3 User Impact

| Bug | User Impact | Severity |
|-----|-------------|----------|
| CPF sem máscara | Confusão sobre formato correto, erros de digitação | High |
| Login sem erros | Frustração ao não saber qual campo está errado | High |
| Registro sem erros | Formulário longo sem feedback, abandono | High |
| ID longo no chat | Difícil de ler/compartilhar em mobile | Medium |

---

## 2. Functional Requirements

### 2.1 FR-01: CPF Input Mask

**Descrição**: O campo CPF no formulário de registro deve aplicar automaticamente a máscara de formatação brasileira enquanto o usuário digita.

**Comportamento Esperado**:
- Formato final: `123.456.789-01`
- Máscara aplicada progressivamente durante digitação
- Apenas dígitos (0-9) são aceitos
- Caracteres não-numéricos são ignorados silenciosamente
- Limite máximo: 11 dígitos (14 caracteres com máscara)
- Colar texto: extrai apenas dígitos e aplica máscara
- API recebe CPF sem máscara (apenas dígitos)

**Critérios de Aceitação**:
- [ ] Digitar "12345678901" exibe "123.456.789-01"
- [ ] Digitar "abc123def456" exibe "123.456" (ignora letras)
- [ ] Colar "123.456.789-01" exibe "123.456.789-01"
- [ ] Ao submeter, API recebe "12345678901" (sem máscara)

### 2.2 FR-02: Login Form Validation

**Descrição**: O formulário de login deve exibir mensagens de erro inline para campos inválidos.

**Campos e Regras**:

| Campo | Regra | Mensagem de Erro |
|-------|-------|------------------|
| Email | Obrigatório | "Email é obrigatório" |
| Email | Formato válido | "Email inválido" |
| Password | Obrigatório | "Senha é obrigatória" |

**Comportamento de Validação**:
- Validação executada no `onSubmit` (não em cada keystroke)
- Erros desaparecem quando usuário corrige o campo e faz novo submit
- Múltiplos erros podem ser exibidos simultaneamente
- Focus move para o primeiro campo com erro após submit inválido

**Critérios de Aceitação**:
- [ ] Submeter formulário vazio exibe 2 mensagens de erro
- [ ] Email "abc" exibe "Email inválido"
- [ ] Corrigir email e submeter novamente limpa o erro do email

### 2.3 FR-03: Register Form Validation

**Descrição**: O formulário de registro deve exibir mensagens de erro inline para todos os 6 campos.

**Campos e Regras**:

| Campo | Regra | Mensagem de Erro |
|-------|-------|------------------|
| Nome | Obrigatório | "Nome é obrigatório" |
| Nome | Mínimo 2 caracteres | "Nome deve ter pelo menos 2 caracteres" |
| Email | Obrigatório | "Email é obrigatório" |
| Email | Formato válido | "Email inválido" |
| CPF | Obrigatório | "CPF é obrigatório" |
| CPF | Formato xxx.xxx.xxx-xx | "CPF inválido (formato: 123.456.789-01)" |
| Data de Nascimento | Obrigatório | "Data de nascimento é obrigatória" |
| Telefone | Obrigatório | "Telefone é obrigatório" |
| Telefone | Mínimo 10 dígitos | "Telefone deve ter pelo menos 10 dígitos" |
| Senha | Obrigatória | "Senha é obrigatória" |
| Senha | Mínimo 6 caracteres | "Senha deve ter pelo menos 6 caracteres" |

**Comportamento de Validação**:
- Mesmo comportamento do login (validação onSubmit)
- CPF valida apenas formato, não dígitos verificadores
- Telefone aceita qualquer formato com pelo menos 10 dígitos

**Critérios de Aceitação**:
- [ ] Submeter formulário vazio exibe 6 mensagens de erro
- [ ] CPF incompleto "123.456" exibe erro de formato
- [ ] Senha "12345" exibe erro de mínimo 6 caracteres

### 2.4 FR-04: Conversation ID Truncation

**Descrição**: O ID da conversa no chat deve ser truncado para melhor visualização em dispositivos móveis.

**Comportamento Esperado**:
- IDs longos: exibir primeiros 8 + "..." + últimos 8 caracteres
- IDs curtos (≤19 caracteres): exibir completo
- Tooltip no hover mostra ID completo (desktop)
- Botão de copiar ao lado do ID
- Feedback visual "Copiado!" por 2 segundos após cópia

**Critérios de Aceitação**:
- [ ] ID "abc12345678901234567890xyz" exibe "abc12345...67890xyz"
- [ ] ID "short-id" exibe "short-id" (sem truncar)
- [ ] Clicar no botão de copiar copia ID completo para clipboard
- [ ] Ícone muda de Copy para Check por 2 segundos após cópia

---

## 3. Non-Functional Requirements

### 3.1 NFR-01: Accessibility (WCAG 2.1 AA)

| Requisito | Implementação |
|-----------|---------------|
| Mensagens de erro anunciadas | `role="alert"` no container do erro |
| Campos inválidos identificáveis | `aria-invalid="true"` quando em erro |
| Associação erro-campo | `aria-describedby` referenciando ID do erro |
| Navegação por teclado | Focus move para primeiro erro no submit |
| Contraste de cores | Usar `text-destructive` (já validado no design system) |

### 3.2 NFR-02: Performance

| Métrica | Target | Justificativa |
|---------|--------|---------------|
| Bundle Size Impact | 0 KB | Usar dependências existentes |
| FCP | < 1.5s | Não regredir |
| LCP | < 2.5s | Não regredir |

### 3.3 NFR-03: Browser Compatibility

| Browser | Suporte |
|---------|---------|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |

**Nota**: Clipboard API (`navigator.clipboard`) requer HTTPS ou localhost.

---

## 4. Technical Approach

### 4.1 Dependencies (Pre-installed)

```json
{
  "react-hook-form": "7.66.1",
  "zod": "4.1.13",
  "@hookform/resolvers": "5.2.2",
  "lucide-react": "0.554.0"
}
```

Nenhuma nova dependência será instalada.

### 4.2 Files to Create

| File | Purpose |
|------|---------|
| `client/src/lib/formatCpf.ts` | Utilidades de formatação de CPF |

### 4.3 Files to Modify

| File | Changes |
|------|---------|
| `client/src/lib/utils.ts` | Adicionar função `truncateId` |
| `client/src/app/login/page.tsx` | Integrar RHF + Zod, exibir erros |
| `client/src/app/register/page.tsx` | Integrar RHF + Zod + CPF mask, exibir erros |
| `client/src/app/chat/page.tsx` | Truncar ID, adicionar botão de copiar |

---

## 5. Out of Scope

| Item | Razão |
|------|-------|
| Validação de dígitos verificadores do CPF | Complexidade desnecessária para este bug fix |
| Máscara no campo de telefone | Fora do escopo dos bugs identificados |
| Internacionalização (i18n) | Mensagens apenas em português por enquanto |
| Redesign visual do painel de documentos | Adiado para feature futura (Research §2.4) |
| Reset de formulário | Comportamento nativo já funciona |
| Tratamento de erros de API (401, 409) | Já existe tratamento via toast |

---

## 6. Error Handling

### 6.1 Client-side Validation Errors

Exibidos inline abaixo de cada campo com:
- Classe: `text-sm text-destructive mt-1`
- Atributo: `role="alert"`
- ID único para `aria-describedby`

### 6.2 API Errors (Existing Behavior)

Mantidos como estão (toast notifications):
- 401: "Credenciais inválidas"
- 409: "Email/CPF já cadastrado"
- Network error: "Erro de conexão"

---

## 7. Glossary

| Termo | Definição |
|-------|-----------|
| CPF | Cadastro de Pessoa Física (Brazilian individual taxpayer ID) |
| RHF | React Hook Form |
| Zod | TypeScript-first schema validation library |
| Clipboard API | Web API para copiar texto para área de transferência |
| WCAG | Web Content Accessibility Guidelines |

---

## 8. Clarifications

### Session 2025-11-26

- Q: CPF validation - Server-side or client-side? → A: Client-side mask + validation, server accepts raw digits
- Q: Phone field mask needed? → A: Out of scope for this bug fix
- Q: Password strength requirements? → A: Minimum 6 characters (existing backend validation)
- Q: Validation timing (onBlur vs onSubmit)? → A: onSubmit (batch validation)
- Q: CPF checksum validation? → A: No, format only (simplicity)

---

## 9. References

| Document | Path |
|----------|------|
| Implementation Plan | [plan.md](./plan.md) |
| Research Notes | [research.md](./research.md) |
| Data Model | [data-model.md](./data-model.md) |
| Quickstart Guide | [quickstart.md](./quickstart.md) |
| Tasks | [tasks.md](./tasks.md) |
| Pre-Implementation Checklist | [checklists/pre-implementation.md](./checklists/pre-implementation.md) |
