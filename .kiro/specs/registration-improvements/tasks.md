# Implementation Tasks: Registration Flow Improvements

## Overview

Implementation plan for registration flow improvements including enhanced password validation, error handling, analytics integration, and code cleanup.

---

## Phase 1: Foundation & Validation

### Task 1: Create Password Validation Module

- [x] 1.1 Create validation utility file
  - Create `src/features/auth/lib/validation.ts`
  - Implement `validatePassword()` function with all requirements
  - Implement `checkPasswordRequirements()` for UI indicators
  - Add TypeScript interfaces for validation results
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x]\* 1.2 Write unit tests for password validation
  - Test minimum length requirement (9 chars)
  - Test uppercase letter requirement
  - Test digit requirement
  - Test special character requirement
  - Test valid password acceptance
  - Test multiple simultaneous failures
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

### Task 2: Create Error Handling System

- [x] 2.1 Create error message mapping
  - Create `src/features/auth/lib/errorMessages.ts`
  - Define `ErrorConfig` and `ErrorAction` interfaces
  - Implement `ERROR_MESSAGES` mapping for all error codes
  - Implement `parseBackendError()` function
  - Add navigation helper functions
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 2.2 Create ErrorAlert component
  - Create `src/features/auth/ui/ErrorAlert.tsx`
  - Implement severity-based styling (error, warning, info)
  - Add icon rendering based on severity
  - Implement action buttons rendering
  - Add dismiss functionality
  - Ensure responsive design
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]\* 2.3 Write tests for error handling
  - Test error message mapping for all codes
  - Test fallback to generic error
  - Test ErrorAlert component rendering
  - Test action button clicks
  - Test dismiss functionality
  - _Requirements: 3.1, 4.1, 4.5_

---

## Phase 2: Update Registration Form

### Task 3: Update Signup Component with Enhanced Validation

- [x] 3.1 Update password validation in Signup.tsx
  - Import `validatePassword` from validation.ts
  - Update React Hook Form validation rules
  - Add real-time password validation on onChange
  - Display all password requirement errors
  - Update password field error messages
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 9.1, 9.2, 9.3, 9.4_

- [x] 3.2 Integrate ErrorAlert component
  - Import ErrorAlert component
  - Add error state management
  - Replace current error display with ErrorAlert
  - Handle error dismissal
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3.3 Implement "Email Already Exists" error handling
  - Import `parseBackendError` function
  - Handle EMAIL_ALREADY_EXISTS error code
  - Display ErrorAlert with Login and Forgot Password actions
  - Implement navigation with email pre-fill
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]\* 3.4 Write integration tests for Signup form
  - Test password validation errors display
  - Test email already exists error flow
  - Test error alert with action buttons
  - Test form submission with valid data
  - Test loading states
  - _Requirements: 1.5, 2.1, 3.1, 10.1, 10.2, 10.3_

### Task 4: Update Registration API Hook

- [ ] 4.1 Update useRegister hook with error handling
  - Update `src/features/auth/api/useRegister.ts`
  - Import `parseBackendError` function
  - Update onError callback to use error mapping
  - Return parsed error config
  - Add error logging
  - _Requirements: 4.1, 4.5, 12.1, 12.2, 12.3, 12.5_

- [ ]\* 4.2 Write tests for useRegister hook
  - Test successful registration
  - Test error handling with different error codes
  - Test error logging
  - Mock API responses
  - _Requirements: 4.1, 4.5, 12.1_

---

## Phase 3: Analytics Integration

### Task 5: Setup Google Analytics 4

- [ ] 5.1 Create GA4 initialization module
  - Create `src/shared/lib/analytics/ga4.ts`
  - Implement `initializeGA4()` function
  - Implement `trackEvent()` function
  - Implement `setUserProperties()` function
  - Add TypeScript window.gtag types
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 5.2 Create AnalyticsProvider
  - Create `src/app/providers/AnalyticsProvider.tsx`
  - Initialize GA4 on mount
  - Read measurement ID from environment variables
  - Add error handling for missing config
  - _Requirements: 6.1_

- [ ] 5.3 Add GA4 to app providers
  - Update `src/app/providers/index.tsx` or `src/main.tsx`
  - Wrap app with AnalyticsProvider
  - Add VITE_GA4_MEASUREMENT_ID to .env
  - Document environment variable in README
  - _Requirements: 6.1_

### Task 6: Implement Registration Analytics Events

- [ ] 6.1 Create registration analytics module
  - Create `src/features/auth/lib/analytics.ts`
  - Implement `RegistrationEvents` object with all events
  - Implement email hashing function for privacy
  - Add event parameter interfaces
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 6.2 Add analytics tracking to Signup.tsx
  - Track `registration_page_viewed` on component mount
  - Track `registration_form_submitted` on form submit
  - Track `registration_email_sent` on success
  - Track `registration_error` on error
  - Track `registration_abandoned` on unmount (if incomplete)
  - _Requirements: 6.1, 6.2, 6.3, 7.3_

