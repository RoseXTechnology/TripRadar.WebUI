import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLinkTelegramMutation } from 'entities/auth';
import { convertTelegramDataToApiFormat, validateTelegramData } from 'features/auth/lib/telegram';
import type { TelegramData } from 'shared/api/types';
import { authStorage } from 'shared/lib/auth-storage';
import { LoadingSpinner } from 'shared/ui';

/**
 * TelegramCallback Page
 *
 * Handles the redirect callback from Telegram OAuth flow.
 * Telegram redirects here with user data in query parameters after authorization.
 *
 * Query parameters from Telegram:
 * - id: Telegram user ID
 * - first_name: User's first name
 * - last_name: User's last name (optional)
 * - username: Telegram username (optional)
 * - photo_url: Profile photo URL (optional)
 * - auth_date: Authorization timestamp
 * - hash: Data validation hash
 */
export const TelegramCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { mutate: linkTelegram } = useLinkTelegramMutation();

  useEffect(() => {
    const processTelegramCallback = () => {
      // Extract Telegram data from URL query parameters
      const telegramData: Partial<TelegramData> = {
        id: searchParams.get('id') ? Number(searchParams.get('id')) : undefined,
        first_name: searchParams.get('first_name') || undefined,
        last_name: searchParams.get('last_name') || undefined,
        username: searchParams.get('username') || undefined,
        photo_url: searchParams.get('photo_url') || undefined,
        auth_date: searchParams.get('auth_date') ? Number(searchParams.get('auth_date')) : undefined,
        hash: searchParams.get('hash') || undefined,
      };

      // Validate telegram data
      if (!validateTelegramData(telegramData)) {
        console.error('❌ Invalid Telegram data from callback:', telegramData);
        setError('Invalid data received from Telegram. Please try again.');
        return;
      }

      console.log('✅ Telegram callback data validated:', {
        id: telegramData.id,
        username: telegramData.username || telegramData.first_name,
        auth_date: telegramData.auth_date,
      });

      // Get email from sessionStorage (stored before redirect)
      const email = sessionStorage.getItem('telegram_auth_email');
      if (!email) {
        console.error('❌ Email not found in session storage');
        setError('Session expired. Please try logging in again.');
        setTimeout(() => navigate('/auth/login'), 2000);
        return;
      }

      // Call link Telegram API
      linkTelegram(
        {
          email,
          telegramAuth: convertTelegramDataToApiFormat(telegramData as TelegramData),
        },
        {
          onSuccess: response => {
            console.log('✅ Telegram linked successfully');

            // Store JWT tokens in localStorage
            authStorage.setTokens({
              authToken: response.token,
              refreshToken: response.refreshToken,
            });

            // Clear session storage
            sessionStorage.removeItem('telegram_auth_email');

            // Redirect to profile or dashboard
            navigate('/profile');
          },
          onError: error => {
            console.error('❌ Telegram linking failed:', error);

            // Extract error message
            const errorMessage =
              error instanceof Error ? error.message : 'Failed to link Telegram account. Please try again.';

            setError(errorMessage);

            // Redirect back to login after showing error
            setTimeout(() => navigate('/auth/login'), 3000);
          },
        }
      );
    };

    processTelegramCallback();
  }, [searchParams, navigate, linkTelegram]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark">
        <div className="max-w-md w-full p-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner />
        <p className="text-content-secondary dark:text-content-secondary-dark">Connecting your Telegram account...</p>
      </div>
    </div>
  );
};
