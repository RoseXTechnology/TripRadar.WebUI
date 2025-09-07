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

export const APP_NAVIGATION: NavigationItem[] = [{ name: 'Profile', href: '/profile' }];
