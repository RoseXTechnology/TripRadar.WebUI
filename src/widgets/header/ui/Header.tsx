import { useAuth } from 'app/providers/AuthContext';
import { QuickSearch } from 'features/search';
import { Menu, X, Search, Bell, User, LogOut, Settings, CreditCard, DollarSign, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAVIGATION, isTransparentPage } from 'shared/config';
import { useScrollDetection, useKeyboardShortcuts } from 'shared/lib/hooks';
import { cn } from 'shared/lib/utils';
import { Logo } from 'shared/ui';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const { isScrolled, sentinelRef } = useScrollDetection();

  useKeyboardShortcuts({
    onSearch: !showQuickSearch ? () => setShowQuickSearch(true) : undefined,
    onEscape: () => setShowQuickSearch(false),
  });

  const isPageTransparent = isTransparentPage(location.pathname);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleProfile = () => setIsProfileOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const closeProfile = () => setIsProfileOpen(false);
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  // Common styles
  const linkBaseStyles = 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';
  const linkActiveStyles = 'text-gray-900 dark:text-white';
  const buttonStyles = 'p-2 rounded-xl transition-colors';

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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {APP_NAVIGATION.map(item => {
                // Skip protected routes if user is not authenticated
                if (item.protected && !isAuthenticated) return null;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'relative font-medium transition-colors group',
                      location.pathname === item.href ? linkActiveStyles : linkBaseStyles
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-200',
                        location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Quick Search */}
                  <button
                    onClick={() => setShowQuickSearch(true)}
                    className={cn(
                      'hidden sm:flex items-center space-x-2',
                      buttonStyles,
                      linkBaseStyles,
                      'hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <Search className="h-5 w-5" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Press / to search</span>
                  </button>

                  {/* Notifications */}
                  <Link
                    to="/notifications"
                    className={cn(buttonStyles, linkBaseStyles, 'hover:bg-gray-100 dark:hover:bg-gray-800 relative')}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      3
                    </span>
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleProfile}
                      className={cn(
                        'flex items-center space-x-2',
                        buttonStyles,
                        'hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      <img
                        src={
                          user?.avatar ||
                          'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
                        }
                        alt={user?.name || 'User'}
                        className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                      />
                      <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name || 'User'}
                      </span>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl animate-slide-down z-50">
                        <div className="py-1">
                          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center space-x-1">
                              <Sparkles className="h-3 w-3" />
                              <span>{user?.subscription || 'free'} Plan</span>
                            </p>
                          </div>
                          <Link
                            to="/profile"
                            className={cn(
                              'flex items-center px-4 py-2 text-sm transition-colors',
                              linkBaseStyles,
                              'hover:bg-gray-100 dark:hover:bg-gray-700'
                            )}
                            onClick={closeProfile}
                          >
                            <User className="h-4 w-4 mr-3" />
                            Profile
                          </Link>
                          <Link
                            to="/budget"
                            className={cn(
                              'flex items-center px-4 py-2 text-sm transition-colors',
                              linkBaseStyles,
                              'hover:bg-gray-100 dark:hover:bg-gray-700'
                            )}
                            onClick={closeProfile}
                          >
                            <DollarSign className="h-4 w-4 mr-3" />
                            Budget
                          </Link>
                          <Link
                            to="/settings"
                            className={cn(
                              'flex items-center px-4 py-2 text-sm transition-colors',
                              linkBaseStyles,
                              'hover:bg-gray-100 dark:hover:bg-gray-700'
                            )}
                            onClick={closeProfile}
                          >
                            <Settings className="h-4 w-4 mr-3" />
                            Settings
                          </Link>
                          <Link
                            to="/billing"
                            className={cn(
                              'flex items-center px-4 py-2 text-sm transition-colors',
                              linkBaseStyles,
                              'hover:bg-gray-100 dark:hover:bg-gray-700'
                            )}
                            onClick={closeProfile}
                          >
                            <CreditCard className="h-4 w-4 mr-3" />
                            Billing
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className={cn('text-sm font-medium transition-colors', linkBaseStyles)}>
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all transform',
                      'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
                      'hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5'
                    )}
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className={cn('md:hidden', buttonStyles, linkBaseStyles, 'hover:bg-gray-100 dark:hover:bg-gray-800')}
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
                {APP_NAVIGATION.map(item => {
                  // Skip protected routes if user is not authenticated
                  if (item.protected && !isAuthenticated) return null;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'block px-3 py-2 font-medium rounded-xl transition-colors',
                        location.pathname === item.href
                          ? `${linkActiveStyles} bg-gray-100 dark:bg-gray-700`
                          : `${linkBaseStyles} hover:bg-gray-100 dark:hover:bg-gray-700`
                      )}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  );
                })}
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
