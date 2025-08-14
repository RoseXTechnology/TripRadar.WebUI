import { Header, Footer } from 'widgets';
import { ErrorBoundary } from 'shared/ui';
import { AppRoutes } from '../router/routes';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="flex-1">
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
