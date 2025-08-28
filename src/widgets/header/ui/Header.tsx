import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { isTransparentPage } from 'shared/config';
import { useScrollDetection } from 'shared/lib/hooks';
import { cn } from 'shared/lib/utils';
import { Logo, ThemeToggle } from 'shared/ui';
import { MobileMenu } from './MobileMenu';
import { Navigation } from './Navigation';
import { UserActions } from './UserActions';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { isScrolled, sentinelRef } = useScrollDetection();

  const isPageTransparent = isTransparentPage(location.pathname);

  return (
    <>
      <div ref={sentinelRef} className="h-5" />
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || !isPageTransparent
            ? 'bg-header-footer-bg/95 backdrop-blur-xl border-b shadow-lg'
            : 'bg-header-footer-bg border-b'
        )}
        style={{ borderColor: 'var(--footer-border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <Navigation />

            <div className="flex items-center space-x-4">
              <UserActions />

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

          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      </header>
    </>
  );
};
