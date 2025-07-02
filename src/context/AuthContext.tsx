import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  requireAuth: (action?: () => void) => boolean;
  redirectAfterLogin: string | null;
  setRedirectAfterLogin: (path: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for existing authentication on app load
    const savedAuth = localStorage.getItem('tripradar-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('tripradar-auth', JSON.stringify({ user: userData }));
    
    // Redirect to intended page after login
    if (redirectAfterLogin) {
      navigate(redirectAfterLogin);
      setRedirectAfterLogin(null);
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('tripradar-auth');
    navigate('/');
  };

  const requireAuth = (action?: () => void) => {
    if (!isAuthenticated) {
      // Store current path for redirect after login
      setRedirectAfterLogin(location.pathname);
      navigate('/login');
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}