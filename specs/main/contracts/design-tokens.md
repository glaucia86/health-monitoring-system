# Design Tokens Contract

Version: 1.0.0  
Date: 2025-11-26

## Color Tokens (CSS Variables)

```css
:root {
  /* Primary - Healthcare Teal */
  --color-primary-50: oklch(0.97 0.02 175);
  --color-primary-100: oklch(0.94 0.05 175);
  --color-primary-200: oklch(0.88 0.09 175);
  --color-primary-300: oklch(0.82 0.12 175);
  --color-primary-400: oklch(0.72 0.14 175);
  --color-primary-500: oklch(0.62 0.14 175);  /* Main */
  --color-primary-600: oklch(0.52 0.12 175);  /* Darker */
  --color-primary-700: oklch(0.44 0.10 175);
  --color-primary-800: oklch(0.38 0.08 175);
  --color-primary-900: oklch(0.32 0.06 175);
  
  /* Accent - Rose (Care, Alerts) */
  --color-accent-50: oklch(0.97 0.02 12);
  --color-accent-100: oklch(0.94 0.04 12);
  --color-accent-200: oklch(0.88 0.08 12);
  --color-accent-300: oklch(0.80 0.12 12);
  --color-accent-400: oklch(0.70 0.16 12);
  --color-accent-500: oklch(0.60 0.18 12);
  --color-accent-600: oklch(0.52 0.18 12);
  
  /* Semantic Colors */
  --color-success: oklch(0.65 0.18 160);
  --color-warning: oklch(0.75 0.18 85);
  --color-error: oklch(0.60 0.20 25);
  --color-info: oklch(0.60 0.18 255);
  
  /* Neutral (for backgrounds, text) */
  --color-neutral-50: oklch(0.98 0 0);
  --color-neutral-100: oklch(0.96 0 0);
  --color-neutral-200: oklch(0.92 0 0);
  --color-neutral-300: oklch(0.87 0 0);
  --color-neutral-400: oklch(0.70 0 0);
  --color-neutral-500: oklch(0.55 0 0);
  --color-neutral-600: oklch(0.45 0 0);
  --color-neutral-700: oklch(0.35 0 0);
  --color-neutral-800: oklch(0.25 0 0);
  --color-neutral-900: oklch(0.15 0 0);
}

.dark {
  /* Invert neutral scale for dark mode */
  --color-neutral-50: oklch(0.15 0 0);
  --color-neutral-100: oklch(0.20 0 0);
  --color-neutral-200: oklch(0.25 0 0);
  --color-neutral-300: oklch(0.35 0 0);
  --color-neutral-400: oklch(0.45 0 0);
  --color-neutral-500: oklch(0.55 0 0);
  --color-neutral-600: oklch(0.70 0 0);
  --color-neutral-700: oklch(0.85 0 0);
  --color-neutral-800: oklch(0.92 0 0);
  --color-neutral-900: oklch(0.96 0 0);
}
```

## Spacing Tokens

```css
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
}
```

## Typography Tokens

```css
:root {
  /* Font Families */
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

## Border Radius Tokens

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
  --radius-2xl: 1.5rem;  /* 24px */
  --radius-full: 9999px;
}
```

## Shadow Tokens

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 
               0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 
               0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 
               0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

## Animation Tokens

```css
:root {
  /* Durations */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
  
  /* Easing */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Z-Index Scale

```css
:root {
  --z-0: 0;
  --z-10: 10;       /* Dropdown content */
  --z-20: 20;       /* Sticky elements */
  --z-30: 30;       /* Fixed elements */
  --z-40: 40;       /* Modal backdrop */
  --z-50: 50;       /* Modal content */
  --z-60: 60;       /* Toast notifications */
}
```
