import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_MESSAGES, OAuthButtons, useRegisterMutation } from 'features/auth';
import { ROUTES } from 'shared/config/routes';

interface SignupFormData {
  email: string;
  password: string;
  hasDataStorageConsent: boolean;
}

export const Signup = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      hasDataStorageConsent: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    if (!data.hasDataStorageConsent) return;

    try {
      await registerMutation.mutateAsync({
        email: data.email,
        password: data.password,
        hasDataStorageConsent: data.hasDataStorageConsent,
      });

      // Перенаправляем на страницу с сообщением об email
      navigate(ROUTES.EMAIL_SENT);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Hero-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-content dark:text-content-dark mb-2">
            Create your account
          </h2>
          <p className="text-content-secondary dark:text-content-secondary-dark">
            Start planning your perfect trips today
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-6">
          {/* OAuth Buttons */}
          <OAuthButtons />

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline dark:border-outline-dark"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface dark:bg-surface-dark text-content-muted font-medium">
                {AUTH_MESSAGES.ui.orContinueEmail}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {registerMutation.error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-600 dark:text-red-400">{registerMutation.error.message}</p>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-content dark:text-content-dark mb-2">
                Email address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-muted h-4 w-4" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-outline dark:border-outline-dark rounded-lg bg-surface dark:bg-surface-dark text-content dark:text-content-dark placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-content dark:text-content-dark mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-muted h-4 w-4" />
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-3 border border-outline dark:border-outline-dark rounded-lg bg-surface dark:bg-surface-dark text-content dark:text-content-dark placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-content-muted hover:text-content dark:hover:text-content-dark"
                >
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                {...register('hasDataStorageConsent', {
                  required: 'You must agree to continue',
                })}
                type="checkbox"
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-outline dark:border-outline-dark rounded"
              />
              <label className="text-sm text-content-secondary dark:text-content-secondary-dark">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.hasDataStorageConsent && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.hasDataStorageConsent.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {registerMutation.isPending ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-content-secondary dark:text-content-secondary-dark text-sm">
              {AUTH_MESSAGES.ui.alreadyHaveAccount}{' '}
              <Link
                to={ROUTES.LOGIN}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold"
              >
                {AUTH_MESSAGES.ui.signIn}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
