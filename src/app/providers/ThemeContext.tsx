/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { THEME } from 'shared/config/constants';

type Theme = typeof THEME.LIGHT | typeof THEME.DARK | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: typeof THEME.LIGHT | typeof THEME.DARK;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('tripradar-theme') as Theme;
    if (savedTheme && [THEME.LIGHT, THEME.DARK, 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    return 'system';
  });

  const [actualTheme, setActualTheme] = useState<typeof THEME.LIGHT | typeof THEME.DARK>(THEME.LIGHT);

  useEffect(() => {
    const updateActualTheme = () => {
      let newActualTheme: typeof THEME.LIGHT | typeof THEME.DARK;

      if (theme === 'system') {
        newActualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME.DARK : THEME.LIGHT;
      } else {
        newActualTheme = theme;
      }

      setActualTheme(newActualTheme);

      // Apply theme to document
      const root = document.documentElement;

      if (newActualTheme === THEME.DARK) {
        root.classList.add('dark');
        root.style.colorScheme = THEME.DARK;
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = THEME.LIGHT;
      }
    };

    updateActualTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateActualTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    // Save to localStorage
    localStorage.setItem('tripradar-theme', theme);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === THEME.LIGHT) return THEME.DARK;
      if (prev === THEME.DARK) return 'system';
      return THEME.LIGHT;
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    actualTheme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
