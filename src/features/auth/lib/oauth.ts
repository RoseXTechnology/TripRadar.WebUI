import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { auth } from 'shared/lib/firebase';
import { useAuthStore } from 'shared/store/auth';

type OAuthProviderType = 'google';

interface OAuthResult {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    subscription: 'free' | 'premium' | 'enterprise';
  };
  error?: string;
}

const createUserData = (user: User) => ({
  id: user.uid,
  name: user.displayName || user.email?.split('@')[0] || 'User',
  email: user.email || '',
  avatar: user.photoURL || '',
  subscription: 'free' as const,
});

const handleOAuthError = (error: { code?: string; message?: string }, provider: string): string => {
  console.error(`${provider} OAuth error:`, error);

  switch (error.code) {
    case 'auth/popup-closed-by-user':
      return 'Authorization window was closed';
    case 'auth/cancelled-popup-request':
      return 'Authorization request was cancelled';
    case 'auth/account-exists-with-different-credential':
      return 'Account already exists with different sign-in method';
    case 'auth/popup-blocked':
      return 'Popup window was blocked by browser';
    default:
      return `Sign in error via ${provider}: ${error.message}`;
  }
};

const signInWithProvider = async (
  provider: GoogleAuthProvider,
  providerName: OAuthProviderType
): Promise<OAuthResult> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const userData = createUserData(result.user);

    useAuthStore.getState().login(userData);
    window.location.href = '/profile';

    return { success: true, user: userData };
  } catch (error: unknown) {
    const authError = error as { code?: string; message?: string };
    const errorMessage = handleOAuthError(authError, providerName);
    return { success: false, error: errorMessage };
  }
};

export const handleGoogleSignUp = async (): Promise<OAuthResult> => {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  return signInWithProvider(provider, 'google');
};
