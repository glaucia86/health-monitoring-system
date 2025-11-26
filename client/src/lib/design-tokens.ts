/**
 * Design Tokens for Health Monitoring System
 * 
 * These tokens complement the CSS variables defined in globals.css
 * and provide TypeScript constants for use in components.
 * 
 * Usage:
 * import { colors, spacing, animations } from '@/lib/design-tokens';
 */

// Color tokens matching the CSS variables in globals.css
// For direct color usage, prefer Tailwind classes (e.g., bg-primary, text-muted-foreground)
export const colors = {
  // Primary - Healthcare Teal
  primary: {
    50: 'oklch(0.97 0.02 175)',
    100: 'oklch(0.94 0.05 175)',
    200: 'oklch(0.88 0.09 175)',
    300: 'oklch(0.82 0.12 175)',
    400: 'oklch(0.72 0.14 175)',
    500: 'oklch(0.62 0.14 175)', // Main
    600: 'oklch(0.52 0.12 175)', // Darker
    700: 'oklch(0.44 0.10 175)',
    800: 'oklch(0.38 0.08 175)',
    900: 'oklch(0.32 0.06 175)',
  },
  // Accent - Rose (Care, Alerts)
  accent: {
    50: 'oklch(0.97 0.02 12)',
    100: 'oklch(0.94 0.04 12)',
    200: 'oklch(0.88 0.08 12)',
    300: 'oklch(0.80 0.12 12)',
    400: 'oklch(0.70 0.16 12)',
    500: 'oklch(0.60 0.18 12)',
    600: 'oklch(0.52 0.18 12)',
  },
  // Semantic colors
  semantic: {
    success: 'oklch(0.65 0.18 160)',
    warning: 'oklch(0.75 0.18 85)',
    error: 'oklch(0.60 0.20 25)',
    info: 'oklch(0.60 0.18 255)',
  },
} as const;

// Spacing scale (matches Tailwind's default + our design tokens)
export const spacing = {
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
} as const;

// Typography scale
export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1' }],           // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Border radius scale
export const radius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px (default for cards)
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// Shadow scale
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  // Colored shadows for cards
  primary: '0 4px 14px -3px oklch(0.62 0.14 175 / 0.25)',
  accent: '0 4px 14px -3px oklch(0.60 0.18 12 / 0.25)',
} as const;

// Animation durations
export const durations = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

// Animation easing functions
export const easings = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// Z-index scale
export const zIndex = {
  0: 0,
  10: 10,  // Dropdown content
  20: 20,  // Sticky elements
  30: 30,  // Fixed elements
  40: 40,  // Modal backdrop
  50: 50,  // Modal content
  60: 60,  // Toast notifications
} as const;

// Breakpoints (matching Tailwind defaults)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Sidebar dimensions
export const sidebar = {
  width: '280px',
  widthCollapsed: '80px',
  headerHeight: '64px',
} as const;

// Component-specific tokens
export const components = {
  statCard: {
    minHeight: '120px',
    iconSize: '40px',
    padding: spacing[6],
  },
  alertBanner: {
    padding: `${spacing[4]} ${spacing[5]}`,
    iconSize: '20px',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: `${spacing[3]} ${spacing[4]}`,
    borderRadius: radius.lg,
  },
  header: {
    height: '64px',
    paddingX: spacing[6],
  },
} as const;

// Alert severity colors
export const alertColors = {
  info: {
    background: 'bg-blue-50 dark:bg-blue-950',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-500 dark:text-blue-400',
    text: 'text-blue-900 dark:text-blue-100',
  },
  success: {
    background: 'bg-emerald-50 dark:bg-emerald-950',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-500 dark:text-emerald-400',
    text: 'text-emerald-900 dark:text-emerald-100',
  },
  warning: {
    background: 'bg-amber-50 dark:bg-amber-950',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-500 dark:text-amber-400',
    text: 'text-amber-900 dark:text-amber-100',
  },
  error: {
    background: 'bg-red-50 dark:bg-red-950',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-500 dark:text-red-400',
    text: 'text-red-900 dark:text-red-100',
  },
} as const;

// Stat card variant colors (using Tailwind classes for consistency)
export const statCardVariants = {
  default: {
    background: 'bg-card',
    icon: 'text-muted-foreground',
    border: 'border-border',
  },
  primary: {
    background: 'bg-primary/5',
    icon: 'text-primary',
    border: 'border-primary/20',
  },
  success: {
    background: 'bg-emerald-50 dark:bg-emerald-950/50',
    icon: 'text-emerald-500',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  warning: {
    background: 'bg-amber-50 dark:bg-amber-950/50',
    icon: 'text-amber-500',
    border: 'border-amber-200 dark:border-amber-800',
  },
  danger: {
    background: 'bg-red-50 dark:bg-red-950/50',
    icon: 'text-red-500',
    border: 'border-red-200 dark:border-red-800',
  },
} as const;

// Export all tokens as a single object for convenience
export const designTokens = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  durations,
  easings,
  zIndex,
  breakpoints,
  sidebar,
  components,
  alertColors,
  statCardVariants,
} as const;

export default designTokens;
