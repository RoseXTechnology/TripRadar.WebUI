import { useState } from 'react';
import { FaUser, FaSignOutAlt, FaCog, FaCreditCard, FaDollarSign, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from 'app/providers/AuthContext';
import { ROUTES } from 'shared/config/routes';
import { cn } from 'shared/lib/utils';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const linkBaseStyles = 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-2 p-2 rounded-xl transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
      >
        <img
          src={
            user?.avatar ||
            'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
          }
          alt={user?.name || 'User'}
          className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        />
        <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">
          {user?.name || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl animate-slide-down z-50">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center space-x-1">
                <FaStar className="h-3 w-3" />
                <span>{user?.subscription || 'free'} Plan</span>
              </p>
            </div>
            <Link
              to={ROUTES.PROFILE}
              className={cn(
                'flex items-center px-4 py-2 text-sm transition-colors',
                linkBaseStyles,
                'hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="h-4 w-4 mr-3" />
              Profile
            </Link>
            <Link
              to={ROUTES.BUDGET}
              className={cn(
                'flex items-center px-4 py-2 text-sm transition-colors',
                linkBaseStyles,
                'hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
              onClick={() => setIsOpen(false)}
            >
              <FaDollarSign className="h-4 w-4 mr-3" />
              Budget
            </Link>
            <Link
              to={ROUTES.SETTINGS}
              className={cn(
                'flex items-center px-4 py-2 text-sm transition-colors',
                linkBaseStyles,
                'hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
              onClick={() => setIsOpen(false)}
            >
              <FaCog className="h-4 w-4 mr-3" />
              Settings
            </Link>
            <Link
              to={ROUTES.BILLING}
              className={cn(
                'flex items-center px-4 py-2 text-sm transition-colors',
                linkBaseStyles,
                'hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
              onClick={() => setIsOpen(false)}
            >
              <FaCreditCard className="h-4 w-4 mr-3" />
              Billing
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <FaSignOutAlt className="h-4 w-4 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
