'use client';

import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * LazyMotion provider for optimized Framer Motion bundle size.
 * 
 * Using domAnimation features which includes:
 * - Animations (animate, initial, exit)
 * - Gestures (whileHover, whileTap, whileFocus, whileDrag)
 * - Layout animations
 * - Exit animations with AnimatePresence
 * 
 * This reduces the bundle size by only loading the features we need
 * and enables tree-shaking for unused animation features.
 * 
 * IMPORTANT: When using LazyMotion with strict mode, you must use `m` 
 * components instead of `motion` components to enable proper tree-shaking.
 * Import `m` and `AnimatePresence` from this file.
 * 
 * For full features including SVG path animations, use domMax instead.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

// Re-export m and AnimatePresence for use with LazyMotion strict mode
export { m, AnimatePresence };
