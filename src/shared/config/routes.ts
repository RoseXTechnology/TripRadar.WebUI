export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;

// Default redirect after login
export const DEFAULT_AUTHENTICATED_ROUTE = ROUTES.PROFILE;
