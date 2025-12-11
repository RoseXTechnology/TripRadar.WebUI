// TODO: Move API keys to .env file before production deployment
// For MVP: using hardcoded dev keys (acceptable for private repo + dev environment)
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  API_KEY: import.meta.env.VITE_API_KEY || '4599e588-6d05-4aad-86ed-3d28860a9338',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'aiTravelBotVVV_bot',
} as const;

/**
 * Get the Telegram bot username from environment variables
 * Falls back to default bot username if not defined
 * @returns {string} The Telegram bot username
 */
export const getTelegramBotUsername = (): string => {
  return env.TELEGRAM_BOT_USERNAME;
};
