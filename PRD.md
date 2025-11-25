## 📄 PRD — MVP

**Sistema Integrado de Monitoramento e Gerenciamento de Dados Médicos para Pacientes com Câncer de Mama Avançado**

### 1. Visão Geral

**Resumo:**
Criar um sistema web seguro que centralize dados médicos de pacientes com câncer de mama avançado (consultas, exames, receitas, cronogramas de medicação) e ofereça:

* Dashboard simples com evolução de exames-chave.
* Módulo de lembretes de medicação.
* Chat com IA focado em **explicar** e **organizar** informações (não dar diagnóstico).
* Primeira camada de RAG sobre os dados da paciente.

**Público-alvo inicial (MVP):**

* **Familiar/cuidador principal**
* **Paciente** (se tiver condição de uso)
* **Médico(es)** — inicialmente como usuários convidados para consulta de dados (sem tentar substituir prontuário oficial).

---

### 2. Problema & Objetivos

**Problema principal:**

* Informações críticas espalhadas em PDFs, laudos, receitas, mensagens de WhatsApp, anotações soltas.
* Dificuldade em acompanhar a evolução da doença (ex.: hemograma, marcadores, função hepática).
* Risco de **erro ou atraso na administração de medicação** (horários, ciclos, SOS, pausas).

**Objetivos do MVP:**

1. **Centralizar** os dados médicos da paciente em um único lugar organizado.
2. **Oferecer um painel simples** que mostre evolução dos principais exames ao longo do tempo.
3. **Reduzir falhas nos horários de medicação**, com lembretes estruturados.
4. **Permitir perguntas em linguagem natural** sobre o histórico (via IA), com forte ênfase em segurança, disclaimers e não substituição médica.
5. Criar base técnica sólida para, no futuro, adicionar **agentes mais sofisticados** (alertas inteligentes, predições, etc.).

---

### 3. Escopo do MVP

#### 3.1. Escopo IN (MVP)

**Épico A — Gestão de Paciente & Dados Médicos**

* Cadastro de paciente (dados básicos, contato, equipe médica).
* Cadastro de exames:

  * Inserção manual (campos estruturados p/ hemograma e exames recorrentes).
  * Upload de arquivos (PDF, imagens) com metadados mínimos (data, tipo, laboratório).
* Cadastro de consultas:

  * Data, médico, local, resumo textual (anotações do familiar ou médico).
* Cadastro de medicações:

  * Nome, dose, via (oral, IV), esquema (diário, semanal, ciclos), observações (jejum, pós refeição etc.).

**Épico B — Cronograma & Lembretes de Medicação**

* Criação de **cronograma diário/semana/ciclos** para cada medicação.
* Lembretes via:

  * Notificações in-app.
  * E-mail (MVP) — SMS/WhatsApp pode ficar para V1.
* Registro de “tomado / não tomado / atrasado”.

**Épico C — Dashboard Clínico Básico**

* Visualização de linha do tempo para:

  * Hemoglobina, leucócitos, plaquetas.
  * Creatinina, ALT/AST (função hepática e renal) — se relevante.
* Gráficos simples (line charts) com:

  * Filtros por período.
  * Destaque visual para valores acima/abaixo de referência (apenas indicação visual, sem diagnóstico).
* Cards com:

  * Exames mais recentes.
  * Próximas medicações.
  * Próximas consultas.

**Épico D — Chat com IA (RAG básico)**

* Chat protegido por login, com:

  * Prompt de sistema **super restritivo**:

    * “Não fazer diagnóstico”
    * “Não prescrever medicação”
    * “Explicar termos, resumir histórico, organizar informação, sugerir perguntas para o médico.”
* Capacidade de:

  * Resumir exames ao longo do tempo (“Como está a hemoglobina nos últimos 3 meses?”).
  * Resumir histórico de consultas.
  * Sugerir perguntas que o familiar pode fazer na próxima consulta.
* RAG (MVP):

  * Indexação de textos estruturados:

    * Notas de consultas.
    * Campos textuais de exames.
    * Observações de medicações.
  * Fonte de verdade: banco + índice vetorial simples.
  * Uso de LangChain.js ou LlamaIndex.ts para orquestrar RAG.

**Épico E — Segurança, Conta & Acesso**

* Autenticação (e-mail + senha).
* Perfis:

  * Admin Familiar
  * Familiar Visualizador
  * Médico Visualizador
* Controles básicos de acesso:

  * Só ver dados da paciente associada.
* LGPD-friendly:

  * Termo de uso e consentimento.
  * Opção de exportar/apagar dados (manual, no MVP, mas previsto no fluxo).

---

#### 3.2. Escopo OUT (para versões futuras)

* Integração direta com sistemas hospitalares (HL7, FHIR, APIs proprietárias).
* Alertas automáticos complexos baseados em modelos preditivos (ex.: previsão de neutropenia).
* Integração com dispositivos IoT (smartwatch, medidores de pressão etc.).
* Aplicativos mobile nativos (Android/iOS) — MVP será PWA-ready.
* Múltiplos pacientes e multi-clínicas (MVP foca em 1 paciente por conta, ou poucos).

