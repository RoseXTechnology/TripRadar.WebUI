import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from 'features/auth';
import { LoadingSpinner } from 'shared/ui';

// Lazy components
const LazyRoute = ({ importFn }: { importFn: () => Promise<{ default: React.ComponentType }> }) => {
  const Component = lazy(importFn);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};

// Route configurations
const publicRoutes = [
  // Auth
  { path: '/login', component: () => import('features/auth').then(m => ({ default: m.Login })) },
  { path: '/signup', component: () => import('features/auth').then(m => ({ default: m.Signup })) },

  // Marketing
  { path: '/', component: () => import('../../pages/marketing').then(m => ({ default: m.Home })) },
  { path: '/pricing', component: () => import('../../pages/marketing').then(m => ({ default: m.Pricing })) },

  // Legal
  { path: '/privacy', component: () => import('shared/ui/legal').then(m => ({ default: m.PrivacyPolicy })) },
  { path: '/terms', component: () => import('shared/ui/legal').then(m => ({ default: m.TermsOfService })) },
  { path: '/contact', component: () => import('../../pages/support').then(m => ({ default: m.HelpCenter })) },
];

const protectedRoutes = [
  // Profile
  { path: '/profile', component: () => import('../../pages/profile').then(m => ({ default: m.Profile })) },
  { path: '/settings', component: () => import('../../pages/profile').then(m => ({ default: m.Settings })) },
  { path: '/billing', component: () => import('../../pages/profile').then(m => ({ default: m.Billing })) },
];

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={<LazyRoute importFn={component} />} />
      ))}

      {/* Protected Routes */}
      {protectedRoutes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <LazyRoute importFn={component} />
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
}
