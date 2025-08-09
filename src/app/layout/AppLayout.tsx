import { useAuth } from 'app/providers/AuthContext';
import { ErrorBoundary } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { LandingHeader } from 'widgets/landing-header';

import { AppRoutes } from '../router/routes';

export function AppLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {isAuthenticated ? <Header /> : <LandingHeader />}

      <main className="flex-1">
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
