# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.3.0] - 2025-12-01

### ✨ Funcionalidades

- **Home Page Pública** ([PR #9](https://github.com/glaucia86/health-monitoring-system/pull/9))
  - Hero section com gradientes animados e seleção de papel (cuidador/paciente)
  - Seção de estatísticas (10k+ usuários, 50k+ registros, 99.9% uptime, suporte 24/7)
  - 6 cards de recursos com ícones e descrições detalhadas
  - Seção "Como funciona" com 4 passos ilustrados
  - 3 depoimentos de usuários com avatares e avaliações 5 estrelas
  - CTA final com botões de registro e login
  - Footer completo com 4 colunas (Sobre, Produto, Suporte, Legal)

- **Fluxo de Login por Papel** ([spec](specs/feat/public-home-role-access/spec.md))
  - URL com parâmetro `?type=caregiver` ou `?type=patient`
  - Títulos e subtítulos dinâmicos baseados no papel selecionado
  - Cards com benefícios específicos para cada tipo de usuário
  - Type guards e validação de tipos de acesso

### 🔧 Manutenção

- Importação otimizada do componente `m` de `@/lib/motion-provider` para tree-shaking
- Animações com variantes: `fadeInUp`, `staggerContainer`, `staggerItem`, `scaleIn`
- Layout 100% responsivo (mobile-first)

### 📚 Documentação

- `PRD_FEATURE_06.md` - ADR e PRD da feature
- `specs/feat/public-home-role-access/` - Especificações completas

---

## [0.2.0] - 2025-11-28

### ✨ Funcionalidades

- **Perfil de Cuidadores** ([PR #2](https://github.com/glaucia86/health-monitoring-system/pull/2))
  - Header responsivo com hero ilustrativa
  - Blocos de informação com estado clínico e atividades recentes
  - Atualização de dados pessoais, avatar e preferências

- **Upload de Avatar**
  - Validação de tipo/tamanho (JPEG, PNG, WebP)
  - Bloqueio para evitar condições de corrida
  - Limpeza automática de arquivos órfãos

- **Chat Síncrono Aprimorado**
  - Área maior com botões de ação rápidos
  - Layout "estilo IA" com altura fixa

### 🔧 Manutenção

- Refatoração dos componentes de perfil e upload
- Ajustes no serviço de usuários para permissões de deleção/soft delete
- Configuração do `next.config.ts` para imagens em `localhost:3001/uploads/**`

### 🏗️ Infraestrutura

- Radix UI (Alert Dialog, Popover)
- `react-easy-crop`, `react-phone-number-input`, `flag-icons`
- `date-fns` para manipulação de datas

### 📚 Documentação

- Inclusão do `CHANGELOG.md`
- Organização dos documentos de especificação

---

## [0.1.0] - 2025-11-26

### 🎉 Lançamento Inicial

Primeira versão de desenvolvimento do Health Monitoring System.

### ✨ Funcionalidades

- **Sistema de Autenticação**
  - Login com validação de email e senha
  - Registro de usuários com validação completa de campos
  - Integração com JWT para autenticação segura

- **Dashboard**
  - Visualização de métricas de saúde
  - Interface responsiva com suporte a tema claro/escuro

- **Chat com IA**
  - Assistente virtual para consultas de saúde
  - Integração com Azure OpenAI
  - Histórico de conversas

- **Gestão de Pacientes**
  - CRUD completo de pacientes
  - Validação de CPF (formato XXX.XXX.XXX-XX)

### 🐛 Correções

- **Formulário de Login** ([spec §2.2](specs/bug-fixes-01/spec.md))
  - Removida validação `.min(6)` do campo senha (apenas verificação de preenchimento)
  
- **Formulário de Registro** ([spec §2.3, §5, §8](specs/bug-fixes-01/spec.md))
  - Corrigido `name.min(2)` (anteriormente era 3)
  - Adicionado `phone.min(10)` para validação de telefone
  - Removida validação de checksum do CPF (apenas formato)

- **Função truncateId** ([spec §7.2](specs/bug-fixes-01/spec.md))
  - Agora exibe início E fim do ID: `abc...xyz`
  - Threshold corrigido para `length * 2 + 3`

### 🏗️ Infraestrutura

- Configuração do Docker Compose para desenvolvimento
- Banco de dados PostgreSQL com Prisma ORM
- Backend NestJS com arquitetura modular
- Frontend Next.js 15 com App Router

### 📚 Documentação

- PRD (Product Requirements Document)
- Especificações técnicas
- Contratos de API
- README bilíngue (PT-BR e EN)

---

## Tipos de Mudanças

- 🎉 **Lançamento** - Novas versões
- ✨ **Funcionalidades** - Novas funcionalidades
- 🐛 **Correções** - Correção de bugs
- 🔒 **Segurança** - Correções de vulnerabilidades
- ⚡ **Performance** - Melhorias de performance
- 📚 **Documentação** - Mudanças na documentação
- 🏗️ **Infraestrutura** - Mudanças em CI/CD, Docker, etc.
- 🔧 **Manutenção** - Refatorações e melhorias de código
- ⚠️ **Deprecado** - Funcionalidades que serão removidas
- 🗑️ **Removido** - Funcionalidades removidas
- 💥 **Breaking Changes** - Mudanças incompatíveis com versões anteriores

[0.3.0]: https://github.com/glaucia86/health-monitoring-system/releases/tag/v0.3.0
[0.2.0]: https://github.com/glaucia86/health-monitoring-system/releases/tag/v0.2.0
[0.1.0]: https://github.com/glaucia86/health-monitoring-system/releases/tag/v0.1.0
