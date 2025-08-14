import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'app/providers/ThemeContext';
import { THEME } from 'shared/config/constants';
import { cn } from 'shared/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-xl transition-colors flex items-center justify-center w-10 h-10',
        'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'focus:outline-none',
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === THEME.LIGHT && <Sun className="h-5 w-5" />}
      {theme === THEME.DARK && <Moon className="h-5 w-5" />}
      {theme === 'system' && <Monitor className="h-5 w-5" />}
    </button>
  );
};
