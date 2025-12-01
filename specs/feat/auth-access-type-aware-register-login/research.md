# Research: Fluxo de Autenticação Sensível ao Tipo de Acesso

**Feature Branch**: `feat/auth-access-type-aware-register-login`  
**Date**: 2025-11-30  
**Status**: Complete

---

## Research Summary

Esta pesquisa identificou o estado atual da implementação e as melhores práticas para estender o fluxo de autenticação com contexto de tipo de acesso.

---

## 1. Estado Atual da Implementação

### 1.1 AccessType Module

**Decision**: Reutilizar o módulo `AccessType` existente  
**Rationale**: Já existe implementação completa em `client/src/types/access.types.ts`  
**Alternatives considered**: Criar novo sistema de tipos - rejeitado por duplicação desnecessária

**Código existente**:
```typescript
// client/src/types/access.types.ts
export const VALID_ACCESS_TYPES = ['caregiver', 'patient'] as const;
export type AccessType = (typeof VALID_ACCESS_TYPES)[number];

export function normalizeAccessType(type: string | null | undefined): AccessType {
  if (type && VALID_ACCESS_TYPES.includes(type.toLowerCase() as AccessType)) {
    return type.toLowerCase() as AccessType;
  }
  return 'caregiver'; // default
}

export function isValidAccessType(type: string | null | undefined): type is AccessType {
  return type !== null && type !== undefined && 
    VALID_ACCESS_TYPES.includes(type.toLowerCase() as AccessType);
}
```

### 1.2 LoginContext Configuration

**Decision**: Estender LoginContext para suportar página de registro  
**Rationale**: Já existe configuração em `client/src/config/login-contexts.ts` com textos por tipo  
**Alternatives considered**: Criar novo arquivo de configuração - rejeitado por fragmentação

**Código existente**:
```typescript
// client/src/config/login-contexts.ts
export const loginContexts: Record<AccessType, LoginContext> = {
  caregiver: {
    title: 'Login de Cuidador',
    subtitle: 'Acesse o painel de monitoramento de pacientes',
    icon: Stethoscope,
    // ...
  },
  patient: {
    title: 'Login de Paciente', 
    subtitle: 'Acompanhe sua saúde e medicações',
    icon: User,
    // ...
  },
};
```

### 1.3 Página de Login

**Decision**: Página de login já está context-aware - não requer mudanças  
**Rationale**: Já implementa leitura de `?type` e usa `getLoginContext()`  
**Alternatives considered**: N/A - já implementado

**Código existente** em `client/src/app/login/page.tsx`:
- ✅ Lê `searchParams.get('type')`
- ✅ Usa `normalizeAccessType(type)`
- ✅ Aplica `getLoginContext(accessType)` para textos
- ⚠️ Link para registro **não preserva** o type param (precisa correção)

### 1.4 Página de Registro

**Decision**: Precisa implementar context-awareness  
**Rationale**: Atualmente hardcoded para "Criar conta" sem diferenciação  
**Alternatives considered**: N/A - é o foco principal desta feature

**Estado atual** em `client/src/app/register/page.tsx`:
- ❌ Não lê parâmetro `type` da URL
- ❌ Título fixo "Criar conta"
- ❌ Não inclui `accessType` no payload
- ❌ Link para login não preserva type

### 1.5 Home Page Role Cards

**Decision**: Atualizar URLs dos cards para incluir `?type`  
**Rationale**: Cards já apontam para `/login?type=caregiver` e `/login?type=patient`, mas **não** para registro  
**Alternatives considered**: N/A

**Estado atual** em `client/src/app/page.tsx`:
- ✅ Card Cuidador → `href="/login?type=caregiver"` 
- ✅ Card Paciente → `href="/login?type=patient"`
- ⚠️ Header "Cadastrar" → `href="/register"` (sem type)
- ⚠️ CTA "Criar conta gratuita" → `href="/register"` (sem type)

### 1.6 Backend RegisterDto

**Decision**: Adicionar campo opcional `accessType` ao DTO  
**Rationale**: Permite rastrear intenção do usuário para métricas  
**Alternatives considered**: Não modificar backend - rejeitado por perda de dados analíticos

