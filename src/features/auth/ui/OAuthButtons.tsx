import { FaGoogle } from 'react-icons/fa';
import { AUTH_MESSAGES } from 'features/auth';
import { handleGoogleSignUp } from '../lib/oauth';

export const OAuthButtons = () => {
  const buttonStyles =
    'w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 border border-outline dark:border-outline-dark text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark';
  return (
    <div className="space-y-4 mb-8">
      <button onClick={handleGoogleSignUp} className={buttonStyles}>
        <FaGoogle className="h-5 w-5" />
        <span>{AUTH_MESSAGES.ui.continueWith} Google</span>
      </button>
    </div>
  );
};
