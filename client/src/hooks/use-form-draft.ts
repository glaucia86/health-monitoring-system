import { useEffect, useState } from 'react';
import { UseFormWatch, UseFormReset, FieldValues } from 'react-hook-form';

interface UseFormDraftOptions<T extends FieldValues> {
  draftKey: string;
  isDirty: boolean;
  watch: UseFormWatch<T>;
  reset: UseFormReset<T>;
  autoSaveIntervalMs?: number;
}

interface UseFormDraftResult {
  hasDraft: boolean;
  clearDraft: () => void;
}

/**
 * Custom hook to manage form drafts in localStorage
 * Follows Single Responsibility Principle by handling only draft-related logic
 * 
 * @param options - Configuration options for draft management
 * @returns Object with draft status and clear function
 */
export function useFormDraft<T extends FieldValues>({
  draftKey,
  isDirty,
  watch,
  reset,
  autoSaveIntervalMs = 30000,
}: UseFormDraftOptions<T>): UseFormDraftResult {
  const [hasDraft, setHasDraft] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft) as T;
        setHasDraft(true);
        
        // Ask user if they want to restore draft
        const restore = window.confirm(
          'Encontramos um rascunho não salvo. Deseja restaurá-lo?'
        );
        
        if (restore) {
          reset(draftData);
        } else {
          localStorage.removeItem(draftKey);
          setHasDraft(false);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
        localStorage.removeItem(draftKey);
      }
    }
  }, [draftKey, reset]);

  // Auto-save draft to localStorage at specified interval
  useEffect(() => {
    if (!isDirty) return;

    const interval = setInterval(() => {
      const values = watch();
      if (isDirty) {
        localStorage.setItem(draftKey, JSON.stringify(values));
        setHasDraft(true);
      }
    }, autoSaveIntervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [isDirty, watch, draftKey, autoSaveIntervalMs]);

  const clearDraft = () => {
    localStorage.removeItem(draftKey);
    setHasDraft(false);
  };

  return { hasDraft, clearDraft };
}
