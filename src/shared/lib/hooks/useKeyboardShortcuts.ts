import { useEffect, useCallback } from 'react';

interface KeyboardShortcuts {
  onSearch?: () => void;
  onEscape?: () => void;
  onEnter?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case '/':
          if (shortcuts.onSearch) {
            e.preventDefault();
            shortcuts.onSearch();
          }
          break;
        case 'Escape':
          shortcuts.onEscape?.();
          break;
        case 'Enter':
          shortcuts.onEnter?.();
          break;
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
