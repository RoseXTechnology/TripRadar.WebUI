import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TelegramConnect } from 'features/auth/ui/TelegramConnect';
import { ROUTES } from 'shared/config/routes';
import { getEmailFromUrlParams, getUsernameFromToken } from 'shared/lib';
import { useAuthStore } from 'shared/store/auth';

export const EmailConfirmed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState<string | null>(null);
  const [telegramError, setTelegramError] = useState<string>('');

  useEffect(() => {
    // Try to get email from URL parameter first
    const emailParam = getEmailFromUrlParams(searchParams);

    if (emailParam) {
      setEmail(emailParam);
      return;
    }

    // Fallback: try to get email from sessionStorage
    const storedEmail = sessionStorage.getItem('registration_email');
    if (storedEmail) {
      setEmail(storedEmail);
      return;
    }

    // If no email found, set email to null to trigger error display
    console.warn('⚠️ No email found in URL or sessionStorage');
    setEmail(null);
  }, [searchParams]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Hero-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10">
        <div className="w-full max-w-md space-y-6 md:space-y-8">
          {/* Success Card */}
          <div className="bg-surface dark:bg-surface-dark rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-outline dark:border-outline-dark p-6 md:p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <FaCheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-500 mx-auto" />
            </div>

            {/* Header */}
            <h1 className="text-2xl md:text-3xl font-bold text-content dark:text-content-dark mb-4">
              Email Confirmed!
            </h1>

            <p className="text-content-secondary dark:text-content-secondary-dark mb-6 text-sm md:text-base">
              Great! Your email has been successfully confirmed.
            </p>

            {/* Explanatory text */}
            <div className="bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-xl p-4 mb-6">
              <p className="text-sm text-content-secondary dark:text-content-secondary-dark font-medium">
                Connect your Telegram account to complete registration
              </p>
              <p className="text-xs text-content-muted dark:text-content-muted-dark mt-2">
                Your username will be automatically set from your Telegram profile
              </p>
            </div>

            {/* Telegram Connect Component */}
            {email ? (
              <TelegramConnect
                email={email}
                onSuccess={response => {
                  // Extract username from JWT token (this is the correct username from backend)
                  const usernameFromToken = getUsernameFromToken(response.token);

                  // Fallback to email part if token doesn't contain username
                  const username = usernameFromToken || response.email.split('@')[0];

                  // Transform API response to app user format
                  const appUser = {
                    username: username,
                    name: username,
                    email: response.email,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=6366f1&color=fff`,
                    subscription: 'free' as const,
                  };

                  // Update auth state with user data
                  login(appUser);

                  // Redirect to profile
                  navigate(ROUTES.PROFILE);
                }}
                onError={error => {
                  console.error('❌ Telegram linking error:', error);
                  setTelegramError(error);
                }}
              />
            ) : (
              <div className="bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-xl p-4">
                <p className="text-sm text-content dark:text-content-dark font-medium mb-2">
                  Registration Information Missing
                </p>
                <p className="text-xs text-content-secondary dark:text-content-secondary-dark mb-4">
                  Unable to retrieve your registration information. This may happen if you opened this page in a new
                  browser session.
                </p>
                <button
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Go to Login
                </button>
              </div>
            )}

            {/* Error message for Telegram linking */}
            {telegramError && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{telegramError}</p>
                <button
                  onClick={() => setTelegramError('')}
                  className="mt-2 text-xs text-red-700 dark:text-red-300 underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Additional Info */}
            <p className="mt-6 text-xs md:text-sm text-content-muted dark:text-content-muted-dark">
              After connecting Telegram, you'll be automatically logged in and ready to start planning your trips!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
