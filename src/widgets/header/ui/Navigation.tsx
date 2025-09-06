import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAVIGATION, LANDING_NAVIGATION } from 'shared/config';
import { cn } from 'shared/lib/utils';
import { useAuthStore } from 'shared/store/auth';

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: 'smooth' });
};

const handleAnchorClick = (href: string, navigate: ReturnType<typeof useNavigate>, currentPath: string) => {
  if (currentPath === '/') {
    scrollToSection(href);
  } else {
    navigate('/' + href);
  }
};

export const Navigation = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = isAuthenticated ? APP_NAVIGATION : LANDING_NAVIGATION;

  return (
    <nav className="flex items-center gap-6">
      {navigation
        .filter(item => !item.protected || isAuthenticated)
        .map(item => {
          const isAnchor = item.href.startsWith('#');
          const isActive = location.pathname === item.href;

          if (isAnchor) {
            return (
              <button
                key={item.name}
                onClick={() => handleAnchorClick(item.href, navigate, location.pathname)}
                className="text-sm text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark transition-colors"
              >
                {item.name}
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'text-sm transition-colors',
                isActive
                  ? 'text-content dark:text-content-dark'
                  : 'text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark'
              )}
            >
              {item.name}
            </Link>
          );
        })}
    </nav>
  );
};
