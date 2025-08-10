import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from 'shared/lib/utils';

interface AuthActionsProps {
  onSearchClick: () => void;
}

export const AuthActions = ({ onSearchClick }: AuthActionsProps) => {
  const baseTextStyles = 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';

  return (
    <div className="flex items-center space-x-4">
      {/* Quick Search */}
      <button
        onClick={onSearchClick}
        className={cn(
          'flex items-center space-x-2 p-2 rounded-xl transition-colors',
          baseTextStyles,
          'hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
      >
        <Search className="h-4 w-4" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
      </button>

      {/* Sign In Link */}
      <Link to="/login" className={cn('inline-flex font-medium transition-colors relative group', baseTextStyles)}>
        Sign In
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-200 group-hover:w-full" />
      </Link>

      {/* Get Started Button */}
      <Link
        to="/signup"
        className={cn(
          'group relative px-6 py-2.5 rounded-xl font-semibold',
          'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
          'hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200',
          'flex items-center space-x-2 transform hover:-translate-y-0.5'
        )}
      >
        <span>Get Started</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
};
