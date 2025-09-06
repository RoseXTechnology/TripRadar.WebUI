import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { useAuthStore } from 'shared/store/auth';
import { ProfileDropdown } from 'widgets/header';

export const UserActions = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex items-center gap-4">
        <Link
          to={ROUTES.LOGIN}
          className="text-sm text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark transition-colors"
        >
          Login
        </Link>
        <Link
          to={ROUTES.SIGNUP}
          className="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
        >
          Register
        </Link>
      </div>
    );
  }

  return <ProfileDropdown />;
};
