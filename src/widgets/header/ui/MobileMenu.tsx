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
    <div className="md:hidden py-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
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
                  className="block w-full text-left px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
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
                  'block px-4 py-3 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-900',
                  isActive
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                {item.name}
              </Link>
            );
          })}

        {!isAuthenticated && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <Link
              to={ROUTES.LOGIN}
              onClick={onClose}
              className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link
              to={ROUTES.SIGNUP}
              onClick={onClose}
              className="block w-full mx-4 px-4 py-3 text-sm text-center bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
