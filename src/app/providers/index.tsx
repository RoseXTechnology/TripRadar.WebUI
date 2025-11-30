import { ReactNode, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuthStore } from 'shared/store/auth';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeContext';

const basename = import.meta.env.BASE_URL;

interface ProvidersProps {
  children: ReactNode;
}

const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const { initializeAuth, isLoading } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-content-secondary dark:text-content-secondary-dark">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Router basename={basename}>
          <AuthInitializer>{children}</AuthInitializer>
        </Router>
      </ThemeProvider>
    </QueryProvider>
  );
};
