/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'hero-bg': 'rgb(var(--hero-bg))',
        'hero-title': 'rgb(var(--hero-title))',
        'hero-subtitle': 'rgb(var(--hero-subtitle))',
        'hero-btn-bg': 'rgb(var(--hero-btn-bg))',
        'hero-btn-text': 'rgb(var(--hero-btn-text))',
        'bot-message': 'rgb(var(--bot-message))',
        'user-message': 'rgb(var(--user-message))',
        'steps-card-bg': 'rgb(var(--steps-card-bg))',
        'steps-title': 'rgb(var(--steps-title))',
        'steps-text': 'rgb(var(--steps-text))',
        'steps-icon': 'rgb(var(--steps-icon))',
        'steps-details': 'rgb(var(--steps-details))',
        'benefits-bg': 'rgb(var(--benefits-bg))',
        'benefits-title': 'rgb(var(--benefits-title))',
        'benefits-icon': 'rgb(var(--benefits-icon))',
        'benefits-item-title': 'rgb(var(--benefits-item-title))',
        'benefits-text': 'rgb(var(--benefits-text))',
        'benefits-accent': 'rgb(var(--benefits-accent))',
        'cta-bg': 'rgb(var(--cta-bg))',
        'cta-title': 'rgb(var(--cta-title))',
        'cta-subtitle': 'rgb(var(--cta-subtitle))',
        'cta-btn-bg': 'rgb(var(--cta-btn-bg))',
        'cta-btn-text': 'rgb(var(--cta-btn-text))',
        'cta-hint': 'rgb(var(--cta-hint))',
        'header-footer-bg': 'rgb(var(--header-footer-bg))',
        'footer-text': 'rgb(var(--footer-text))',
        'footer-accent': 'rgb(var(--footer-accent))',
        'footer-muted': 'rgb(var(--footer-muted))',
      },

      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },

    },
  },
  plugins: [],
};
