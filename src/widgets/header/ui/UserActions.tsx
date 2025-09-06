import { Link } from 'react-router-dom';
import { useAuth } from 'app/providers/AuthContext';
import { ROUTES } from 'shared/config/routes';
import { ProfileDropdown } from 'widgets/header';

export const UserActions = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex items-center gap-4">
        <Link
          to={ROUTES.LOGIN}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Login
        </Link>
        <Link
          to={ROUTES.SIGNUP}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Register
        </Link>
      </div>
    );
  }

  return <ProfileDropdown />;
};
