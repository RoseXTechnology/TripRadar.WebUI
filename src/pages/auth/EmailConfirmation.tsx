import { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEmailConfirmation } from 'features/auth/api/useEmailConfirmation';
import { TelegramConnect } from 'features/auth/ui/TelegramConnect';
import { ROUTES } from 'shared/config/routes';
import { useAuthStore } from 'shared/store/auth';

type ConfirmationState = 'loading' | 'confirmed' | 'error';

export const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<ConfirmationState>('loading');
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [telegramError, setTelegramError] = useState<string>('');
  const { mutate: confirmEmail } = useEmailConfirmation();
  const { login } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setState('error');
      setErrorMessage('Invalid confirmation link. Missing token.');
      return;
    }

    // Call email confirmation API
    confirmEmail(
      { token },
      {
        onSuccess: response => {
          console.log('✅ Email confirmed, received email:', response.email);
          setState('confirmed');
          setEmail(response.email);
        },
        onError: error => {
          console.error('❌ Email confirmation failed:', error);
          setState('error');

          // Extract error message
          if (error instanceof Error) {
            setErrorMessage(error.message);
          } else {
            setErrorMessage('Failed to confirm email. Please try again or contact support.');
          }
        },
      }
    );
  }, [searchParams, confirmEmail]);

  if (state === 'loading') {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark dark:to-primary-600/20" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-8 text-center">
            <FaSpinner className="h-16 w-16 text-primary-600 dark:text-primary-400 mx-auto animate-spin mb-6" />
            <h1 className="text-2xl font-bold text-content dark:text-content-dark mb-4">Confirming your email...</h1>
            <p className="text-content-secondary dark:text-content-secondary-dark">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'confirmed' && email) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark dark:to-primary-600/20" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="relative z-10">
          <div className="w-full max-w-md space-y-6 md:space-y-8">
            <div className="bg-surface dark:bg-surface-dark rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-outline dark:border-outline-dark p-6 md:p-8 text-center">
              {/* Success Icon */}
              <div className="mb-6">
                <FaCheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-500 mx-auto" />
              </div>

              {/* Header */}
              <h1 className="text-2xl md:text-3xl font-bold text-content dark:text-content-dark mb-4">
                Email Confirmed!
              </h1>

              <p className="text-content-secondary dark:text-content-secondary-dark mb-6 text-sm md:text-base">
                Great! Your email has been successfully confirmed.
              </p>

              {/* Explanatory text */}
              <div className="bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-xl p-4 mb-6">
                <p className="text-sm text-content-secondary dark:text-content-secondary-dark font-medium">
                  Connect your Telegram account to complete registration
                </p>
                <p className="text-xs text-content-muted dark:text-content-muted-dark mt-2">
                  Your username will be automatically set from your Telegram profile
                </p>
              </div>

              {/* Telegram Connect Component */}
              <TelegramConnect
                email={email}
                onSuccess={response => {
                  console.log('✅ Telegram linked successfully, logging in user');
                  // Transform API user to app user format
                  const appUser = {
                    username: response.user.username,
                    name: response.user.firstName || response.user.username,
                    email: response.user.email,
                    avatar:
                      response.user.profilePictureUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(response.user.username)}&background=6366f1&color=fff`,
                    subscription:
                      (response.user.tierName?.toLowerCase() as 'free' | 'premium' | 'enterprise') || 'free',
                  };
                  // Update auth state with user data
                  login(appUser);
                  // Redirect to profile
                  navigate(ROUTES.PROFILE);
                }}
                onError={error => {
                  console.error('❌ Telegram linking error:', error);
                  setTelegramError(error);
                }}
              />

              {/* Error message for Telegram linking */}
              {telegramError && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{telegramError}</p>
                  <button
                    onClick={() => setTelegramError('')}
                    className="mt-2 text-xs text-red-700 dark:text-red-300 underline hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Additional Info */}
              <p className="mt-6 text-xs md:text-sm text-content-muted dark:text-content-muted-dark">
                After connecting Telegram, you'll be automatically logged in and ready to start planning your trips!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-8 text-center">
          {/* Error Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <FaExclamationTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-content dark:text-content-dark mb-4">Confirmation Failed</h1>

          {/* Error Message */}
          <p className="text-content-secondary dark:text-content-secondary-dark mb-6 leading-relaxed">{errorMessage}</p>

          {/* Instructions */}
          <div className="bg-surface-accent dark:bg-surface-accent-dark rounded-lg p-4 mb-6">
            <p className="text-sm text-content-secondary dark:text-content-secondary-dark">
              Please try clicking the confirmation link in your email again, or contact support if the problem persists.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to={ROUTES.LOGIN}
              className="inline-block w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Go to Login
            </Link>
            <Link
              to={ROUTES.SIGNUP}
              className="inline-block w-full py-3 px-4 border border-outline dark:border-outline-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark text-content dark:text-content-dark rounded-lg font-medium transition-colors"
            >
              Back to Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
