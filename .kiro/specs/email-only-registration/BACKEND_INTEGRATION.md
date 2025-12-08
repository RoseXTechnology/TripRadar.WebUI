# Backend Integration Notes

## Current Status

✅ **Backend is ready! Returns correct error format for TELEGRAM_REQUIRED**

Backend returns: `{ "errorCode": "TELEGRAM_REQUIRED", "email": "user@example.com" }`

Frontend has been updated to handle this format.

## Required Backend Changes

### 1. Login Endpoint - TELEGRAM_REQUIRED Error

**Endpoint:** `POST /api/v1/login` (or `/api/v1/tokens/sessions`)

**Current behavior:** ✅ Returns correct format

**Actual backend response:** When user has confirmed email but no Telegram linked:

```json
HTTP 403 Forbidden
{
  "errorCode": "TELEGRAM_REQUIRED",
  "email": "user@example.com"
}
```

**Frontend support:** Frontend now handles multiple formats:

- `errorCode: "TELEGRAM_REQUIRED"` (current backend format) ✅
- `type: "TELEGRAM_REQUIRED"` (RFC 7807 format)
- `error: "TELEGRAM_REQUIRED"` (legacy format)

**Key points:**

- Status code: 403 ✅
- `errorCode` field: `"TELEGRAM_REQUIRED"` ✅
- `email` field: user's email address ✅

### 2. Telegram Linking Endpoint

**Endpoint:** `POST /api/v1/internals/users/activation`

**Required behavior:** Accept `email` to identify the user

**Request format:**

```json
{
  "email": "user@example.com",
  "telegramData": {
    "id": 123456789,
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "photo_url": "https://...",
    "auth_date": 1234567890,
    "hash": "abc123..."
  }
}
```

**Response format:**

```json
HTTP 200 OK
{
  "accessToken": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": {
    "username": "johndoe",
    "email": "user@example.com",
    "telegramId": 123456789,
    ...
  }
}
```

## Frontend Implementation Status

✅ **Completed:**

- Error handling for TELEGRAM_REQUIRED in API interceptor (supports `errorCode` field)
- LoginError interface with `email` and `isTelegramRequired` fields
- TelegramConnect component uses `email` prop
- LinkTelegramRequest type uses `email` (no linkToken)
- Login component UI shows Telegram widget on TELEGRAM_REQUIRED error
- Auto-login after successful Telegram linking

⏳ **Ready for testing:**

- Manual testing of complete flow (Task 17)
- Automated tests (Tasks 12-15)

## Testing Checklist (After Backend Update)

### Manual Testing Steps:

1. **Create test user:**
   - Register with email/password
   - Confirm email
   - DO NOT link Telegram

2. **Test TELEGRAM_REQUIRED flow:**

   ```
   1. Go to /login
   2. Enter email and password
   3. Click "Login"
   4. Expected: See Telegram Login Widget (not error message)
   5. Click Telegram widget
   6. Authorize in Telegram
   7. Expected: Auto-login and redirect to /profile
   ```

3. **Verify error format:**
   - Open browser DevTools → Network tab
   - Attempt login with unlinked account
   - Check response:
     - Status: 403
     - Body contains: `type: "TELEGRAM_REQUIRED"` (or `error: "TELEGRAM_REQUIRED"` for legacy)
     - Body contains: `email: "user@example.com"`
     - Body contains: `detail: "..."` (or `message: "..."` for legacy)

4. **Verify Telegram linking:**
   - Check Network tab for `/api/v1/internals/users/activation` request
   - Verify request body contains `email` field
   - Verify response contains JWT tokens

### Edge Cases to Test:

- [ ] User with confirmed email but no Telegram → Shows widget
- [ ] User with unconfirmed email → Shows "confirm email" error
- [ ] User with confirmed email AND Telegram → Normal login
- [ ] Invalid credentials → Shows "invalid credentials" error
- [ ] Network error during Telegram linking → Shows error, allows retry
- [ ] Telegram auth cancelled by user → Shows error, allows retry

## Code Locations

**Error handling:**

- `src/shared/api/interceptors.ts` - Line ~158 (TELEGRAM_REQUIRED detection)

**Type definitions:**

- `src/shared/api/types.ts` - LoginErrorTelegramRequired interface
- `src/shared/api/types.ts` - LinkTelegramRequest interface

**Login hook:**

- `src/features/auth/api/useLogin.ts` - LoginError interface

**Telegram component:**

- `src/features/auth/ui/TelegramConnect.tsx` - Accepts email or linkToken

## Questions?

If backend implementation differs from this spec, please coordinate with frontend team to adjust the implementation.
