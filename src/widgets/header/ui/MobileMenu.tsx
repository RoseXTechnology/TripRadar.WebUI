import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'app/providers/AuthContext';
import { APP_NAVIGATION, LANDING_NAVIGATION } from 'shared/config';
import { ROUTES } from 'shared/config/routes';
import { cn } from 'shared/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const navigation = isAuthenticated ? APP_NAVIGATION : LANDING_NAVIGATION;

  return (
    <div className="md:hidden py-4 bg-surface dark:bg-surface-dark border-t border-outline dark:border-outline-dark">
      <nav className="space-y-1">
        {navigation
          .filter(item => !item.protected || isAuthenticated)
          .map(item => {
            const isAnchor = item.href.startsWith('#');
            const isActive = location.pathname === item.href;

            if (isAnchor) {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    handleAnchorClick(item.href, navigate, location.pathname);
                    onClose();
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark hover:bg-primary-50 dark:hover:bg-surface-accent-dark transition-colors"
                >
                  {item.name}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'block px-4 py-3 text-sm transition-colors hover:bg-primary-50 dark:hover:bg-surface-accent-dark',
                  isActive
                    ? 'text-content dark:text-content-dark'
                    : 'text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark'
                )}
              >
                {item.name}
              </Link>
            );
          })}

        {!isAuthenticated && (
          <div className="pt-4 border-t border-outline dark:border-outline-dark space-y-2">
            <Link
              to={ROUTES.LOGIN}
              onClick={onClose}
              className="block px-4 py-3 text-sm text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark hover:bg-primary-50 dark:hover:bg-surface-accent-dark transition-colors"
            >
              Login
            </Link>
            <Link
              to={ROUTES.SIGNUP}
              onClick={onClose}
              className="block w-full mx-4 px-4 py-3 text-sm text-center bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark rounded-lg hover:bg-button-hover dark:hover:bg-button-hover-dark transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
