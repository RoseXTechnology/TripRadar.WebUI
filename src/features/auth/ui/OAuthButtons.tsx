import { FaGoogle } from 'react-icons/fa';
import { AUTH_MESSAGES } from 'features/auth';
import { handleGoogleSignUp } from '../lib/oauth';

export const OAuthButtons = () => {
  const buttonStyles =
    'w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500';
  return (
    <div className="space-y-4 mb-8">
      <button onClick={handleGoogleSignUp} className={buttonStyles}>
        <FaGoogle className="h-5 w-5" />
        <span>{AUTH_MESSAGES.ui.continueWith} Google</span>
      </button>
    </div>
  );
};
