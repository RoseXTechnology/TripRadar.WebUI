import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export const EmailSent = () => {
  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center p-4 md:p-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
            <FaEnvelope className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-content dark:text-content-dark mb-4">Check your email</h1>

          {/* Message */}
          <p className="text-content-secondary dark:text-content-secondary-dark mb-6 leading-relaxed">
            We've sent you a confirmation link. Please check your email and click the link to verify your account.
          </p>

          {/* Instructions */}
          <div className="bg-surface-accent dark:bg-surface-accent-dark rounded-lg p-4 mb-6">
            <p className="text-sm text-content-secondary dark:text-content-secondary-dark">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>

          {/* Back to log in */}
          <Link
            to={ROUTES.LOGIN}
            className="inline-block w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
