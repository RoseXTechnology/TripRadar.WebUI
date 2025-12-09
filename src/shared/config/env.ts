// TODO: Move API keys to .env file before production deployment
// For MVP: using hardcoded dev keys (acceptable for private repo + dev environment)
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  API_KEY: import.meta.env.VITE_API_KEY || 'e3f7b9c2-6d4a-4a5e-8f1d-92b3e7c1a8d5',
  INTERNAL_API_KEY: import.meta.env.VITE_INTERNAL_API_KEY || '0a62cc12-d1c7-400e-9fc4-76460cd88358',
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
