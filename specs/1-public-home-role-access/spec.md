# Feature Specification: Public Home Page & Role-Based Login Flow

**Feature Branch**: `feat/public-home-role-access`  
**Created**: 2024-11-30  
**Status**: Draft  
**Input**: User description: "Criar Home Pública com Seleção de Tipo de Acesso (Cuidador x Paciente) e ajustar fluxo de login para interpretar parâmetro type"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Caregiver Accesses System via Public Home (Priority: P1)

Um cuidador ou profissional de saúde acessa o sistema pela primeira vez. Ao entrar na URL raiz `/`, ele visualiza uma página inicial atraente que apresenta o sistema e oferece opções claras de acesso. O cuidador clica em "Sou cuidador / profissional" e é direcionado para a página de login com contexto apropriado para seu perfil.

**Why this priority**: Este é o fluxo principal do sistema atual. A maioria dos usuários são cuidadores, e garantir que seu acesso seja fluido e contextualizado é crítico para a adoção do sistema.

**Independent Test**: Pode ser testado acessando `/`, clicando no botão de cuidador, e verificando que `/login?type=caregiver` exibe título e subtítulo específicos para cuidadores.

**Acceptance Scenarios**:

1. **Given** um usuário não autenticado acessa `/`, **When** a página carrega, **Then** o sistema exibe uma home pública com hero section contendo título "Health Monitoring System", subtítulo descritivo e dois botões de acesso.

2. **Given** um usuário está na home pública, **When** clica em "Sou cuidador / profissional", **Then** é redirecionado para `/login?type=caregiver` com título "Acesso do Cuidador" e subtítulo contextualizado.

3. **Given** um cuidador está em `/login?type=caregiver`, **When** insere credenciais válidas e submete, **Then** o login é processado normalmente sem quebras no fluxo existente.

---

### User Story 2 - Patient Accesses System via Public Home (Priority: P2)

Um paciente acessa o sistema para consultar informações sobre sua saúde. Na home pública, ele identifica claramente a opção "Sou paciente" e é direcionado para uma página de login com contexto apropriado, transmitindo segurança e clareza sobre o que poderá acessar.

**Why this priority**: Preparar o sistema para acesso de pacientes é um objetivo secundário desta feature. O fluxo deve existir e funcionar, mas a experiência completa do paciente será desenvolvida posteriormente.

**Independent Test**: Pode ser testado acessando `/`, clicando no botão de paciente, e verificando que `/login?type=patient` exibe título e subtítulo específicos para pacientes.

**Acceptance Scenarios**:

1. **Given** um usuário está na home pública, **When** clica em "Sou paciente", **Then** é redirecionado para `/login?type=patient` com título "Acesso do Paciente" e subtítulo contextualizado.

2. **Given** um paciente está em `/login?type=patient`, **When** a página carrega, **Then** visualiza mensagem "Consulte informações importantes sobre sua saúde com segurança."

---

### User Story 3 - Backward Compatibility for Direct Login Access (Priority: P1)

Um usuário ou sistema externo acessa diretamente `/login` sem parâmetro `type`. O sistema deve manter retrocompatibilidade e tratar este acesso como se fosse um cuidador, garantindo que integrações e bookmarks existentes continuem funcionando.

**Why this priority**: Crítico para não quebrar fluxos existentes. Usuários que já têm `/login` salvo em favoritos ou sistemas que integram diretamente devem continuar funcionando sem modificações.

**Independent Test**: Pode ser testado acessando `/login` diretamente (sem parâmetros) e verificando que o comportamento é idêntico a `/login?type=caregiver`.

**Acceptance Scenarios**:

1. **Given** um usuário acessa `/login` sem parâmetro type, **When** a página carrega, **Then** o sistema trata como `type=caregiver` e exibe conteúdo de cuidador.

2. **Given** um usuário tem `/login` salvo nos favoritos, **When** acessa pelo favorito, **Then** consegue fazer login normalmente como antes.

---

### User Story 4 - Invalid Type Parameter Handling (Priority: P2)

Um usuário acessa `/login?type=invalido` com um valor de type não reconhecido. O sistema deve tratar este cenário de forma amigável, oferecendo ao usuário uma forma de selecionar seu tipo de acesso ou redirecionando para a home.

**Why this priority**: Importante para UX robusta, mas cenário menos frequente que os fluxos principais.

**Independent Test**: Pode ser testado acessando `/login?type=xyz` e verificando que o sistema exibe uma mensagem amigável ou opções de seleção.

**Acceptance Scenarios**:

1. **Given** um usuário acessa `/login?type=invalido`, **When** a página carrega, **Then** o sistema exibe uma mensagem amigável "Selecione um tipo de acesso" ou redireciona para home.

2. **Given** um usuário acessa `/login?type=admin`, **When** a página carrega, **Then** o sistema trata como tipo inválido (admin não implementado ainda) e oferece fallback amigável.

