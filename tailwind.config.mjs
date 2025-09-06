/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          500: '#ff7f7f',
          600: '#ef4444',
          700: '#dc2626',
        },
        secondary: {
          50: '#f0fdfa',
          500: '#4ecdc4',
          600: '#14b8a6',
          700: '#0d9488',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0f0f0f',
          accent: '#fef2f2',
          'accent-dark': '#1a1a1a',
        },
        content: {
          DEFAULT: '#0f172a',
          dark: '#ffffff',
          secondary: '#64748b',
          'secondary-dark': '#cbd5e1',
          muted: '#94a3b8',
        },
        outline: {
          DEFAULT: '#e2e8f0',
          dark: '#374151',
          secondary: '#cbd5e1',
          'secondary-dark': '#4b5563',
        },
        interactive: {
          DEFAULT: '#f1f5f9',
          dark: '#374151',
          active: '#ff7f7f',
          'active-dark': '#4ecdc4',
        },
        button: {
          DEFAULT: '#0f172a',
          dark: '#ffffff',
          text: '#ffffff',
          'text-dark': '#0f172a',
          hover: '#ff7f7f',
          'hover-dark': '#4ecdc4',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      lineHeight: {
        heading: '1.3',
      },
    },
  },
  plugins: [],
};
