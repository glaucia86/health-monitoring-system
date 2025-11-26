# Health Monitoring System Constitution

## Core Principles

### I. Library-First
Every new feature should be built as reusable components first. Components must be self-contained, independently testable, and properly documented. Prefer composition over inheritance and keep components focused on a single responsibility.

### II. Accessibility-First
All UI components must meet WCAG 2.1 AA compliance. This includes proper ARIA labels, keyboard navigation support, color contrast ratios (4.5:1 minimum), and screen reader compatibility. Accessibility is a non-negotiable requirement for every feature.

### III. Design System Consistency
Use established design tokens and component patterns from the design system. Never introduce custom colors, spacing, or typography outside of the defined token system. All visual elements must follow the healthcare-focused color palette (Teal primary, Rose accent).

### IV. Performance Standards
- Lighthouse Performance score > 90
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Animations must be SSR-compatible and use GPU-accelerated properties

### V. Simplicity (YAGNI)
Start with the simplest solution that works. Avoid premature optimization and over-engineering. Use existing libraries (shadcn/ui, Framer Motion) rather than building custom solutions unless absolutely necessary.

## Technology Constraints

- **Framework**: Next.js 15 with App Router (React 19)
- **Styling**: Tailwind CSS 4 with oklch color system
- **Components**: shadcn/ui (new-york style) as base
- **Animation**: Framer Motion for complex animations
- **State**: Zustand for UI state, React Query for server state
- **Icons**: Lucide React exclusively

## Development Workflow

1. **Component Development**: Create components in isolation before integrating into pages
2. **Progressive Enhancement**: Features should work without JavaScript where possible
3. **Mobile-First Responsive**: Design for mobile, enhance for desktop
4. **Code Review**: All changes require review for accessibility and design system compliance

## Governance

This constitution supersedes all other development practices for this project. Any amendments require documentation, team approval, and a migration plan for existing code.

**Version**: 1.0.0 | **Ratified**: 2025-11-26 | **Last Amended**: 2025-11-26
