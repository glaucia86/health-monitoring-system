import { useEffect } from 'react';

/**
 * Custom hook to warn users before leaving the page with unsaved changes
 * Follows Single Responsibility Principle by handling only beforeunload logic
 * 
 * @param isDirty - Whether the form has unsaved changes
 */
export function useUnsavedChangesWarning(isDirty: boolean): void {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);
}
