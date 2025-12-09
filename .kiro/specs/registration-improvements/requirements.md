# Requirements Document: Registration Flow Improvements

## Introduction

This specification defines improvements to the TripRadar user registration flow, focusing on enhanced password validation, better error handling, and analytics integration. The registration maintains the existing email + Telegram integration while adding stricter security requirements and improved user experience.

## Glossary

- **System**: The TripRadar web application frontend
- **User**: A person registering for or using the TripRadar platform
- **Registration Form**: The single-page UI component where users create new accounts
- **Password Validation**: Client-side validation enforcing password strength requirements
- **Error Alert**: A UI component displaying error messages with contextual actions
- **Analytics Event**: A tracked user action sent to Google Analytics 4
- **Registration Funnel**: The sequence of steps from form view to successful registration
- **Backend API**: The TripRadar backend service at api-dev.tripradar.io
- **GA4**: Google Analytics 4, the analytics platform for tracking user behavior

## Requirements

### Requirement 1: Enhanced Password Validation

**User Story:** As a user creating an account, I want clear password requirements, so that I can create a secure password that meets system standards.

#### Acceptance Criteria

1. WHEN a user enters a password THEN the System SHALL validate it has at least 9 characters
2. WHEN a user enters a password THEN the System SHALL validate it contains at least one digit
3. WHEN a user enters a password THEN the System SHALL validate it contains at least one special character
4. WHEN a user enters a password THEN the System SHALL validate it contains at least one uppercase letter
5. WHEN password validation fails THEN the System SHALL display specific error messages indicating which requirements are not met

### Requirement 2: Improved Error Handling for Email Already Registered

**User Story:** As a user who accidentally tries to register with an existing email, I want helpful guidance, so that I can quickly access my account or recover my password.

#### Acceptance Criteria

1. WHEN the backend returns "email already exists" error THEN the System SHALL display a user-friendly error alert
2. WHEN the email exists error is shown THEN the System SHALL display a "Login" button that redirects to the login page
3. WHEN the email exists error is shown THEN the System SHALL display a "Forgot Password?" link
4. WHEN a user clicks the "Login" button THEN the System SHALL navigate to the login page with the email pre-filled
5. WHEN a user clicks "Forgot Password?" THEN the System SHALL navigate to the password reset page with the email pre-filled

### Requirement 3: Centralized Error Display Component

**User Story:** As a user encountering errors, I want consistent and clear error messages, so that I understand what went wrong and how to fix it.

#### Acceptance Criteria

1. WHEN any API error occurs THEN the System SHALL display errors in a consistent alert component
2. WHEN an error alert is displayed THEN the System SHALL show an appropriate icon (warning, error, info)
3. WHEN an error alert is displayed THEN the System SHALL use color coding (red for errors, yellow for warnings)
4. WHEN an error has actionable steps THEN the System SHALL display relevant action buttons
5. WHEN a user dismisses an error alert THEN the System SHALL remove it from view

### Requirement 4: Backend Error Message Mapping

**User Story:** As a developer, I want to map backend error codes to user-friendly messages, so that users receive helpful feedback instead of technical errors.

#### Acceptance Criteria

1. WHEN the backend returns an error code THEN the System SHALL map it to a predefined user-friendly message
2. WHEN the backend returns "EMAIL_ALREADY_EXISTS" THEN the System SHALL display "This email is already registered"
3. WHEN the backend returns "WEAK_PASSWORD" THEN the System SHALL display password requirement details
4. WHEN the backend returns "INVALID_EMAIL" THEN the System SHALL display "Please enter a valid email address"
5. WHEN the backend returns an unmapped error THEN the System SHALL display a generic error message and log the original error

### Requirement 5: Remove Unused Multi-Step Components

**User Story:** As a developer, I want to remove unused code, so that the codebase remains clean and maintainable.

#### Acceptance Criteria

1. WHEN the codebase is reviewed THEN the System SHALL NOT contain EmailStep.tsx component
2. WHEN the codebase is reviewed THEN the System SHALL NOT contain DetailsStep.tsx component
3. WHEN the codebase is reviewed THEN the System SHALL NOT contain ConfirmationStep.tsx component
4. WHEN the codebase is reviewed THEN the System SHALL NOT import or reference deleted step components
5. WHEN the registration form is rendered THEN the System SHALL use only the single-page Signup.tsx component

