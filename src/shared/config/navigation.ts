export interface NavigationItem {
  name: string;
  href: string;
  protected?: boolean;
}

export const LANDING_NAVIGATION: NavigationItem[] = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Help', href: '/help' },
  { name: 'About', href: '/about' },
];

export const APP_NAVIGATION: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', protected: true },
  { name: 'Discover', href: '/discover' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Help', href: '/help' },
];
