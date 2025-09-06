/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        secondary: {
          50: '#fef3c7',
          500: '#fbbf24',
          600: '#f59e0b',
          700: '#d97706',
        },
        surface: {
          DEFAULT: '#fefdfb',
          dark: '#191919',
          accent: '#fef3c7',
          'accent-dark': '#2d2d2d',
        },
        content: {
          DEFAULT: '#37352f',
          dark: '#e9e9e7',
          secondary: '#787774',
          'secondary-dark': '#9b9a97',
          muted: '#9b9a97',
        },
        outline: {
          DEFAULT: '#e9e9e7',
          dark: '#373737',
          secondary: '#e9e9e7',
          'secondary-dark': '#373737',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
