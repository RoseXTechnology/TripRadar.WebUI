import { useAuth } from 'app/providers/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAVIGATION, LANDING_NAVIGATION } from 'shared/config';
import { ROUTES } from 'shared/config/routes';
import { cn } from 'shared/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick: () => void;
}

export const MobileMenu = ({ isOpen, onClose, onSearchClick }: MobileMenuProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isOpen) return null;

  const navigation = isAuthenticated ? APP_NAVIGATION : LANDING_NAVIGATION;
  const linkBaseStyles = 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';
  const linkActiveStyles = 'text-gray-900 dark:text-white';

  return (
    <div
      className={cn(
        'md:hidden py-4 animate-slide-down',
        'bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'
      )}
    >
      <nav className="space-y-2">
        {navigation.map(item => {
          if (item.protected && !isAuthenticated) return null;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'block px-3 py-2 font-medium rounded-xl transition-colors',
                location.pathname === item.href
                  ? `${linkActiveStyles} bg-gray-100 dark:bg-gray-700`
                  : `${linkBaseStyles} hover:bg-gray-100 dark:hover:bg-gray-700`
              )}
              onClick={onClose}
            >
              {item.name}
            </Link>
          );
        })}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <button
            onClick={() => {
              onSearchClick();
              onClose();
            }}
            className={cn(
              'flex items-center w-full px-3 py-2 rounded-xl font-medium transition-colors',
              linkBaseStyles,
              'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            Search
          </button>

          {!isAuthenticated && (
            <>
              <Link
                to={ROUTES.LOGIN}
                className={cn(
                  'block px-3 py-2 rounded-xl font-medium transition-colors',
                  linkBaseStyles,
                  'hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
                onClick={onClose}
              >
                Sign In
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className={cn(
                  'block px-3 py-2.5 rounded-xl font-semibold text-center transition-all',
                  'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
                  'hover:shadow-lg hover:shadow-blue-500/25'
                )}
                onClick={onClose}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
