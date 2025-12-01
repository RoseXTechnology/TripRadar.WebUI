import { useEffect, useState } from 'react';
import { FaArrowRight, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { apiClient } from 'shared/api';
import { ROUTES } from 'shared/config/routes';

type ConfirmationState = 'loading' | 'success' | 'error';

export const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<ConfirmationState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const confirmEmail = async () => {
      const username = searchParams.get('username');
      const token = searchParams.get('token');

      if (!username || !token) {
        setState('error');
        setErrorMessage('Invalid confirmation link. Missing username or token.');
        return;
      }

      try {
        // Call the email confirmation endpoint
        // GET /api/v1/users/{username}/email-confirmations?token={token}
        await apiClient.get(`/api/v1/users/${username}/email-confirmations?token=${token}`);

        // If successful (302 redirect is handled by fetch), show success
        setState('success');
      } catch (error) {
        console.error('Email confirmation error:', error);
        setState('error');

        // Extract error message
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Failed to confirm email. Please try again or contact support.');
        }
      }
    };

    confirmEmail();
  }, [searchParams]);

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

  if (state === 'success') {
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

              <p className="text-content-secondary dark:text-content-secondary-dark mb-8 text-sm md:text-base">
                Great! Your email has been successfully confirmed. You can now sign in to your TripRadar account and
                start planning your next adventure.
              </p>

              {/* Go to Login Button */}
              <Link
                to={ROUTES.LOGIN}
                className="group relative w-full flex justify-center items-center gap-2 py-2.5 md:py-3 px-4 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark rounded-lg md:rounded-xl font-medium hover:bg-button-hover dark:hover:bg-button-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                <span>Go to Login</span>
                <FaArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Additional Info */}
              <p className="mt-6 text-xs md:text-sm text-content-muted dark:text-content-muted-dark">
                Ready to explore the world with TripRadar? Sign in and discover amazing travel destinations.
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
