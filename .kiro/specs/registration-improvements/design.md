# Design Document: Registration Flow Improvements

## Overview

This design document outlines improvements to the TripRadar registration system, focusing on enhanced password validation, sophisticated error handling, and analytics integration. The implementation maintains the existing email + Telegram flow while adding better UX, security, and observability.

Key improvements:

- Stricter password validation (9+ chars, uppercase, digit, special char)
- Centralized error handling with user-friendly messages
- Google Analytics 4 funnel tracking
- Cleanup of unused multi-step components
- Enhanced accessibility

## Architecture

### High-Level Component Structure

```
src/
├── features/auth/
│   ├── ui/
│   │   ├── Signup.tsx                    # UPDATED: Enhanced validation
│   │   ├── ErrorAlert.tsx                # NEW: Reusable error component
│   │   └── steps/                        # TO DELETE: Unused components
│   │       ├── EmailStep.tsx
│   │       ├── DetailsStep.tsx
│   │       └── ConfirmationStep.tsx
│   ├── lib/
│   │   ├── validation.ts                 # NEW: Password validation logic
│   │   ├── errorMessages.ts              # NEW: Error message mapping
│   │   └── analytics.ts                  # NEW: GA4 event tracking
│   └── api/
│       └── useRegister.ts                # UPDATED: Error handling
├── shared/
│   ├── lib/
│   │   └── analytics/
│   │       ├── ga4.ts                    # NEW: GA4 initialization
│   │       └── events.ts                 # NEW: Event definitions
│   └── ui/
│       └── Alert.tsx                     # NEW: Base alert component
└── app/
    └── providers/
        └── AnalyticsProvider.tsx         # NEW: GA4 provider
```

## Components and Interfaces

### 1. Enhanced Password Validation

**Location:** `src/features/auth/lib/validation.ts`

**Password Requirements:**

