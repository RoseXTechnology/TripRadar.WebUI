/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefce8',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        secondary: {
          50: '#ecfeff',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0c0c0c',
          accent: '#fefce8',
          'accent-dark': '#1c1917',
          'dark-secondary': '#1f2937',
        },
        content: {
          DEFAULT: '#0f172a',
          dark: '#ffffff',
          secondary: '#475569', // было #64748b - сделал темнее
          'secondary-dark': '#cbd5e1',
          muted: '#64748b', // было #94a3b8 - сделал темнее
        },
        outline: {
          DEFAULT: '#cbd5e1', // было #e2e8f0 - сделал темнее
          dark: '#374151',
          secondary: '#94a3b8', // было #cbd5e1 - сделал темнее
          'secondary-dark': '#4b5563',
        },
        interactive: {
          DEFAULT: '#e2e8f0', // было #f1f5f9 - сделал темнее
          dark: '#374151',
          active: '#ec4899',
          'active-dark': '#06b6d4',
        },
        button: {
          DEFAULT: '#0f172a',
          dark: '#ffffff',
          text: '#ffffff',
          'text-dark': '#0f172a',
          hover: '#1f2937',
          'hover-dark': '#f3f4f6',
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
