import { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
      <div ref={sentinelRef} className="h-1" />
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          isScrolled || !isPageTransparent
            ? 'bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md'
            : 'bg-surface/60 dark:bg-surface-dark/60 backdrop-blur-sm'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">
            <Logo />
            <Navigation />

            <div className="flex items-center gap-2">
              <UserActions />
              <div className="w-px h-4 bg-outline-secondary dark:bg-outline-secondary-dark mx-2" />
              <ThemeToggle />

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-surface-accent-dark transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      </header>
    </>
  );
};
