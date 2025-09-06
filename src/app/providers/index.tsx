import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <Router>{children}</Router>
    </ThemeProvider>
  );
}
