import { Link, useLocation } from 'react-router-dom';
import { useAuth } from 'app/providers/AuthContext';
import { APP_NAVIGATION, LANDING_NAVIGATION } from 'shared/config';
import { cn } from 'shared/lib/utils';

export const Navigation = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const navigation = isAuthenticated ? APP_NAVIGATION : LANDING_NAVIGATION;
  const linkBaseStyles = 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';
  const linkActiveStyles = 'text-gray-900 dark:text-white';

  return (
    <nav className="hidden md:flex space-x-8">
      {navigation.map(item => {
        if (item.protected && !isAuthenticated) return null;

        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'relative font-medium transition-colors group',
              location.pathname === item.href ? linkActiveStyles : linkBaseStyles
            )}
          >
            {item.name}
            <span
              className={cn(
                'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-200',
                location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
};
