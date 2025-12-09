# Code Examples

This document provides code examples for implementing the registration improvements.

## Table of Contents

1. [Password Validation](#password-validation)
2. [Error Handling](#error-handling)
3. [ErrorAlert Component](#erroralert-component)
4. [Updated Signup Form](#updated-signup-form)
5. [Analytics Integration](#analytics-integration)
6. [Accessibility](#accessibility)

---

## Password Validation

### validation.ts

```typescript
// src/features/auth/lib/validation.ts

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasDigit: boolean;
  hasSpecialChar: boolean;
}

const PASSWORD_MIN_LENGTH = 9;
const UPPERCASE_REGEX = /[A-Z]/;
const DIGIT_REGEX = /\d/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/;

/**
 * Validate password against all requirements
 * Returns validation result with list of errors
 */
export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
  }

  if (!UPPERCASE_REGEX.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!DIGIT_REGEX.test(password)) {
    errors.push('Password must contain at least one digit');
  }

  if (!SPECIAL_CHAR_REGEX.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check individual password requirements
 * Useful for showing requirement checklist in UI
 */
export const checkPasswordRequirements = (password: string): PasswordRequirements => {
  return {
    minLength: password.length >= PASSWORD_MIN_LENGTH,
    hasUppercase: UPPERCASE_REGEX.test(password),
    hasDigit: DIGIT_REGEX.test(password),
    hasSpecialChar: SPECIAL_CHAR_REGEX.test(password),
  };
};

/**
 * Get user-friendly password requirements text
 */
export const getPasswordRequirementsText = (): string => {
  return `Password must be at least ${PASSWORD_MIN_LENGTH} characters and include an uppercase letter, a digit, and a special character.`;
};
```

### Usage in React Hook Form

```typescript
import { validatePassword } from 'features/auth/lib/validation';

const {
  register,
  formState: { errors },
} = useForm<SignupFormData>();

<input
  {...register('password', {
    required: 'Password is required',
    validate: (value) => {
      const result = validatePassword(value);
      return result.isValid || result.errors.join(', ');
    },
  })}
  type="password"
/>
```

---

## Error Handling

### errorMessages.ts

```typescript
// src/features/auth/lib/errorMessages.ts

import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export interface ErrorAction {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

export interface ErrorConfig {
  title: string;
  message: string;
  actions?: ErrorAction[];
  severity: 'error' | 'warning' | 'info';
}

export type ErrorCode =
  | 'EMAIL_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'INVALID_EMAIL'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'TELEGRAM_REQUIRED'
  | 'EMAIL_NOT_CONFIRMED'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED';

type ErrorMessageFactory = (context?: any) => ErrorConfig;

export const ERROR_MESSAGES: Record<ErrorCode, ErrorMessageFactory> = {
  EMAIL_ALREADY_EXISTS: context => ({
    title: 'Email Already Registered',
    message: 'This email address is already associated with an account.',
    severity: 'warning',
    actions: [
      {
        label: 'Login',
        onClick: () => {
          const navigate = useNavigate();
          navigate(ROUTES.LOGIN, { state: { email: context?.email } });
        },
        variant: 'primary',
      },
      {
        label: 'Forgot Password?',
        onClick: () => {
          const navigate = useNavigate();
          navigate(ROUTES.FORGOT_PASSWORD, { state: { email: context?.email } });
        },
        variant: 'secondary',
      },
    ],
  }),

  WEAK_PASSWORD: () => ({
    title: 'Password Too Weak',
    message:
      'Your password must be at least 9 characters and include an uppercase letter, a digit, and a special character.',
    severity: 'error',
  }),

  INVALID_EMAIL: () => ({
    title: 'Invalid Email',
    message: 'Please enter a valid email address.',
    severity: 'error',
  }),

  NETWORK_ERROR: () => ({
    title: 'Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection and try again.',
    severity: 'error',
  }),

  SERVER_ERROR: () => ({
    title: 'Server Error',
    message: 'Something went wrong on our end. Please try again in a few moments.',
    severity: 'error',
  }),

  TELEGRAM_REQUIRED: () => ({
    title: 'Telegram Connection Required',
    message: 'Please connect your Telegram account to complete registration.',
    severity: 'info',
  }),

  EMAIL_NOT_CONFIRMED: () => ({
    title: 'Email Not Confirmed',
    message: 'Please check your email and click the confirmation link before logging in.',
    severity: 'warning',
  }),

  INVALID_TOKEN: () => ({
    title: 'Invalid Link',
    message: 'This confirmation link is invalid or has already been used.',
    severity: 'error',
    actions: [
      {
        label: 'Back to Signup',
        onClick: () => {
          const navigate = useNavigate();
          navigate(ROUTES.SIGNUP);
        },
        variant: 'primary',
      },
    ],
  }),

  TOKEN_EXPIRED: () => ({
    title: 'Link Expired',
    message: 'This confirmation link has expired. Please register again to receive a new link.',
    severity: 'warning',
    actions: [
      {
        label: 'Register Again',
        onClick: () => {
          const navigate = useNavigate();
          navigate(ROUTES.SIGNUP);
        },
        variant: 'primary',
      },
    ],
  }),
};

/**
 * Parse backend error and return user-friendly config
 */
export const parseBackendError = (error: any): ErrorConfig => {
  // Log error for debugging
  console.error('Backend error:', error);

  // Try to extract error code from response
  const errorCode = error?.response?.data?.code || error?.code;

  // Check if we have a mapping for this error code
  if (errorCode && ERROR_MESSAGES[errorCode as ErrorCode]) {
    return ERROR_MESSAGES[errorCode as ErrorCode](error?.response?.data);
  }

  // Check for network errors
  if (!error?.response) {
    return ERROR_MESSAGES.NETWORK_ERROR();
  }

  // Check for server errors (5xx)
  if (error?.response?.status >= 500) {
    return ERROR_MESSAGES.SERVER_ERROR();
  }

  // Fallback to generic error
  return {
    title: 'Error',
    message: error?.message || 'An unexpected error occurred. Please try again.',
    severity: 'error',
  };
};
```

---

## ErrorAlert Component

### ErrorAlert.tsx

```typescript
// src/features/auth/ui/ErrorAlert.tsx

import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export interface ErrorAlertProps {
  title: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant: 'primary' | 'secondary';
  }>;
  onDismiss?: () => void;
}

export const ErrorAlert = ({ title, message, severity, actions, onDismiss }: ErrorAlertProps) => {
  const severityConfig = {
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: FaExclamationCircle,
      iconColor: 'text-red-600 dark:text-red-400',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: FaExclamationTriangle,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: FaInfoCircle,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg border p-4 ${config.bg} ${config.border}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} aria-hidden="true" />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-content dark:text-content-dark mb-1">{title}</h3>
          <p className="text-sm text-content-secondary dark:text-content-secondary-dark">{message}</p>

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={
                    action.variant === 'primary'
                      ? 'px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors'
                      : 'px-4 py-2 border border-outline dark:border-outline-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark text-content dark:text-content-dark rounded-lg text-sm font-medium transition-colors'
                  }
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-content-muted hover:text-content dark:hover:text-content-dark flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
```

---

## Updated Signup Form

### Signup.tsx (Key Changes)

```typescript
// src/features/auth/ui/Signup.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from 'features/auth/lib/validation';
import { parseBackendError, type ErrorConfig } from 'features/auth/lib/errorMessages';
import { ErrorAlert } from 'features/auth/ui/ErrorAlert';
import { RegistrationEvents } from 'features/auth/lib/analytics';
import { useRegisterMutation } from 'features/auth/api/useRegister';

interface SignupFormData {
  email: string;
  password: string;
  hasDataStorageConsent: boolean;
}

export const Signup = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [errorConfig, setErrorConfig] = useState<ErrorConfig | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: 'onChange',
  });

  // Track page view on mount
  useEffect(() => {
    RegistrationEvents.pageViewed();
  }, []);

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Track form submission
      RegistrationEvents.formSubmitted(data.email);

      await registerMutation.mutateAsync(data);

      // Track email sent
      RegistrationEvents.emailSent();

      // Navigate to email sent page
      navigate(ROUTES.EMAIL_SENT);
    } catch (error) {
      // Parse error and set error config
      const config = parseBackendError(error);
      setErrorConfig(config);

      // Track error
      RegistrationEvents.error(error?.response?.data?.code || 'UNKNOWN', config.message);
    }
  };

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center p-4 md:p-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

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
                or continue with email
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {errorConfig && (
            <div className="mb-6">
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-content dark:text-content-dark mb-2">
                Email address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-outline dark:border-outline-dark rounded-lg bg-surface dark:bg-surface-dark text-content dark:text-content-dark"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-content dark:text-content-dark mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value) => {
                      const result = validatePassword(value);
                      return result.isValid || result.errors[0];
                    },
                  })}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-10 border border-outline dark:border-outline-dark rounded-lg bg-surface dark:bg-surface-dark text-content dark:text-content-dark"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error password-hint' : 'password-hint'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
              <p id="password-hint" className="mt-1 text-xs text-content-muted dark:text-content-muted-dark">
                9+ characters, uppercase, digit, special character
              </p>
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                {...register('hasDataStorageConsent', {
                  required: 'You must agree to continue',
                })}
                id="consent"
                type="checkbox"
                className="mt-1 h-4 w-4"
                aria-invalid={errors.hasDataStorageConsent ? 'true' : 'false'}
                aria-describedby={errors.hasDataStorageConsent ? 'consent-error' : undefined}
              />
              <label htmlFor="consent" className="text-sm text-content-secondary dark:text-content-secondary-dark">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            {errors.hasDataStorageConsent && (
              <p id="consent-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.hasDataStorageConsent.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg font-medium transition-colors"
              aria-busy={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
```

---

## Analytics Integration

### ga4.ts

```typescript
// src/shared/lib/analytics/ga4.ts

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Initialize Google Analytics 4
 */
export const initializeGA4 = (measurementId: string) => {
  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // We'll send page views manually
  });

  console.log('✅ GA4 initialized:', measurementId);
};

/**
 * Send event to GA4
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('📊 GA4 Event:', eventName, eventParams);
  }
};

/**
 * Set user properties
 */
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};
```

### analytics.ts

```typescript
// src/features/auth/lib/analytics.ts

import { trackEvent } from 'shared/lib/analytics/ga4';

/**
 * Hash email for privacy (simple hash, not cryptographic)
 */
const hashEmail = (email: string): string => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

/**
 * Registration analytics events
 */
export const RegistrationEvents = {
  pageViewed: () => {
    trackEvent('registration_page_viewed', {
      page_title: 'Sign Up',
      page_location: window.location.href,
    });
  },

  formSubmitted: (email: string) => {
    trackEvent('registration_form_submitted', {
      method: 'email',
      email_hash: hashEmail(email),
    });
  },

  emailSent: () => {
    trackEvent('registration_email_sent');
  },

  emailConfirmed: () => {
    trackEvent('email_confirmed');
  },

  telegramLinked: () => {
    trackEvent('telegram_linked');
  },

  completed: (method: 'email' | 'google') => {
    trackEvent('registration_completed', {
      method,
      timestamp: new Date().toISOString(),
    });
  },

  error: (errorType: string, errorMessage: string) => {
    trackEvent('registration_error', {
      error_type: errorType,
      error_message: errorMessage,
    });
  },

  abandoned: (lastStep: string) => {
    trackEvent('registration_abandoned', {
      last_step: lastStep,
    });
  },
};
```

### AnalyticsProvider.tsx

```typescript
// src/app/providers/AnalyticsProvider.tsx

import { useEffect } from 'react';
import { initializeGA4 } from 'shared/lib/analytics/ga4';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;

    if (measurementId) {
      initializeGA4(measurementId);
    } else {
      console.warn('⚠️ GA4 Measurement ID not found. Analytics disabled.');
    }
  }, []);

  return <>{children}</>;
};
```

---

## Accessibility

### ARIA Labels Example

```typescript
// Email input with ARIA
<input
  {...register('email')}
  id="email"
  type="email"
  aria-label="Email address"
  aria-required="true"
  aria-invalid={errors.email ? 'true' : 'false'}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email.message}
  </p>
)}

// Submit button with loading state
<button
  type="submit"
  disabled={isSubmitting}
  aria-busy={isSubmitting}
  aria-disabled={isSubmitting}
>
  {isSubmitting ? 'Creating account...' : 'Create account'}
</button>

// Error alert with role
<div role="alert" aria-live="assertive">
  <h3>{errorTitle}</h3>
  <p>{errorMessage}</p>
</div>
```

---

## Environment Variables

```bash
# .env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_API_BASE_URL=https://api-dev.tripradar.io
VITE_TELEGRAM_BOT_USERNAME=tripradar_bot
```

---

## Testing Examples

### Password Validation Tests

```typescript
// validation.test.ts
import { validatePassword } from './validation';

describe('validatePassword', () => {
  it('should reject passwords shorter than 9 characters', () => {
    const result = validatePassword('Short1!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must be at least 9 characters long');
  });

  it('should reject passwords without uppercase', () => {
    const result = validatePassword('lowercase123!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one uppercase letter');
  });

  it('should accept valid passwords', () => {
    const result = validatePassword('ValidPass123!');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
```

### Component Tests

```typescript
// Signup.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Signup } from './Signup';

describe('Signup', () => {
  it('should show error alert when email exists', async () => {
    // Mock API
    mockAPI.post('/api/v1/users').mockRejectedValue({
      response: { data: { code: 'EMAIL_ALREADY_EXISTS' } },
    });

    render(<Signup />);

    // Fill form
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'existing@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'ValidPass123!' },
    });
    fireEvent.click(screen.getByRole('checkbox'));

    // Submit
    fireEvent.click(screen.getByText('Create account'));

    // Check error
    await waitFor(() => {
      expect(screen.getByText('Email Already Registered')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
    });
  });
});
```

---

This completes the code examples. Use these as reference when implementing the registration improvements.
