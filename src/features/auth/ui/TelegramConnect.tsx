import { useEffect, useRef, useState } from 'react';
import type { LinkTelegramResponse, TelegramData } from 'shared/api/types';
import { authStorage } from 'shared/lib/auth-storage';
import { LoadingSpinner } from 'shared/ui';
import { useLinkTelegramMutation } from '../api/useLinkTelegram';
import { getTelegramBotUsername, loadTelegramWidget, validateTelegramData } from '../lib/telegram';

/**
 * Props for TelegramConnect component
 */
interface TelegramConnectProps {
  email: string;
  onSuccess: (response: LinkTelegramResponse) => void;
  onError: (error: string) => void;
}

/**
 * TelegramConnect Component
 *
 * Renders the Telegram Login Widget and handles the OAuth flow for linking
 * a Telegram account to a user after email confirmation or login attempt.
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 5.1, 5.2, 5.3, 5.4, 5.5
 *
 * @param email - User's email to identify the user
 * @param onSuccess - Callback when Telegram linking succeeds
 * @param onError - Callback when an error occurs
 *
 * @example
 * <TelegramConnect
 *   email={userEmail}
 *   onSuccess={(response) => {
 *     // Store tokens and redirect
 *     navigate('/profile');
 *   }}
 *   onError={(error) => {
 *     // Show error message
 *     setError(error);
 *   }}
 * />
 */
export const TelegramConnect = ({ email, onSuccess, onError }: TelegramConnectProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const { mutate: linkTelegram, isPending } = useLinkTelegramMutation();

  /**
   * Handle Telegram OAuth callback
   * This function is called by the Telegram widget when user authorizes
   */
  const handleTelegramAuth = (user: TelegramData) => {
    // Validate telegram data structure
    if (!validateTelegramData(user)) {
      console.error('❌ Invalid Telegram data structure:', user);
      onError('Invalid data received from Telegram. Please try again.');
      return;
    }

    console.log('✅ Telegram data validated:', {
      id: user.id,
      username: user.username || user.first_name,
      auth_date: user.auth_date,
    });

    setIsLoading(true);

    // Call link Telegram API
    linkTelegram(
      {
        email,
        telegramData: user,
      },
      {
        onSuccess: response => {
          console.log('✅ Telegram linked successfully');

          // Store JWT tokens in localStorage
          authStorage.setTokens({
            authToken: response.accessToken,
            refreshToken: response.refreshToken,
          });

          setIsLoading(false);

          // Call success callback
          onSuccess(response);
        },
        onError: error => {
          console.error('❌ Telegram linking failed:', error);
          setIsLoading(false);

          // Extract error message
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to link Telegram account. Please try again.';

          // Call error callback
          onError(errorMessage);
        },
      }
    );
  };

  /**
   * Load Telegram widget script and render widget
   */
  useEffect(() => {
    const initializeTelegramWidget = async () => {
      try {
        // Load Telegram widget script
        await loadTelegramWidget();
        setScriptLoaded(true);

        // Get bot username from environment
        const botUsername = getTelegramBotUsername();

        // Set up global callback for Telegram widget
        window.onTelegramAuth = handleTelegramAuth;

        // Render Telegram widget
        if (widgetContainerRef.current) {
          // Clear any existing content
          widgetContainerRef.current.innerHTML = '';

          // Create script element for widget
          const script = document.createElement('script');
          script.src = 'https://telegram.org/js/telegram-widget.js?22';
          script.async = true;
          script.setAttribute('data-telegram-login', botUsername);
          script.setAttribute('data-size', 'large');
          script.setAttribute('data-onauth', 'onTelegramAuth(user)');
          script.setAttribute('data-request-access', 'write');

          widgetContainerRef.current.appendChild(script);
        }
      } catch (error) {
        console.error('❌ Failed to load Telegram widget:', error);
        onError('Failed to load Telegram widget. Please refresh the page and try again.');
      }
    };

    initializeTelegramWidget();

    // Cleanup
    return () => {
      if (window.onTelegramAuth) {
        delete window.onTelegramAuth;
      }
    };
  }, [email]); // Re-initialize if email changes

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Loading state while linking */}
      {(isLoading || isPending) && (
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner />
          <p className="text-sm text-gray-600 dark:text-gray-400">Connecting your Telegram account...</p>
        </div>
      )}

      {/* Telegram widget container */}
      {!isLoading && !isPending && (
        <div className="flex flex-col items-center gap-4">
          <div ref={widgetContainerRef} className="flex justify-center" />
          {!scriptLoaded && (
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading Telegram widget...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
