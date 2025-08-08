export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  TELEGRAM_BOT_URL: import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/TripRadarBot',
  WHATSAPP_URL: import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/1234567890',
} as const;
