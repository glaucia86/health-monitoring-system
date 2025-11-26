# Research: UI/UX Layout Modernization

**Date**: 2025-11-26  
**Status**: Complete

## 1. Color Palette Research

### Decision: Healthcare-Focused Teal/Cyan Primary

**Chosen Approach**: Paleta baseada em Teal (#0D9488) como cor primária

**Rationale**:
- Teal é associado a saúde, cura e confiança em estudos de psicologia das cores
- Evita o azul médico tradicional que pode ser frio/institucional
- Oferece bom contraste para acessibilidade
- Transmite calma sem ser passivo

**Alternatives Considered**:
1. **Azul tradicional médico** - Rejeitado: muito institucional, impessoal
2. **Verde esmeralda** - Rejeitado: pode ser confundido com "success states"
3. **Roxo** - Rejeitado: não tem associação clara com saúde

**Implementation**:
```css
--primary: oklch(0.65 0.15 175); /* Teal #0D9488 */
--primary-foreground: oklch(0.98 0 0); /* White */
```

---

## 2. Animation Library Research

### Decision: Framer Motion

**Chosen Approach**: Framer Motion v10+ com lazy loading

**Rationale**:
- Suporte nativo a SSR (Next.js compatible)
- API declarativa que integra bem com React
- Animações baseadas em variants (reutilizáveis)
- Performance otimizada com GPU acceleration
- Bundle size gerenciável (~30kb gzipped)

**Alternatives Considered**:
1. **CSS Animations only** - Rejeitado: limitado para orchestration complexa
2. **React Spring** - Rejeitado: API mais complexa, menos documentação
3. **GSAP** - Rejeitado: não é React-first, licenciamento comercial

**Best Practices**:
- Usar `LazyMotion` para code splitting
- Preferir `transform` e `opacity` para 60fps
- Evitar animações em layout shifts
- Respeitar `prefers-reduced-motion`

---

## 3. shadcn/ui Components Research

### Decision: Adicionar componentes essenciais via CLI

**Components to Add**:
| Component | Use Case |
|-----------|----------|
| `sidebar` | Navegação lateral |
| `dropdown-menu` | User menu, actions |
| `tooltip` | Hints em ícones |
| `tabs` | Navegação em seções |
| `badge` | Status indicators |
| `skeleton` | Loading states |
| `separator` | Divisores visuais |
| `sheet` | Mobile navigation |
| `progress` | Progress bars |
| `alert` | Alertas informativos |

**Rationale**:
- Mantém consistência com components existentes
- Já configurado no projeto (components.json)
- Acessibilidade built-in (Radix primitives)
- Customizável via CSS variables

---

## 4. Layout Pattern Research

### Decision: Sidebar + Header Layout

**Chosen Pattern**: Layout com sidebar fixa + header sticky

**Rationale**:
- Padrão familiar para dashboards médicos
- Permite navegação rápida entre seções
- Header disponível para search/notifications
- Sidebar colapsível para mobile

**Structure**:
```
┌──────────────────────────────────────────┐
│ Logo       [Search]    [🔔] [👤 User ▼] │ <- Header
├─────────┬────────────────────────────────┤
│         │                                │
│ 🏠 Home │   Main Content Area           │
│ 📊 Dash │                                │
│ 💊 Meds │                                │
│ 📅 Appt │                                │
│ 💬 Chat │                                │
│         │                                │
│ ─────── │                                │
│ ⚙️ Sett │                                │
│         │                                │
└─────────┴────────────────────────────────┘
  Sidebar      Main Content
  (240px)      (flex-1)
```

**Mobile Behavior**:
- Sidebar colapsa em hamburger menu
- Sheet component para navegação mobile
- Bottom navigation opcional para actions principais

---

## 5. Typography & Spacing Research

### Decision: Inter font + 4px baseline grid

**Chosen Font**: Inter (via Google Fonts ou local)

**Rationale**:
- Desenhada para UI, excelente legibilidade
- Suporte a variações de peso (300-900)
- Alternativa ao Geist atual que pode ser mantido
- Excelente em small sizes (labels, captions)

**Note**: O projeto já usa Geist Sans que também é excelente. Manter Geist é aceitável.

**Spacing System**:
```
4px  - xs (micro adjustments)
8px  - sm (tight spacing)
12px - md (default gap)
16px - lg (section gaps)
24px - xl (large sections)
32px - 2xl (major sections)
48px - 3xl (page margins)
```

---

## 6. Icon System Research

### Decision: Lucide Icons (já configurado)

**Chosen Approach**: Manter Lucide icons, adicionar uso consistente

**Rationale**:
- Já está no projeto (components.json: `"iconLibrary": "lucide"`)
- 1400+ ícones, cobrindo healthcare use cases
- Estilo limpo e moderno
- Tree-shakeable

**Key Icons for Healthcare**:
- `Heart`, `HeartPulse` - Saúde
- `Pill`, `Syringe` - Medicações
- `Calendar`, `Clock` - Agendamentos
- `FileText`, `Clipboard` - Documentos
- `AlertTriangle`, `AlertCircle` - Alertas
- `User`, `Users` - Pacientes/Equipe
- `MessageSquare` - Chat
- `Activity` - Monitoramento

---

## 7. Dark Mode Research

### Decision: Theme toggle com system preference

**Chosen Approach**: Dark mode via class strategy (já configurado)

**Rationale**:
- Tailwind CSS 4 já suporta via `.dark` class
- Permite toggle manual
- Respeita `prefers-color-scheme`

**Implementation**:
- Usar `next-themes` para gerenciamento
- CSS variables já preparadas em globals.css
- Sidebar e componentes devem respeitar ambos temas

---

## 8. Loading States Research

### Decision: Skeleton + Spinner + Progress indicators

**Patterns**:
1. **Skeleton**: Para conteúdo que tem shape previsível (cards, lists)
2. **Spinner**: Para actions pontuais (submit buttons)
3. **Progress**: Para uploads, sync operations

**Best Practices**:
- Skeleton deve espelhar layout final
- Usar `animate-pulse` do Tailwind
- Mínimo 300ms de display para evitar flash
- Fallback text para screen readers

---

## 9. Accessibility Research

### Decision: WCAG 2.1 AA Compliance

**Requirements**:
- Contrast ratio mínimo 4.5:1 (text), 3:1 (large text/UI)
- Focus indicators visíveis
- Skip links para navegação
- ARIA labels em ícones sem texto
- Keyboard navigation completa

**Testing Tools**:
- axe DevTools
- Lighthouse accessibility audit
- Screen reader manual testing

---

## 10. Performance Research

### Decision: Lazy loading + Code splitting

**Strategies**:
1. **Framer Motion**: Usar `LazyMotion` com `domAnimation`
2. **Images**: Next.js Image optimization
3. **Components**: Dynamic imports para modais/dialogs
4. **Fonts**: `font-display: swap`

**Targets**:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 200ms

---

## Summary of Decisions

| Topic | Decision | Confidence |
|-------|----------|------------|
| Color Palette | Teal primary (#0D9488) | High |
| Animation | Framer Motion v10 | High |
| Components | shadcn/ui additions | High |
| Layout | Sidebar + Header | High |
| Typography | Keep Geist Sans | Medium |
| Icons | Lucide (existing) | High |
| Dark Mode | next-themes | High |
| Loading | Skeleton + Spinner | High |
| Accessibility | WCAG 2.1 AA | High |
| Performance | Lazy loading strategy | High |
