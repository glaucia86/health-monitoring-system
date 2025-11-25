# Sistema Integrado de Monitoramento e Gerenciamento de Dados Médicos

**Para Pacientes com Câncer de Mama Avançado**

Sistema completo de gerenciamento de saúde com assistente de IA, desenvolvido com NestJS e Next.js.

## 🚀 Funcionalidades

- **Autenticação JWT**: Sistema completo de registro e login
- **Dashboard Interativo**: Visualização de consultas, medicamentos e exames
- **Chat com IA**: Assistente inteligente para dúvidas de saúde usando OpenAI
- **Upload de Documentos**: Armazenamento seguro no Azure Blob Storage
- **Sistema de Notificações**: Lembretes automáticos de medicamentos e consultas
- **RAG (Retrieval Augmented Generation)**: Busca semântica com embeddings e pgvector
- **Logs de Auditoria**: Sistema de logging com Winston
- **Documentação de API**: Swagger/OpenAPI integrado

## 🛠️ Tecnologias

### Backend
- NestJS 10
- PostgreSQL 16
- Prisma ORM
- JWT Authentication
- OpenAI API (GPT-4)
- Azure Blob Storage
- pgvector (embeddings)
- Winston (logging)
- @nestjs/swagger (documentação)

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4
- Zustand (state management)
- React Query (data fetching)
- shadcn/ui (componentes)

## 📋 Pré-requisitos

- Node.js 18+ e npm
- Docker Desktop
- PostgreSQL 16 (ou via Docker)
- Conta Azure (para Blob Storage)
- Chave de API OpenAI

## ⚙️ Configuração

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd health-monitoring-system
```

### 2. Configurar Variáveis de Ambiente

#### Backend (server/.env)

Copie o arquivo `.env.example` e configure:

```bash
cd server
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/healthmonitoring?schema=public"

# JWT
JWT_SECRET="seu-secret-super-seguro"
JWT_EXPIRATION="7d"

# Azure Storage (obrigatório para upload de documentos)
AZURE_STORAGE_CONNECTION_STRING="sua-connection-string"
AZURE_STORAGE_CONTAINER_NAME="patient-documents"

# OpenAI (obrigatório para chat com IA)
OPENAI_API_KEY="sua-chave-openai"
OPENAI_MODEL="gpt-4o-mini"

# Email (opcional)
SENDGRID_API_KEY=""

# Porta do servidor
PORT=3001
```

#### Frontend (client/.env.local)

```bash
cd client
cp .env.local.example .env.local
```

Edite o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Subir o Banco de Dados

```bash
# Na raiz do projeto
docker-compose up -d
```

Isso iniciará PostgreSQL com pgvector na porta 5432.

### 4. Instalar Dependências

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 5. Executar Migrações do Banco

```bash
cd server
npx prisma migrate dev
```

Isso criará todas as tabelas necessárias no banco de dados.

### 6. (Opcional) Popular Banco com Dados de Exemplo

```bash
cd server
npx prisma db seed
```

## 🏃 Executando o Projeto

### Backend

```bash
cd server
npm run dev
```

Servidor disponível em: http://localhost:3001

### Frontend

```bash
cd client
npm run dev
```

Aplicação disponível em: http://localhost:3000

## 📚 Documentação da API

Após iniciar o backend, acesse a documentação Swagger em:

**http://localhost:3001/api-docs**

A documentação inclui todos os endpoints, schemas e exemplos de requisições.

## 🗂️ Estrutura do Projeto

```
health-monitoring-system/
├── server/               # Backend NestJS
│   ├── src/
│   │   ├── auth/         # Autenticação JWT
│   │   ├── dashboard/    # Endpoints do dashboard
│   │   ├── chat/         # Chat com IA
│   │   ├── documents/    # Upload de documentos
│   │   ├── medications/  # Gerenciamento de medicamentos
│   │   ├── exams/        # Gerenciamento de exames
│   │   ├── appointments/ # Gerenciamento de consultas
│   │   ├── notifications/# Sistema de notificações
│   │   ├── common/       # Interceptors, guards, etc.
│   │   └── prisma/       # Prisma client
│   ├── prisma/
│   │   └── schema.prisma # Schema do banco
│   └── .env              # Variáveis de ambiente
│
├── client/               # Frontend Next.js
│   ├── src/
│   │   ├── app/          # App Router (páginas)
│   │   ├── components/   # Componentes React
│   │   ├── lib/          # Axios, utils
│   │   ├── services/     # API services
│   │   ├── store/        # Zustand stores
│   │   └── types/        # TypeScript types
│   └── .env.local        # Variáveis de ambiente
│
├── docker-compose.yml    # PostgreSQL + pgvector
└── README.md
```

## 🔑 Principais Endpoints

### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Fazer login
- `GET /auth/me` - Obter perfil (requer autenticação)

### Dashboard
- `GET /dashboard/overview` - Resumo do dashboard
- `GET /dashboard/exams/trends` - Tendências de exames
- `GET /dashboard/medications/adherence` - Aderência de medicamentos

### Chat
- `POST /chat/message` - Enviar mensagem para IA

### Documentos
- `POST /documents/upload` - Upload de documento
- `GET /documents` - Listar documentos
- `GET /documents/:id` - Obter documento
- `DELETE /documents/:id` - Deletar documento

## 🧪 Testando o Sistema

1. **Registrar usuário**: Acesse http://localhost:3000/register
2. **Fazer login**: Acesse http://localhost:3000/login
3. **Acessar dashboard**: Automático após login
4. **Testar chat**: Clique em "Chat com IA" no dashboard

## 🔧 Scripts Disponíveis

### Backend
```bash
npm run dev        # Desenvolvimento
npm run build      # Build de produção
npm run start:prod # Executar produção
npm run prisma:studio # Abrir Prisma Studio
```

### Frontend
```bash
npm run dev        # Desenvolvimento
npm run build      # Build de produção
npm start          # Executar build de produção
npm run lint       # Lint
```

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o Docker está rodando
- Confirme que a porta 5432 não está em uso
- Valide a `DATABASE_URL` no `.env`

### Chat com IA não funciona
- Verifique se a `OPENAI_API_KEY` está configurada
- Confirme que tem créditos na conta OpenAI

### Upload de documentos falha
- Verifique a `AZURE_STORAGE_CONNECTION_STRING`
- Confirme que o container existe no Azure

## 📝 Licença

Este projeto é para fins educacionais.

## 👥 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.
