# Team Discussion: Registration Flow Improvements

## Context

We are improving the registration flow with enhanced password validation, better error handling, and analytics. Most decisions have been made, but one question requires team discussion before implementation.

## Decided Items ✅

1. **Password Validation:** 9+ characters, uppercase, digit, special character
2. **Form Type:** Single-page (remove multi-step components)
3. **Telegram:** Mandatory for registration
4. **OAuth:** Google only
5. **Email Exists Error:** Show error + "Login" button + "Forgot Password?" link
6. **CAPTCHA:** Not needed yet
7. **2FA:** Not needed yet
8. **Onboarding:** None, redirect to dashboard
9. **Analytics:** Google Analytics 4 with full funnel tracking

## Open Question for Discussion

### Email Confirmation - Resend Functionality

**Question:** Should users be able to resend confirmation emails?

**Context:**

- User didn't receive email
- Email went to spam folder
- Confirmation token expired
- User closed browser and lost the email

**Current Flow:**

1. User registers → sees "Check your email" page (EmailSent.tsx)
2. User clicks link in email → confirms email → connects Telegram
3. If user never receives email → stuck, must register again with different email

**Options:**

#### Option A: Add Resend Button (Recommended)

**Implementation:**

- Add "Resend confirmation email" button on EmailSent.tsx
- Add cooldown timer (60 seconds) to prevent spam
- Backend endpoint: POST /api/v1/email-confirmations/resend
- Store email in session storage for resend

**Pros:**

- Better user experience
- Reduces support tickets
- Handles spam folder issues
- Handles token expiration gracefully

**Cons:**

- Requires backend endpoint
- Need to store email temporarily
- Potential for abuse (rate limiting needed)

**UI Mockup:**

```
┌─────────────────────────────────────┐
│  📧 Check your email                │
│                                     │
│  We've sent a confirmation link     │
│  to your email address.             │
│                                     │
│  Didn't receive it?                 │
│  [Resend Email] (available in 60s)  │
│                                     │
│  [Back to Login]                    │
└─────────────────────────────────────┘
```

#### Option B: Add Resend on Error Page

**Implementation:**

- No resend on EmailSent page
- If token expired → show error with resend option
- Only offer resend when user encounters error

**Pros:**

- Simpler initial flow
- Only adds complexity when needed
- Less potential for abuse

**Cons:**

- User must wait for error to get help
- Doesn't help with spam folder issues
- Worse UX for common case

#### Option C: No Resend (Current)

**Implementation:**

- No resend functionality
- User must register again if email not received

**Pros:**

- Simplest implementation
- No backend changes needed
- No abuse potential

**Cons:**

- Poor user experience
- Increases support burden
- Users may create multiple accounts
- Doesn't handle spam/expiration

**Option D: Automatic Resend on Login Attempt
**Implementation:\*\*

- User tries to login with unconfirmed email
- System detects unconfirmed status
- Automatically sends new confirmation email
- Shows message: "We've sent a new confirmation link"

**Pros:**

- No UI changes to registration flow
- Natural recovery path
- Handles forgotten confirmations

**Cons:**

- User must remember to try logging in
- Less discoverable
- Potential for confusion

## Technical Considerations

### Backend Requirements (for Option A or D)

**New Endpoint:**

```typescript
POST /api/v1/email-confirmations/resend
Body: { email: string }
Response: { message: "Confirmation email sent", expiresIn: 3600 }
```

**Backend Logic:**

1. Verify email exists in database
2. Check if email already confirmed (return error if yes)
3. Check rate limit (max 3 resends per hour per email)
4. Generate new confirmation token
5. Invalidate old token
6. Send new confirmation email
7. Return success

**Rate Limiting:**

- Max 3 resend requests per email per hour
- Return 429 Too Many Requests if exceeded
- Frontend shows: "Too many requests. Please try again in X minutes"

### Frontend Implementation (for Option A)

**EmailSent.tsx Changes:**

```typescript
const [canResend, setCanResend] = useState(false);
const [countdown, setCountdown] = useState(60);
const [email, setEmail] = useState('');

useEffect(() => {
  // Get email from navigation state or session storage
  const storedEmail = sessionStorage.getItem('registration_email');
  setEmail(storedEmail || '');

  // Start countdown
  const timer = setInterval(() => {
    setCountdown(prev => {
      if (prev <= 1) {
        setCanResend(true);
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

const handleResend = async () => {
  try {
    await resendConfirmationEmail(email);
    toast.success('Confirmation email sent!');
    setCanResend(false);
    setCountdown(60);
  } catch (error) {
    toast.error('Failed to resend email. Please try again.');
  }
};
```

### Security Considerations

**Email Storage:**

- Store email in sessionStorage (not localStorage)
- Clear on page unload
- Never store password

**Rate Limiting:**

- Backend: 3 requests per hour per email
- Frontend: 60 second cooldown between requests
- Track by IP address on backend

**Token Management:**

- Invalidate old token when new one generated
- Set expiration time (24 hours recommended)
- One token active per email at a time

## Recommendation

**Recommended: Option A (Add Resend Button)**

**Reasoning:**

1. **Best UX:** Helps users immediately when they need it
2. **Reduces Support:** Handles common issues (spam, delays)
3. **Industry Standard:** Most apps have this feature
4. **Manageable Risk:** Rate limiting prevents abuse
5. **Future-proof:** Foundation for other email features

**Implementation Priority:** Medium

- Not blocking for MVP
- Can be added in iteration 2
- Backend endpoint needed

## Decision Needed

**Please discuss and decide:**

1. Which option to implement (A, B, C, or D)?
2. If Option A: What cooldown time (60s, 120s)?
3. If Option A: What rate limit (3/hour, 5/hour)?
4. Token expiration time (24h, 48h, 7 days)?
5. Should this be in MVP or iteration 2?

## Next Steps

Once decision is made:

1. Update requirements.md with chosen option
2. Update design.md with implementation details
3. Add tasks to tasks.md
4. Coordinate with backend team for endpoint
5. Implement frontend changes

---

**Status:** 🟡 Awaiting Team Decision

**Last Updated:** 2024-12-08
