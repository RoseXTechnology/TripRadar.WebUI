/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  requireAuth: (action?: () => void) => boolean;
  redirectAfterLogin: string | null;
  setRedirectAfterLogin: (path: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for existing authentication on app load
    const savedAuth = localStorage.getItem('tripradar-auth') || localStorage.getItem('user');
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';

    if (savedAuth && isAuth) {
      const userData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(userData.user || userData); // Handle both formats

      // Redirect authenticated users away from auth pages
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate(ROUTES.DASHBOARD);
      }
    }
  }, [location.pathname, navigate]);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('tripradar-auth', JSON.stringify({ user: userData }));
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');

    // Redirect to intended page after login
    if (redirectAfterLogin) {
      navigate(redirectAfterLogin);
      setRedirectAfterLogin(null);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('tripradar-auth');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate(ROUTES.HOME);
  };

  const requireAuth = (action?: () => void) => {
    if (!isAuthenticated) {
      // Store current path for redirect after login
      setRedirectAfterLogin(location.pathname);
      navigate(ROUTES.LOGIN);
      return false;
    }

    // Execute the action if authenticated
    if (action) {
      action();
    }
    return true;
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    requireAuth,
    redirectAfterLogin,
    setRedirectAfterLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
