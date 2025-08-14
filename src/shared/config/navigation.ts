export interface NavigationItem {
  name: string;
  href: string;
  protected?: boolean;
}

export const LANDING_NAVIGATION: NavigationItem[] = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Help', href: '/help' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const APP_NAVIGATION: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', protected: true },
  { name: 'Search', href: '/search' },
  { name: 'Trips', href: '/trips', protected: true },
  { name: 'Budget', href: '/budget', protected: true },
  { name: 'Discover', href: '/discover' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Help', href: '/help' },
];
