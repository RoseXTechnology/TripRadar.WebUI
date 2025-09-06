import { Link } from 'react-router-dom';
import { Logo } from 'shared/ui';

export default function Footer() {
  return (
    <footer className="border-t border-outline dark:border-outline-dark bg-surface dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Mobile-first: Stack vertically, center align */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo and Links Section */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <Logo />

            {/* Links - stack on mobile, inline on desktop */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-content-secondary dark:text-content-secondary-dark">
              <Link to="/privacy" className="hover:text-content dark:hover:text-content-dark transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-content dark:hover:text-content-dark transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-content dark:hover:text-content-dark transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Copyright - centered on mobile */}
          <div className="text-sm text-content-muted text-center md:text-left">
            © 2024 TripRadar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
