import { useCallback, useEffect, useRef, useState } from 'react';
import { useLinkTelegramMutation } from 'entities/auth';
import type { LinkTelegramResponse, TelegramData } from 'shared/api/types';
import { authStorage } from 'shared/lib/auth-storage';
import { LoadingSpinner } from 'shared/ui';
import {
  convertTelegramDataToApiFormat,
  getTelegramBotUsername,
  loadTelegramWidget,
  validateTelegramData,
} from '../lib/telegram';
import { ErrorAlert } from './ErrorAlert';

/**
 * Telegram error state interface
 */
interface TelegramErrorState {
  hasError: boolean;
  errorMessage: string;
  retryCount: number;
  troubleshootingSteps: string[];
}

/**
 * Props for TelegramConnect component
 */
interface TelegramConnectProps {
  email: string;
  onSuccess: (response: LinkTelegramResponse) => void;
  onError: (error: string) => void;
}

/**
 * TroubleshootingSteps component for displaying error recovery instructions
 */
const TroubleshootingSteps = ({ steps }: { steps: string[] }) => (
  <div className="mt-3">
    <p className="text-sm font-medium text-content dark:text-content-dark mb-2">Try these steps:</p>
    <ol className="text-sm text-content-secondary dark:text-content-secondary-dark space-y-1">
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="font-medium text-primary-600 dark:text-primary-400 flex-shrink-0">{index + 1}.</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  </div>
);

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
  const [telegramError, setTelegramError] = useState<TelegramErrorState>({
    hasError: false,
    errorMessage: '',
    retryCount: 0,
    troubleshootingSteps: [],
  });
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const { mutate: linkTelegram, isPending } = useLinkTelegramMutation();

  /**
   * Handle Telegram connection errors with troubleshooting steps
   */
  const handleTelegramError = useCallback(
    (error: Error | string) => {
      const errorMessage = typeof error === 'string' ? error : error.message;

      const troubleshootingSteps = [
        'Ensure you have a Telegram account',
        'Check that pop-ups are not blocked in your browser',
        'Try refreshing the page',
        'Clear browser cache and cookies',
        'Disable browser extensions temporarily',
      ];

      setTelegramError({
        hasError: true,
        errorMessage: errorMessage || 'Failed to connect Telegram',
        retryCount: telegramError.retryCount + 1,
        troubleshootingSteps,
      });

      // Also call the original onError callback for backward compatibility
      onError(errorMessage || 'Failed to connect Telegram');
    },
    [telegramError.retryCount, onError]
  );

  /**
   * Handle retry - clear error state and reinitialize widget
   */
  const handleRetry = useCallback(() => {
    setTelegramError({
      hasError: false,
      errorMessage: '',
      retryCount: 0,
      troubleshootingSteps: [],
    });
    setScriptLoaded(false);
    setIsLoading(false);

    // Clear the widget container
    if (widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = '';
    }

    // Reinitialize will happen via useEffect dependency change
  }, []);

  /**
   * Handle Telegram OAuth callback
   * This function is called by the Telegram widget when user authorizes
   */
  const handleTelegramAuth = useCallback(
    (user: TelegramData) => {
      // Validate telegram data structure
      if (!validateTelegramData(user)) {
        console.error('❌ Invalid Telegram data structure:', user);
        handleTelegramError('Invalid data received from Telegram. Please try again.');
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
          telegramAuth: convertTelegramDataToApiFormat(user),
        },
        {
          onSuccess: response => {
            console.log('✅ Telegram linked successfully');

            // Store JWT tokens in localStorage
            authStorage.setTokens({
              authToken: response.token,
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

            // Use the new error handler
            handleTelegramError(errorMessage);
          },
        }
      );
    },
    [email, linkTelegram, onSuccess, handleTelegramError]
  );

  /**
   * Load Telegram widget script and render widget
   */
  useEffect(() => {
    const initializeTelegramWidget = async () => {
      try {
        // Store email in sessionStorage for OAuth redirect callback
        sessionStorage.setItem('telegram_auth_email', email);

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

          // Use both methods: callback for quick auth, redirect for OAuth flow
          script.setAttribute('data-onauth', 'onTelegramAuth(user)');
          script.setAttribute('data-auth-url', `${window.location.origin}/auth/telegram-callback`);
          script.setAttribute('data-request-access', 'write');
          script.setAttribute('data-lang', 'en'); // Force English language

          widgetContainerRef.current.appendChild(script);
        }
      } catch (error) {
        console.error('❌ Failed to load Telegram widget:', error);
        handleTelegramError('Failed to load Telegram widget. Please refresh the page and try again.');
      }
    };

    initializeTelegramWidget();

    // Cleanup
    return () => {
      if (window.onTelegramAuth) {
        delete window.onTelegramAuth;
      }
    };
  }, [email, handleTelegramAuth, handleTelegramError, telegramError.hasError]); // Re-initialize if email changes or after retry

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Error state with troubleshooting */}
      {telegramError.hasError && (
        <div className="w-full max-w-md">
          <ErrorAlert
            title="Telegram Connection Failed"
            message={telegramError.errorMessage}
            severity="error"
            actions={[
              {
                label: 'Try Again',
                onClick: handleRetry,
                variant: 'primary',
              },
            ]}
          >
            <TroubleshootingSteps steps={telegramError.troubleshootingSteps} />
          </ErrorAlert>
        </div>
      )}

      {/* Loading state while linking */}
      {!telegramError.hasError && (isLoading || isPending) && (
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner />
          <p className="text-sm text-content-secondary dark:text-content-secondary-dark">
            Connecting your Telegram account...
          </p>
        </div>
      )}

      {/* Telegram widget container */}
      {!telegramError.hasError && !isLoading && !isPending && (
        <div className="flex flex-col items-center gap-4">
          <div ref={widgetContainerRef} className="flex justify-center" />
          {!scriptLoaded && (
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <p className="text-sm text-content-secondary dark:text-content-secondary-dark">
                Loading Telegram widget...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