**Estado atual** em `server/src/auth/dto/register.dto.ts`:
- ❌ Não possui campo `accessType`

---

## 2. Padrões e Melhores Práticas

### 2.1 Preservação de Context via Query Params

**Decision**: Usar query params `?type=` em todas as URLs de autenticação  
**Rationale**: 
- Persiste em refresh/back navigation
- Permite deep linking
- SSR-friendly (não depende de estado client-side)  
**Alternatives considered**: 
- Zustand store - rejeitado por perda em refresh
- Cookie - rejeitado por overhead desnecessário
- Path segments (`/login/caregiver`) - rejeitado por rework de rotas

### 2.2 Helper para URLs de Autenticação

**Decision**: Criar `buildAuthUrl(path, accessType)` helper  
**Rationale**: Centraliza lógica de construção de URLs, previne inconsistências  

**Proposta**:
```typescript
// client/src/lib/auth-url.ts
import { AccessType } from '@/types/access.types';

export function buildAuthUrl(path: '/login' | '/register', accessType: AccessType): string {
  return `${path}?type=${accessType}`;
}
```

### 2.3 Configuração de Registro Context

**Decision**: Adicionar `RegisterContext` similar ao `LoginContext`  
**Rationale**: Mantém consistência de padrões  

**Proposta**:
```typescript
// Adicionar ao login-contexts.ts ou criar register-contexts.ts
export const registerContexts: Record<AccessType, RegisterContext> = {
  caregiver: {
    title: 'Criar conta de Cuidador',
    subtitle: 'Comece a monitorar pacientes em minutos',
    icon: Stethoscope,
  },
  patient: {
    title: 'Criar conta de Paciente',
    subtitle: 'Acompanhe sua saúde de forma simples',
    icon: User,
  },
};
```

### 2.4 Backend Validation

**Decision**: Usar `class-validator` para validar accessType no DTO  
**Rationale**: Consistente com outros campos do DTO  

**Proposta**:
```typescript
// server/src/auth/dto/register.dto.ts
@IsOptional()
@IsIn(['caregiver', 'patient'])
accessType?: 'caregiver' | 'patient';
```

---

## 3. Riscos e Mitigações

### 3.1 URLs Antigas sem Type Param

**Risco**: Bookmarks antigos ou links externos sem `?type`  
**Mitigação**: `normalizeAccessType()` já retorna 'caregiver' como default  
**Status**: ✅ Coberto pelo código existente

### 3.2 Tipo Inválido na URL

**Risco**: Usuário manipula URL com tipo inválido (`?type=admin`)  
**Mitigação**: `normalizeAccessType()` normaliza para 'caregiver'  
**Status**: ✅ Coberto pelo código existente

### 3.3 Inconsistência Frontend/Backend

**Risco**: Frontend envia tipo diferente do esperado pelo backend  
**Mitigação**: Backend valida com `@IsIn(['caregiver', 'patient'])`  
**Status**: 🔶 Implementar na DTO

---

## 4. Gaps Identificados (NEEDS CLARIFICATION - Resolvidos)

| Item | Clarificação | Resolução |
|------|--------------|-----------|
| Login page link to register | Link não preserva type | Implementar correção no login/page.tsx |
| Home page register links | Não incluem type param | Adicionar type baseado no contexto mais próximo ou usar default |
| RegisterDto accessType | Campo não existe | Adicionar como campo opcional validado |
| Telemetria de accessType | Como logar? | Usar `AuditService` existente ou `console.log` para métricas |

---

## 5. Conclusão

A implementação requer modificações cirúrgicas em arquivos existentes:

1. **client/src/app/page.tsx** - Atualizar URLs de registro no header e CTA
2. **client/src/app/register/page.tsx** - Tornar context-aware
3. **client/src/app/login/page.tsx** - Atualizar link "Cadastre-se" para preservar type
4. **client/src/lib/auth-url.ts** - Criar helper (novo arquivo)
5. **client/src/config/login-contexts.ts** - Adicionar RegisterContext
6. **server/src/auth/dto/register.dto.ts** - Adicionar campo accessType
7. **server/src/auth/auth.service.ts** - Logar accessType para telemetria

**Risco geral**: Baixo - alterações localizadas sem impacto em outros módulos.
