# **ADR – Public Home Page & Role-Based Login Flow**

## **1. Título**

Criar Home Pública com Seleção de Tipo de Acesso (Cuidador x Paciente)

## **2. Status**

Accepted – 30/11/2025

## **3. Contexto**

Atualmente, o fluxo de entrada do sistema redireciona automaticamente o usuário para `/login`, sem fornecer contexto ou diferenciação entre perfis.
O backend já implementa suporte a múltiplos roles: `caregiver`, `patient`, `admin`.
Porém, o frontend ainda trata todos os usuários como se fossem iguais.

Isso causa:

* **Confusão na jornada do usuário** (não está claro quem deve acessar).
* **Ausência de identidade visual inicial**.
* **Impossibilidade futura de permitir fluxo distinto para pacientes e administradores**.

Por se tratar de um sistema de monitoramento de saúde, é crucial deixar claro imediatamente:

* Quem está acessando.
* Qual jornada iniciará (cuidador, paciente, admin futuramente).
* Como isso se relaciona com o backend.

---

## **4. Decisão**

Criar uma **Home pública acessível em /**, contendo dois botões principais:

* **Sou cuidador / profissional → `/login?type=caregiver`**
* **Sou paciente → `/login?type=patient`**

Modificar a página `/login` para:

* Interpretar `?type=caregiver|patient|admin`
* Ajustar título/subtítulo dinamicamente
* Validar tipos inválidos (fallback amigável)
* Garantir retrocompatibilidade: `/login` sem parâmetros continua funcionando para cuidadores.

Documentar também o fluxo **/login?type=admin** para futuro uso — mas sem desenvolver UI de admin agora.

### Observação Técnica

O Dashboard hoje quando acessado por `/dashboard` independentemente do tipo de usuário, não reflete os diferentes papéis. A implementação desta ADR não exige mudanças no backend, mas prepara o terreno para futuras implementações de dashboards específicos por role, com as especificações adequadas para cada tipo de usuário.

---

## **5. Alternativas Consideradas**

### Manter redirecionamento atual

Rejeitado. Não resolve problemas de contexto e diferenciação.

### Criar apenas seleção de role dentro do login

Rejeitado. Fere boas práticas de UX e não apresenta identidade visual inicial do sistema.

### Criar Home pública com fluxos claros

Aprovado. Melhora experiência, escalabilidade e clareza arquitetural.

---

## **6. Consequências**

### **Positivas**

* UX muito mais clara e profissional
* Estrutura preparada para `role-based journeys`
* Facilita evoluções futuras (dashboard de paciente e admin)
* Evita retrabalho no fluxo de autenticação

### **Negativas**

* Introduz novos caminhos na aplicação que precisam ser bem testados
* Exige documentação e revisão do fluxo atual

---

# 📝 **PRD – Public Home Page & Role-Based Login Flow**

## **1. Visão Geral da Feature**

Criar uma Home pública em `/` com visual moderno, informativa e responsiva, permitindo que o usuário escolha seu tipo de acesso: cuidador ou paciente.

A Home deve reforçar o branding do sistema e introduzir brevemente o propósito da aplicação.

Esta feature também atualiza o fluxo de login para interpretar `type=caregiver|patient`.

---

## **2. Objetivos**

### **Objetivo Primário**

Permitir que os usuários escolham seu tipo de acesso antes de fazer login, aumentando clareza e consistência com roles do backend.

### Objetivos Secundários

* Melhorar a identidade inicial do sistema
* Preparar a aplicação para acesso de pacientes
* Criar base futura para administração (`?type=admin`)

---

## **3. Escopo Detalhado**

### **3.1 Home Pública – `/`**

Componentes obrigatórios:

#### **Design**

* Deve seguir paleta atual do projeto
* Deve ser muito visual / atraente
* Layout responsivo
* Hero com nome do sistema + frase de impacto (ex: *Monitoramento inteligente e seguro para pacientes sob cuidados contínuos*)

#### **Conteúdo**

* **Título:** Health Monitoring System
* **Subtítulo:** Plataforma segura para monitoramento de saúde, acompanhamento clínico e suporte a pacientes.
* **Botões:**

| Texto                       | URL                     |
| --------------------------- | ----------------------- |
| Sou cuidador / profissional | `/login?type=caregiver` |
| Sou paciente                | `/login?type=patient`   |

Opcional futuro (documentar, não implementar):

| Texto             | URL                 |
| ----------------- | ------------------- |
| Sou administrador | `/login?type=admin` |

---

### **3.2 Ajustes na Página de Login – `/login`**

#### **Comportamento:**

* Ler parâmetro `type`
* Validar: `caregiver`, `patient`, `admin`
* Se inválido → exibir seletor ou mensagem “Selecione um tipo de acesso”
* Se ausente → tratar como `caregiver` por retrocompatibilidade

#### **UI Dinâmica:**

**Exemplos:**

| tipo      | Título                | Subtítulo                                                          |
| --------- | --------------------- | ------------------------------------------------------------------ |
| caregiver | Acesso do Cuidador    | Gerencie pacientes, relatórios e monitoramento diário.             |
| patient   | Acesso do Paciente    | Consulte informações importantes sobre sua saúde com segurança.    |
| admin     | Acesso Administrativo | Gerencie usuários, permissões e dados do sistema. (somente futuro) |

---

### **3.3 Documentação Necessária**

* README atualizado, incluindo:

  * nova Home pública
  * fluxo cuidador/paciente
  * parâmetros aceitos em /login
  * relação entre parâmetro `type` e `role` do backend

---

## **4. Fora de Escopo**

* UI completa do paciente
* UI/rota de dashboard admin
* Alterações no backend (nenhuma necessária agora)
* Workflow de cadastro para pacientes

---

## **5. Critérios de Aceitação (Go/No-Go)**

### Funcionais

* [ ] `/` exibe Home pública com hero + botões
* [ ] `/login?type=caregiver` ajusta o conteúdo da interface
* [ ] `/login?type=patient` ajusta o conteúdo da interface
* [ ] `/login?type=admin` documentado mas sem fluxo implementado
* [ ] Sem quebras no fluxo atual de login de cuidadores
* [ ] Tratamento de `type` inválido com UX amigável
* [ ] Design responsivo e alinhado com identidade visual do app

### Técnicos

* [ ] Código isolado em feature folder (se seguir pattern)
* [ ] Rotas protegidas continuam funcionando
* [ ] Home pública NÃO requer autenticação

---

## **6. Métricas de Sucesso**

* Redução de abandonos na página de login
* Menos dúvidas sobre “quem deve acessar”
* Preparação clara para novos roles no sistema

---

## **7. Riscos**

* Usuários podem tentar acessar URLs indevidas (mitigado via validação)
* Possível necessidade futura de onboarding para pacientes

