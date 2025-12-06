# Registration with Telegram Integration - Summary

## 🎯 Goal

Implement email + Telegram registration flow where users:

1. Register with email + password
2. Confirm email via link
3. Connect Telegram account to get username
4. Auto-login after Telegram connection

## 📋 What Needs to Be Done (Frontend)

### 1. Cleanup Signup Form ✂️

- **Remove** optional fields: firstName, lastName, phoneNumber, promoCode
- Keep only: email, password, consent checkbox
- Update API call to send only required fields

### 2. Update Email Confirmation 📧

- Change API from `GET /users/{username}/email-confirmations` to `POST /email-confirmations`
- Remove username from URL params (only token)
- Receive and store user's `email` from backend
- Show Telegram Login Widget after confirmation

### 3. Create Telegram Integration 📱

**New Component:** `TelegramConnect.tsx`

- Load Telegram widget script
- Configure with bot username from env
- Handle Telegram OAuth callback
- Call `POST /users/link-telegram` with email + telegramData
- Store JWT tokens and auto-login

**New Utilities:** `telegram.ts`

- `loadTelegramWidget()` - Load script
- `validateTelegramData()` - Validate structure
- `getTelegramBotUsername()` - Read from env

**New API Hooks:**

- `useEmailConfirmation()` - POST /email-confirmations
- `useLinkTelegram()` - POST /users/link-telegram

### 4. Update Login Flow 🔐

- Handle `TELEGRAM_REQUIRED` error (403)
- Extract user's `email` from error response
- Show Telegram Widget instead of error message
- Auto-login after Telegram connection

### 5. Environment Setup 🔧

- Add `VITE_TELEGRAM_BOT_USERNAME` to .env
- Create `src/shared/config/env.ts`

## 🔄 User Flows

### Happy Path

```
Signup → Email Sent → Click Email Link → Confirm Email →
Connect Telegram → Auto-Login → Profile
```

### Incomplete Registration

```
Signup → Email Sent → Click Email Link → Confirm Email →
Close Browser → Later: Login → Shows Telegram Widget →
Connect Telegram → Auto-Login → Profile
```

## 🚀 Quick Start

1. **Read the flow diagram:** `.kiro/specs/email-only-registration/flow-diagram.md`
2. **Review requirements:** `.kiro/specs/email-only-registration/requirements.md`
3. **Check design:** `.kiro/specs/email-only-registration/design.md`
4. **Follow tasks:** `.kiro/specs/email-only-registration/tasks.md`

## ⚠️ Backend Dependencies

These endpoints must be implemented on backend:

1. ✅ `POST /api/v1/users` - Registration (already exists)
2. 🔴 `POST /api/v1/email-confirmations` - Returns user's email
3. 🔴 `POST /api/v1/users/link-telegram` - Verifies hash, saves username, returns JWT
4. 🔴 `POST /api/v1/login` - Returns TELEGRAM_REQUIRED error with user's email

## 📦 New Files to Create

```
src/
├── features/auth/
│   ├── ui/
│   │   └── TelegramConnect.tsx          # NEW
│   ├── api/
│   │   ├── useEmailConfirmation.ts      # NEW
│   │   └── useLinkTelegram.ts           # NEW
│   └── lib/
│       └── telegram.ts                  # NEW
└── shared/
    ├── api/
    │   └── types.ts                     # NEW (or update existing)
    └── config/
        └── env.ts                       # NEW
```

## 🔧 Files to Update

```
src/
├── features/auth/
│   ├── ui/
│   │   ├── Signup.tsx                   # Remove optional fields
│   │   └── Login.tsx                    # Handle TELEGRAM_REQUIRED
│   └── api/
│       └── useLogin.ts                  # Handle TELEGRAM_REQUIRED error
└── pages/auth/
    └── EmailConfirmation.tsx            # New API + Telegram Widget
```

## 🧪 Testing Checklist

- [ ] Signup with only email + password works
- [ ] Email confirmation returns user's email
- [ ] Telegram widget loads and displays
- [ ] Telegram OAuth callback works
- [ ] JWT tokens stored after Telegram linking
- [ ] Auto-login after Telegram connection
- [ ] Login shows Telegram widget for incomplete registration
- [ ] Error handling for all failure scenarios
- [ ] Mobile responsive (Telegram opens app)
- [ ] Works with users without Telegram username

## 🔐 Security Notes

1. **Email** - Stored in component state only during linking flow
2. **Bot Token** - NEVER on frontend, only backend
3. **Telegram Hash** - Verified on backend
4. **JWT Tokens** - Stored in localStorage after success

## 📚 Resources

- [Telegram Login Widget Docs](https://core.telegram.org/widgets/login)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- Flow Diagram: `flow-diagram.md`
