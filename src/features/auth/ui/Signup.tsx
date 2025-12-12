import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from 'entities/auth';
import { ROUTES } from 'shared/config/routes';
import { parseBackendError, type ErrorConfig } from '../lib/errorMessages';
import { validatePassword } from '../lib/validation';
import { AUTH_MESSAGES } from '../model/constants';
import { ErrorAlert } from './ErrorAlert';
import { OAuthButtons } from './OAuthButtons';

interface SignupFormData {
  email: string;
  password: string;
  hasDataStorageConsent: boolean;
}

export const Signup = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [errorConfig, setErrorConfig] = useState<ErrorConfig | null>(null);

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

  const onSubmit = (data: SignupFormData) => {
    if (!data.hasDataStorageConsent) return;

    // Clear previous errors
    setErrorConfig(null);

    registerMutation.mutate(
      {
        email: data.email,
        password: data.password,
        hasDataStorageConsent: data.hasDataStorageConsent,
      },
      {
        onSuccess: () => {
          // Store email in sessionStorage for later use in EmailConfirmed page
          sessionStorage.setItem('registration_email', data.email);

          // Перенаправляем на страницу с сообщением об email
          navigate(ROUTES.EMAIL_SENT);
        },
        onError: (error: unknown) => {
          console.error('Registration failed:', error);

          // Parse backend error and set error config
          const backendError = error as {
            response?: {
              data?: {
                code?: string;
                [key: string]: unknown;
              };
            };
            code?: string;
            message?: string;
          };

          const errorWithEmail = {
            ...backendError,
            response: {
              ...backendError?.response,
              data: {
                ...backendError?.response?.data,
                email: data.email, // Pass email for pre-fill in actions
              },
            },
          };

          const parsedError = parseBackendError(errorWithEmail);
          setErrorConfig(parsedError);
        },
      }
    );
  };

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center p-6 md:p-8 transition-colors duration-300">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-surface dark:bg-surface-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-accent/20 dark:to-surface-accent-dark/10" />

      <div className="relative z-10 w-full max-w-sm mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-content dark:text-content-dark">Create your account</h1>
          <p className="text-sm text-content-secondary dark:text-content-secondary-dark">{AUTH_MESSAGES.ui.subtitle}</p>
        </div>

        {/* Main Card */}
        <main className="bg-surface dark:bg-surface-dark rounded-2xl border border-outline dark:border-outline-dark p-8 shadow-sm">
          {/* OAuth Buttons */}
          <section aria-labelledby="oauth-heading">
            <h2 id="oauth-heading" className="sr-only">
              Social sign up options
            </h2>
            <OAuthButtons />
          </section>

          {/* Divider */}
          <div className="relative mb-6" role="separator" aria-label="Or continue with email">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline dark:border-outline-dark"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-surface dark:bg-surface-dark text-content-muted font-medium">
                {AUTH_MESSAGES.ui.orContinueEmail}
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {errorConfig && (
            <div className="mb-6 transition-all duration-200 animate-in slide-in-from-top-2">
              <ErrorAlert
                title={errorConfig.title}
                message={errorConfig.message}
                severity={errorConfig.severity}
                actions={errorConfig.actions}
                onDismiss={() => setErrorConfig(null)}
              />
            </div>
          )}

          {/* Sign Up Form */}
          <section aria-labelledby="signup-form-heading">
            <h2 id="signup-form-heading" className="sr-only">
              Email sign up form
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
              aria-describedby="form-description"
            >
              <div id="form-description" className="sr-only">
                Complete the form below to create your TripRadar account. All fields are required.
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email-input"
                  className="block text-sm font-medium text-content dark:text-content-dark mb-0.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-muted h-4 w-4"
                    aria-hidden="true"
                  />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    id="email-input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full pl-10 pr-4 py-4 min-h-[44px] border border-outline dark:border-outline-dark rounded-xl bg-surface dark:bg-surface-dark text-content dark:text-content-dark placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-content/10 focus:border-content dark:focus:border-content-dark transition-all duration-200 text-base"
                    placeholder="Enter your email"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400 transition-all duration-200 animate-in slide-in-from-top-1"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  <label
                    htmlFor="password-input"
                    className="block text-sm font-medium text-content dark:text-content-dark"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => setShowPasswordHint(true)}
                      onMouseLeave={() => setShowPasswordHint(false)}
                      onFocus={() => setShowPasswordHint(true)}
                      onBlur={() => setShowPasswordHint(false)}
                      className="text-content-muted hover:text-content dark:hover:text-content-dark transition-colors duration-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-content/10"
                      aria-label="Password requirements"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                    {showPasswordHint && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 z-50">
                        <div className="bg-content dark:bg-content-dark text-white dark:text-content px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg">
                          <div className="space-y-1">
                            {AUTH_MESSAGES.passwordHints.requirements.map((requirement, index) => (
                              <div key={index}>• {requirement}</div>
                            ))}
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-content dark:border-t-content-dark"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-muted h-4 w-4"
                    aria-hidden="true"
                  />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      validate: value => {
                        const result = validatePassword(value);
                        if (!result.isValid) {
                          return result.errors.join('. ');
                        }
                        return true;
                      },
                    })}
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full pl-10 pr-12 py-4 min-h-[44px] border border-outline dark:border-outline-dark rounded-xl bg-surface dark:bg-surface-dark text-content dark:text-content-dark placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-content/10 focus:border-content dark:focus:border-content-dark transition-all duration-200 text-base"
                    placeholder="Create a password"
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-content-muted hover:text-content dark:hover:text-content-dark transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-content/10"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={0}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    className="mt-2 text-sm text-red-600 dark:text-red-400 transition-all duration-200 animate-in slide-in-from-top-1"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Consent */}
              <div className="flex items-center gap-3">
                <input
                  {...register('hasDataStorageConsent', {
                    required: 'You must agree to continue',
                  })}
                  id="consent-checkbox"
                  type="checkbox"
                  className="h-5 w-5 min-h-[20px] min-w-[20px] text-content dark:text-content-dark focus:ring-2 focus:ring-content/10 border-outline dark:border-outline-dark rounded transition-all duration-200"
                  aria-describedby={errors.hasDataStorageConsent ? 'consent-error' : 'consent-description'}
                  aria-invalid={errors.hasDataStorageConsent ? 'true' : 'false'}
                />
                <label
                  htmlFor="consent-checkbox"
                  className="text-xs text-content-secondary dark:text-content-secondary-dark leading-relaxed"
                  id="consent-description"
                >
                  {AUTH_MESSAGES.ui.agreeToTerms}{' '}
                  <Link
                    to="/terms"
                    className="text-content dark:text-content-dark underline hover:no-underline underline-offset-2 min-h-[44px] inline-flex items-center py-1 focus:outline-none focus:ring-2 focus:ring-content/10 rounded px-1"
                  >
                    {AUTH_MESSAGES.ui.termsOfService}
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy"
                    className="text-content dark:text-content-dark underline hover:no-underline underline-offset-2 min-h-[44px] inline-flex items-center py-1 focus:outline-none focus:ring-2 focus:ring-content/10 rounded px-1"
                  >
                    {AUTH_MESSAGES.ui.privacyPolicy}
                  </Link>
                </label>
              </div>
              {errors.hasDataStorageConsent && (
                <p
                  id="consent-error"
                  className="mt-2 text-sm text-red-600 dark:text-red-400 transition-all duration-200 animate-in slide-in-from-top-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.hasDataStorageConsent.message}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full py-4 px-4 min-h-[48px] bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark disabled:bg-content/50 dark:disabled:bg-content-dark/50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-base"
                aria-describedby={registerMutation.isPending ? 'submit-loading-status' : undefined}
              >
                {registerMutation.isPending ? (
                  <>
                    <div
                      className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                      aria-hidden="true"
                    />
                    <span id="submit-loading-status">{AUTH_MESSAGES.ui.creatingAccount}</span>
                  </>
                ) : (
                  AUTH_MESSAGES.ui.createAccountBtn
                )}
              </button>
            </form>
          </section>

          {/* Sign In Link */}
          <footer className="mt-2 text-center">
            <p className="text-content-secondary dark:text-content-secondary-dark text-sm">
              {AUTH_MESSAGES.ui.alreadyHaveAccount}{' '}
              <Link
                to={ROUTES.LOGIN}
                className="text-content dark:text-content-dark font-semibold underline hover:no-underline underline-offset-2 min-h-[44px] inline-flex items-center py-2 focus:outline-none focus:ring-2 focus:ring-content/10 rounded px-1"
              >
                {AUTH_MESSAGES.ui.signIn}
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};
