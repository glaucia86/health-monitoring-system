'use client';

import { m } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';

interface AuthIllustrationProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * AuthIllustration - Healthcare-themed SVG illustration
 * Features animated elements for a modern, welcoming feel
 */
export function AuthIllustration({ className }: AuthIllustrationProps) {
  return (
    <m.svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-white', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Circle */}
      <m.circle
        cx="200"
        cy="200"
        r="150"
        fill="currentColor"
        fillOpacity="0.1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Secondary Circle */}
      <m.circle
        cx="200"
        cy="200"
        r="120"
        fill="currentColor"
        fillOpacity="0.1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      />

      {/* Heart with Health Cross */}
      <m.g
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        {/* Heart Shape */}
        <path
          d="M200 280C200 280 120 220 120 170C120 145 140 120 170 120C185 120 198 130 200 140C202 130 215 120 230 120C260 120 280 145 280 170C280 220 200 280 200 280Z"
          fill="currentColor"
          fillOpacity="0.9"
        />
        
        {/* Health Cross */}
        <m.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <rect x="190" y="160" width="20" height="50" rx="3" fill="white" fillOpacity="0.9" />
          <rect x="175" y="175" width="50" height="20" rx="3" fill="white" fillOpacity="0.9" />
        </m.g>
      </m.g>

      {/* Pulse Line - Left */}
      <m.path
        d="M80 200 L100 200 L110 180 L120 220 L130 190 L140 210 L150 200 L170 200"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* Pulse Line - Right */}
      <m.path
        d="M230 200 L250 200 L260 180 L270 220 L280 190 L290 210 L300 200 L320 200"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.7, ease: 'easeInOut' }}
      />

      {/* Decorative Dots */}
      <m.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <circle cx="100" cy="120" r="6" fill="currentColor" fillOpacity="0.4" />
        <circle cx="300" cy="280" r="8" fill="currentColor" fillOpacity="0.3" />
        <circle cx="320" cy="130" r="5" fill="currentColor" fillOpacity="0.5" />
        <circle cx="80" cy="260" r="7" fill="currentColor" fillOpacity="0.3" />
      </m.g>

      {/* Floating Plus Signs */}
      <m.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <g transform="translate(320, 170)">
          <rect x="-2" y="-8" width="4" height="16" rx="1" fill="currentColor" />
          <rect x="-8" y="-2" width="16" height="4" rx="1" fill="currentColor" />
        </g>
        <g transform="translate(90, 160)">
          <rect x="-1.5" y="-6" width="3" height="12" rx="1" fill="currentColor" />
          <rect x="-6" y="-1.5" width="12" height="3" rx="1" fill="currentColor" />
        </g>
      </m.g>

      {/* Caring Hands Outline */}
      <m.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <path
          d="M140 320 Q120 300 130 280 Q140 260 160 270 L180 290"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M260 320 Q280 300 270 280 Q260 260 240 270 L220 290"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </m.g>
    </m.svg>
  );
}

export type { AuthIllustrationProps };
