import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollDetection } from 'shared/lib/hooks';
import { Logo, ThemeToggle } from 'shared/ui';
import { MobileMenu } from './MobileMenu';
import { Navigation } from './Navigation';
import { UserActions } from './UserActions';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { sentinelRef } = useScrollDetection();

  // Add blur and block interactions when menu is open
  React.useEffect(() => {
    const mainContent = document.getElementById('main-content');
    const headerContent = document.getElementById('header-content');

    if (isMenuOpen) {
      // Blur content
      if (mainContent) {
        mainContent.style.filter = 'blur(4px)';
        mainContent.style.transition = 'filter 0.2s ease-in-out';
      }
      if (headerContent) {
        headerContent.style.filter = 'blur(4px)';
        headerContent.style.transition = 'filter 0.2s ease-in-out';
        headerContent.style.pointerEvents = 'none';
      }
    } else {
      // Remove blur and restore interactions
      if (mainContent) mainContent.style.filter = 'none';
      if (headerContent) {
        headerContent.style.filter = 'none';
        headerContent.style.pointerEvents = 'auto';
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      <div ref={sentinelRef} className="h-1" />
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/60 dark:bg-surface-dark/60 backdrop-blur-sm transition-all duration-200">
        <div id="header-content" className="px-4 sm:px-6 max-w-6xl mx-auto">
          {/* Mobile-first layout: Logo + Actions */}
          <div className="flex justify-between items-center h-14">
            <Logo />

            {/* Mobile: Actions + Menu Button */}
            {/* Desktop: Centered Navigation */}
            <div className="hidden md:block">
              <Navigation />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Desktop: Show UserActions */}
              <div className="hidden md:flex items-center gap-4">
                <UserActions />
                <div className="w-px h-4 bg-outline-secondary dark:bg-outline-secondary-dark" />
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
        </div>

        {/* Mobile menu - outside header-content to avoid blur */}
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </header>
    </>
  );
};
