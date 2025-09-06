import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';
import { useAuthStore } from 'shared/store/auth';

export const UserActions = () => {
  const { isAuthenticated, user } = useAuthStore();

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
          className="px-4 py-2 bg-content dark:bg-surface text-surface dark:text-content border border-content dark:border-outline text-sm rounded-lg hover:bg-content-secondary dark:hover:bg-surface-accent transition-colors"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <Link
      to={ROUTES.PROFILE}
      className="flex items-center space-x-2 p-2 rounded-xl transition-colors hover:bg-surface-accent/50 dark:hover:bg-surface-accent-dark/50"
    >
      <img
        src={user?.avatar}
        alt={user?.name}
        className="h-8 w-8 rounded-full object-cover border-2 border-outline dark:border-outline-dark"
      />
      <span className="hidden sm:block text-sm font-medium text-content dark:text-content-dark">{user?.name}</span>
    </Link>
  );
};
