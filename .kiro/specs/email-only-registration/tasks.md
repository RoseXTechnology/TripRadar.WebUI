# Implementation Plan

- [x] 1. Update TypeScript types from Swagger
  - Update package.json with correct Swagger URL (already done)
  - Run npm run generate-types to regenerate types
  - Verify CreateUserRequest no longer has username field
  - Verify CreateUserRequest has optional firstName, lastName, phoneNumber, promoCode fields
  - Update type exports in src/shared/api/index.ts if needed
  - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 2. Update Signup form component
  - Remove username field from form UI
  - Remove username from form validation schema
  - Remove username from SignupFormData interface
  - Add optional firstName field with label "First Name (optional)"
  - Add optional lastName field with label "Last Name (optional)"
  - Add optional phoneNumber field with label "Phone Number (optional)"
  - Add optional promoCode field with label "Promo Code (optional)"
  - Update form submission to exclude username from API request
  - Update form submission to include optional fields when filled
  - Test that form renders without username field
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3_

- [x] 2.1 Write property test for registration request structure
  - **Property 1: Registration request excludes username**
  - **Validates: Requirements 1.2, 1.3**

- [x] 2.2 Write property test for optional fields inclusion
  - **Property 3: Optional fields are included when filled**
  - **Validates: Requirements 2.2**

- [x] 2.3 Write property test for promo code inclusion
  - **Property 5: Promo code is included when provided**
  - **Validates: Requirements 3.2**

- [x] 3. Update registration API mutation
  - Update useRegisterMutation to use new CreateUserRequest type
  - Remove username from mutation payload
  - Add optional fields to mutation payload (firstName, lastName, phoneNumber, promoCode)
  - Handle backend response that may include auto-generated username
  - Update error handling to display backend error messages
  - _Requirements: 1.2, 1.5, 2.2, 3.2, 3.4_

- [x] 3.1 Write property test for API error display
  - **Property 2: API errors are displayed to users**
  - **Validates: Requirements 1.5, 9.1**

- [x] 3.2 Write property test for promo code error handling
  - **Property 6: Promo code errors are displayed**
  - **Validates: Requirements 3.4**

- [x] 4. Create email confirmation handler component
  - Create new component src/pages/auth/EmailConfirmation.tsx
  - Extract username and token from URL query parameters
  - Call GET /api/v1/users/{username}/email-confirmations?token={token}
  - Handle 302 redirect response
  - Display success message on confirmation
  - Display error message on failure with instructions
  - Add "Go to Login" button on success
  - _Requirements: 4.2, 4.3, 4.4, 4.5_

- [x] 4.1 Write property test for confirmation error handling
  - **Property 7: Email confirmation errors are handled**
  - **Validates: Requirements 4.4**

- [x] 5. Update routing for email confirmation
  - Add route /confirm-email in src/app/router/routes.tsx
  - Map route to EmailConfirmation component
  - Ensure route accepts query parameters (username, token)
  - Test navigation to confirmation page
  - _Requirements: 4.2_

- [ ] 6. Update Login component
  - Update placeholder text to "Enter your email or username"
  - Update label to emphasize email login
  - Keep usernameOrEmail field (backend accepts both)
  - Update EmailNotConfirmed error handling
  - Add link to resend confirmation email (optional)
  - _Requirements: 5.1, 5.2, 5.5_

- [ ] 6.1 Write property test for email acceptance in login
  - **Property 8: Email format is accepted in login**
  - **Validates: Requirements 5.1**

- [ ] 6.2 Write property test for token storage after login
  - **Property 9: Login tokens are stored**
  - **Validates: Requirements 5.3**

- [ ] 6.3 Write property test for username storage in auth state
  - **Property 10: Username from login is stored in state**
  - **Validates: Requirements 5.4**

