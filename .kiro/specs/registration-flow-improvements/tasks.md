# Implementation Plan

- [x] 1. Update password validation UI feedback
  - Implement conditional rendering to show either hint or error, never both
  - Simplify hint text to "Min 9 chars, 1 uppercase, 1 digit, 1 special"
  - Update Signup component to hide hint when validation error is present
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]\* 1.1 Write unit tests for password hint/error mutual exclusivity
  - **Property 1: Password hint and error mutual exclusivity**
  - **Validates: Requirements 1.1, 1.2, 1.5**

- [ ]\* 1.2 Write unit test for password hint length constraint
  - **Property 2: Password hint length constraint**
  - **Validates: Requirements 1.4**

- [x] 2. Improve email already exists error handling
  - Refine error message text to be more concise and actionable
  - Update ERROR_MESSAGES mapping for EMAIL_ALREADY_EXISTS
  - Ensure action buttons have clear labels ("Log In", "Reset Password")
  - Verify email pre-fill works in navigation helpers
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]\* 2.1 Write unit tests for email already exists error structure
  - **Property 3: Email already exists error structure**
  - **Validates: Requirements 2.1, 2.2**

- [ ]\* 2.2 Write unit tests for error action navigation with email pre-fill
  - **Property 4: Error action navigation with email pre-fill**
  - **Validates: Requirements 2.3, 2.4**

- [x] 3. Implement Telegram connection error recovery
  - Add TelegramErrorState interface to TelegramConnect component
  - Create handleTelegramError function with troubleshooting steps
  - Implement handleRetry function to clear error and reinitialize widget
  - Add TroubleshootingSteps UI component
  - Add "Try Again" button to error display
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [ ]\* 3.1 Write unit tests for Telegram error includes troubleshooting
  - **Property 5: Telegram error includes troubleshooting**
  - **Validates: Requirements 3.1**

- [ ]\* 3.2 Write unit tests for Telegram retry clears error state
  - **Property 6: Telegram retry clears error state**
  - **Validates: Requirements 3.3**

- [x] 4. Verify session management implementation
  - Confirm sessionStorage is used (not localStorage) for registration email
  - Verify email retrieval fallback chain (URL params → sessionStorage)
  - Add error handling for missing email in EmailConfirmed page
  - Test browser close behavior (sessionStorage auto-clears)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]\* 4.1 Write unit tests for sessionStorage usage
  - **Property 7: SessionStorage usage for registration email**
  - **Validates: Requirements 4.3**

- [ ]\* 4.2 Write unit tests for email retrieval fallback chain
  - **Property 8: Email retrieval fallback chain**
  - **Validates: Requirements 4.4, 4.5**

- [ ] 5. Add unit tests for validation utilities
  - Create validation.test.ts file
  - Test validatePassword() with various inputs (valid, invalid, edge cases)
  - Test checkPasswordRequirements() for individual requirements
  - Test edge cases: empty string, very long passwords, unicode characters
  - Achieve 100% coverage for validation.ts
  - _Requirements: 5.1, 5.4_

- [ ]\* 5.1 Write unit tests for password validation correctness
  - **Property 9: Password validation correctness**
  - **Validates: Requirements 5.1**

- [ ]\* 5.2 Write unit tests for email format validation
  - **Property 10: Email format validation**
  - **Validates: Requirements 5.2**

- [ ] 6. Add unit tests for error message utilities
  - Create errorMessages.test.ts file
  - Test parseBackendError() for all error codes
  - Test navigation helper functions (navigateToLogin, navigateToPasswordReset)
  - Test error config structure for each error type
  - Achieve 100% coverage for errorMessages.ts
  - _Requirements: 5.3, 5.4_

- [ ] 7. Add unit tests for ErrorAlert component
  - Create ErrorAlert.test.tsx file
  - Test rendering with different severity levels (error, warning, info)
  - Test action button rendering and onClick behavior
  - Test dismiss functionality
  - Test ARIA attributes and accessibility
  - _Requirements: 7.1, 7.2, 7.3, 7.5_

- [ ]\* 7.1 Write unit tests for ErrorAlert renders required elements
  - **Property 11: Error Alert renders required elements**
  - **Validates: Requirements 7.1, 7.3**

- [ ]\* 7.2 Write unit tests for ErrorAlert renders action buttons
  - **Property 12: Error Alert renders action buttons**
  - **Validates: Requirements 7.2**

- [ ] 8. Add unit tests for Signup component
  - Create Signup.test.tsx file
  - Test password hint/error mutual exclusivity
  - Test form submission with valid data
  - Test form submission with invalid data
  - Test error alert display on backend errors
  - Test navigation to EmailSent page on success
  - _Requirements: 1.1, 1.2, 1.5, 2.1_

- [ ] 9. Add unit tests for TelegramConnect component
  - Create TelegramConnect.test.tsx file
  - Test error state management
  - Test retry functionality
  - Test widget initialization
  - Test success callback with token storage
  - Test error callback with error display
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Verify UI/UX best practices compliance
  - Audit all error messages for clarity and conciseness
  - Verify design token usage (colors, spacing, typography)
  - Check color contrast ratios meet WCAG 2.1 AA standards
  - Test keyboard navigation for all interactive elements
  - Verify focus management for error states
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 12. Accessibility audit
  - Verify all error messages have proper ARIA attributes
  - Test with screen reader (VoiceOver/NVDA)
  - Ensure all interactive elements are keyboard accessible
  - Verify focus indicators are visible
  - Test with browser accessibility tools
  - _Requirements: 6.5, 7.5_

- [ ] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
