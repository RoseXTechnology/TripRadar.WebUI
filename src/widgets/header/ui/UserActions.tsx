import { FaSearch, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from 'app/providers/AuthContext';
import { ROUTES } from 'shared/config/routes';
import { cn } from 'shared/lib/utils';
import { ProfileDropdown } from 'widgets/header';

interface UserActionsProps {
  onSearchClick: () => void;
}

export const UserActions = ({ onSearchClick }: UserActionsProps) => {
  const { isAuthenticated } = useAuth();
  const linkBaseStyles = 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';
  const buttonStyles = 'p-2 rounded-xl transition-colors';

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <Link to={ROUTES.LOGIN} className={cn('text-sm font-medium transition-colors', linkBaseStyles)}>
          Sign in
        </Link>
        <Link
          to={ROUTES.SIGNUP}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all',
            'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
            'hover:from-blue-600 hover:to-purple-700'
          )}
        >
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={onSearchClick}
        className={cn(
          'hidden sm:flex items-center space-x-2',
          buttonStyles,
          linkBaseStyles,
          'hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
      >
        <FaSearch className="h-5 w-5" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Press / to search</span>
      </button>

      <Link
        to={ROUTES.NOTIFICATIONS}
        className={cn(buttonStyles, linkBaseStyles, 'hover:bg-gray-100 dark:hover:bg-gray-800 relative')}
      >
        <FaBell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
          3
        </span>
      </Link>

      <ProfileDropdown />
    </>
  );
};
