import { Link } from 'react-router-dom';
import { Logo } from 'shared/ui';

export default function Footer() {
  return (
    <footer className="border-t border-outline dark:border-outline-dark bg-surface dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <Logo />
            <div className="flex items-center gap-6 text-sm text-content-secondary dark:text-content-secondary-dark">
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

          <div className="text-sm text-content-muted dark:text-content-muted">
            © 2024 TripRadar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
