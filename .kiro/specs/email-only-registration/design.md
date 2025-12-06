# Design Document: Registration with Telegram Integration

## Overview

This design document outlines the technical approach for implementing TripRadar's registration system with Telegram integration. Users register with email and password, confirm their email, then connect their Telegram account to automatically obtain a username from their Telegram profile.

The implementation involves:

- Simplified registration form (email + password only)
- Email confirmation with linkToken generation
- Telegram Login Widget integration
- New API endpoint for linking Telegram accounts
- Updated login flow to handle incomplete registrations

## Architecture

### High-Level Flow

```
User Registration Flow:
1. User fills registration form (email + password + consent)
2. Frontend validates input
3. POST /api/v1/users {email, password, hasDataStorageConsent}
4. Backend creates user (emailConfirmed=false, username=null)
5. Backend sends confirmation email with token
6. User clicks email link → /confirm-email?token=XXX
7. Frontend calls POST /api/v1/email-confirmations {token}
8. Backend confirms email, returns user email
9. Frontend shows Telegram Login Widget
10. User authorizes via Telegram
11. Frontend calls POST /api/v1/users/link-telegram {email, telegramData}
12. Backend verifies hash, saves username, returns JWT tokens
13. User is auto-logged in and redirected to profile
```

### Component Architecture (FSD)

```
src/
├── features/auth/
│   ├── ui/
│   │   ├── Signup.tsx              # Simplified form (email + password only)
│   │   ├── Login.tsx               # Updated to handle TELEGRAM_REQUIRED
│   │   ├── TelegramConnect.tsx     # NEW: Reusable Telegram Widget component
│   │   └── OAuthButtons.tsx        # Existing Google OAuth
│   ├── api/
│   │   ├── useRegister.ts          # Updated to remove optional fields
│   │   ├── useEmailConfirmation.ts # NEW: Hook for email confirmation
│   │   ├── useLinkTelegram.ts      # NEW: Hook for Telegram linking
│   │   └── useLogin.ts             # Updated to handle TELEGRAM_REQUIRED
│   └── lib/
│       └── telegram.ts             # NEW: Telegram integration utilities
├── pages/auth/
│   ├── EmailSent.tsx               # Existing
│   ├── EmailConfirmation.tsx       # UPDATED: New flow with linkToken + Telegram Widget
│   └── Login.tsx                   # UPDATED: Handle TELEGRAM_REQUIRED error
├── shared/
│   ├── api/
│   │   ├── types.ts                # NEW: Types for Telegram integration
│   │   └── index.ts                # API client
│   └── config/
│       └── env.ts                  # NEW: Environment variables (TELEGRAM_BOT_USERNAME)
└── app/
    └── router/routes.tsx           # Existing routes
```

## Components and Interfaces

### 1. Simplified Signup Component

**Location:** `src/features/auth/ui/Signup.tsx`

**Changes:**

- Remove firstName, lastName, phoneNumber, promoCode fields
- Keep only email, password, hasDataStorageConsent
- Update form validation
- Update API request payload

**Interface:**

```typescript
interface SignupFormData {
  email: string; // Required
  password: string; // Required
  hasDataStorageConsent: boolean; // Required
}
```

### 2. Updated Email Confirmation Component

**Location:** `src/pages/auth/EmailConfirmation.tsx`

**Changes:**

- Extract only token from URL (no username)
- Call POST /api/v1/email-confirmations {token}
- Receive and store user email in state
- Show Telegram Login Widget after success
- Handle Telegram callback and call link API

**Interface:**

```typescript
interface EmailConfirmationState {
  status: 'loading' | 'confirmed' | 'error';
  email: string | null;
  errorMessage: string;
}
```

### 3. NEW: Telegram Connect Component

**Location:** `src/features/auth/ui/TelegramConnect.tsx`

**Purpose:** Reusable component for Telegram Login Widget

**Props:**

```typescript
interface TelegramConnectProps {
  email: string;
  onSuccess: (tokens: { accessToken: string; refreshToken: string; user: User }) => void;
  onError: (error: string) => void;
}
```

**Implementation:**

- Load Telegram widget script
- Configure with bot username from env
- Handle onTelegramAuth callback
- Call POST /api/v1/users/link-telegram
- Emit success/error events

### 4. Updated Login Component

**Location:** `src/features/auth/ui/Login.tsx`

**Changes:**

- Handle TELEGRAM_REQUIRED error (403)
- Extract user email from error response
- Show Telegram Connect component instead of error
- Auto-login after successful Telegram linking

