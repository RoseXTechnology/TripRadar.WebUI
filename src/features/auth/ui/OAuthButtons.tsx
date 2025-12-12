import { useState } from 'react';
import { handleGoogleSignUp } from '../lib/oauth';
import { AUTH_MESSAGES } from '../model/constants';

export const OAuthButtons = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleClick = async () => {
    setIsGoogleLoading(true);
    try {
      await handleGoogleSignUp();
    } catch (error) {
      console.error('Google sign up failed:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const buttonStyles =
    'w-full flex items-center justify-center space-x-3 px-4 py-4 min-h-[48px] rounded-xl font-medium transition-all duration-200 border border-outline dark:border-outline-dark text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark text-base disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <div className="space-y-4 mb-8">
      <button
        onClick={handleGoogleClick}
        disabled={isGoogleLoading}
        className={buttonStyles}
        aria-describedby={isGoogleLoading ? 'google-loading-status' : undefined}
      >
        {isGoogleLoading ? (
          <>
            <div
              className="animate-spin h-5 w-5 border-2 border-content/30 dark:border-content-dark/30 border-t-content dark:border-t-content-dark rounded-full"
              aria-hidden="true"
            />
            <span id="google-loading-status">Connecting to Google...</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>{AUTH_MESSAGES.ui.continueWith} Google</span>
          </>
        )}
      </button>
    </div>
  );
};
