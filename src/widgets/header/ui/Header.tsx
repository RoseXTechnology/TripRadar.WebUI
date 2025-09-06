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
        <div className="px-4 sm:px-6 max-w-6xl mx-auto">
          {/* Mobile-first layout: Logo + Actions */}
          <div className="flex justify-between items-center h-14">
            <Logo />

            {/* Mobile: Actions + Menu Button */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Desktop: Show UserActions and Navigation inline */}
              <div className="hidden md:flex items-center gap-6">
                <Navigation />
                <div className="w-px h-4 bg-outline-secondary dark:bg-outline-secondary-dark" />
                <UserActions />
              </div>

              {/* Mobile: Show only essential actions */}
              <div className="flex items-center gap-2 md:hidden">
                <UserActions />
              </div>

              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-surface-accent-dark transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      </header>
    </>
  );
};
