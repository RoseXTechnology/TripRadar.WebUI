import { QuickSearch } from 'features/search';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LANDING_NAVIGATION, isTransparentPage } from 'shared/config';
import { useScrollDetection, useKeyboardShortcuts } from 'shared/lib/hooks';
import { cn } from 'shared/lib/utils';
import { Logo } from 'shared/ui';

import { AuthActions } from './AuthActions';

export const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const location = useLocation();

  const { isScrolled, sentinelRef } = useScrollDetection();

  useKeyboardShortcuts({
    onSearch: !showQuickSearch ? () => setShowQuickSearch(true) : undefined,
    onEscape: () => setShowQuickSearch(false),
  });

  const isPageTransparent = isTransparentPage(location.pathname);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Common styles
  const linkBaseStyles = 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';
  const linkActiveStyles = 'text-gray-900 dark:text-white';

  const headerClassName = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled || !isPageTransparent
      ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm'
      : 'bg-transparent border-b border-transparent'
  );

  return (
    <>
      <div ref={sentinelRef} className="h-5" />
      <header className={headerClassName}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {LANDING_NAVIGATION.map(item => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'relative font-medium transition-colors group',
                      isActive ? linkActiveStyles : linkBaseStyles
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-200',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <AuthActions onSearchClick={() => setShowQuickSearch(true)} />

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className={cn(
                  'md:hidden p-2 rounded-xl transition-colors',
                  'text-gray-700 dark:text-gray-300',
                  'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div
              className={cn(
                'md:hidden py-4 animate-slide-down',
                'bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'
              )}
            >
              <nav className="space-y-2">
                {LANDING_NAVIGATION.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'block px-3 py-2 font-medium rounded-xl transition-colors',
                        isActive
                          ? `${linkActiveStyles} bg-gray-100 dark:bg-gray-700`
                          : `${linkBaseStyles} hover:bg-gray-100 dark:hover:bg-gray-700`
                      )}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Mobile Auth Links */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link
                    to="/login"
                    className={cn(
                      'block px-3 py-2 rounded-xl font-medium transition-colors',
                      linkBaseStyles,
                      'hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                    onClick={closeMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={cn(
                      'block px-3 py-2 rounded-xl font-semibold text-center transition-all',
                      'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
                      'hover:shadow-lg hover:shadow-blue-500/25'
                    )}
                    onClick={closeMenu}
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Quick Search Modal */}
      {showQuickSearch && <QuickSearch onClose={() => setShowQuickSearch(false)} />}
    </>
  );
};
