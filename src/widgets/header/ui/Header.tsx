import { useAuth } from 'features/auth';
import { User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from 'shared/ui';

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">TripRadar</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Dashboard
            </a>
            <a href="/trips" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Trips
            </a>
            <a href="/budget" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Budget
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  <a href="/login">Login</a>
                </Button>
                <Button size="sm">
                  <a href="/signup">Sign Up</a>
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              <a
                href="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
              >
                Dashboard
              </a>
              <a
                href="/trips"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
              >
                Trips
              </a>
              <a
                href="/budget"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
              >
                Budget
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
