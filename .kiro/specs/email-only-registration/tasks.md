# Implementation Plan: Registration with Telegram Integration

## Overview

This plan focuses ONLY on frontend implementation. Backend endpoints are assumed to be implemented separately.

---

## Phase 1: Cleanup and Preparation

- [x] 1. Remove optional fields from Signup form
  - Remove firstName field and its validation
  - Remove lastName field and its validation
  - Remove phoneNumber field and its validation
  - Remove promoCode field and its validation
  - Update SignupFormData interface to only include email, password, hasDataStorageConsent
  - Update form submission to only send required fields
  - Test that form renders with only email, password, and consent checkbox
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Create TypeScript types for Telegram integration
  - Create src/shared/api/types.ts if it doesn't exist
  - Define TelegramData interface (id, first_name, last_name?, username?, photo_url?, auth_date, hash)
  - Define EmailConfirmationRequest interface (token)
  - Define EmailConfirmationResponse interface (success, email)
  - Define LinkTelegramRequest interface (email, telegramData)
  - Define LinkTelegramResponse interface (accessToken, refreshToken, user)
  - Define LoginErrorTelegramRequired interface (error, message, email)
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 3. Setup environment variables
  - Add VITE_TELEGRAM_BOT_USERNAME to .env file
  - Create src/shared/config/env.ts if it doesn't exist
  - Export getTelegramBotUsername() function that reads from import.meta.env
  - Add validation that bot username is defined
  - _Requirements: 9.5_

---

## Phase 2: Email Confirmation with Email Return

- [x] 4. Create email confirmation API hook
  - Create src/features/auth/api/useEmailConfirmation.ts
  - Implement useMutation for POST /api/v1/email-confirmations
  - Accept token as parameter
  - Return user's email on success
  - Handle errors (invalid token, expired token, network errors)
  - _Requirements: 2.3, 2.4_

- [ ] 5. Update EmailConfirmation component
  - Update src/pages/auth/EmailConfirmation.tsx
  - Change to extract only token from URL (remove username extraction)
  - Use useEmailConfirmation hook instead of direct apiClient call
  - Add state for email storage
  - Update loading state to show "Confirming email..."
  - Update success state to store email and show Telegram widget
  - Update error state to show appropriate error messages
  - Remove "Go to Login" button from success state (user will auto-login after Telegram)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

---

## Phase 3: Telegram Integration

- [ ] 6. Create Telegram utility functions
  - Create src/features/auth/lib/telegram.ts
  - Implement loadTelegramWidget() function that loads script from telegram.org
  - Implement validateTelegramData() function that checks required fields
  - Implement getTelegramBotUsername() function that reads from env
  - Add TypeScript types for window.Telegram if needed
  - _Requirements: 5.1, 5.2, 5.4, 9.5_

- [ ] 7. Create link Telegram API hook
  - Create src/features/auth/api/useLinkTelegram.ts
  - Implement useMutation for POST /api/v1/users/link-telegram
  - Accept email and telegramData as parameters
  - Return accessToken, refreshToken, and user on success
  - Handle errors (invalid email, invalid hash, network errors)
  - _Requirements: 3.4, 3.5_

- [ ] 8. Create TelegramConnect component
  - Create src/features/auth/ui/TelegramConnect.tsx
  - Accept email, onSuccess, onError as props
  - Load Telegram widget script in useEffect
  - Render Telegram widget with bot username from env
  - Implement onTelegramAuth callback function
  - Validate telegramData structure
  - Call useLinkTelegram hook with email and telegramData
  - On success: store JWT tokens in localStorage and call onSuccess
  - On error: call onError with error message
  - Show loading state while linking
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 9. Integrate TelegramConnect into EmailConfirmation
  - Import TelegramConnect component
  - Render TelegramConnect when email is available
  - Implement onSuccess handler: store tokens, update auth state, redirect to /profile
  - Implement onError handler: show error message, allow retry
  - Add explanatory text: "Connect your Telegram account to complete registration"
  - _Requirements: 2.5, 3.1, 9.1, 9.3_

---

## Phase 4: Login Flow Updates

- [ ] 10. Update login API hook to handle TELEGRAM_REQUIRED
  - Update src/features/auth/api/useLogin.ts
  - Add error handling for 403 status with TELEGRAM_REQUIRED
  - Extract user's email from error response
  - Return email in error object
  - _Requirements: 4.1, 4.2_

