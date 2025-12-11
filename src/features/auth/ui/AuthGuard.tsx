import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * AuthGuard - защищает страницы аутентификации от уже залогиненных пользователей
 * Используется для страниц логина, регистрации, сброса пароля
 */
export const AuthGuard = ({ children, redirectTo = ROUTES.PROFILE }: AuthGuardProps) => {
  const navigate = useNavigate();

  // Простая проверка - есть ли токен в localStorage
  const hasToken = !!localStorage.getItem('authToken');

  useEffect(() => {
    if (hasToken) {
      navigate(redirectTo, { replace: true });
    }
  }, [hasToken, navigate, redirectTo]);

  // Если есть токен, не показываем контент (идет редирект)
  if (hasToken) {
    return null;
  }

  return <>{children}</>;
};