### 5. NEW: Telegram Integration Utilities

**Location:** `src/features/auth/lib/telegram.ts`

**Functions:**

```typescript
// Load Telegram widget script
export function loadTelegramWidget(): Promise<void>;

// Validate telegram data structure
export function validateTelegramData(data: unknown): data is TelegramData;

// Get bot username from env
export function getTelegramBotUsername(): string;
```

## Data Models

### API Request/Response Types

```typescript
// Registration
interface CreateUserRequest {
  email: string;
  password: string;
  hasDataStorageConsent: boolean;
}

interface CreateUserResponse {
  message: string;
}

// Email Confirmation
interface EmailConfirmationRequest {
  token: string;
}

interface EmailConfirmationResponse {
  success: true;
  email: string; // User's email for Telegram linking
}

// Telegram Linking
interface TelegramData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface LinkTelegramRequest {
  email: string;
  telegramData: TelegramData;
}

interface LinkTelegramResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    telegramId: number;
    // ... other user fields
  };
}

// Login
interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface LoginErrorTelegramRequired {
  error: 'TELEGRAM_REQUIRED';
  message: string;
  email: string;
}
```

## API Endpoints

### Frontend → Backend

```typescript
// 1. Registration
POST /api/v1/users
Body: { email, password, hasDataStorageConsent }
Response: { message: "Check your email" }

// 2. Email Confirmation
POST /api/v1/email-confirmations
Body: { token }
Response: { success: true, email: "user@example.com" }

// 3. Link Telegram
POST /api/v1/users/link-telegram
Body: { email, telegramData: { id, first_name, username, auth_date, hash, ... } }
Response: { accessToken, refreshToken, user }

// 4. Login
POST /api/v1/login
Body: { usernameOrEmail, password }
Response (Success): { accessToken, refreshToken, user }
Response (Telegram Required): 403 { error: "TELEGRAM_REQUIRED", email: "user@example.com" }
Response (Email Not Confirmed): 403 { error: "EMAIL_NOT_CONFIRMED" }
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system._

### Property 1: Registration request contains only required fields

_For any_ registration form submission, the API request payload should contain only email, password, and hasDataStorageConsent fields
**Validates: Requirements 1.2, 1.3**

### Property 2: Email confirmation returns user email

_For any_ successful email confirmation, the backend response should include the user's email
**Validates: Requirements 2.4**

### Property 3: Telegram data is sent unmodified

_For any_ Telegram OAuth callback, the telegramData should be sent to the backend without modification
**Validates: Requirements 9.4**

### Property 4: Email is stored in component state only

_For any_ email received from confirmation, it should be stored in component state and never in localStorage
**Validates: Requirements 9.1**

### Property 5: JWT tokens are stored after Telegram linking

_For any_ successful Telegram linking response, the JWT tokens should be stored in localStorage
**Validates: Requirements 9.3**

### Property 6: TELEGRAM_REQUIRED shows widget

_For any_ login response with error "TELEGRAM_REQUIRED", the Telegram Login Widget should be displayed
**Validates: Requirements 4.3**

### Property 7: Telegram widget loads bot username from env

_For any_ Telegram Widget render, the bot username should be read from environment variables
**Validates: Requirements 9.5**

### Property 8: Email validation errors are displayed

_For any_ invalid email format, an error message should be displayed below the email field
**Validates: Requirements 8.1**

### Property 9: API errors are logged

_For any_ API error, error details should be logged to the console
**Validates: Requirements 7.5**

## Error Handling

### Registration Errors

| Error Type           | HTTP Status | Handling                                                    |
| -------------------- | ----------- | ----------------------------------------------------------- |
| Invalid email format | 400         | Display validation error below email field                  |
| Email already exists | 400         | Display "Email already registered. Try logging in instead." |
| Weak password        | 400         | Display password requirements                               |
| Missing consent      | 400         | Display "You must agree to continue"                        |
| Network error        | -           | Display "Network error. Please try again."                  |
| Server error         | 500         | Display "Server error. Please try again later."             |

### Email Confirmation Errors

| Error Type        | HTTP Status | Handling                                       |
| ----------------- | ----------- | ---------------------------------------------- |
| Invalid token     | 400         | Display "Invalid or expired confirmation link" |
| Token expired     | 400         | Display "Link expired. Please register again"  |
| Already confirmed | 400         | Display "Email already confirmed"              |
| Network error     | -           | Display "Network error. Please try again."     |

### Telegram Linking Errors

| Error Type    | HTTP Status | Handling                                                |
| ------------- | ----------- | ------------------------------------------------------- |
| Invalid email | 403         | Display "Session expired. Please try again"             |
| Invalid hash  | 403         | Display "Telegram verification failed. Please try again |
| Network error | -           | Display "Network error. Please try again."              |

### Login Errors

| Error Type          | HTTP Status | Handling                                   |
| ------------------- | ----------- | ------------------------------------------ |
| Invalid credentials | 401         | Display "Invalid email or password"        |
| Email not confirmed | 403         | Display "Please confirm your email first"  |
| Telegram required   | 403         | Show Telegram Login Widget with linkToken  |
| Network error       | -           | Display "Network error. Please try again." |

## Testing Strategy

### Unit Testing

**Test Coverage:**

- Signup form validation (email, password, consent)
- Email confirmation flow (token extraction, API call, linkToken storage)
- Telegram widget integration (script loading, callback handling)
- Login flow (TELEGRAM_REQUIRED handling)
- Error message display

**Example Unit Tests:**

```typescript
describe('Signup Form', () => {
  it('should only send email, password, and consent', () => {
    // Verify no optional fields in request
  });

  it('should validate email format', () => {
    // Test email validation
  });
});

