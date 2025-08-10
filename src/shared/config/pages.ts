export const TRANSPARENT_PAGES = ['/', '/features', '/about'];

export const isTransparentPage = (pathname: string) =>
  TRANSPARENT_PAGES.some(page => pathname === page || (page !== '/' && pathname.startsWith(page + '/')));
