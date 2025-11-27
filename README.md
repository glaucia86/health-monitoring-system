<div align="center">

# 🏥 Health Monitoring System

### Sistema Integrado de Monitoramento e Gerenciamento de Dados Médicos
**Para Pacientes com Câncer de Mama Avançado**

![Version](https://img.shields.io/badge/version-1.0.0--alpha-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

<br/>

<!-- Tech Stack Badges -->
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS_11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Azure](https://img.shields.io/badge/Azure_Blob_Storage-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

<br/>

[📖 Documentação](#-documentação) •
[🚀 Quick Start](#-quick-start) •
[🎯 Funcionalidades](#-funcionalidades) •
[🧪 Demo](#-demo)

</div>

---

## 🚨 Aviso Importante

> ⚠️ **Este projeto está na versão 1.0.0-alpha e em fase ativa de desenvolvimento.**
> 
> Funcionalidades podem mudar, e bugs são esperados. Contribuições são bem-vindas!

---

## 🧪 Demo

### 📸 Home Page

<div align="center">
  <img src="resources/img/home-page.png" alt="Home Page" width="800"/>
</div>

### 🎬 Aplicação em Funcionamento (v1)

<div align="center">
  <img src="resources/img/sdd-demo.gif" alt="Demo da Aplicação" width="800"/>
</div>

---

## 🧪 Experimente Agora

Você pode testar a aplicação diretamente no navegador usando GitHub Codespaces ou rodar localmente com Docker:

<div align="center">

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/glaucia86/health-monitoring-system?quickstart=1)

**ou**

[![Run with Docker](https://img.shields.io/badge/Run_with-Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#-executando-com-docker)

</div>

---

## 📋 Sobre o Projeto

Sistema completo de gerenciamento de saúde com assistente de IA, desenvolvido para centralizar dados médicos de pacientes com câncer de mama avançado, oferecendo:

- 📊 Dashboard interativo com evolução de exames
- 💊 Gerenciamento de medicações com lembretes
- 🤖 Chat com IA para explicar e organizar informações médicas
- 📄 Upload e análise de documentos médicos

---

## 🔬 Metodologia de Desenvolvimento: SDD

Este projeto está sendo desenvolvido usando **SDD (Spec-Driven Development)** com a ferramenta [**spec-kit**](https://github.com/github/spec-kit).

### O que é SDD?

**Spec-Driven Development** é uma metodologia onde as especificações (specs) guiam todo o desenvolvimento:

1. 📝 **Especificação primeiro** - Definimos o comportamento esperado antes de codificar
2. 🎯 **Foco no resultado** - Cada feature tem specs claras e testáveis
3. 🔄 **Iteração rápida** - Specs evoluem junto com o código
4. 📖 **Documentação viva** - Specs servem como documentação atualizada

### Por que spec-kit?

O **spec-kit** nos ajuda a:
- ✅ Gerar código a partir de especificações
- ✅ Manter consistência entre spec e implementação
- ✅ Automatizar validações
- ✅ Facilitar colaboração entre times

> 💡 Para mais informações sobre SDD e spec-kit, consulte a [documentação oficial](https://github.com/github/spec-kit).

---

## 🎯 Funcionalidades

| Feature | Status | Descrição |
|---------|--------|-----------|
| 🔐 Autenticação JWT | ✅ Implementado | Sistema completo de registro e login |
| 📊 Dashboard Interativo | ✅ Implementado | Visualização de consultas, medicamentos e exames |
| 🤖 Chat com IA | ✅ Implementado | Assistente inteligente usando LangChain + OpenAI |
| 📄 Upload de Documentos | ✅ Implementado | Armazenamento seguro no Azure Blob Storage |
| 🔔 Sistema de Notificações | 🚧 Em progresso | Lembretes automáticos de medicamentos |
| 📈 RAG (Retrieval Augmented Generation) | 🚧 Em progresso | Busca semântica com embeddings e pgvector |
| 📋 Logs de Auditoria | ✅ Implementado | Sistema de logging com Winston |
| 📚 Documentação de API | ✅ Implementado | Swagger/OpenAPI integrado |

---

## 🛠️ Stack Tecnológica

<table>
<tr>
<td valign="top" width="50%">

### Frontend
| Tecnologia | Versão |
|------------|--------|
| Next.js | 16.0.4 |
| React | 19.2.0 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Framer Motion | 12.x |
| TanStack Query | 5.x |
| Zustand | 5.x |
| shadcn/ui | latest |
| React Hook Form | 7.x |
| Zod | 4.x |

</td>
<td valign="top" width="50%">

### Backend
| Tecnologia | Versão |
|------------|--------|
| NestJS | 11.x |
| PostgreSQL | 16 |
| Prisma ORM | 6.x |
| LangChain | 1.x |
| OpenAI API | latest |
| Azure Blob Storage | 12.x |
| pgvector | latest |
| Winston | 3.x |
| Passport JWT | 4.x |
| Swagger | 11.x |

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 20+
- Docker Desktop
- Conta Azure (para Blob Storage) - opcional
- Chave de API OpenAI ou GitHub Models

### 1. Clone o repositório

```bash
git clone https://github.com/glaucia86/health-monitoring-system.git
cd health-monitoring-system
```

### 2. Configure as variáveis de ambiente

```bash
# Backend
cp server/.env.example server/.env

# Frontend
cp client/.env.local.example client/.env.local
```

Edite os arquivos `.env` com suas credenciais.

### 3. Inicie o banco de dados

```bash
docker-compose up -d
```

### 4. Instale as dependências e execute as migrações

```bash
# Backend
cd server
npm install
npx prisma migrate dev

# Frontend
cd ../client
npm install
```

### 5. Execute a aplicação

```bash
# Terminal 1 - Backend
cd server
npm run start:dev

# Terminal 2 - Frontend
cd client
npm run dev
```

🎉 Acesse **http://localhost:3000** e aproveite!

---

## 🐳 Executando com Docker

Para rodar toda a aplicação com Docker Compose:

```bash
# Clone o repositório
git clone https://github.com/glaucia86/health-monitoring-system.git
cd health-monitoring-system

# Configure as variáveis de ambiente
cp server/.env.example server/.env
cp client/.env.local.example client/.env.local

# Suba todos os serviços
docker-compose up -d

# Execute as migrações
docker-compose exec server npx prisma migrate dev
```

---

## 📖 Documentação

### API Documentation

Após iniciar o backend, acesse a documentação Swagger em:

📚 **http://localhost:3001/api-docs**

### Estrutura do Projeto

```
health-monitoring-system/
├── 📁 client/                # Frontend Next.js
│   ├── src/
│   │   ├── app/              # App Router (páginas)
│   │   ├── components/       # Componentes React
│   │   ├── lib/              # Utilitários
│   │   ├── services/         # API services
│   │   ├── stores/           # Zustand stores
│   │   └── types/            # TypeScript types
│   └── .env.local
│
├── 📁 server/                # Backend NestJS
│   ├── src/
│   │   ├── auth/             # Autenticação JWT
│   │   ├── dashboard/        # Dashboard endpoints
│   │   ├── chat/             # Chat com IA
│   │   ├── documents/        # Upload de documentos
│   │   ├── medications/      # Medicamentos
│   │   ├── exams/            # Exames
│   │   ├── appointments/     # Consultas
│   │   ├── notifications/    # Notificações
│   │   └── prisma/           # Prisma client
│   ├── prisma/
│   │   └── schema.prisma
│   └── .env
│
├── 📁 resources/             # Assets e recursos
│   └── img/
│
├── 📄 docker-compose.yml
├── 📄 PRD.md                 # Product Requirements Document
└── 📄 README.md
```

---

## 🔑 Principais Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/register` | Registrar novo usuário |
| `POST` | `/auth/login` | Fazer login |
| `GET` | `/auth/me` | Obter perfil do usuário |
| `GET` | `/dashboard/overview` | Resumo do dashboard |
| `GET` | `/dashboard/exams/trends` | Tendências de exames |
| `POST` | `/chat/message` | Enviar mensagem para IA |
| `POST` | `/documents/upload` | Upload de documento |
| `GET` | `/documents` | Listar documentos |

---

## 🐛 Troubleshooting

<details>
<summary><strong>Erro de conexão com banco de dados</strong></summary>

- Verifique se o Docker está rodando
- Confirme que a porta 5432 não está em uso
- Valide a `DATABASE_URL` no `.env`

</details>

<details>
<summary><strong>Chat com IA não funciona</strong></summary>

- Verifique se a `OPENAI_API_KEY` ou `GITHUB_TOKEN` está configurada
- Confirme que tem créditos na conta OpenAI

</details>

<details>
<summary><strong>Upload de documentos falha</strong></summary>

- Verifique a `AZURE_STORAGE_CONNECTION_STRING`
- Confirme que o container existe no Azure

</details>

---

## 🗺️ Roadmap

- [x] **v1.0.0-alpha** - MVP com funcionalidades básicas
- [ ] **v1.0.0-beta** - Sistema de lembretes completo
- [ ] **v1.0.0** - RAG com pgvector
- [ ] **v1.1.0** - Notificações push/WhatsApp
- [ ] **v2.0.0** - Integrações hospitalares (HL7/FHIR)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de submeter um PR.

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autora

<div align="center">

**Glaucia Lemos**

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/glaucia_lemos86)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/glaucialemos/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/glaucia86/)

</div>

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

Made with ❤️ and ☕ by Glaucia Lemos

</div>
