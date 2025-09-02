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
  if (href.startsWith('#')) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const handleTelegramClick = () => {
  window.open('https://t.me/TripRadarBot', '_blank');
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
                className={cn(
                  'block w-full text-left px-3 py-2 font-medium rounded-xl transition-colors',
                  `${linkBaseStyles} hover:bg-gray-100 dark:hover:bg-gray-700`
                )}
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
                'block px-3 py-2 font-medium rounded-xl transition-colors',
                isActive
                  ? `${linkActiveStyles} bg-gray-100 dark:bg-gray-700`
                  : `${linkBaseStyles} hover:bg-gray-100 dark:hover:bg-gray-700`
              )}
              onClick={onClose}
            >
              {item.name}
            </Link>
          );
        })}

        {!isAuthenticated && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <Link
              to={ROUTES.LOGIN}
              className={cn(
                'block px-3 py-2 rounded-xl font-medium transition-colors',
                linkBaseStyles,
                'hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
              onClick={onClose}
            >
              Login
            </Link>
            <button
              onClick={() => {
                handleTelegramClick();
                onClose();
              }}
              className={cn(
                'block w-full px-3 py-2.5 rounded-xl font-semibold text-center transition-all',
                'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
                'hover:shadow-lg hover:shadow-blue-500/25'
              )}
            >
              Открыть в Telegram
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