describe('Email Confirmation', () => {
  it('should extract token from URL', () => {
    // Test token extraction
  });

  it('should store email in state', () => {
    // Test email storage
  });

  it('should show Telegram widget after confirmation', () => {
    // Test widget display
  });
});

describe('Telegram Connect', () => {
  it('should load Telegram script', () => {
    // Test script loading
  });

  it('should call link API with correct data', () => {
    // Test API call
  });
});
```

### Integration Testing

**Test Scenarios:**

- Complete registration flow (signup → email → Telegram → auto-login)
- Login with incomplete registration (shows Telegram widget)
- Error handling for each step
- Token expiration scenarios

## Environment Variables

```bash
# Frontend .env
VITE_TELEGRAM_BOT_USERNAME=tripradar_bot
VITE_API_BASE_URL=https://api.tripradar.io
```

## Security Considerations

1. **Email in State:**
   - Stored in component state, not localStorage
   - Used only for Telegram linking
   - No sensitive data exposure

2. **Telegram Hash Verification:**
   - Backend MUST verify hash using Bot Token
   - Frontend sends data unmodified
   - Bot Token NEVER exposed to frontend

3. **JWT Token Storage:**
   - Stored in localStorage after successful Telegram linking
   - Includes refresh token for session management

4. **HTTPS Only:**
   - All API calls must use HTTPS
   - Telegram widget requires HTTPS

## Implementation Notes

### Telegram Widget Integration

The Telegram Login Widget is loaded dynamically:

```html
<script
  async
  src="https://telegram.org/js/telegram-widget.js?22"
  data-telegram-login="tripradar_bot"
  data-size="large"
  data-onauth="onTelegramAuth(user)"
  data-request-access="write"
></script>
```

The `onTelegramAuth` callback receives:

```javascript
{
  id: 123456789,
  first_name: "John",
  last_name: "Doe",
  username: "johndoe",
  photo_url: "https://...",
  auth_date: 1234567890,
  hash: "abc123..."
}
```

### Backend Requirements

⚠️ **BACKEND MUST IMPLEMENT:**

1. **Email Return on Confirmation:**
   - Return user's email after successful email confirmation
   - Email used to identify user for Telegram linking

2. **Email Validation on Link:**
   - Verify email exists in database
   - Verify email is confirmed
   - Find userId associated with email

3. **Telegram Hash Verification:**
   - Verify hash using Bot Token
   - Prevent replay attacks
   - Check auth_date freshness

4. **Username Extraction:**
   - Extract username from Telegram data
   - Handle missing username (use first_name + id)
   - Ensure username uniqueness

## Migration from Current Implementation

### Changes Required:

1. **Signup.tsx:**
   - Remove firstName, lastName, phoneNumber, promoCode fields
   - Remove from form state
   - Remove from validation
   - Remove from API call

2. **EmailConfirmation.tsx:**
   - Change API call from GET to POST
   - Remove username from URL params
   - Add email state
   - Add Telegram Widget component
   - Handle Telegram callback

3. **Login.tsx:**
   - Add TELEGRAM_REQUIRED error handling
   - Add Telegram Widget display
   - Handle auto-login after Telegram linking

4. **New Files:**
   - `TelegramConnect.tsx` - Reusable widget component
   - `telegram.ts` - Utility functions
   - `useLinkTelegram.ts` - API hook
   - `useEmailConfirmation.ts` - API hook
