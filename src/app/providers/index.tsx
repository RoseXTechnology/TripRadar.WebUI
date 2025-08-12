import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimationProvider } from 'shared/ui/animation-provider';
import { AppProvider } from './AppContext';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppProvider>
            <AnimationProvider>{children}</AnimationProvider>
          </AppProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
