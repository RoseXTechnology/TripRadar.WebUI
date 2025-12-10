# Design Document: Registration Flow Improvements

## Overview

This design document outlines the technical approach for improving the TripRadar registration flow. The improvements focus on enhancing user experience through better validation feedback, clearer error messaging, improved error recovery mechanisms, and comprehensive test coverage. The design maintains the existing architecture while refining specific components and interactions.

The registration flow consists of three main pages:

1. **Signup Page** - Email/password registration form
2. **EmailSent Page** - Confirmation message after registration
3. **EmailConfirmed Page** - Telegram linking interface

Key improvements include:

- Simplified password validation feedback with no redundancy
- Enhanced error messaging for email conflicts
- Robust Telegram connection error recovery
- Proper session management
- Comprehensive unit test coverage

## Architecture

### Current Architecture

The registration system follows Feature-Sliced Design (FSD) architecture:

```
src/
├── features/auth/
│   ├── ui/
│   │   ├── Signup.tsx              # Main registration form
│   │   ├── ErrorAlert.tsx          # Error display component
│   │   ├── TelegramConnect.tsx     # Telegram widget integration
│   │   └── OAuthButtons.tsx        # Social login buttons
│   ├── lib/
│   │   ├── validation.ts           # Password validation logic
│   │   ├── errorMessages.ts        # Error mapping and handling
│   │   └── telegram.ts             # Telegram widget utilities
│   └── model/
│       └── constants.ts            # UI text constants
├── pages/auth/
│   ├── EmailSent.tsx               # Post-registration confirmation
│   └── EmailConfirmed.tsx          # Telegram linking page
├── entities/auth/
│   └── api/
│       ├── useRegisterMutation.ts  # Registration API hook
│       └── useLinkTelegramMutation.ts  # Telegram linking API hook
└── shared/
    ├── lib/auth-storage.ts         # Token storage utilities
    └── api/                        # API client configuration
```

### Component Interaction Flow

```
┌─────────────┐
│   Signup    │
│    Form     │
└──────┬──────┘
       │
       ├─► validatePassword() ──► Show hint or error
       │
       ├─► onSubmit() ──► useRegisterMutation()
       │                         │
       │                         ├─► Success ──► Navigate to EmailSent
       │                         │
       │                         └─► Error ──► parseBackendError()
       │                                            │
       │                                            └─► ErrorAlert
       │
       └─► EmailSent ──► User clicks email link
                              │
                              └─► EmailConfirmed
                                       │
                                       └─► TelegramConnect
                                                │
                                                ├─► Success ──► Store tokens ──► Navigate to Profile
                                                │
                                                └─► Error ──► Show recovery UI
```

## Components and Interfaces

### 1. Password Validation Enhancement

**File:** `src/features/auth/lib/validation.ts`

**Current Interface:**

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
```

**No changes to interfaces** - logic remains the same, only UI presentation changes.

### 2. Signup Component Modifications

**File:** `src/features/auth/ui/Signup.tsx`

**Changes:**

- Conditional rendering of password hint vs error message
- Simplified hint text (from "9+ chars, uppercase, digit, special char" to "Min 9 chars, 1 uppercase, 1 digit, 1 special")
- Logic to hide hint when error is present

**Pseudo-code:**

```typescript
const showPasswordHint = !errors.password && !registerMutation.isError;
const showPasswordError = !!errors.password;

// Render logic:
{showPasswordError && <ErrorMessage />}
{showPasswordHint && <HintText />}
```

### 3. Error Message Enhancement

**File:** `src/features/auth/lib/errorMessages.ts`

**Current Interface:**

```typescript
interface ErrorConfig {
  title: string;
  message: string;
  actions?: ErrorAction[];
  severity: 'error' | 'warning' | 'info';
}