- [ ] 7. Update OAuth handler
  - Update src/features/auth/lib/oauth.ts
  - Remove username extraction logic from Google profile
  - Backend will auto-generate username from email
  - Keep firstName and lastName extraction from Google profile
  - Update user object creation to not include username initially
  - Store username from backend response after OAuth
  - _Requirements: 7.2, 7.3, 7.4_

- [ ] 7.1 Write property test for OAuth token storage
  - **Property 11: OAuth tokens are stored**
  - **Validates: Requirements 7.3**

- [ ] 7.2 Write property test for Google profile data extraction
  - **Property 12: Google profile data is extracted**
  - **Validates: Requirements 7.4**

- [ ] 8. Add form validation for new fields
  - Add email format validation with regex
  - Add password length validation (min 6 characters)
  - Add optional field validation (firstName, lastName, phoneNumber)
  - Add phone number format validation (if phoneNumber provided)
  - Display validation errors below respective fields
  - Clear validation errors when user corrects input
  - Enable submit button only when all required fields are valid
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 8.1 Write property test for invalid email validation
  - **Property 13: Invalid email formats show errors**
  - **Validates: Requirements 8.1**

- [ ] 8.2 Write property test for validation error clearing
  - **Property 14: Validation errors clear when corrected**
  - **Validates: Requirements 8.4**

- [ ] 8.3 Write property test for submit button state
  - **Property 15: Submit button enabled when form valid**
  - **Validates: Requirements 8.5**

- [ ] 8.4 Write property test for optional field validation
  - **Property 4: Optional field validation errors are shown**
  - **Validates: Requirements 2.5**

- [ ] 9. Implement comprehensive error handling
  - Handle 400 errors (validation, duplicate email, invalid promo)
  - Handle 401 errors (invalid credentials)
  - Handle 404 errors (user not found)
  - Handle 500 errors (server errors)
  - Handle network errors (fetch failures)
  - Display user-friendly error messages for each error type
  - Log all errors to console for debugging
  - Add error message mapping for common errors
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 9.1 Write property test for error logging
  - **Property 16: Error logging to console**
  - **Validates: Requirements 9.5**

- [ ] 10. Setup property-based testing infrastructure
  - Install fast-check library: npm install --save-dev fast-check
  - Install @types/fast-check if needed
  - Create test utilities in src/shared/lib/test-utils/
  - Create custom generators for email, password, user data
  - Configure Vitest to run property tests
  - Set minimum iterations to 100 for all property tests
  - _Requirements: Testing Strategy_

- [ ] 11. Write unit tests for components
  - Test Signup component renders without username field
  - Test Signup component includes optional fields
  - Test form submission excludes username
  - Test form submission includes optional fields when filled
  - Test EmailConfirmation component handles success
  - Test EmailConfirmation component handles errors
  - Test Login component accepts email
  - Test OAuth handler extracts Google profile data
  - _Requirements: Testing Strategy_

- [ ] 12. Update EmailSent page (if needed)
  - Review EmailSent.tsx for any username references
  - Update messaging to be email-focused
  - Ensure "Back to Login" link works
  - _Requirements: 4.1_

- [ ] 13. Update auth store initialization
  - Review src/shared/store/auth.ts
  - Ensure initializeAuth handles auto-generated usernames
  - Update user object creation to work without username initially
  - Username will be loaded from JWT or profile API
  - _Requirements: 5.4_

- [ ] 14. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Manual testing and bug fixes
  - Test complete registration flow (form → API → email sent)
  - Test email confirmation flow (link → API → success)
  - Test login with email
  - Test login with auto-generated username
  - Test Google OAuth flow
  - Test error scenarios (duplicate email, invalid promo, network errors)
  - Test form validation for all fields
  - Test on mobile devices (responsive design)
  - Fix any bugs discovered during testing
  - _Requirements: All_

- [ ] 16. Update documentation
  - Update README.md if registration flow is documented
  - Update any developer documentation
  - Add comments to complex code sections
  - Document new optional fields in code
  - _Requirements: Documentation_

- [ ] 17. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
