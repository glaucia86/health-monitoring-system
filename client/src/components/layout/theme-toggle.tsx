'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { m, AnimatePresence } from '@/lib/motion-provider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme, type Theme } from '@/stores/ui.store';

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown' | 'compact';
  className?: string;
}

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const themeLabels = {
  light: 'Claro',
  dark: 'Escuro',
  system: 'Sistema',
} as const;

// Use useSyncExternalStore for hydration-safe mounted state
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * ThemeToggle - Toggle between light, dark, and system theme
 * 
 * Variants:
 * - icon: Simple icon button that cycles through themes
 * - dropdown: Icon button with dropdown menu
 * - compact: Small button for collapsed sidebar
 */
export function ThemeToggle({ variant = 'dropdown', className }: ThemeToggleProps) {
  const { theme, setTheme, isDark } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={cn('h-9 w-9', className)} disabled>
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const CurrentIcon = themeIcons[theme];

  // Simple cycling toggle
  if (variant === 'icon') {
    const cycleTheme = () => {
      const themes: Theme[] = ['light', 'dark', 'system'];
      const currentIndex = themes.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTheme(themes[nextIndex]);
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className={cn('h-9 w-9', className)}
            aria-label={`Tema atual: ${themeLabels[theme]}. Clique para alternar.`}
          >
            <AnimatePresence mode="wait">
              <m.div
                key={theme}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <CurrentIcon className="h-4 w-4" />
              </m.div>
            </AnimatePresence>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tema: {themeLabels[theme]}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Compact version for collapsed sidebar
  if (variant === 'compact') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn('h-9 w-9', className)}
            aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            <AnimatePresence mode="wait">
              <m.div
                key={isDark ? 'dark' : 'light'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </m.div>
            </AnimatePresence>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{isDark ? 'Tema escuro' : 'Tema claro'}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Dropdown menu version
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn('h-9 w-9', className)}
              aria-label="Alternar tema"
            >
              <AnimatePresence mode="wait">
                <m.div
                  key={theme}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <CurrentIcon className="h-4 w-4" />
                </m.div>
              </AnimatePresence>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="hidden group-hover:block">
          <p>Tema: {themeLabels[theme]}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(theme === 'light' && 'bg-accent')}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(theme === 'dark' && 'bg-accent')}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Escuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(theme === 'system' && 'bg-accent')}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type { ThemeToggleProps };
