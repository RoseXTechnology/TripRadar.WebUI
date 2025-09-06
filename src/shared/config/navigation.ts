export interface NavigationItem {
  name: string;
  href: string;
  protected?: boolean;
}

export const LANDING_NAVIGATION: NavigationItem[] = [
  { name: 'Home', href: '#hero' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '/pricing' },
];

export const APP_NAVIGATION: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Trips', href: '/trips' },
  { name: 'Profile', href: '/profile' },
];
