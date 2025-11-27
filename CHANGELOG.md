# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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

[0.1.0]: https://github.com/glaucia86/health-monitoring-system/releases/tag/v0.1.0
