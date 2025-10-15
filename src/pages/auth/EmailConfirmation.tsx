import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useConfirmEmailMutation } from 'features/auth';
import { ROUTES } from 'shared/config/routes';

export const EmailConfirmation = () => {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const confirmEmailMutation = useConfirmEmailMutation();

  useEffect(() => {
    if (username && token) {
      confirmEmailMutation.mutate({ username, token });
    }
  }, [username, token]);

  const renderContent = () => {
    if (confirmEmailMutation.isPending) {
      return (
        <>
          <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
            <FaSpinner className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-content dark:text-content-dark mb-4">Confirming your email...</h1>
          <p className="text-content-secondary dark:text-content-secondary-dark">
            Please wait while we verify your email address.
          </p>
        </>
      );
    }

    if (confirmEmailMutation.isSuccess) {
      return (
        <>
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <FaCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-content dark:text-content-dark mb-4">Email confirmed!</h1>
          <p className="text-content-secondary dark:text-content-secondary-dark mb-6">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          <Link
            to={ROUTES.LOGIN}
            className="inline-block w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Continue to Login
          </Link>
        </>
      );
    }

    if (confirmEmailMutation.isError) {
      return (
        <>
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <FaExclamationTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-content dark:text-content-dark mb-4">Confirmation failed</h1>
          <p className="text-content-secondary dark:text-content-secondary-dark mb-6">
            {confirmEmailMutation.error?.message || 'The confirmation link is invalid or has expired.'}
          </p>
          <div className="space-y-3">
            <Link
              to={ROUTES.LOGIN}
              className="inline-block w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Try to Login
            </Link>
            <p className="text-sm text-content-muted">Need help? Contact support or try registering again.</p>
          </div>
        </>
      );
    }

    // Invalid URL (no username or token)
    return (
      <>
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <FaExclamationTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-content dark:text-content-dark mb-4">Invalid confirmation link</h1>
        <p className="text-content-secondary dark:text-content-secondary-dark mb-6">
          This confirmation link is not valid. Please check your email for the correct link.
        </p>
        <Link
          to={ROUTES.LOGIN}
          className="inline-block w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          Back to Login
        </Link>
      </>
    );
  };

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center p-4 md:p-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-8 text-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
