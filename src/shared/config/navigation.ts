export interface NavigationItem {
  name: string;
  href: string;
  protected?: boolean;
}

export const LANDING_NAVIGATION: NavigationItem[] = [{ name: 'Pricing', href: '/pricing' }];

export const APP_NAVIGATION: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', protected: true },
  { name: 'Pricing', href: '/pricing' },
];
