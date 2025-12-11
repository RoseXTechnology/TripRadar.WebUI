import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from 'entities/auth/api';
import { useAuthStore } from 'shared/store/auth';

export const useLogout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    // Call API first if we have username
    if (user?.username) {
      try {
        await logoutMutation.mutateAsync(user.username);
      } catch (error) {
        // Continue with logout even if API fails
        console.warn('Logout API failed, continuing with local logout:', error);
      }
    }

    // Clear local state
    logout();

    // Navigate to home
    navigate('/', { replace: true });
  };

  return handleLogout;
};
