/**
 * Framer Motion animation variants for the Health Monitoring System
 * 
 * Usage with LazyMotion (recommended for bundle size):
 * import { m } from 'framer-motion';
 * import { fadeIn, slideUp, staggerContainer } from '@/lib/motion';
 * 
 * <m.div variants={fadeIn} initial="hidden" animate="visible">
 *   Content here
 * </m.div>
 * 
 * Note: The app is wrapped in LazyMotion with domAnimation features,
 * so you can use `m` instead of `motion` for smaller bundle size.
 * Both work, but `m` enables better tree-shaking.
 */

import { Variants, Transition } from 'framer-motion';

// Re-export m component for convenience (use with LazyMotion)
export { m } from 'framer-motion';

// Common easing curves
export const easings = {
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// Common transition presets
export const transitions = {
  fast: { duration: 0.15, ease: easings.easeOut },
  default: { duration: 0.3, ease: easings.easeOut },
  slow: { duration: 0.5, ease: easings.easeOut },
  spring: { type: 'spring', stiffness: 400, damping: 30 },
  springGentle: { type: 'spring', stiffness: 200, damping: 25 },
} as const satisfies Record<string, Transition>;

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transitions.default,
  },
  exit: { 
    opacity: 0,
    transition: transitions.fast,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: transitions.fast,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: transitions.fast,
  },
};

// Slide animations
export const slideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: transitions.default,
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: transitions.fast,
  },
};

export const slideDown: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: transitions.default,
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: transitions.fast,
  },
};

export const slideInLeft: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: transitions.default,
  },
  exit: { 
    x: -20, 
    opacity: 0,
    transition: transitions.fast,
  },
};

export const slideInRight: Variants = {
  hidden: { x: 20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: transitions.default,
  },
  exit: { 
    x: 20, 
    opacity: 0,
    transition: transitions.fast,
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: transitions.spring,
  },
  exit: { 
    scale: 0.95, 
    opacity: 0,
    transition: transitions.fast,
  },
};

export const popIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: transitions.spring,
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: transitions.fast,
  },
};

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// List item animation (use with staggerContainer)
export const listItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default,
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: transitions.fast,
  },
};

// Alias for staggerItem (backwards compatibility)
export const staggerItem = listItem;

// Chat message animations
export const messageSlideIn: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: transitions.springGentle,
  },
};

export const messageSlideInRight: Variants = {
  hidden: { opacity: 0, x: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: transitions.springGentle,
  },
};

// Card hover animation
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -2,
    transition: transitions.spring,
  },
  tap: { 
    scale: 0.98,
    transition: transitions.fast,
  },
};

// Page transitions
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.easeIn,
    },
  },
};

// Sidebar animations
export const sidebarSlide: Variants = {
  hidden: { x: -280, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: { 
    x: -280, 
    opacity: 0,
    transition: transitions.default,
  },
};

// Collapse/expand animation
export const collapse: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: 'auto', 
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: easings.easeOut },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: easings.easeIn },
      opacity: { duration: 0.1 },
    },
  },
};

// Notification/alert animations
export const alertSlideIn: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: transitions.spring,
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95,
    transition: transitions.fast,
  },
};

// Typing indicator dots animation
export const typingDots = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Pulse animation for loading states
export const pulse: Variants = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Shimmer animation for skeletons
export const shimmer: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: '100%',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Success checkmark animation
export const checkmark: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.4, ease: 'easeOut' },
      opacity: { duration: 0.1 },
    },
  },
};
