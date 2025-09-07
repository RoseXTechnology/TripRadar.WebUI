import { ReactNode, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuthStore } from 'shared/store/auth';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeContext';

interface ProvidersProps {
  children: ReactNode;
}

function AuthInitializer({ children }: { children: ReactNode }) {
  const initializeAuth = useAuthStore(state => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Router>
          <AuthInitializer>{children}</AuthInitializer>
        </Router>
      </ThemeProvider>
    </QueryProvider>
  );
}
