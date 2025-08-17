import { Link } from 'react-router-dom';
import { useAuth } from 'app/providers/AuthContext';
import { ROUTES } from 'shared/config/routes';
import { cn } from 'shared/lib/utils';
import { ProfileDropdown } from 'widgets/header';

export const UserActions = () => {
  const { isAuthenticated } = useAuth();
  const linkBaseStyles = 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';

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
      <ProfileDropdown />
    </>
  );
};