- [ ] 6.3 Add analytics tracking to EmailConfirmation.tsx
  - Track `email_confirmed` on successful confirmation
  - Track `telegram_linked` on successful Telegram connection
  - Track `registration_completed` on final success
  - _Requirements: 6.4, 6.5, 7.1_

- [ ]\* 6.4 Write tests for analytics tracking
  - Test event tracking calls
  - Test event parameters
  - Test email hashing
  - Mock GA4 functions
  - Verify no PII in events
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.5_

---

## Phase 4: Accessibility Improvements

### Task 7: Enhance Form Accessibility

- [ ] 7.1 Add ARIA labels and attributes
  - Add aria-label to all form inputs
  - Add aria-describedby for error messages
  - Add aria-invalid for fields with errors
  - Add aria-required for required fields
  - Add aria-disabled to submit button when disabled
  - _Requirements: 11.1, 11.2, 11.4, 11.5_

- [ ] 7.2 Implement keyboard navigation
  - Ensure tab order is logical
  - Add visible focus indicators
  - Test keyboard-only navigation
  - Add focus management for error alerts
  - _Requirements: 11.3_

- [ ] 7.3 Add screen reader announcements
  - Add aria-live region for error announcements
  - Announce validation errors
  - Announce form submission status
  - Test with screen reader (VoiceOver/NVDA)
  - _Requirements: 11.2_

- [ ]\* 7.4 Write accessibility tests
  - Test ARIA attributes presence
  - Test keyboard navigation
  - Test focus management
  - Use @testing-library/jest-dom matchers
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

---

## Phase 5: Fix Email Confirmation Flow

### Task 8: Update EmailConfirmed Page to Show Telegram Widget

- [ ] 8.1 Update EmailConfirmed.tsx component
  - Remove "Sign In to Your Account" button
  - Import TelegramConnect component
  - Get user email from URL query parameter or sessionStorage
  - Display Telegram widget after success message
  - Handle case when email is not available
  - _Requirements: 2.1, 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 8.2 Implement auto-login after Telegram connection
  - Use TelegramConnect onSuccess callback
  - Store JWT tokens in authStorage
  - Update auth store with user data
  - Redirect to profile/dashboard after success
  - _Requirements: 3.5, 7.1_

- [ ] 8.3 Handle email parameter passing
  - Backend should pass email in redirect URL: `/email-confirmed?success=true&email=user@example.com`
  - OR store email in sessionStorage during registration
  - Extract email from URL or sessionStorage
  - Pass email to TelegramConnect component
  - _Requirements: 2.4, 9.1_

- [ ] 8.4 Add error handling
  - Handle missing email parameter
  - Handle Telegram connection errors
  - Display ErrorAlert for failures
  - Provide fallback to login page if needed
  - _Requirements: 3.1, 7.4_

- [ ]\* 8.5 Write tests for updated EmailConfirmed
  - Test Telegram widget display
  - Test auto-login flow
  - Test error handling
  - Test email parameter extraction
  - _Requirements: 3.1, 3.5_

## Phase 6: Code Cleanup

### Task 9: Remove Unused Multi-Step Components

- [ ] 9.1 Delete unused step components
  - Delete `src/features/auth/ui/steps/EmailStep.tsx`
  - Delete `src/features/auth/ui/steps/DetailsStep.tsx`
  - Delete `src/features/auth/ui/steps/ConfirmationStep.tsx`
  - Delete `src/features/auth/ui/steps/` directory if empty
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 9.2 Remove imports and references
  - Search codebase for imports of deleted components
  - Remove any imports
  - Remove any type references
  - Update barrel exports if needed
  - _Requirements: 5.4_

- [ ] 9.3 Update tests
  - Remove tests for deleted components
  - Update any integration tests that referenced steps
  - Ensure all remaining tests pass
  - _Requirements: 5.5_

- [ ] 9.4 Update documentation
  - Update README if it mentions multi-step form
  - Update any architecture docs
  - Update component inventory
  - _Requirements: 5.1, 5.2, 5.3_

---

## Phase 7: Enhanced UX Features

### Task 10: Improve Loading States

- [ ] 10.1 Enhance submit button loading state
  - Add loading spinner to button
  - Change button text to "Creating account..."
  - Disable button during submission
  - Prevent double submission
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 10.2 Add form-level loading indicator
  - Show loading overlay during submission (optional)
  - Disable all form inputs during submission
  - Re-enable on error or success
  - _Requirements: 10.1, 10.4_

### Task 11: Improve Password Field UX

- [ ] 11.1 Verify password visibility toggle
  - Ensure eye icon toggles correctly
  - Maintain cursor position on toggle
  - Update icon based on visibility state
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 11.2 Add password requirements hint
  - Add small text below password field
  - Show requirements: "9+ chars, uppercase, digit, special char"
  - Style as muted text
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

