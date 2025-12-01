<div align="center">

# 🏥 Health Monitoring System

### Complete Health Monitoring Platform
**For Caregivers and Patients**

![Version](https://img.shields.io/badge/version-1.0.0--alpha-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/status-in%20development-yellow?style=for-the-badge)
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

[📖 Documentation](#-documentation) •
[🚀 Quick Start](#-quick-start) •
[🎯 Features](#-features) •
[🧪 Demo](#-demo)

</div>

---

## 🚨 Important Notice

> ⚠️ **This project is in version 1.0.0-alpha and under active development.**
> 
> Features may change, and bugs are expected. Contributions are welcome!

---

## 🧪 Demo

### 📸 Home Page

<div align="center">
  <img src="resources/img/home-page-v1.png" alt="Home Page" width="800"/>
</div>

### 🎬 Application in Action

<div align="center">
  <img src="resources/img/health-monitor-home-page.gif" alt="Application Demo" width="800"/>
</div>

---

## 🎮 Try It Now

You can test the application directly in your browser using GitHub Codespaces or run it locally with Docker:

<div align="center">

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/glaucia86/health-monitoring-system?quickstart=1)

**or**

[![Run with Docker](https://img.shields.io/badge/Run_with-Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#-running-with-docker)

</div>

---

## 📋 About the Project

A complete health management system with an AI assistant, developed to centralize and simplify medical data management. The platform serves:

**👨‍👩‍👧 Caregivers & Healthcare Professionals**
- Centralized management of patient health data
- Tracking of medications, appointments, and exams
- Document organization and access

**🧑‍🦯 Patients**
- Full control over their own health records
- Medication and appointment reminders
- Easy communication with caregivers

### Key Features:

- 📊 **Interactive Dashboard** - Complete visualization of health history
- 💊 **Smart Medication Management** - Reminders and intake tracking
- 🤖 **AI Chat** - Assistant to explain exams and organize information
- 📄 **Secure Document Upload** - Storage on Azure Blob Storage
- 👥 **Multi-profile Support** - Caregiver and patient access
- 🔒 **Security First** - JWT authentication and audit logging

---

## 🔬 Development Methodology: SDD

This project is being developed using **SDD (Spec-Driven Development)** with the [**spec-kit**](https://github.com/spec-kit/spec-kit) tool.

### What is SDD?

**Spec-Driven Development** is a methodology where specifications (specs) guide all development:

1. 📝 **Specification first** - We define the expected behavior before coding
2. 🎯 **Result-focused** - Each feature has clear and testable specs
3. 🔄 **Fast iteration** - Specs evolve alongside the code
4. 📖 **Living documentation** - Specs serve as up-to-date documentation

### Why spec-kit?

**spec-kit** helps us to:
- ✅ Generate code from specifications
- ✅ Maintain consistency between spec and implementation
- ✅ Automate validations
- ✅ Facilitate team collaboration

> 💡 For more information about SDD and spec-kit, check the [official documentation](https://github.com/spec-kit/spec-kit).

---

## 🎯 Features

| Feature | Status | Description |
|---------|--------|-------------|
| 🔐 JWT Authentication | ✅ Implemented | Complete registration and login system |
| 📊 Interactive Dashboard | ✅ Implemented | Visualization of appointments, medications, and exams |
| 🤖 AI Chat | ✅ Implemented | Intelligent assistant using LangChain + OpenAI |
| 📄 Document Upload | ✅ Implemented | Secure storage on Azure Blob Storage |
| 🔔 Notification System | 🚧 In progress | Automatic medication reminders |
| 📈 RAG (Retrieval Augmented Generation) | 🚧 In progress | Semantic search with embeddings and pgvector |
| 📋 Audit Logs | ✅ Implemented | Logging system with Winston |
| 📚 API Documentation | ✅ Implemented | Integrated Swagger/OpenAPI |

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend
| Technology | Version |
|------------|---------|
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
| Technology | Version |
|------------|---------|
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

### Prerequisites

- Node.js 20+
- Docker Desktop
- Azure Account (for Blob Storage) - optional
- OpenAI API Key or GitHub Models

### 1. Clone the repository

```bash
git clone https://github.com/glaucia86/health-monitoring-system.git
cd health-monitoring-system
```

### 2. Configure environment variables

```bash
# Backend
cp server/.env.example server/.env

# Frontend
cp client/.env.local.example client/.env.local
```

Edit the `.env` files with your credentials.

### 3. Start the database

```bash
docker-compose up -d
```

### 4. Install dependencies and run migrations

```bash
# Backend
cd server
npm install
npx prisma migrate dev

# Frontend
cd ../client
npm install
```

### 5. Run the application

```bash
# Terminal 1 - Backend
cd server
npm run start:dev

# Terminal 2 - Frontend
cd client
npm run dev
```

🎉 Access **http://localhost:3000** and enjoy!

---

## 🐳 Running with Docker

To run the entire application with Docker Compose:

```bash
# Clone the repository
git clone https://github.com/glaucia86/health-monitoring-system.git
cd health-monitoring-system

# Configure environment variables
cp server/.env.example server/.env
cp client/.env.local.example client/.env.local

# Start all services
docker-compose up -d

# Run migrations
docker-compose exec server npx prisma migrate dev
```

---

## 📖 Documentation

### API Documentation

After starting the backend, access the Swagger documentation at:

📚 **http://localhost:3001/api-docs**

### Project Structure

```
health-monitoring-system/
├── 📁 client/                # Next.js Frontend
│   ├── src/
│   │   ├── app/              # App Router (pages)
│   │   ├── components/       # React Components
│   │   ├── lib/              # Utilities
│   │   ├── services/         # API services
│   │   ├── stores/           # Zustand stores
│   │   └── types/            # TypeScript types
│   └── .env.local
│
├── 📁 server/                # NestJS Backend
│   ├── src/
│   │   ├── auth/             # JWT Authentication
│   │   ├── dashboard/        # Dashboard endpoints
│   │   ├── chat/             # AI Chat
│   │   ├── documents/        # Document upload
│   │   ├── medications/      # Medications
│   │   ├── exams/            # Exams
│   │   ├── appointments/     # Appointments
│   │   ├── notifications/    # Notifications
│   │   └── prisma/           # Prisma client
│   ├── prisma/
│   │   └── schema.prisma
│   └── .env
│
├── 📁 resources/             # Assets and resources
│   └── img/
│
├── 📄 docker-compose.yml
├── 📄 PRD.md                 # Product Requirements Document
└── 📄 README.md
```

---

## 🔑 Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login |
| `GET` | `/auth/me` | Get user profile |
| `GET` | `/dashboard/overview` | Dashboard summary |
| `GET` | `/dashboard/exams/trends` | Exam trends |
| `POST` | `/chat/message` | Send message to AI |
| `POST` | `/documents/upload` | Upload document |
| `GET` | `/documents` | List documents |

---

## 🐛 Troubleshooting

<details>
<summary><strong>Database connection error</strong></summary>

- Check if Docker is running
- Confirm that port 5432 is not in use
- Validate the `DATABASE_URL` in `.env`

</details>

<details>
<summary><strong>AI Chat not working</strong></summary>

- Check if `OPENAI_API_KEY` or `GITHUB_TOKEN` is configured
- Confirm you have credits in your OpenAI account

</details>

<details>
<summary><strong>Document upload fails</strong></summary>

- Check the `AZURE_STORAGE_CONNECTION_STRING`
- Confirm the container exists in Azure

</details>

---

## 🗺️ Roadmap

- [x] **v1.0.0-alpha** - MVP with basic features
- [ ] **v1.0.0-beta** - Complete reminder system
- [ ] **v1.0.0** - RAG with pgvector
- [ ] **v1.1.0** - Push/WhatsApp notifications
- [ ] **v2.0.0** - Hospital integrations (HL7/FHIR)

---

## 🤝 Contributing

Contributions are welcome! Please read our contribution guide before submitting a PR.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

---

## 👤 Author

<div align="center">

**Glaucia Lemos**

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/glaucia_lemos86)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/glaucialemos/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/glaucia86/)

</div>

---

<div align="center">

**⭐ If this project helped you, consider giving it a star!**

Made with ❤️ and ☕ by Glaucia Lemos

</div>
