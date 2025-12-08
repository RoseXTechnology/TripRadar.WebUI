import React, { useState } from 'react';
import { FaArrowRight, FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { type LoginError, useLoginMutation } from 'features/auth/api/useLogin';
import { handleGoogleSignUp } from 'features/auth/lib/oauth';
import { TelegramConnect } from 'features/auth/ui/TelegramConnect';
import type { LinkTelegramResponse } from 'shared/api/types';
import { ROUTES } from 'shared/config/routes';
import { authStorage } from 'shared/lib';
import { useAuthStore } from 'shared/store/auth';

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '', // Backend accepts both email and username in this field
    password: '',
  });
  const [showTelegramWidget, setShowTelegramWidget] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [telegramError, setTelegramError] = useState<string>('');
  const login = useAuthStore(state => state.login);
  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      },
      {
        onSuccess: response => {
          // Store tokens using authStorage for consistency
          if (response.token && response.refreshToken) {
            authStorage.setTokens({
              authToken: response.token,
              refreshToken: response.refreshToken,
            });
          }

          // Update auth store
          const isEmail = formData.usernameOrEmail.includes('@');
          const username = isEmail ? formData.usernameOrEmail.split('@')[0] : formData.usernameOrEmail;
          login({
            username,
            name: username.charAt(0).toUpperCase() + username.slice(1),
            email: isEmail ? formData.usernameOrEmail : `${formData.usernameOrEmail}@example.com`,
            avatar: `https://ui-avatars.com/api/?name=${username}&background=6366f1&color=fff`,
            subscription: 'free',
          });
        },
        onError: (error: LoginError) => {
          console.error('Login failed:', error);

          // Handle TELEGRAM_REQUIRED error
          if (error.isTelegramRequired && error.email) {
            console.log('🔗 Telegram linking required for:', error.email);
            setUserEmail(error.email);
            setShowTelegramWidget(true);
            return;
          }

          // Handle EmailNotConfirmed error
          if (error?.message?.includes('EmailNotConfirmed')) {
            alert(
              'Please confirm your email before logging in.\n\n' +
                'Check your inbox for the confirmation link. If you did not receive the email, please contact support.'
            );
          } else {
            alert('Login failed. Please check your credentials and try again.');
          }
        },
      }
    );
  };

  const handleGoogleSignIn = () => handleGoogleSignUp();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Hero-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10">
        <div className="w-full space-y-6 md:space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 group mb-8"></Link>

            <h2 className="text-2xl md:text-3xl font-bold text-content dark:text-content-dark mb-2">Welcome back</h2>
            <p className="text-content-secondary dark:text-content-secondary-dark">
              Sign in to your account to continue your travel journey
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-surface dark:bg-surface-dark rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-outline dark:border-outline-dark p-6 md:p-8">
            {/* OAuth Button */}
            <div className="mb-4 md:mb-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 border border-outline dark:border-outline-dark rounded-lg md:rounded-xl text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark transition-all duration-200 font-medium text-sm md:text-base"
              >
                <FaGoogle className="h-4 w-4 md:h-5 md:w-5" />
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-4 md:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline dark:border-outline-dark"></div>
              </div>
              <div className="relative flex justify-center text-xs md:text-sm">
                <span className="px-3 md:px-4 bg-surface dark:bg-surface-dark text-content-muted font-medium">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="usernameOrEmail"
                  className="block text-xs md:text-sm font-medium text-content dark:text-content-dark mb-1.5 md:mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 md:h-5 md:w-5 text-content-muted" />
                  </div>
                  <input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.usernameOrEmail}
                    onChange={e => setFormData(prev => ({ ...prev, usernameOrEmail: e.target.value }))}
                    className="block w-full pl-8 md:pl-10 pr-3 py-2.5 md:py-3 border border-outline dark:border-outline-dark rounded-lg md:rounded-xl placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-surface dark:bg-surface-dark text-content dark:text-content-dark text-sm md:text-base"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs md:text-sm font-medium text-content dark:text-content-dark mb-1.5 md:mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-4 w-4 md:h-5 md:w-5 text-content-muted" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="block w-full pl-8 md:pl-10 pr-8 md:pr-10 py-2.5 md:py-3 border border-outline dark:border-outline-dark rounded-lg md:rounded-xl placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-surface dark:bg-surface-dark text-content dark:text-content-dark text-sm md:text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-4 w-4 md:h-5 md:w-5 text-content-muted hover:text-content dark:hover:text-content-dark" />
                    ) : (
                      <FaEye className="h-4 w-4 md:h-5 md:w-5 text-content-muted hover:text-content dark:hover:text-content-dark" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3 w-3 md:h-4 md:w-4 text-primary-600 focus:ring-primary-500 border-outline dark:border-outline-dark rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-xs md:text-sm text-content dark:text-content-dark"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-xs md:text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="group relative w-full flex justify-center items-center gap-2 py-2.5 md:py-3 px-4 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark rounded-lg md:rounded-xl font-medium hover:bg-button-hover dark:hover:bg-button-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                {loginMutation.isPending ? (
                  <>
                    <div className="animate-spin h-4 w-4 md:h-5 md:w-5 border-2 border-surface dark:border-content border-t-transparent rounded-full"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <FaArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-4 md:mt-6 text-center">
              <p className="text-content-secondary dark:text-content-secondary-dark text-sm md:text-base">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold"
                >
                  Create account
                </Link>
              </p>
            </div>

            {/* Telegram Widget Section */}
            {showTelegramWidget && userEmail && (
              <div className="mt-6 pt-6 border-t border-outline dark:border-outline-dark">
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-content dark:text-content-dark font-medium mb-2">
                    Complete Your Registration
                  </p>
                  <p className="text-xs text-content-secondary dark:text-content-secondary-dark">
                    Please connect your Telegram account to complete your registration and log in.
                  </p>
                </div>

                <TelegramConnect
                  email={userEmail}
                  onSuccess={(response: LinkTelegramResponse) => {
                    console.log('✅ Telegram linked successfully, logging in user');
                    // Store tokens
                    if (response.accessToken && response.refreshToken) {
                      authStorage.setTokens({
                        authToken: response.accessToken,
                        refreshToken: response.refreshToken,
                      });
                    }
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
                    // Update auth state
                    login(appUser);
                    // Redirect to profile
                    navigate(ROUTES.PROFILE);
                  }}
                  onError={(error: string) => {
                    console.error('❌ Telegram linking error:', error);
                    setTelegramError(error);
                  }}
                />

                {/* Error message for Telegram linking */}
                {telegramError && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{telegramError}</p>
                    <button
                      onClick={() => {
                        setTelegramError('');
                        setShowTelegramWidget(false);
                      }}
                      className="mt-2 text-xs text-red-700 dark:text-red-300 underline hover:no-underline"
                    >
                      Try logging in again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
