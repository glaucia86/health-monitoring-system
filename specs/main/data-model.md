# Data Model: UI/UX Component Architecture

**Date**: 2025-11-26  
**Status**: Complete

## 1. Design Tokens

> **Source of Truth**: See [`contracts/design-tokens.md`](./contracts/design-tokens.md) for the complete design tokens contract (CSS variables with oklch colors).
>
> The TypeScript tokens below are for reference during component development. CSS variables take precedence for runtime styling.

### 1.1 Color System

```typescript
// lib/design-tokens.ts
export const colors = {
  // Primary - Healthcare Teal
  primary: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',  // Main
    600: '#0D9488',  // Darker
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
  },
  
  // Accent - Rose (Alerts, Care)
  accent: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    300: '#FDA4AF',
    400: '#FB7185',
    500: '#F43F5E',  // Main
    600: '#E11D48',
    700: '#BE123C',
    800: '#9F1239',
    900: '#881337',
  },
  
  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;
```

### 1.2 Spacing Scale

```typescript
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
} as const;
```

### 1.3 Typography Scale

```typescript
export const typography = {
  display: {
    size: '3rem',      // 48px
    lineHeight: '1.1',
    weight: '700',
  },
  h1: {
    size: '2.25rem',   // 36px
    lineHeight: '1.2',
    weight: '700',
  },
  h2: {
    size: '1.875rem',  // 30px
    lineHeight: '1.25',
    weight: '600',
  },
  h3: {
    size: '1.5rem',    // 24px
    lineHeight: '1.3',
    weight: '600',
  },
  h4: {
    size: '1.25rem',   // 20px
    lineHeight: '1.4',
    weight: '600',
  },
  body: {
    size: '1rem',      // 16px
    lineHeight: '1.5',
    weight: '400',
  },
  small: {
    size: '0.875rem',  // 14px
    lineHeight: '1.5',
    weight: '400',
  },
  caption: {
    size: '0.75rem',   // 12px
    lineHeight: '1.4',
    weight: '400',
  },
} as const;
```

---

## 2. Component Hierarchy

### 2.1 Layout Components

```
MainLayout
├── Sidebar
│   ├── SidebarHeader (logo, collapse button)
│   ├── SidebarNav
│   │   └── SidebarNavItem[]
│   ├── SidebarSeparator
│   └── SidebarFooter (settings, user quick menu)
├── Header
│   ├── SearchBar
│   ├── NotificationBell
│   └── UserMenu (dropdown)
└── MainContent
    └── {children}
```

### 2.2 Dashboard Components

```
DashboardPage
├── PageHeader
│   ├── Title
│   ├── Description
│   └── Actions (buttons)
├── StatsGrid
│   └── StatCard[] (4 cards)
│       ├── Icon
│       ├── Label
│       ├── Value
│       ├── Trend (up/down arrow + %)
│       └── Sparkline (optional)
├── AlertsBanner (if alerts exist)
│   └── AlertItem[]
│       ├── SeverityIcon
│       ├── Message
│       └── Timestamp
├── TwoColumnGrid
│   ├── AppointmentsCard
│   │   └── AppointmentItem[]
│   │       ├── DoctorInfo
│   │       ├── DateTime
│   │       └── Location
│   └── MedicationsCard
│       └── MedicationItem[]
│           ├── MedInfo
│           ├── Dosage
│           └── StatusBadge
└── RecentExamsCard
    └── ExamItem[]
```

### 2.3 Chat Components

```
ChatPage
├── ChatHeader
│   ├── BackButton
│   ├── Title
│   └── Actions
├── ChatContainer
│   ├── MessageList
│   │   └── MessageBubble[]
│   │       ├── Avatar
│   │       ├── Content (markdown)
│   │       └── Timestamp
│   └── TypingIndicator (when loading)
├── ChatInput
│   ├── Textarea (auto-resize)
│   ├── AttachButton
│   └── SendButton
└── ChatSidebar
    ├── DocumentUpload
    │   ├── DropZone
    │   └── FilePreview
    └── DocumentList
        └── DocumentItem[]
```

### 2.4 Auth Components

```
AuthLayout
├── BrandingSide
│   ├── Logo
│   ├── Illustration
│   └── Tagline
└── FormSide
    └── AuthCard
        ├── CardHeader
        ├── CardContent (form)
        └── CardFooter (links)
```

---

## 3. Component Specifications

### 3.1 StatCard

```typescript
interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;  // e.g., "+12%"
  };
  description?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  loading?: boolean;
}
```

**Visual Spec**:
- Size: Full width in grid cell
- Padding: 24px
- Border radius: 12px
- Icon: 40x40px with background circle
- Value: 36px font, bold
- Trend: 14px, colored arrow

### 3.2 Sidebar

```typescript
interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  children: React.ReactNode;
}

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
  active?: boolean;
}
```

**Visual Spec**:
- Width: 280px expanded, 72px collapsed
- Background: Card background
- Item height: 48px
- Active indicator: Left border 3px primary
- Hover: Background accent

### 3.3 MessageBubble

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
}
```

**Visual Spec**:
- Max width: 70% of container
- User: Right-aligned, primary background
- Assistant: Left-aligned, muted background
- Border radius: 16px (with tail)
- Padding: 12px 16px

### 3.4 AlertBanner

```typescript
interface AlertBannerProps {
  severity: 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}
```

**Visual Spec**:
- Full width banner
- Left icon + colored border
- Info: Blue, Warning: Amber, Error: Red
- Padding: 16px
- Dismiss button on right

---

## 4. State Management

### 4.1 UI State (Zustand)

```typescript
interface UIState {
  // Sidebar
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Notifications
  unreadNotifications: number;
  setUnreadNotifications: (count: number) => void;
  
  // Command palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}
```

---

## 5. Animation Variants

```typescript
// lib/motion.ts
import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};
```

---

## 6. Page Structure Mapping

| Page | Layout | Key Components |
|------|--------|----------------|
| `/login` | AuthLayout | AuthCard, Input, Button |
| `/register` | AuthLayout | AuthCard, Multi-step form |
| `/dashboard` | MainLayout | StatCard, AlertBanner, Timeline |
| `/chat` | MainLayout | MessageBubble, ChatInput, DocumentList |
| `/appointments` | MainLayout | Calendar, AppointmentCard |
| `/medications` | MainLayout | MedicationCard, ScheduleTimeline |
| `/exams` | MainLayout | ExamCard, ChartView |
| `/settings` | MainLayout | SettingsForm, Tabs |

---

## 7. Responsive Breakpoints

```typescript
export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
} as const;
```

**Layout Behavior**:
- `< md`: Sidebar hidden, hamburger menu
- `≥ md, < lg`: Sidebar collapsed by default
- `≥ lg`: Sidebar expanded by default