---

## Phase 8: Error Logging & Debugging

### Task 12: Implement Error Logging

- [ ] 12.1 Add comprehensive error logging
  - Log all errors to console with timestamp
  - Include error type and message
  - Log HTTP status codes for API errors
  - Log validation failures
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 12.2 Sanitize sensitive data in logs
  - Never log passwords
  - Never log tokens
  - Hash or omit emails in logs
  - Add sanitization function
  - _Requirements: 12.5_

- [ ] 12.3 Add error boundary (optional)
  - Create ErrorBoundary component
  - Wrap registration form
  - Log caught errors
  - Show fallback UI
  - _Requirements: 12.1_

---

## Phase 9: Testing & QA

### Task 13: Integration Testing

- [ ] 13.1 Test complete registration flow
  - Test successful registration
  - Test email confirmation
  - Test Telegram linking
  - Test end-to-end flow
  - _Requirements: All_

- [ ] 13.2 Test error scenarios
  - Test email already exists
  - Test weak password
  - Test network errors
  - Test server errors
  - Test validation errors
  - _Requirements: 1.5, 2.1, 3.1, 4.1_

- [ ] 13.3 Test analytics tracking
  - Verify all events fire correctly
  - Check event parameters
  - Test in GA4 DebugView
  - Verify no PII in events
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.5_

- [ ] 13.4 Cross-browser testing
  - Test in Chrome
  - Test in Firefox
  - Test in Safari
  - Test in Edge
  - _Requirements: All_

- [ ] 13.5 Mobile testing
  - Test on iOS Safari
  - Test on Android Chrome
  - Test responsive design
  - Test touch interactions
  - _Requirements: All_

- [ ] 13.6 Accessibility testing
  - Test with screen reader
  - Test keyboard navigation
  - Test color contrast
  - Run axe DevTools
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

---

## Phase 10: Documentation & Deployment

### Task 14: Update Documentation

- [ ] 14.1 Update README
  - Document new password requirements
  - Document GA4 setup
  - Document environment variables
  - Add troubleshooting section
  - _Requirements: All_

- [ ] 14.2 Update API documentation
  - Document error codes
  - Document error response format
  - Document expected error handling
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 14.3 Create developer guide
  - How to add new error types
  - How to add new analytics events
  - How to test error handling
  - How to test analytics
  - _Requirements: All_

### Task 15: Final Checkpoint

- [ ] 15.1 Code review
  - Review all changes
  - Check code style compliance
  - Verify TypeScript types
  - Check for console.logs
  - _Requirements: All_

- [ ] 15.2 Performance check
  - Check bundle size impact
  - Verify no performance regressions
  - Check analytics overhead
  - _Requirements: All_

- [ ] 15.3 Security review
  - Verify no sensitive data exposure
  - Check error message security
  - Verify analytics privacy
  - Check password validation
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 12.5_

- [ ] 15.4 Deploy to staging
  - Deploy changes
  - Test in staging environment
  - Verify GA4 tracking
  - Get stakeholder approval
  - _Requirements: All_

---

## Optional: Email Resend Feature (Pending Team Decision)

### Task 16: Email Resend Functionality (If Approved)

- [ ] 16.1 Coordinate with backend team
  - Confirm endpoint specification
  - Confirm rate limiting rules
  - Confirm token invalidation logic
  - Test endpoint in development
  - _Pending: Team decision_

- [ ] 16.2 Implement resend UI
  - Add resend button to EmailSent.tsx
  - Implement countdown timer (60s)
  - Store email in sessionStorage
  - Handle resend success/error
  - _Pending: Team decision_

- [ ] 16.3 Create resend API hook
  - Create `useResendConfirmation` hook
  - Implement API call
  - Handle rate limiting errors
  - Add error handling
  - _Pending: Team decision_

- [ ]\* 16.4 Write tests for resend feature
  - Test countdown timer
  - Test resend button enable/disable
  - Test API call
  - Test error handling
  - Test rate limiting
  - _Pending: Team decision_

---

## Summary

**Total Tasks:** 16 main tasks (15 confirmed + 1 optional)
**Estimated Effort:** 3-4 days for core features
**Dependencies:**

- Backend: Error codes must match frontend mapping
- Backend: GA4 measurement ID needed
- Backend: Email resend endpoint (if approved)

**Priority:**

- P0 (Must Have): Tasks 1-9, 12-15 (includes EmailConfirmed fix)
- P1 (Should Have): Tasks 10-11
- P2 (Nice to Have): Task 16 (pending decision)

**Testing:**

- Unit tests marked with \* are optional but recommended
- Integration tests in Task 12 are mandatory
- Accessibility tests in Task 12.6 are mandatory