- Minimum 9 characters
- At least 1 uppercase letter
- At least 1 digit
- At least 1 special character (!@#$%^&\*()\_+-=[]{}|;:,.<>?)

**Interface:**

```typescript
interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasDigit: boolean;
  hasSpecialChar: boolean;
}

// Validate password against all requirements
export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];

  if (password.length < 9) {
    errors.push('Password must be at least 9 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one digit');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Check individual requirements (for UI indicators)
export const checkPasswordRequirements = (password: string): PasswordRequirements => {
  return {
    minLength: password.length >= 9,
    hasUppercase: /[A-Z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
  };
};
```

### 2. Error Message Mapping

**Location:** `src/features/auth/lib/errorMessages.ts`

**Purpose:** Map backend error codes to user-friendly messages with actions

**Interface:**

```typescript
interface ErrorAction {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

interface ErrorConfig {
  title: string;
  message: string;
  actions?: ErrorAction[];
  severity: 'error' | 'warning' | 'info';
}

type ErrorCode =
  | 'EMAIL_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'INVALID_EMAIL'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'TELEGRAM_REQUIRED'
  | 'EMAIL_NOT_CONFIRMED'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED';

export const ERROR_MESSAGES: Record<ErrorCode, (context?: any) => ErrorConfig> = {
  EMAIL_ALREADY_EXISTS: context => ({
    title: 'Email Already Registered',
    message: 'This email address is already associated with an account.',
    severity: 'warning',
    actions: [
      {
        label: 'Login',
        onClick: () => navigateToLogin(context?.email),
        variant: 'primary',
      },
      {
        label: 'Forgot Password?',
        onClick: () => navigateToPasswordReset(context?.email),
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

  TELEGRAM_REQUIRED: context => ({
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
        onClick: () => navigateToSignup(),
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
        onClick: () => navigateToSignup(),
        variant: 'primary',
      },
    ],
  }),
};

// Parse backend error and return config
export const parseBackendError = (error: any): ErrorConfig => {
  // Try to extract error code from response
  const errorCode = error?.response?.data?.code || error?.code;

  if (errorCode && ERROR_MESSAGES[errorCode as ErrorCode]) {
    return ERROR_MESSAGES[errorCode as ErrorCode](error?.response?.data);
  }

  // Fallback to generic error
  return {
    title: 'Error',
    message: error?.message || 'An unexpected error occurred. Please try again.',
    severity: 'error',
  };
};
```

### 3. Error Alert Component

**Location:** `src/features/auth/ui/ErrorAlert.tsx`

**Purpose:** Reusable component for displaying errors with actions

**Interface:**

```typescript
interface ErrorAlertProps {
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

export const ErrorAlert = ({
  title,
  message,
  severity,
  actions,
  onDismiss
}: ErrorAlertProps) => {
  const severityStyles = {
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
  };

  const iconStyles = {
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400'
  };

  const Icon = {
    error: FaExclamationCircle,
    warning: FaExclamationTriangle,
    info: FaInfoCircle
  }[severity];

  return (
    <div className={`rounded-lg border p-4 ${severityStyles[severity]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 ${iconStyles[severity]}`} />

        <div className="flex-1">
          <h3 className="font-semibold text-content dark:text-content-dark mb-1">
            {title}
          </h3>
          <p className="text-sm text-content-secondary dark:text-content-secondary-dark">
            {message}
          </p>

          {actions && actions.length > 0 && (
            <div className="flex gap-2 mt-3">
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
            className="text-content-muted hover:text-content dark:hover:text-content-dark"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
```

### 4. Google Analytics 4 Integration

**Location:** `src/shared/lib/analytics/ga4.ts`

**Purpose:** Initialize and configure GA4

**Interface:**

```typescript
// Initialize GA4
export const initializeGA4 = (measurementId: string) => {
  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: false, // We'll send page views manually
  });
};

// Send event to GA4
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};
```

**Location:** `src/features/auth/lib/analytics.ts`

**Purpose:** Registration-specific analytics events

**Interface:**

```typescript
import { trackEvent } from 'shared/lib/analytics/ga4';

export const RegistrationEvents = {
  // Page view
  pageViewed: () => {
    trackEvent('registration_page_viewed', {
      page_title: 'Sign Up',
      page_location: window.location.href,
    });
  },

  // Form submission
  formSubmitted: (email: string) => {
    trackEvent('registration_form_submitted', {
      method: 'email',
      // Hash email for privacy
      email_hash: hashEmail(email),
    });
  },

  // Email sent
  emailSent: () => {
    trackEvent('registration_email_sent');
  },

  // Email confirmed
  emailConfirmed: () => {
    trackEvent('email_confirmed');
  },

  // Telegram linked
  telegramLinked: () => {
    trackEvent('telegram_linked');
  },

  // Registration completed
  completed: (method: 'email' | 'google') => {
    trackEvent('registration_completed', {
      method,
      timestamp: new Date().toISOString(),
    });
  },

  // Registration error
  error: (errorType: string, errorMessage: string) => {
    trackEvent('registration_error', {
      error_type: errorType,
      error_message: errorMessage,
    });
  },

  // Registration abandoned
  abandoned: (lastStep: string) => {
    trackEvent('registration_abandoned', {
      last_step: lastStep,
    });
  },
};

// Hash email for privacy (simple hash, not cryptographic)
const hashEmail = (email: string): string => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};
```

## Data Models

### Error Response Types

```typescript
// Backend error response
interface BackendErrorResponse {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Frontend error state
interface ErrorState {
  hasError: boolean;
  config: ErrorConfig | null;
}

// Validation error
interface ValidationError {
  field: string;
  message: string;
}
```

### Analytics Event Types

```typescript
// GA4 event parameters
interface RegistrationEventParams {
  method?: 'email' | 'google';
  error_type?: string;
  error_message?: string;
  last_step?: string;
  email_hash?: string;
  timestamp?: string;
}

// User properties
interface UserProperties {
  registration_method: 'email' | 'google';
  has_telegram: boolean;
  registration_date: string;
}
```

## Error Handling Strategy

### Error Flow

```
1. API Error Occurs
   ↓
2. Error Interceptor Catches Error
   ↓
3. Parse Error Code from Response
   ↓
4. Map to ErrorConfig using errorMessages.ts
   ↓
5. Display ErrorAlert Component
   ↓
6. Log Error to Console
   ↓
7. Track Error Event in GA4
```

### Error Categories

**1. Validation Errors (Client-side)**

- Display inline below form fields
- Real-time feedback as user types
- No API call needed

**2. Business Logic Errors (Backend)**

- Email already exists
- Weak password (if backend validates)
- Invalid email format
- Display in ErrorAlert component with actions

**3. Network Errors**

- Connection timeout
- No internet
- Display generic network error
- Suggest retry

**4. Server Errors (5xx)**

- Internal server error
- Service unavailable
- Display generic server error
- Log for debugging

### Error Display Hierarchy

```
Priority 1: Inline Field Errors
  - Email format invalid
  - Password requirements not met
  - Required field empty

Priority 2: Form-level Errors (ErrorAlert)
  - Email already exists
  - Network errors
  - Server errors

Priority 3: Page-level Errors
  - Token expired
  - Invalid confirmation link
```

## Testing Strategy

### Unit Tests

**Password Validation:**

```typescript
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

**Error Message Mapping:**

```typescript
describe('parseBackendError', () => {
  it('should map EMAIL_ALREADY_EXISTS to correct config', () => {
    const error = {
      response: {
        data: {
          code: 'EMAIL_ALREADY_EXISTS',
          email: 'test@example.com',
        },
      },
    };

    const config = parseBackendError(error);
    expect(config.title).toBe('Email Already Registered');
    expect(config.actions).toHaveLength(2);
  });

  it('should return generic error for unknown codes', () => {
    const error = { message: 'Unknown error' };
    const config = parseBackendError(error);
    expect(config.title).toBe('Error');
  });
});
```

### Integration Tests

**Registration Flow with Errors:**

```typescript
describe('Registration with errors', () => {
  it('should show error alert when email exists', async () => {
    // Mock API to return email exists error
    mockAPI.post('/api/v1/users').mockRejectedValue({
      response: { data: { code: 'EMAIL_ALREADY_EXISTS' } }
    });

    render(<Signup />);

    // Fill form
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'existing@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'ValidPass123!' }
    });
    fireEvent.click(screen.getByRole('checkbox'));

    // Submit
    fireEvent.click(screen.getByText('Create account'));

    // Check error alert
    await waitFor(() => {
      expect(screen.getByText('Email Already Registered')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    });
  });
});
```

### Analytics Tests

```typescript
describe('Registration analytics', () => {
  it('should track page view on mount', () => {
    render(<Signup />);
    expect(trackEvent).toHaveBeenCalledWith('registration_page_viewed', expect.any(Object));
  });

  it('should track form submission', async () => {
    render(<Signup />);
    // Fill and submit form
    await submitForm();
    expect(trackEvent).toHaveBeenCalledWith('registration_form_submitted', {
      method: 'email',
      email_hash: expect.any(String)
    });
  });
});
```

## Environment Variables

```bash
# .env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_API_BASE_URL=https://api-dev.tripradar.io
VITE_TELEGRAM_BOT_USERNAME=tripradar_bot
```

## Implementation Notes

### Password Validation

- Validate on `onChange` for real-time feedback
- Debounce validation by 300ms to avoid excessive re-renders
- Show all failed requirements, not just the first one
- Use consistent error message format

### Error Handling

- Always log errors to console for debugging
- Never expose sensitive data in error messages
- Provide actionable next steps when possible
- Use consistent error alert styling across the app

### Analytics

- Initialize GA4 in App.tsx or main.tsx
- Track events at key user actions, not on every render
- Hash or omit PII (emails, names) from events
- Test analytics in development with GA4 DebugView

### Accessibility

- Use semantic HTML (form, label, button)
- Include ARIA labels for screen readers
- Announce errors with aria-live regions
- Ensure keyboard navigation works
- Test with screen reader (NVDA, JAWS, VoiceOver)

## Migration Steps

### Phase 1: Validation & Error Handling

1. Create validation.ts with password rules
2. Create errorMessages.ts with error mapping
3. Create ErrorAlert component
4. Update Signup.tsx to use new validation
5. Update useRegister.ts to use error mapping

### Phase 2: Analytics

1. Create GA4 initialization
2. Create analytics event functions
3. Add AnalyticsProvider to App
4. Add event tracking to registration flow

### Phase 3: Cleanup

1. Delete EmailStep.tsx
2. Delete DetailsStep.tsx
3. Delete ConfirmationStep.tsx
4. Remove imports and references
5. Update tests

## Security Considerations

1. **Password Validation:**
   - Client-side validation is UX, not security
   - Backend MUST also validate password strength
   - Never log passwords

2. **Error Messages:**
   - Don't reveal if email exists (security vs UX tradeoff)
   - Current design: reveal for better UX
   - Consider rate limiting on backend

3. **Analytics:**
   - Hash emails before sending to GA4
   - Never send passwords or tokens
   - Comply with GDPR (get consent)

4. **Error Logging:**
   - Log errors for debugging
   - Sanitize sensitive data before logging
   - Use error monitoring service (Sentry) in production