### Requirement 6: Google Analytics 4 Integration

**User Story:** As a product manager, I want to track the registration funnel, so that I can identify where users drop off and optimize the flow.

#### Acceptance Criteria

1. WHEN a user views the registration page THEN the System SHALL send "registration_page_viewed" event to GA4
2. WHEN a user submits the registration form THEN the System SHALL send "registration_form_submitted" event to GA4
3. WHEN registration succeeds THEN the System SHALL send "registration_email_sent" event to GA4
4. WHEN a user confirms their email THEN the System SHALL send "email_confirmed" event to GA4
5. WHEN a user links Telegram THEN the System SHALL send "telegram_linked" event to GA4

### Requirement 7: Registration Funnel Completion Tracking

**User Story:** As a product manager, I want to track successful registrations, so that I can measure conversion rates.

#### Acceptance Criteria

1. WHEN a user completes all registration steps THEN the System SHALL send "registration_completed" event to GA4
2. WHEN "registration_completed" is sent THEN the System SHALL include user properties (registration_method: "email" or "google")
3. WHEN a registration error occurs THEN the System SHALL send "registration_error" event with error type
4. WHEN a user abandons registration THEN the System SHALL send "registration_abandoned" event with last completed step
5. WHEN analytics events are sent THEN the System SHALL NOT include personally identifiable information (PII)

### Requirement 8: Password Visibility Toggle

**User Story:** As a user creating a password, I want to toggle password visibility, so that I can verify I typed it correctly.

#### Acceptance Criteria

1. WHEN the password field is rendered THEN the System SHALL display an eye icon button
2. WHEN a user clicks the eye icon THEN the System SHALL toggle password visibility
3. WHEN password is visible THEN the System SHALL display an "eye-slash" icon
4. WHEN password is hidden THEN the System SHALL display an "eye" icon
5. WHEN password visibility changes THEN the System SHALL maintain cursor position in the input field

### Requirement 9: Form Validation Feedback

**User Story:** As a user filling out the registration form, I want immediate validation feedback, so that I can correct errors before submitting.

#### Acceptance Criteria

1. WHEN a user types in the email field THEN the System SHALL validate email format in real-time
2. WHEN a user types in the password field THEN the System SHALL validate password requirements in real-time
3. WHEN validation fails THEN the System SHALL display error messages below the respective field
4. WHEN validation passes THEN the System SHALL remove error messages immediately
5. WHEN all fields are valid THEN the System SHALL enable the submit button

### Requirement 10: Loading States and Feedback

**User Story:** As a user submitting the registration form, I want visual feedback, so that I know the system is processing my request.

#### Acceptance Criteria

1. WHEN a user submits the form THEN the System SHALL disable the submit button
2. WHEN the form is submitting THEN the System SHALL display a loading spinner on the submit button
3. WHEN the form is submitting THEN the System SHALL change button text to "Creating account..."
4. WHEN the API request completes THEN the System SHALL re-enable the submit button
5. WHEN the API request fails THEN the System SHALL display the error and allow retry

### Requirement 11: Accessibility Compliance

**User Story:** As a user with accessibility needs, I want the registration form to be accessible, so that I can register independently.

#### Acceptance Criteria

1. WHEN the form is rendered THEN the System SHALL include proper ARIA labels for all inputs
2. WHEN validation errors occur THEN the System SHALL announce errors to screen readers
3. WHEN the form is navigated with keyboard THEN the System SHALL show clear focus indicators
4. WHEN error messages are displayed THEN the System SHALL associate them with their input fields using aria-describedby
5. WHEN the submit button is disabled THEN the System SHALL include aria-disabled attribute

### Requirement 12: Error Logging for Debugging

**User Story:** As a developer, I want detailed error logs, so that I can debug issues quickly.

#### Acceptance Criteria

1. WHEN any error occurs THEN the System SHALL log error details to the browser console
2. WHEN logging errors THEN the System SHALL include timestamp, error type, and error message
3. WHEN API errors occur THEN the System SHALL log the HTTP status code and response body
4. WHEN validation errors occur THEN the System SHALL log which validation rules failed
5. WHEN errors are logged THEN the System SHALL NOT log sensitive user data (passwords, tokens)
