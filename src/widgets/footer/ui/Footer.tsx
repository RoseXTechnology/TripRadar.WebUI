import { Link } from 'react-router-dom';
import { Logo } from 'shared/ui';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <Logo />
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-500">© 2024 TripRadar. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