---

### User Story 5 - Responsive Design Across Devices (Priority: P2)

Um usuário acessa o sistema de diferentes dispositivos (desktop, tablet, smartphone). A home pública e a página de login devem se adaptar corretamente, mantendo usabilidade e identidade visual em todas as resoluções.

**Why this priority**: Essencial para acessibilidade, mas pode ser refinado após o fluxo funcional estar estabelecido.

**Independent Test**: Pode ser testado acessando `/` e `/login` em diferentes resoluções e verificando que o layout se adapta corretamente.

**Acceptance Scenarios**:

1. **Given** um usuário acessa `/` em um smartphone, **When** a página carrega, **Then** os botões de acesso são exibidos em formato empilhado e legível.

2. **Given** um usuário acessa `/` em desktop, **When** a página carrega, **Then** o hero section utiliza o espaço disponível de forma atraente e profissional.

---

### Edge Cases

- O que acontece quando o usuário está autenticado e acessa `/`? → Deve ser redirecionado para `/dashboard` automaticamente.
- Como o sistema lida com parâmetro `type` em maiúsculas (e.g., `TYPE=CAREGIVER`)? → Deve normalizar para minúsculas e aceitar.
- O que acontece se o usuário navegar de volta após fazer login? → O histórico de navegação deve funcionar normalmente.
- Como tratar deep links para `/login?type=patient` quando pacientes ainda não podem se cadastrar? → Exibir login normalmente, o backend controlará autorização.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistema DEVE exibir uma página home pública em `/` sem exigir autenticação.
- **FR-002**: Home pública DEVE conter hero section com título "Health Monitoring System" e subtítulo descritivo.
- **FR-003**: Home pública DEVE exibir dois botões principais: "Sou cuidador / profissional" e "Sou paciente".
- **FR-004**: Botão de cuidador DEVE navegar para `/login?type=caregiver`.
- **FR-005**: Botão de paciente DEVE navegar para `/login?type=patient`.
- **FR-006**: Página de login DEVE ler e interpretar o parâmetro `type` da URL.
- **FR-007**: Página de login DEVE validar valores de `type`: aceitar `caregiver` e `patient`.
- **FR-008**: Página de login DEVE ajustar título e subtítulo dinamicamente baseado no `type`.
- **FR-009**: Para `type=caregiver`, login DEVE exibir título "Acesso do Cuidador" e subtítulo "Gerencie pacientes, relatórios e monitoramento diário."
- **FR-010**: Para `type=patient`, login DEVE exibir título "Acesso do Paciente" e subtítulo "Consulte informações importantes sobre sua saúde com segurança."
- **FR-011**: Quando `type` está ausente, sistema DEVE tratar como `caregiver` por retrocompatibilidade.
- **FR-012**: Quando `type` é inválido, sistema DEVE exibir mensagem amigável ou opções de seleção.
- **FR-013**: Home pública DEVE redirecionar usuários autenticados para `/dashboard`.
- **FR-014**: Design DEVE ser responsivo e seguir a identidade visual existente do sistema.
- **FR-015**: Parâmetro `type=admin` DEVE ser documentado para uso futuro, mas tratado como inválido na implementação atual.

### Key Entities

- **AccessType**: Representa o tipo de acesso do usuário (`caregiver`, `patient`, `admin`). Mapeia diretamente para os roles do backend.
- **LoginContext**: Contexto dinâmico da página de login contendo título, subtítulo e tipo de acesso selecionado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuários conseguem identificar e selecionar seu tipo de acesso na home em menos de 10 segundos.
- **SC-002**: 100% dos acessos existentes via `/login` direto continuam funcionando sem modificações.
- **SC-003**: Página home carrega completamente em menos de 3 segundos em conexões padrão.
- **SC-004**: Layout se adapta corretamente em resoluções de 320px (mobile) até 1920px (desktop).
- **SC-005**: Zero quebras reportadas no fluxo de login de cuidadores após a implementação.
- **SC-006**: Usuários compreendem claramente qual opção selecionar baseado nos textos apresentados (validado por feedback ou teste).

## Assumptions

- O backend já suporta os roles `caregiver`, `patient` e `admin` - não são necessárias alterações.
- O parâmetro `type` é usado apenas para contextualização da UI, não afeta a autenticação em si.
- Usuários pacientes podem fazer login, mas sua experiência completa será desenvolvida em feature futura.
- A paleta de cores e componentes UI existentes serão reutilizados para manter consistência visual.
- O fluxo de registro de pacientes está fora do escopo desta feature.

## Out of Scope

- Interface completa do dashboard para pacientes
- Interface e rotas de administração (`/admin`)
- Modificações no backend ou autenticação
- Fluxo de cadastro/registro para pacientes
- Implementação funcional do `type=admin`
