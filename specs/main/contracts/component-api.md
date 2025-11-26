# Component API Contracts

Version: 1.0.0  
Date: 2025-11-26

## Layout Components

### Sidebar

```typescript
// components/layout/sidebar.tsx

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  className?: string;
}

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

// Usage
<Sidebar collapsed={collapsed} onCollapse={setCollapsed}>
  <SidebarHeader />
  <SidebarNav>
    <SidebarNavItem icon={Home} label="Dashboard" href="/dashboard" />
    <SidebarNavItem icon={Calendar} label="Consultas" href="/appointments" badge={2} />
  </SidebarNav>
  <SidebarFooter />
</Sidebar>
```

### SidebarNavItem

```typescript
interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
  active?: boolean;
  disabled?: boolean;
}

// CSS Classes
// - Base: flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
// - Active: bg-primary/10 text-primary border-l-2 border-primary
// - Hover: hover:bg-muted
// - Collapsed: justify-center px-3
```

### Header

```typescript
interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  className?: string;
}

// Usage
<Header title="Dashboard">
  <HeaderActions>
    <SearchBar />
    <NotificationBell count={3} />
    <UserMenu />
  </HeaderActions>
</Header>
```

---

## Dashboard Components

### StatCard

```typescript
interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;        // e.g., "+12%"
    description?: string; // e.g., "vs last month"
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  loading?: boolean;
  className?: string;
}

// Usage
<StatCard
  icon={Calendar}
  label="Próximas Consultas"
  value={3}
  trend={{ direction: 'up', value: '+1' }}
  variant="primary"
/>
```

### AlertBanner

```typescript
interface AlertBannerProps {
  severity: 'info' | 'warning' | 'error' | 'success';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

// Usage
<AlertBanner
  severity="warning"
  title="Consulta em 2 dias"
  description="Dr. Silva - Oncologista"
  action={{ label: "Ver detalhes", onClick: handleView }}
  dismissible
/>
```

### AppointmentItem

```typescript
interface AppointmentItemProps {
  doctor: {
    name: string;
    specialty: string;
    avatar?: string;
  };
  datetime: Date;
  location: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  onClick?: () => void;
}

// Usage
<AppointmentItem
  doctor={{ name: "Dr. Silva", specialty: "Oncologia" }}
  datetime={new Date("2025-11-28T10:00:00")}
  location="Hospital ABC - Sala 302"
  status="confirmed"
/>
```

### MedicationItem

```typescript
interface MedicationItemProps {
  name: string;
  dosage: string;
  frequency: string;
  nextDose?: Date;
  status: 'active' | 'paused' | 'completed';
  alerts?: string[];
  onClick?: () => void;
}

// Usage
<MedicationItem
  name="Tamoxifeno"
  dosage="20mg"
  frequency="1x ao dia"
  nextDose={new Date()}
  status="active"
/>
```

---

## Chat Components

### MessageBubble

```typescript
interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  avatar?: {
    src?: string;
    fallback: string;
  };
  className?: string;
}

// Usage
<MessageBubble
  role="assistant"
  content="Como posso ajudar você hoje?"
  timestamp={new Date()}
  avatar={{ fallback: "AI" }}
/>
```

### ChatInput

```typescript
interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onAttach?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
}

// Usage
<ChatInput
  value={message}
  onChange={setMessage}
  onSubmit={handleSend}
  onAttach={handleAttach}
  placeholder="Digite sua mensagem..."
  loading={isSending}
/>
```

### TypingIndicator

```typescript
interface TypingIndicatorProps {
  visible: boolean;
}

// Visual: Three animated dots
// Animation: Sequential pulse
// Duration: 1.4s infinite
```

### DocumentList

```typescript
interface DocumentListProps {
  documents: Document[];
  onSelect?: (doc: Document) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: 'uploading' | 'processing' | 'ready' | 'error';
}
```

---

## Auth Components

### AuthCard

```typescript
interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

// Usage
<AuthCard
  title="Bem-vindo de volta"
  description="Entre com suas credenciais"
  footer={<Link href="/register">Criar conta</Link>}
>
  <LoginForm />
</AuthCard>
```

---

## Shared Components

### PageHeader

```typescript
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}

interface Breadcrumb {
  label: string;
  href?: string;
}

// Usage
<PageHeader
  title="Dashboard"
  description="Visão geral do paciente"
  actions={<Button>Adicionar</Button>}
/>
```

### EmptyState

```typescript
interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Usage
<EmptyState
  icon={Calendar}
  title="Sem consultas agendadas"
  description="Você não tem consultas marcadas"
  action={{ label: "Agendar consulta", onClick: handleSchedule }}
/>
```

### LoadingSkeleton

```typescript
interface LoadingSkeletonProps {
  variant: 'card' | 'list' | 'text' | 'avatar' | 'stat-card';
  count?: number;
}

// Usage
<LoadingSkeleton variant="stat-card" count={4} />
```

---

## Deferred Components (Post-MVP)

> These components are documented for future reference but not included in MVP scope.

### Timeline (Deferred)

```typescript
// Deferred to post-MVP - use simple date list for MVP
interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  datetime: Date;
  icon?: LucideIcon;
  status?: 'completed' | 'current' | 'upcoming';
}
```

### ProgressRing (Deferred)

```typescript
// Deferred to post-MVP - use linear Progress from shadcn/ui for MVP
interface ProgressRingProps {
  value: number;        // 0-100
  size?: 'sm' | 'md' | 'lg';  // 40px, 64px, 96px
  strokeWidth?: number;
  showValue?: boolean;
  label?: string;
  className?: string;
}
```

### CommandPalette (Deferred)

```typescript
// Deferred to post-MVP - requires additional UX research
interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: CommandGroup[];
}

interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

interface CommandItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  shortcut?: string;
  onSelect: () => void;
}
```

### useSidebar

```typescript
function useSidebar(): {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
}
```

### useNotifications

```typescript
function useNotifications(): {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}
```

### useMediaQuery

```typescript
function useMediaQuery(query: string): boolean;

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
```