interface ErrorAction {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}
```

**Modifications:**

- Refine `EMAIL_ALREADY_EXISTS` error message for brevity
- Ensure all error messages follow UI/UX best practices
- Maximum message length: 100 characters

**Updated Error Messages:**

```typescript
EMAIL_ALREADY_EXISTS: {
  title: 'Email Already Registered',
  message: 'This email is already in use. Please log in or reset your password.',
  severity: 'warning',
  actions: [
    { label: 'Log In', onClick: () => navigateToLogin(email), variant: 'primary' },
    { label: 'Reset Password', onClick: () => navigateToPasswordReset(email), variant: 'secondary' }
  ]
}
```

### 4. Telegram Error Recovery

**File:** `src/features/auth/ui/TelegramConnect.tsx`

**New State Management:**

```typescript
interface TelegramErrorState {
  hasError: boolean;
  errorMessage: string;
  retryCount: number;
  troubleshootingSteps: string[];
}
```

**Error Recovery Flow:**

```typescript
const handleTelegramError = (error: Error) => {
  const troubleshootingSteps = [
    'Ensure you have a Telegram account',
    'Check that pop-ups are not blocked',
    'Try refreshing the page',
    'Clear browser cache and cookies',
  ];

  setTelegramErrorState({
    hasError: true,
    errorMessage: 'Failed to connect Telegram',
    retryCount: errorState.retryCount + 1,
    troubleshootingSteps,
  });
};

const handleRetry = () => {
  setTelegramErrorState({ hasError: false, errorMessage: '', retryCount: 0, troubleshootingSteps: [] });
  // Reinitialize Telegram widget
  initializeTelegramWidget();
};
```

**UI Structure:**

```tsx
{
  telegramError.hasError && (
    <ErrorAlert title="Telegram Connection Failed" message={telegramError.errorMessage} severity="error">
      <TroubleshootingSteps steps={telegramError.troubleshootingSteps} />
      <Button onClick={handleRetry}>Try Again</Button>
    </ErrorAlert>
  );
}
```

### 5. Session Management

**Files:**

- `src/features/auth/ui/Signup.tsx`
- `src/pages/auth/EmailConfirmed.tsx`

**Storage Strategy:**

- Use `sessionStorage` for temporary registration state (email)
- Clear on browser close (automatic with sessionStorage)
- Fallback to URL parameters for email confirmation page

**Implementation:**

```typescript
// On successful registration (Signup.tsx)
sessionStorage.setItem('registration_email', data.email);

// On email confirmation page (EmailConfirmed.tsx)
const email = searchParams.get('email') || sessionStorage.getItem('registration_email');

if (!email) {
  // Show error: "Unable to retrieve registration information. Please log in."
  // Provide button to navigate to login page
}
```

### 6. ErrorAlert Component Enhancement

**File:** `src/features/auth/ui/ErrorAlert.tsx`

**Current Implementation:** Already well-structured with severity levels, actions, and dismissal.

**Minor Enhancements:**

- Ensure ARIA labels are present for all interactive elements
- Add `role="alert"` and `aria-live="polite"` for screen readers
- Verify color contrast ratios meet WCAG 2.1 AA standards

**Accessibility Checklist:**

- ✅ Semantic HTML (`role="alert"`)
- ✅ ARIA attributes (`aria-live`, `aria-label`)
- ✅ Keyboard navigation support
- ✅ Color contrast compliance
- ✅ Focus management

## Data Models

### Registration State

```typescript
interface RegistrationState {
  email: string;
  isEmailConfirmed: boolean;
  isTelegramLinked: boolean;
}

// Stored in sessionStorage as JSON
const registrationState: RegistrationState = {
  email: 'user@example.com',
  isEmailConfirmed: false,
  isTelegramLinked: false,
};
```

### Error State

```typescript
interface ErrorState {
  config: ErrorConfig | null;
  isVisible: boolean;
}

