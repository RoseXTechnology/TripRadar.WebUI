export const APP_NAME = 'TripRadar';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',
  TRIPS: '/trips',
  BUDGET: '/budget',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'JPY', label: 'JPY (¥)' },
  { value: 'CAD', label: 'CAD ($)' },
  { value: 'AUD', label: 'AUD ($)' },
] as const;

export const BUDGET_CATEGORIES = [
  { id: 'flights', name: 'Flights', color: 'bg-blue-500' },
  { id: 'hotels', name: 'Hotels', color: 'bg-green-500' },
  { id: 'food', name: 'Food & Dining', color: 'bg-orange-500' },
  { id: 'activities', name: 'Activities', color: 'bg-purple-500' },
  { id: 'transport', name: 'Transportation', color: 'bg-indigo-500' },
  { id: 'shopping', name: 'Shopping', color: 'bg-pink-500' },
  { id: 'miscellaneous', name: 'Miscellaneous', color: 'bg-gray-500' },
] as const;