---

### 4. Personas & Casos de Uso Principais

**Persona 1 — Familiar/cuidador (principal)**

* Quer registrar exames e consultas rapidamente.
* Quer saber de forma simples se “está tudo piorando ou melhorando”.
* Quer **não esquecer medicações**.

**Persona 2 — Paciente**

* Quer uma visão amigável da sua jornada de tratamento.
* Quer sentir que está no controle das informações.

**Persona 3 — Médico(a)**

* Pode aceitar acesso de leitura.
* Quer ver um consolidado rápido dos exames e eventos recentes.

**User Stories principais (MVP):**

1. “Como familiar, quero cadastrar o resultado do hemograma da minha mãe, para acompanhar a evolução ao longo das semanas.”
2. “Como familiar, quero receber um lembrete 30 minutos antes do horário de cada medicação, para não esquecer.”
3. “Como familiar, quero ver um gráfico simples da hemoglobina e leucócitos nos últimos 2 meses, para entender a tendência antes da consulta.”
4. “Como familiar, quero perguntar em linguagem natural: ‘Como estavam os exames da última semana comparados à anterior?’ e receber uma explicação simples.”
5. “Como médico, quero visualizar rapidamente a linha do tempo de consultas, exames e alterações de medicação antes de tomar decisões.”

---

### 5. Requisitos Funcionais (alto nível)

**RF-01** — CRUD de Pacientes.
**RF-02** — CRUD de Exames (com foco em hemogramas e exames recorrentes).
**RF-03** — Upload e visualização básica de documentos (PDFs, imagens).
**RF-04** — CRUD de Consultas (com campos de resumo).
**RF-05** — CRUD de Medicações e esquemas.
**RF-06** — Motor simples de agendamento de lembretes (scheduler).
**RF-07** — Envio de e-mail de lembrete (via provider tipo SendGrid/Azure Communication Services).
**RF-08** — Dashboard com gráficos de série temporal.
**RF-09** — Módulo de Chat com IA com RAG, incluindo trilha de auditoria (logs de perguntas/respostas).
**RF-10** — Autenticação e autorização básica.
**RF-11** — Logging e monitoramento básico (request logs, erros).

---

### 6. Requisitos Não Funcionais

* **Segurança:**

  * Criptografia em repouso (dados sensíveis).
  * TLS em trânsito.
  * Segredos em Key Vault.
  * Logs com anonimização de PII em contextos de IA (se possível).
* **Disponibilidade:** 99% (MVP).
* **Performance:**

  * Resposta do chat < 10s na média.
  * Carregamento de dashboards < 3s em uso típico.
* **Escalabilidade:**

  * Arquitetura preparada para escalar horizontalmente (container/Functions).
* **Privacidade/Compliance:**

  * Alinhamento com LGPD (base legal: consentimento explícito).
  * Nenhum modelo LLM deve usar dados para re-treino (configurado em provider).

---

### 7. Arquitetura & Stack Proposta (MVP)

> 🎯 Foco: **não overengineering**. Começar com um **monólito modular** + serviços específicos de IA/Jobs separados.

**Frontend:**

* **Next.js + TypeScript**
* **Tailwind CSS** + biblioteca de componentes (Radix, shadcn/ui).
* Design moderno:

  * Layout em 3 áreas: menu lateral, conteúdo principal, barra de contexto (chat ou detalhes).
  * Dark/light mode.
  * Gráficos com Recharts ou equivalente.

**Backend (Aplicação):**

* Node.js + TypeScript (NestJS ou Express estruturado).
* Organização em módulos de domínio (DDD light):

  * `patient`
  * `exam`
  * `appointment`
  * `medication`
  * `schedule`
  * `auth`
  * `ai`

**Banco de Dados:**

* **PostgreSQL** (principal).
* Tabelas principais:

  * `patients`, `users`, `exams`, `exam_types`, `appointments`, `medications`, `medication_schedules`, `medication_intakes`, `documents`, `chat_logs`.

**Armazenamento de arquivos:**

* Azure Blob Storage (laudos, PDFs, imagens).

**Camada de IA:**

* LangChain.js / LlamaIndex.ts para:

  * Indexação de textos (exames, consultas, observações).
  * Construção de RAG com prompts bem definidos.
* Provedor de LLM:

  * Para MVP: OpenAI / Azure OpenAI ou GitHub Models (dependendo de custo & privacidade).
* Vetor DB:

  * Pode começar com Postgres + pgvector ou serviço tipo Azure AI Search / Qdrant gerenciado.

**Infraestrutura:**

* Deploy em:

  * Azure Container Apps ou App Service para o monólito.
  * Job separado (Azure Functions) para:

    * Processar uploads.
    * Rodar jobs de lembretes.
* Infra provisão:

  * Terraform (MVP: descrever resources principais; detalhar depois).

---

