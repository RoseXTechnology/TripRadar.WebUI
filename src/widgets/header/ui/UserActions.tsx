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
          className="group px-4 py-2 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark rounded-lg font-medium hover:bg-button-hover dark:hover:bg-button-hover-dark transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
};
