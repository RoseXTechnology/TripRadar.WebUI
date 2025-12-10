import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { useForgotPasswordMutation } from 'entities/auth';

export const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const forgotPasswordMutation = useForgotPasswordMutation();

  // Pre-fill email from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },
        onError: error => {
          console.error('Forgot password failed:', error);
          alert('Failed to send reset email. Please try again.');
        },
      }
    );
  };

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>

            <h2 className="text-xl font-bold text-content dark:text-content-dark mb-2">Check your email</h2>

            <p className="text-content-secondary dark:text-content-secondary-dark mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>

            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              <FaArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-content dark:text-content-dark mb-2">
            Forgot your password?
          </h2>
          <p className="text-content-secondary dark:text-content-secondary-dark">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-content dark:text-content-dark mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-content-muted" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-outline dark:border-outline-dark rounded-xl placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-surface dark:bg-surface-dark text-content dark:text-content-dark"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-surface bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {forgotPasswordMutation.isPending ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              <FaArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