// Used in Signup component
const [errorConfig, setErrorConfig] = useState<ErrorConfig | null>(null);
```

### Telegram Connection State

```typescript
interface TelegramConnectionState {
  isLoading: boolean;
  scriptLoaded: boolean;
  error: TelegramErrorState | null;
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:

**Redundant Properties:**

- 1.2 and 1.5 are redundant with 1.1 - they all test the same mutual exclusivity between hint and error display
- Multiple criteria in Requirement 5 are meta-requirements about testing itself, not functional requirements

**Consolidated Properties:**

- Property 1 will cover 1.1, 1.2, and 1.5 by testing mutual exclusivity of hint and error
- Requirements 2.3 and 2.4 can be combined into a single property about navigation with email pre-fill
- Requirement 5 criteria will be addressed through the implementation of unit tests, not as testable properties

**Final Property Count:** 12 testable properties (down from 35 acceptance criteria)

### Correctness Properties

Property 1: Password hint and error mutual exclusivity
_For any_ password input state, when a validation error is present, the hint text should not be displayed, and when no error is present, the hint text should be displayed
**Validates: Requirements 1.1, 1.2, 1.5**

Property 2: Password hint length constraint
_For any_ password hint text, the character count should not exceed 50 characters
**Validates: Requirements 1.4**

Property 3: Email already exists error structure
_For any_ "EMAIL_ALREADY_EXISTS" error code, the parsed error config should contain a title, message, warning severity, and exactly two actions ("Login" and "Reset Password")
**Validates: Requirements 2.1, 2.2**

Property 4: Error action navigation with email pre-fill
_For any_ error action that navigates to login or password reset, the generated URL should include the email as a query parameter
**Validates: Requirements 2.3, 2.4**

Property 5: Telegram error includes troubleshooting
_For any_ Telegram connection failure, the error state should include a non-empty array of troubleshooting steps
**Validates: Requirements 3.1**

Property 6: Telegram retry clears error state
_For any_ Telegram error state, invoking the retry handler should reset the error state to its initial value (hasError: false, errorMessage: '', retryCount: 0)
**Validates: Requirements 3.3**

Property 7: SessionStorage usage for registration email
_For any_ successful registration, the email should be stored in sessionStorage (not localStorage) with the key 'registration_email'
**Validates: Requirements 4.3**

Property 8: Email retrieval fallback chain
_For any_ email confirmation page load, the email should be retrieved first from URL parameters, then from sessionStorage, with proper error handling if both are absent
**Validates: Requirements 4.4, 4.5**

Property 9: Password validation correctness
_For any_ password string, the validation result should correctly identify whether it meets all requirements (min 9 chars, uppercase, digit, special char)
**Validates: Requirements 5.1** (functional behavior, not meta-requirement)

Property 10: Email format validation
_For any_ email string, the validation should correctly identify valid email formats according to RFC 5322 simplified pattern
**Validates: Requirements 5.2** (functional behavior, not meta-requirement)

Property 11: Error Alert renders required elements
_For any_ ErrorConfig object, the ErrorAlert component should render a title, message, and dismiss button (if onDismiss provided)
**Validates: Requirements 7.1, 7.3**

Property 12: Error Alert renders action buttons
_For any_ ErrorConfig with actions array, the ErrorAlert component should render a button for each action with the correct label
**Validates: Requirements 7.2**

## Error Handling

### Error Categories

1. **Validation Errors** - Client-side input validation failures
   - Password requirements not met
   - Invalid email format
   - Missing required fields

2. **Backend Errors** - Server-side errors from API calls
   - Email already exists (409 Conflict)
   - Network errors (timeout, connection refused)
   - Server errors (500 Internal Server Error)

3. **Integration Errors** - Third-party service failures
   - Telegram widget loading failure
   - Telegram authentication failure
   - OAuth provider errors

### Error Handling Strategy

**Validation Errors:**

```typescript
// Handled by react-hook-form
{errors.password && (
  <p className="text-sm text-red-600">{errors.password.message}</p>
)}
```

**Backend Errors:**

```typescript
registerMutation.mutate(data, {
  onError: error => {
    const parsedError = parseBackendError(error);
    setErrorConfig(parsedError);
  },
});
```

**Integration Errors:**

```typescript
try {
  await loadTelegramWidget();
} catch (error) {
  setTelegramError({
    hasError: true,
    errorMessage: 'Failed to load Telegram widget',
    troubleshootingSteps: [...]
  });
}
```

### Error Recovery Mechanisms

1. **Retry Logic** - For transient failures (network, Telegram widget)
2. **Alternative Actions** - For permanent failures (email exists → login/reset password)
3. **Clear Instructions** - For user-actionable issues (Telegram connection troubleshooting)
4. **Graceful Degradation** - For missing data (email not in session → show error, redirect to login)

### Error Message Guidelines

- **Concise**: Maximum 100 characters for main message
- **Actionable**: Provide clear next steps
- **User-friendly**: Avoid technical jargon
- **Contextual**: Include relevant information (email, error type)

## Testing Strategy

### Unit Testing Approach

We will use **Vitest** as the testing framework (already configured in the project) with **@testing-library/react** for component testing.

**Test Coverage Goals:**

- Validation utilities: 100% coverage
- Error message parsing: 100% coverage
- Component logic: 80% coverage

### Unit Test Categories

1. **Validation Logic Tests** (`validation.test.ts`)
   - Test `validatePassword()` with various inputs
   - Test `checkPasswordRequirements()` for individual requirements
   - Edge cases: empty string, very long passwords, unicode characters

2. **Error Message Tests** (`errorMessages.test.ts`)
   - Test `parseBackendError()` for all error codes
   - Test navigation helper functions
   - Test error config structure for each error type

3. **Component Tests**
   - **Signup Component** (`Signup.test.tsx`)
     - Password hint/error mutual exclusivity
     - Form submission with valid/invalid data
     - Error alert display on backend errors
   - **ErrorAlert Component** (`ErrorAlert.test.tsx`)
     - Rendering with different severity levels
     - Action button rendering and onClick behavior
     - Dismiss functionality
   - **TelegramConnect Component** (`TelegramConnect.test.tsx`)
     - Error state management
     - Retry functionality
     - Widget initialization

### Test File Structure

```
src/
├── features/auth/
│   ├── lib/
│   │   ├── validation.ts
│   │   ├── validation.test.ts          # NEW
│   │   ├── errorMessages.ts
│   │   └── errorMessages.test.ts       # NEW
│   └── ui/
│       ├── Signup.tsx
│       ├── Signup.test.tsx             # NEW
│       ├── ErrorAlert.tsx
│       ├── ErrorAlert.test.tsx         # NEW
│       ├── TelegramConnect.tsx
│       └── TelegramConnect.test.tsx    # NEW
```

### Test Execution

```bash
# Run all tests once
npm run test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage report
npm run test -- --coverage
```

### Testing Best Practices

1. **Arrange-Act-Assert Pattern** - Structure all tests clearly
2. **Descriptive Test Names** - Use "should" statements
3. **Isolated Tests** - No dependencies between tests
4. **Mock External Dependencies** - Mock API calls, Telegram widget
5. **Test User Behavior** - Focus on user interactions, not implementation details

### Example Test Structure

```typescript
describe('validatePassword', () => {
  it('should return valid for password meeting all requirements', () => {
    const result = validatePassword('MyPass123!');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should return invalid for password shorter than 9 characters', () => {
    const result = validatePassword('Short1!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must be at least 9 characters long');
  });

  // Additional test cases...
});
```

## Implementation Notes

### Technology Stack

- **React 18.3** with TypeScript 5.5
- **React Hook Form 7.62** for form management
- **React Router 6.21** for navigation
- **Vitest 1.0** for unit testing
- **Testing Library** for component testing

### Dependencies

No new dependencies required. All improvements use existing libraries.

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- sessionStorage API (supported in all modern browsers)
- Telegram widget (requires JavaScript enabled)

### Performance Considerations

- Validation runs on every keystroke (debounced by react-hook-form)
- Error parsing is synchronous and fast
- Telegram widget loads asynchronously
- No performance impact expected from changes

### Security Considerations

- Password validation is client-side only (server must also validate)
- sessionStorage is cleared on browser close (secure for temporary data)
- Telegram widget uses official Telegram OAuth (secure)
- No sensitive data stored in localStorage

### Accessibility Considerations

- All error messages have proper ARIA attributes
- Keyboard navigation fully supported
- Screen reader compatible
- Color contrast meets WCAG 2.1 AA standards
- Focus management for error states

## Migration and Rollout

### Implementation Order

1. **Phase 1: Validation and Error Messages** (Low Risk)
   - Update password hint text
   - Implement hint/error mutual exclusivity
   - Refine error messages
   - Add unit tests for validation

2. **Phase 2: Telegram Error Recovery** (Medium Risk)
   - Add error state management
   - Implement retry functionality
   - Add troubleshooting UI
   - Add unit tests for error handling

3. **Phase 3: Session Management** (Low Risk)
   - Verify sessionStorage usage
   - Add fallback logic for email retrieval
   - Add error handling for missing email

4. **Phase 4: Testing and Polish** (Low Risk)
   - Complete unit test coverage
   - Accessibility audit
   - UI/UX polish

### Rollout Strategy

- **Development**: Test all changes locally
- **Staging**: Deploy to staging environment for QA
- **Production**: Gradual rollout with monitoring

### Rollback Plan

All changes are backward compatible. If issues arise:

1. Revert to previous version via Git
2. No database migrations required
3. No API changes required

### Success Metrics

- **User Experience**: Reduced registration abandonment rate
- **Error Recovery**: Increased Telegram connection success rate
- **Code Quality**: 80%+ test coverage achieved
- **Accessibility**: WCAG 2.1 AA compliance verified
