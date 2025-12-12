import React, { useEffect, useState } from 'react';
import { ArrowRight, Mail, Eye, EyeOff, Lock } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { type LoginError, useLoginMutation } from 'entities/auth';
import { type LinkTelegramResponse } from 'shared/api/types';
import { ROUTES } from 'shared/config/routes';
import { authStorage, getEmailFromUrlParams, getUsernameFromToken } from 'shared/lib';
import { useAuthStore } from 'shared/store/auth';
import { handleGoogleSignUp } from '../lib/oauth';
import { TelegramConnect } from './TelegramConnect';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
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

  // Pre-fill email from URL parameters
  useEffect(() => {
    const emailParam = getEmailFromUrlParams(searchParams);
    if (emailParam) {
      setFormData(prev => ({ ...prev, usernameOrEmail: emailParam }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      },
      {
        onSuccess: async response => {
          // Store tokens using authStorage for consistency
          if (response.token && response.refreshToken) {
            authStorage.setTokens({
              authToken: response.token,
              refreshToken: response.refreshToken,
            });
          }

          // Get username from JWT token
          const username = response.token ? getUsernameFromToken(response.token) || 'user' : 'user';
          const isEmail = formData.usernameOrEmail.includes('@');

          login({
            username,
            name: username.charAt(0).toUpperCase() + username.slice(1),
            email: isEmail ? formData.usernameOrEmail : `${formData.usernameOrEmail}@example.com`,
            avatar: `https://ui-avatars.com/api/?name=${username}&background=6366f1&color=fff`,
            subscription: 'free',
          });

          // Redirect after successful login
          const from = location.state?.from?.pathname || ROUTES.PROFILE;
          navigate(from, { replace: true });
        },
        onError: (error: LoginError) => {
          console.error('Login failed:', error);

          // Handle TELEGRAM_REQUIRED error
          if (error.isTelegramRequired && error.email) {
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
    <div className="relative min-h-[100dvh] flex items-center justify-center p-6 md:p-8 transition-colors duration-300">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-surface dark:bg-surface-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-accent/20 dark:to-surface-accent-dark/10" />

      <div className="relative z-10 w-full max-w-sm mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-content dark:text-content-dark">Welcome back</h1>
          <p className="text-sm text-content-secondary dark:text-content-secondary-dark">
            Sign in to your account to continue your travel journey
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface dark:bg-surface-dark rounded-2xl border border-outline dark:border-outline-dark p-8 shadow-sm">
          {/* OAuth Button */}
          <div className="mb-8">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 min-h-[48px] border border-outline dark:border-outline-dark rounded-xl text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark transition-all duration-200 font-medium text-base"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
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
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline dark:border-outline-dark"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface dark:bg-surface-dark text-content-muted font-medium">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="usernameOrEmail"
                className="block text-sm font-medium text-content dark:text-content-dark mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-muted h-4 w-4" />
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  required
                  value={formData.usernameOrEmail}
                  onChange={e => setFormData(prev => ({ ...prev, usernameOrEmail: e.target.value }))}
                  className="w-full pl-10 pr-4 py-4 min-h-[44px] border border-outline dark:border-outline-dark rounded-xl bg-surface dark:bg-surface-dark text-content dark:text-content-dark placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-base"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-content dark:text-content-dark mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-muted h-4 w-4" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  required
                  value={formData.password}
                  onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-4 min-h-[44px] border border-outline dark:border-outline-dark rounded-xl bg-surface dark:bg-surface-dark text-content dark:text-content-dark placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-content-muted hover:text-content dark:hover:text-content-dark transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 min-h-[20px] min-w-[20px] text-primary-600 focus:ring-2 focus:ring-primary-500/20 border-outline dark:border-outline-dark rounded transition-all duration-200"
                />
                <label htmlFor="remember-me" className="text-sm text-content dark:text-content-dark">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium min-h-[44px] inline-flex items-center py-2"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="group relative w-full py-4 px-4 min-h-[48px] bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-base"
            >
              {loginMutation.isPending ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-content-secondary dark:text-content-secondary-dark text-sm">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold underline min-h-[44px] inline-flex items-center py-2"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Telegram Widget Section */}
          {showTelegramWidget && userEmail && (
            <div className="mt-6 pt-6 border-t border-outline dark:border-outline-dark">
              <div className="bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-xl p-4 mb-4">
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
                  // Store tokens
                  if (response.token && response.refreshToken) {
                    authStorage.setTokens({
                      authToken: response.token,
                      refreshToken: response.refreshToken,
                    });
                  }
                  // Transform API response to app user format
                  // Use username from API response (backend should always return it)
                  const username = response.username;

                  if (!username) {
                    console.error('❌ Username not returned from activation API');
                    setTelegramError('Username not received from server. Please try again.');
                    return;
                  }

                  const appUser = {
                    username: username,
                    name: username,
                    email: response.email,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6366f1&color=fff`,
                    subscription: 'free' as const,
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
                <div className="mt-4 p-3 bg-surface-accent dark:bg-surface-accent-dark rounded-xl border border-outline dark:border-outline-dark transition-all duration-200 animate-in slide-in-from-top-2">
                  <p className="text-sm text-red-600 dark:text-red-400">{telegramError}</p>
                  <button
                    onClick={() => {
                      setTelegramError('');
                      setShowTelegramWidget(false);
                    }}
                    className="mt-2 text-xs text-red-700 dark:text-red-300 underline hover:no-underline transition-colors duration-200"
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
  );
};
