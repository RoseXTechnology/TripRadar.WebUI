export interface NavigationItem {
  name: string;
  href: string;
  protected?: boolean;
}

export const NAVIGATION: NavigationItem[] = [
  { name: 'Home', href: '#hero' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '/pricing' },
];
