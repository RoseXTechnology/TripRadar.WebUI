import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from 'entities/user/api/useDeleteUserMutation';
import { ROUTES } from 'shared/config/routes';
import { authStorage } from 'shared/lib/auth-storage';
import { useAuthStore } from 'shared/store/auth';

/**
 * DeleteUserButton Component
 *
 * Internal/development button for deleting current user account.
 * Shows confirmation dialog before deletion.
 */
export const DeleteUserButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const deleteUserMutation = useDeleteUserMutation();

  const { user } = useAuthStore();

  const handleDelete = () => {
    if (!user?.username) {
      console.error('No username available for deletion');
      return;
    }

    deleteUserMutation.mutate(user.username, {
      onSuccess: () => {
        // Clear auth state and tokens
        authStorage.clearTokens();
        logout();

        // Redirect to home
        navigate(ROUTES.HOME);

        // Close confirmation dialog
        setShowConfirm(false);
      },
      onError: (error: unknown) => {
        console.error('Failed to delete user:', error);
        // Keep dialog open on error so user can try again
      },
    });
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-surface dark:bg-surface-dark border border-outline dark:border-outline-dark rounded-xl p-6 max-w-sm mx-4">
          <h3 className="text-lg font-semibold text-content dark:text-content-dark mb-2">Delete Account</h3>
          <p className="text-sm text-content-secondary dark:text-content-secondary-dark mb-4">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              disabled={deleteUserMutation.isPending}
              className="flex-1 px-4 py-2 border border-outline dark:border-outline-dark text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-lg font-medium transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteUserMutation.isPending}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2"
            >
              {deleteUserMutation.isPending ? (
                <>
                  <div className="animate-spin h-3 w-3 border border-white border-t-transparent rounded-full"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-3 w-3" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
      title="Delete Account (Dev)"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
};
