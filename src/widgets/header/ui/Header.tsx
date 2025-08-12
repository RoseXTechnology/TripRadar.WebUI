import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { QuickSearch } from 'features/search';
import { isTransparentPage } from 'shared/config';
import { useScrollDetection, useKeyboardShortcuts } from 'shared/lib/hooks';
import { cn } from 'shared/lib/utils';
import { Logo, ThemeToggle } from 'shared/ui';
import { MobileMenu } from './MobileMenu';
import { Navigation } from './Navigation';
import { UserActions } from './UserActions';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const location = useLocation();

  const { isScrolled, sentinelRef } = useScrollDetection();

  useKeyboardShortcuts({
    onSearch: !showQuickSearch ? () => setShowQuickSearch(true) : undefined,
    onEscape: () => setShowQuickSearch(false),
  });

  const isPageTransparent = isTransparentPage(location.pathname);

  return (
    <>
      <div ref={sentinelRef} className="h-5" />
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || !isPageTransparent
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-lg'
            : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <Navigation />

            <div className="flex items-center space-x-4">
              <UserActions onSearchClick={() => setShowQuickSearch(true)} />

              <ThemeToggle />

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'md:hidden p-2 rounded-xl transition-colors',
                  'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
                  'hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onSearchClick={() => setShowQuickSearch(true)}
          />
        </div>
      </header>

      {showQuickSearch && <QuickSearch onClose={() => setShowQuickSearch(false)} />}
    </>
  );
};