### 8. Estratégia de IA & Engenharia de Prompt (MVP)

**Objetivo da IA:**
Ajudar a **organizar, resumir e explicar** informações do histórico. Não substituir médico, diagnóstico ou emergência.

**Padrão de prompt (CTIO):**

1. **Context**

   * Trechos relevantes de exames, consultas, medicações (via RAG).
   * Perfil resumido da paciente (idade, estágio, tipo de tratamento — sempre que disponível).

2. **Task**

   * “Explique de forma simples”, “Compare períodos”, “Resuma para um familiar”, etc.

3. **Instructions** (crítico p/ segurança):

   * Não fornecer diagnóstico.
   * Não ajustar dose de medicação.
   * Reforçar que decisões médicas cabem ao médico.
   * Em situações de potencial gravidade (exames muito fora da faixa), sugerir:

     * “Converse imediatamente com o médico ou procure atendimento de emergência.”

4. **Output format**

   * Estrutura clara:

     * Resumo
     * Pontos de atenção
     * Sugestões de perguntas para o médico
     * Aviso de segurança

**Exemplo de system prompt (resumido):**

> “Você é um assistente especializado em organização e explicação de dados médicos para familiares de pacientes com câncer de mama avançado.
> Não faça diagnósticos, não prescreva, não sugira alteração de medicações. Seu papel é resumir, explicar termos técnicos e sugerir perguntas para o médico.
> Sempre inclua um aviso para procurar o médico e, em casos graves, reforçar a necessidade de atendimento de emergência.”

---

### 9. Métricas de Sucesso (para MVP)

* **Adoção:**

  * Nº de usuários ativos semanais (familiares).
  * Nº de exames/consultas cadastrados por mês.

* **Engajamento em medicação:**

  * % de doses marcadas como “tomadas” no horário.
  * Redução de doses esquecidas (medida qualitative via feedback).

* **Uso da IA:**

  * Nº de sessões de chat por semana.
  * Avaliação subjetiva (NPS/CSAT) da utilidade do chat.

* **Qualidade percebida:**

  * Feedback de pelo menos 1–2 médicos que utilizem o painel como apoio.

---

### 10. Roadmap Resumido

* **MVP (0–3 meses):**

  * Cadastro de paciente, exames, consultas, medicações.
  * Dashboard básico.
  * Lembretes via e-mail.
  * Chat com IA com RAG básico.
  * Autenticação e segurança mínima viável.

* **V1 (3–6 meses):**

  * Uso de regras simples de alerta (ex.: hemoglobina abaixo de X em mais de Y exames consecutivos → alertar cuidador).
  * Melhorias no design da UI e UX mobile.
  * Notificações push / WhatsApp (se viável legalmente).

* **V2 (6–12 meses):**

  * Integrações com sistemas hospitalares.
  * Agentes mais sofisticados (previsões, recomendações de próximos exames a discutir com médico, etc.).

---

## 🧱 ADR 001 — Arquitetura do Back-end (Monólito Modular vs Microservices)

**Título:**
Escolha de arquitetura backend para o MVP: **Monólito Modular** em vez de Microservices.

**Contexto:**
O projeto tem ambição de longo prazo (escalabilidade, múltiplos pacientes, integrações com hospitais, IA agentic). O prompt original sugere arquitetura de microsserviços orientada a DDD e SOLID.

Entretanto, o time atual e o escopo MVP precisam de **velocidade de entrega** e **simplicidade operacional**, sem perder a possibilidade de evoluir.

**Decisão:**
Para o MVP, adotaremos um **Monólito Modular em Node.js + TypeScript**, com camadas bem definidas e modularização forte por domínio (paciente, exames, medicação, IA, agendamento).

* Um único código-base backend.
* Módulos de domínio isolados logicamente, compartilhando uma única base de dados.
* Estrutura já preparada para, no futuro, extrair módulos em serviços independentes.

**Justificativas:**

1. **Velocidade de entrega:**

   * Menos overhead de orquestração, CI/CD, observabilidade e comunicação entre serviços.
2. **Complexidade reduzida:**

   * Menos pontos de falha.
   * Debug mais simples.
3. **Equipe enxuta:**

   * Ideal para um time pequeno que precisa validar produto rapidamente.
4. **Evolução futura preservada:**

   * Se os domínios estiverem bem desenhados (DDD light), é possível extrair `exam-service`, `notification-service` etc. em microservices quando necessário.

**Consequências:**

* **Positivas:**

  * Time-to-market menor.
  * Menos custo infra inicial.
  * Menos complexidade cognitiva.

* **Negativas:**

  * Escalabilidade por domínio será limitada no início (escalamos o monólito como um todo).
  * Limita, em um primeiro momento, a adoção de stacks diferentes por serviço.

**Status:**
✅ Aprovado para o MVP.
🔁 Revisar esta decisão quando:

* Número de pacientes/usuários crescer significativamente.
* Requisitos de performance de IA e ingestão de dados se tornarem mais complexos.
