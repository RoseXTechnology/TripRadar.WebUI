export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  API_KEY: import.meta.env.VITE_API_KEY || 'e3f7b9c2-6d4a-4a5e-8f1d-92b3e7c1a8d5',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  TELEGRAM_BOT_URL: import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/TripRadarBot',
  WHATSAPP_URL: import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/1234567890',
} as const;

/**
 * Get the Telegram bot username from environment variables
 * @throws {Error} If VITE_TELEGRAM_BOT_USERNAME is not defined
 * @returns {string} The Telegram bot username
 */
export const getTelegramBotUsername = (): string => {
  const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

  if (!botUsername) {
    throw new Error(
      'VITE_TELEGRAM_BOT_USERNAME is not defined in environment variables. ' + 'Please add it to your .env file.'
    );
  }

  return botUsername;
};
