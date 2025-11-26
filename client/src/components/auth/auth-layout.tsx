'use client';

import { m } from '@/lib/motion-provider';
import { fadeIn, slideInLeft, slideInRight } from '@/lib/motion';
import { AuthIllustration } from './auth-illustration';

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Which side the illustration appears on */
  illustrationSide?: 'left' | 'right';
}

/**
 * AuthLayout - Split layout for authentication pages
 * Features branding/illustration on one side and form on the other
 * Responsive: stacks on mobile, side-by-side on desktop
 */
export function AuthLayout({ 
  children, 
  illustrationSide = 'left' 
}: AuthLayoutProps) {
  const isIllustrationLeft = illustrationSide === 'left';

  return (
    <div className="min-h-screen flex">
      {/* Illustration Side */}
      <m.div
        className={`hidden lg:flex lg:w-1/2 xl:w-[55%] bg-gradient-to-br from-primary/90 via-primary to-primary/80 
                    relative overflow-hidden items-center justify-center p-12 ${
                      isIllustrationLeft ? 'order-1' : 'order-2'
                    }`}
        variants={isIllustrationLeft ? slideInLeft : slideInRight}
        initial="hidden"
        animate="visible"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" className="text-white" />
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center text-white">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AuthIllustration className="w-64 h-64 mx-auto mb-8" />
          </m.div>

          <m.h1
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Sistema de Monitoramento de Saúde
          </m.h1>

          <m.p
            className="text-lg text-white/80 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Acompanhe a saúde de quem você ama com carinho e tecnologia
          </m.p>

          <m.div
            className="flex items-center justify-center gap-6 text-white/70 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Confiável</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Acessível</span>
            </div>
          </m.div>
        </div>
      </m.div>

      {/* Form Side */}
      <m.div
        className={`flex-1 lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:p-8 lg:p-12 
                    bg-background ${isIllustrationLeft ? 'order-2' : 'order-1'}`}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </m.div>
    </div>
  );
}

export type { AuthLayoutProps };
