import { Header, Footer } from 'widgets';
import { ErrorBoundary } from 'shared/ui';
import { AppRoutes } from '../router/routes';
import { ScrollToTop } from '../router/ScrollToTop';

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-accent dark:bg-surface-dark transition-colors duration-300">
      <ScrollToTop />
      <Header />

      <main id="main-content" className="flex-1">
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};
