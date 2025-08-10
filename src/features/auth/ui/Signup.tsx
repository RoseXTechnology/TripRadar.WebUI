import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from 'features/auth';
import { AUTH_MESSAGES } from 'features/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaGoogle,
  FaMicrosoft,
  FaGithub,
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowRight,
  FaPlane,
  FaShieldAlt,
  FaCheck,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { cn } from 'shared/lib/utils';
import { FormInput } from 'shared/ui';

import { handleGoogleSignUp, handleGithubSignUp, handleMicrosoftSignUp } from '../lib/oauth';

export const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    if (!agreedToTerms) return;

    setIsLoading(true);
    console.log('Form data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const isFormValid = isValid && agreedToTerms;

  const oauthButtonStyles = cn(
    'w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
    'border border-gray-300 dark:border-gray-600',
    'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800',
    'hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 group mb-8">
            <div className="p-2 bg-primary-500 rounded-lg group-hover:bg-primary-600 transition-colors">
              <FaPlane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">TripRadar</span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{AUTH_MESSAGES.ui.createAccount}</h2>
          <p className="text-gray-600 dark:text-gray-400">{AUTH_MESSAGES.ui.subtitle}</p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button onClick={handleGoogleSignUp} className={oauthButtonStyles}>
              <FaGoogle className="h-5 w-5" />
              <span>{AUTH_MESSAGES.ui.continueWith} Google</span>
            </button>

            <button onClick={handleGithubSignUp} className={oauthButtonStyles}>
              <FaGithub className="h-5 w-5" />
              <span>{AUTH_MESSAGES.ui.continueWith} GitHub</span>
            </button>

            <button onClick={handleMicrosoftSignUp} className={oauthButtonStyles}>
              <FaMicrosoft className="h-5 w-5" />
              <span>{AUTH_MESSAGES.ui.continueWith} Microsoft</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                {AUTH_MESSAGES.ui.orContinueEmail}
              </span>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              {...register('name')}
              id="name"
              type="text"
              label={AUTH_MESSAGES.ui.fullName}
              placeholder={AUTH_MESSAGES.placeholders.enterFullName}
              icon={<FaUser className="h-5 w-5 text-gray-400" />}
              autoComplete="name"
              error={errors.name?.message}
              required
            />

            <FormInput
              {...register('email')}
              id="email"
              type="email"
              label={AUTH_MESSAGES.ui.emailAddress}
              placeholder={AUTH_MESSAGES.placeholders.enterEmail}
              icon={<FaEnvelope className="h-5 w-5 text-gray-400" />}
              autoComplete="email"
              error={errors.email?.message}
              required
            />

            <FormInput
              {...register('password')}
              id="password"
              type="password"
              label={AUTH_MESSAGES.ui.password}
              placeholder={AUTH_MESSAGES.placeholders.createPassword}
              icon={<FaLock className="h-5 w-5 text-gray-400" />}
              autoComplete="new-password"
              error={errors.password?.message}
              required
            />

            <FormInput
              {...register('confirmPassword')}
              id="confirmPassword"
              type="password"
              label={AUTH_MESSAGES.ui.confirmPassword}
              placeholder={AUTH_MESSAGES.placeholders.confirmPassword}
              icon={<FaLock className="h-5 w-5 text-gray-400" />}
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              required
            />

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                {AUTH_MESSAGES.ui.agreeToTerms}{' '}
                <Link
                  to="/terms"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  {AUTH_MESSAGES.ui.termsOfService}
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  {AUTH_MESSAGES.ui.privacyPolicy}
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={cn(
                'group relative w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200',
                'border border-transparent text-white bg-primary-600 hover:bg-primary-700',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                'shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>{AUTH_MESSAGES.ui.creatingAccount}</span>
                </>
              ) : (
                <>
                  <span>{AUTH_MESSAGES.ui.createAccountBtn}</span>
                  <FaArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {AUTH_MESSAGES.ui.alreadyHaveAccount}{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold"
              >
                {AUTH_MESSAGES.ui.signIn}
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="h-4 w-4" />
              <span>{AUTH_MESSAGES.ui.securePrivate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheck className="h-4 w-4" />
              <span>{AUTH_MESSAGES.ui.freeToStart}</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400 dark:text-gray-500">
            <Link to="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              {AUTH_MESSAGES.ui.privacyPolicy}
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              {AUTH_MESSAGES.ui.termsOfService}
            </Link>
            <span>•</span>
            <Link to="/support" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              {AUTH_MESSAGES.ui.support}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
