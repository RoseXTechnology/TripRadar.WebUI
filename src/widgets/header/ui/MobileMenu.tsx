import { useEffect } from 'react';
import { Home, DollarSign, Info, User, LogIn, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAVIGATION, LANDING_NAVIGATION } from 'shared/config';
import { ROUTES } from 'shared/config/routes';
import { cn } from 'shared/lib/utils';
import { useAuthStore } from 'shared/store/auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: 'smooth' });
};

const handleAnchorClick = (href: string, navigate: ReturnType<typeof useNavigate>, currentPath: string) => {
  if (currentPath === '/') {
    scrollToSection(href);
  } else {
    navigate('/' + href);
  }
};

const getMenuIcon = (name: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Home: Home,
    Pricing: DollarSign,
    About: Info,
    Features: Info,
  };
  return iconMap[name] || Home;
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigation = isAuthenticated ? APP_NAVIGATION : LANDING_NAVIGATION;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 md:hidden animate-fade-in"
        onClick={onClose}
        onTouchStart={e => {
          const startY = e.touches[0].clientY;
          const handleTouchMove = (e: TouchEvent) => {
            const currentY = e.touches[0].clientY;
            if (currentY - startY > 50) onClose();
          };
          document.addEventListener('touchmove', handleTouchMove, { once: true });
        }}
      />

      {/* Menu Panel */}
      <div className="fixed top-14 left-0 right-0 z-50 md:hidden animate-slide-down">
        <div className="mx-4 mt-2 bg-surface dark:bg-surface-dark backdrop-blur-sm border border-outline dark:border-outline-dark rounded-2xl shadow-2xl overflow-hidden">
          <nav className="p-2">
            {/* Navigation Items */}
            <div className="space-y-1">
              {navigation
                .filter(item => !item.protected || isAuthenticated)
                .map((item, index) => {
                  const isAnchor = item.href.startsWith('#');
                  const isActive = location.pathname === item.href;

                  const Icon = getMenuIcon(item.name);

                  if (isAnchor) {
                    return (
                      <div key={item.name} className={`flex items-center justify-between ${index === 0 ? '' : ''}`}>
                        <button
                          onClick={() => {
                            handleAnchorClick(item.href, navigate, location.pathname);
                            onClose();
                          }}
                          className="group flex items-center flex-1 px-3 py-2.5 text-sm font-medium text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark hover:bg-primary-50/50 dark:hover:bg-surface-accent-dark/50 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <Icon className="h-4 w-4 mr-3 text-content-muted group-hover:text-primary-500 transition-colors" />
                          {item.name}
                        </button>
                        {index === 0 && (
                          <button
                            onClick={onClose}
                            className="p-1.5 ml-2 text-content-muted hover:text-content dark:hover:text-content-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-md transition-colors"
                            aria-label="Close menu"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={item.name} className="flex items-center justify-between">
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className={cn(
                          'group flex items-center flex-1 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                          isActive
                            ? 'text-content dark:text-content-dark bg-primary-50 dark:bg-primary-500/10'
                            : 'text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark hover:bg-primary-50/50 dark:hover:bg-surface-accent-dark/50'
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-4 w-4 mr-3 transition-colors',
                            isActive ? 'text-primary-500' : 'text-content-muted group-hover:text-primary-500'
                          )}
                        />
                        {item.name}
                      </Link>
                      {index === 0 && (
                        <button
                          onClick={onClose}
                          className="p-1.5 ml-2 text-content-muted hover:text-content dark:hover:text-content-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-md transition-colors"
                          aria-label="Close menu"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Auth Section */}
            {!isAuthenticated && (
              <>
                <div className="my-4 h-px bg-gradient-to-r from-transparent via-outline/30 dark:via-outline-dark/30 to-transparent" />
                <div className="space-y-2">
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={onClose}
                    className="group flex items-center justify-center px-3 py-2.5 text-sm font-medium text-content dark:text-content-dark border border-outline dark:border-outline-dark hover:bg-primary-50 dark:hover:bg-surface-accent-dark rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <LogIn className="h-4 w-4 mr-2 text-content-muted group-hover:text-primary-500 transition-colors" />
                    Login
                  </Link>
                  <Link
                    to={ROUTES.SIGNUP}
                    onClick={onClose}
                    className="flex items-center justify-center px-3 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Register
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};