- [ ] 11. Update Login component for Telegram requirement
  - Update src/features/auth/ui/Login.tsx
  - Add state for email and showTelegramWidget
  - Update onError handler to check for TELEGRAM_REQUIRED
  - When TELEGRAM_REQUIRED: extract email, set showTelegramWidget=true
  - Conditionally render TelegramConnect component when showTelegramWidget=true
  - Implement onSuccess handler for Telegram linking: store tokens, update auth state, redirect
  - Add explanatory text: "Please connect your Telegram account to complete your registration"
  - Keep existing error handling for other error types
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 11. Update Login component for Telegram requirement
  - Update src/features/auth/ui/Login.tsx
  - Add state for linkToken and showTelegramWidget
  - Update onError handler to check for TELEGRAM_REQUIRED
  - When TELEGRAM_REQUIRED: extract linkToken, set showTelegramWidget=true
  - Conditionally render TelegramConnect component when showTelegramWidget=true
  - Implement onSuccess handler for Telegram linking: store tokens, update auth state, redirect
  - Add explanatory text: "Please connect your Telegram account to complete your registration"
  - Keep existing error handling for other error types
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

---

## Phase 5: Testing and Polish

- [ ] 12. Add form validation tests
  - Test email format validation
  - Test password length validation (min 6 characters)
  - Test consent checkbox requirement
  - Test that only required fields are sent to API
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 13. Add email confirmation flow tests
  - Test token extraction from URL
  - Test API call with correct token
  - Test email storage in state
  - Test Telegram widget display after confirmation
  - Test error handling for invalid/expired tokens
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 14. Add Telegram integration tests
  - Test Telegram script loading
  - Test telegramData validation
  - Test link API call with correct data
  - Test JWT token storage after success
  - Test error handling for linking failures
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 15. Add login flow tests
  - Test TELEGRAM_REQUIRED error handling
  - Test Telegram widget display on login
  - Test auto-login after Telegram linking
  - Test normal login flow still works
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 16. Manual testing checklist
  - Test complete registration flow (signup → email → Telegram → auto-login)
  - Test login with incomplete registration (shows Telegram widget)
  - Test error scenarios (invalid token, invalid email, Telegram auth failure)
  - Test on mobile devices (Telegram widget should open Telegram app)
  - Test with users who don't have Telegram username (should use first_name)
  - Test network error handling at each step
  - Verify JWT tokens are stored correctly
  - Verify redirect to profile after successful registration
  - _Requirements: All_

- [ ] 17. Update error messages and UI polish
  - Ensure all error messages are user-friendly
  - Add loading states for all async operations
  - Add success animations/feedback
  - Ensure mobile responsive design
  - Test dark mode compatibility
  - Add accessibility attributes (aria-labels, etc.)
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

---

## Phase 6: Documentation

- [ ] 18. Update code documentation
  - Add JSDoc comments to TelegramConnect component
  - Add JSDoc comments to telegram utility functions
  - Add JSDoc comments to new API hooks
  - Document environment variables in README
  - Add inline comments for complex logic
  - _Requirements: Documentation_

- [ ] 19. Create developer guide
  - Document Telegram bot setup process
  - Document how to get bot username
  - Document environment variable configuration
  - Document testing with Telegram in development
  - Add troubleshooting section
  - _Requirements: Documentation_

---

## Notes

### Backend Dependencies

⚠️ **These endpoints must be implemented on backend before frontend can be fully tested:**

1. `POST /api/v1/users` - Registration (already exists, but verify it doesn't require optional fields)
2. `POST /api/v1/email-confirmations` - Email confirmation returning user's email
3. `POST /api/v1/users/link-telegram` - Telegram account linking with hash verification (accepts email + telegramData)
4. `POST /api/v1/login` - Login with TELEGRAM_REQUIRED error handling (returns user's email in error)

### Testing Strategy

- Unit tests for individual components and functions
- Integration tests for complete flows
- Manual testing for Telegram OAuth (requires real Telegram account)
- Test with different Telegram account states (with/without username)

### Telegram Bot Setup

Before starting implementation, ensure:

1. Telegram bot is created via @BotFather
2. Bot username is configured in environment variables
3. Bot domain is whitelisted in Telegram bot settings
