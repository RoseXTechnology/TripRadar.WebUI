# Requirements Document

## Introduction

This specification defines the TripRadar user registration flow with Telegram integration. Users register with email and password, confirm their email, then connect their Telegram account to obtain a username. The username is automatically extracted from the user's Telegram profile, eliminating the need for manual username selection.

## Glossary

- **System**: The TripRadar web application frontend
- **User**: A person registering for or using the TripRadar platform
- **Registration Form**: The UI component where users create new accounts
- **Email Confirmation**: The process of verifying a user's email address via a token sent by email
- **Telegram Integration**: The process of connecting a user's Telegram account to obtain their username
- **Username**: A unique identifier extracted from the user's Telegram account
- **linkToken**: A temporary token that connects the email confirmation session with Telegram linking
- **API Client**: The frontend service responsible for making HTTP requests to the backend
- **Auth Store**: The Zustand store managing authentication state in the frontend
- **Telegram Login Widget**: An embedded component from Telegram that handles OAuth authentication

## Requirements

### Requirement 1: Email-Only Registration Form

**User Story:** As a new user, I want to register using only my email and password, so that I can quickly create an account.

#### Acceptance Criteria

1. WHEN a user visits the registration page THEN the System SHALL display a form with email, password, and consent checkbox fields only
2. WHEN a user submits the registration form THEN the System SHALL send only email, password, and hasDataStorageConsent to the backend API
3. WHEN the registration form is rendered THEN the System SHALL NOT display username, firstName, lastName, phoneNumber, or promoCode fields
4. WHEN a user successfully registers THEN the System SHALL redirect to the email sent page
5. WHEN the backend returns an error THEN the System SHALL display the error message to the user

### Requirement 2: Email Confirmation with Email Return

**User Story:** As a registered user, I want to confirm my email address by clicking a link, so that I can proceed to connect my Telegram account.

#### Acceptance Criteria

1. WHEN a user completes registration THEN the System SHALL display a page instructing them to check their email
2. WHEN a user clicks the confirmation link in their email THEN the System SHALL extract only the token from the URL query parameters
3. WHEN the System has a confirmation token THEN the System SHALL call POST /api/v1/email-confirmations with the token
4. WHEN email confirmation succeeds THEN the System SHALL receive the user's email from the backend
5. WHEN the System receives the email THEN the System SHALL store it in component state and display the Telegram Login Widget

### Requirement 3: Telegram Account Connection

**User Story:** As a user who confirmed my email, I want to connect my Telegram account, so that my username can be automatically set from my Telegram profile.

#### Acceptance Criteria

1. WHEN email confirmation succeeds THEN the System SHALL display the Telegram Login Widget with the bot username
2. WHEN a user clicks the Telegram Login Widget THEN the System SHALL initiate the Telegram OAuth flow
3. WHEN Telegram OAuth succeeds THEN the System SHALL receive telegramData including id, first_name, username, and hash
4. WHEN the System receives telegramData THEN the System SHALL call POST /api/v1/users/link-telegram with email and telegramData
5. WHEN Telegram linking succeeds THEN the System SHALL store the JWT tokens and redirect to the profile page

### Requirement 4: Login with Telegram Requirement Handling

**User Story:** As a user who confirmed email but didn't connect Telegram, I want to be prompted to connect Telegram when I try to login, so that I can complete my registration.

#### Acceptance Criteria

1. WHEN a user enters email and password in the login form THEN the System SHALL send credentials to POST /api/v1/login
2. WHEN the backend returns error "TELEGRAM_REQUIRED" THEN the System SHALL extract the user's email from the response
3. WHEN the System receives "TELEGRAM_REQUIRED" error THEN the System SHALL display the Telegram Login Widget instead of an error message
4. WHEN a user connects Telegram after login attempt THEN the System SHALL call POST /api/v1/users/link-telegram and auto-login the user
5. WHEN login succeeds normally THEN the System SHALL store tokens and redirect to profile

### Requirement 5: Telegram Login Widget Integration

**User Story:** As a developer, I want a reusable Telegram Login Widget component, so that I can use it consistently across email confirmation and login flows.

#### Acceptance Criteria

1. WHEN the Telegram Widget is rendered THEN the System SHALL load the Telegram widget script from telegram.org
2. WHEN the Telegram Widget is rendered THEN the System SHALL configure it with the bot username from environment variables
3. WHEN a user authorizes through Telegram THEN the System SHALL receive a callback with telegramData
4. WHEN telegramData is received THEN the System SHALL validate that all required fields (id, first_name, auth_date, hash) are present
5. WHEN telegramData is invalid THEN the System SHALL display an error message to the user

### Requirement 6: TypeScript Type Safety

**User Story:** As a developer, I want TypeScript types for all new API endpoints, so that I can catch errors at compile time.

#### Acceptance Criteria

1. WHEN CreateUserRequest is used THEN the System SHALL enforce only email, password, and hasDataStorageConsent fields
2. WHEN EmailConfirmationRequest is used THEN the System SHALL enforce only the token field
3. WHEN LinkTelegramRequest is used THEN the System SHALL enforce email and telegramData fields
4. WHEN TelegramData type is used THEN the System SHALL enforce id, first_name, auth_date, and hash as required fields
5. WHEN API types are imported THEN the System SHALL use types from shared/api or define them locally

### Requirement 7: Error Handling

**User Story:** As a user encountering an error, I want clear feedback about what went wrong, so that I can take appropriate action.

#### Acceptance Criteria

1. WHEN the backend returns a 400 error THEN the System SHALL display the error message from the API response
2. WHEN the network request fails THEN the System SHALL display a generic network error message
3. WHEN an email is already registered THEN the System SHALL display a message suggesting login instead
4. WHEN Telegram linking fails THEN the System SHALL display the error and allow retry
5. WHEN an error occurs THEN the System SHALL log the error details to the console for debugging

### Requirement 8: Form Validation

**User Story:** As a user filling out the registration form, I want immediate feedback on validation errors, so that I can correct mistakes before submitting.

#### Acceptance Criteria

1. WHEN a user enters an invalid email format THEN the System SHALL display an error message below the email field
2. WHEN a user enters a password shorter than 6 characters THEN the System SHALL display a password length error
3. WHEN a user attempts to submit without checking the consent checkbox THEN the System SHALL prevent submission and show an error
4. WHEN a user corrects a validation error THEN the System SHALL remove the error message immediately
5. WHEN all required fields are valid THEN the System SHALL enable the submit button

### Requirement 9: Security and Data Management

**User Story:** As a developer, I want secure data handling, so that user data is protected.

#### Acceptance Criteria

1. WHEN an email is received from confirmation THEN the System SHALL store it only in component state, not in localStorage
2. WHEN a user navigates away from the confirmation page THEN the System SHALL clear the email from state
3. WHEN JWT tokens are received after Telegram linking THEN the System SHALL store them in localStorage using authStorage
4. WHEN telegramData is received THEN the System SHALL send it to the backend without modification for hash verification
5. WHEN the bot username is needed THEN the System SHALL read it from environment variables, not hardcode it
