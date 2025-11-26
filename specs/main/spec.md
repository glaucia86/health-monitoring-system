# Feature Specification: UI/UX Layout Modernization

**Date**: 2025-11-26  
**Author**: Copilot  
**Status**: Draft

## 1. Overview

### 1.1 Problem Statement

A aplicação atual de monitoramento de saúde possui um layout funcional básico, porém carece de elementos visuais modernos que possam:
- Criar uma experiência mais acolhedora para familiares/cuidadores em situação de estresse
- Transmitir confiança e profissionalismo médico
- Facilitar a navegação e hierarquia visual das informações
- Oferecer feedback visual rico e engajante

### 1.2 Objective

Melhorar significativamente a UI/UX da aplicação, tornando-a mais moderna, atraente e acessível, mantendo a funcionalidade existente e o foco no público-alvo (familiares de pacientes com câncer).

## 2. Current State Analysis

### 2.1 Identified Issues

**Login/Register Pages:**
- Design muito básico com fundo cinza (#gray-50)
- Sem elementos visuais que transmitam a identidade da marca
- Sem ilustrações ou ícones contextuais de saúde
- Cards simples sem sombras ou gradientes
- Sem animações de entrada ou transições

**Dashboard Page:**
- Header simples sem identidade visual forte
- Cards de estatísticas genéricos (apenas números)
- Sem ícones representativos em cada métrica
- Layout de grade básico sem hierarquia visual clara
- Cores de borda left-border muito sutis
- Sem skeleton loaders ou estados de loading atraentes
- Sem microinterações ou animações

**Chat Page:**
- Interface de chat funcional mas sem personalidade
- Sidebar de upload sem call-to-action atraente
- Avatars muito simples
- Sem indicadores visuais de typing/loading atraentes
- Sem diferenciação visual forte entre mensagens

**Global Issues:**
- Esquema de cores muito neutro (preto/cinza/branco)
- Falta de uma paleta de cores que transmita cuidado/saúde
- Sem tema escuro otimizado para uso noturno
- Tipografia sem hierarquia clara
- Sem sistema de espaçamento consistente
- Sem animações/transições suaves

### 2.2 Current Tech Stack

- **Framework**: Next.js 15 com App Router (React 19)
- **Styling**: Tailwind CSS 4 com oklch color system
- **Components**: shadcn/ui (estilo new-york)
- **Fonts**: Geist Sans/Mono
- **Icons**: Lucide (configurado mas pouco utilizado)

## 3. Proposed Improvements

### 3.1 Design System Enhancements

**Color Palette (Healthcare-focused):**
```
Primary: Teal/Cyan (#0D9488 → #14B8A6) - Confiança, saúde, calma
Secondary: Rose (#F43F5E → #FB7185) - Alertas, atenção, cuidado
Accent: Amber (#F59E0B → #FBBF24) - Medicações, lembretes
Success: Emerald (#10B981) - Ações completadas
Warning: Orange (#F97316) - Atenção
Error: Red (#EF4444) - Urgência
```

**Typography Scale:**
- Display: 4xl/5xl para títulos principais
- Heading: 2xl/3xl para seções
- Subheading: lg/xl para subtítulos
- Body: base para texto
- Caption: sm para informações secundárias

### 3.2 Page-Specific Improvements

#### Login/Register
1. Background com gradient suave + pattern decorativo
2. Ilustração SVG de saúde/cuidado ao lado do formulário (split layout)
3. Logo e branding proeminente
4. Inputs com ícones inline
5. Botões com gradientes e hover effects
6. Animações de entrada (fade-in, slide-up)
7. Link para "Esqueceu a senha?" com ícone

#### Dashboard
1. Sidebar lateral fixa com navegação
2. Header com search, notifications, user menu dropdown
3. Cards de estatísticas com:
   - Ícones coloridos representativos
   - Tendência (seta up/down)
   - Sparkline mini-gráfico
   - Background gradiente sutil
4. Seção de alertas com badges de severidade animados
5. Timeline visual para compromissos
6. Progress bars para acompanhamento de medicações
7. Quick actions (FAB ou action bar)
8. Empty states com ilustrações

#### Chat
1. Redesign completo do layout de chat
2. Message bubbles com caudas (tail)
3. Typing indicator animado (three-dot bounce)
4. Timestamp hover
5. Reactions/emoji feedback
6. Scroll to bottom button
7. Resize handle para área de input
8. Preview de arquivos antes do upload
9. Drag & drop visual para upload

### 3.3 New Components to Add

1. **Sidebar Navigation** - Menu lateral colapsível
2. **Stat Card** - Card de estatística com ícone e tendência
3. **Alert Banner** - Banner de alerta com severidade
4. **Timeline** - Componente de linha do tempo
5. **Avatar Group** - Grupo de avatares (equipe médica)
6. **Progress Ring** - Progresso circular
7. **Skeleton Loader** - Loading states
8. **Empty State** - Estados vazios com ilustrações
9. **Notification Badge** - Badges de notificação
10. **Command Palette** - Busca rápida (⌘K)

### 3.4 Animations & Micro-interactions

1. Page transitions com Framer Motion
2. Hover effects em cards (scale, shadow)
3. Button press feedback (scale down)
4. Loading spinners customizados
5. Success checkmark animado
6. Skeleton pulse loading
7. Scroll reveal animations
8. Number count-up animations

## 4. Technical Requirements

### 4.1 New Dependencies

```json
{
  "framer-motion": "^10.x",
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-tooltip": "latest",
  "@radix-ui/react-tabs": "latest",
  "lucide-react": "^0.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

> **Note**: `recharts` removed - sparkline charts deferred to post-MVP iteration.

### 4.2 File Structure Changes

```
client/src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # NEW: Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── main-layout.tsx
│   │   └── page-header.tsx
│   ├── dashboard/       # NEW: Dashboard-specific
│   │   ├── stat-card.tsx
│   │   ├── alert-banner.tsx
│   │   ├── timeline.tsx
│   │   └── medication-progress.tsx
│   ├── chat/            # NEW: Chat-specific
│   │   ├── message-bubble.tsx
│   │   ├── typing-indicator.tsx
│   │   └── chat-input.tsx
│   └── shared/          # NEW: Shared components
│       ├── empty-state.tsx
│       ├── skeleton.tsx
│       ├── page-header.tsx
│       └── loading-skeleton.tsx
├── styles/
│   └── animations.css   # NEW: Animações customizadas
└── lib/
    └── motion.ts        # NEW: Framer Motion variants
```

## 5. Success Criteria

1. **Visual Appeal**: Interface claramente mais moderna e profissional
2. **Accessibility**: Manter WCAG 2.1 AA compliance
3. **Performance**: Lighthouse **Performance** score > 90, FCP < 1.5s, LCP < 2.5s
4. **Consistency**: Design system documentado e aplicado
5. **User Feedback**: Melhor NPS/CSAT dos usuários de teste

## 6. Out of Scope

- Redesign do backend/API
- Novas funcionalidades (apenas visual)
- Mobile app nativo
- Alteração de fluxos de negócio

## 6.1 Deferred to Post-MVP

The following components are mentioned in the design but deferred to future iterations:

| Component | Reason | Alternative |
|-----------|--------|-------------|
| Command Palette (⌘K) | Complexity, requires additional UX research | Standard navigation via sidebar |
| Sparkline Charts | Requires recharts dependency | Display trend arrows instead |
| Timeline Component | Low priority for MVP | Simple list view with dates |
| Progress Ring | Can use existing progress bar | Linear progress bar from shadcn/ui |
| Avatar Group | Limited use case initially | Single avatar per item |

## 6.2 Terminology Glossary

This project uses Portuguese for user-facing content and English for technical terms:

| Portuguese | English | Usage |
|------------|---------|-------|
| Consultas | Appointments | User-facing labels |
| Medicações | Medications | User-facing labels |
| Exames | Exams | User-facing labels |
| Dashboard | Dashboard | Technical and user-facing |
| Chat | Chat | Technical and user-facing |

## 7. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking changes | Alto | Implementar incrementalmente |
| Performance regression | Médio | Lazy load de animações |
| Accessibility issues | Alto | Testar com screen readers |
| Inconsistency | Médio | Design tokens centralizados |
