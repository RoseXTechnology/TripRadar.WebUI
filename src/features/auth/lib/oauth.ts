import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, User } from 'firebase/auth';
import { auth } from 'shared/lib/firebase';

type OAuthProviderType = 'google' | 'github' | 'microsoft';

interface OAuthResult {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    provider: OAuthProviderType;
  };
  error?: string;
}

const createUserData = (user: User, provider: OAuthProviderType) => ({
  id: user.uid,
  name: user.displayName || user.email?.split('@')[0] || 'User',
  email: user.email || '',
  avatar: user.photoURL || '',
  provider,
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
  provider: GoogleAuthProvider | GithubAuthProvider | OAuthProvider,
  providerName: OAuthProviderType
): Promise<OAuthResult> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const userData = createUserData(result.user, providerName);

    // Save to localStorage in format expected by AuthContext
    localStorage.setItem('tripradar-auth', JSON.stringify({ user: userData }));
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');

    console.log('OAuth signup successful:', userData);

    // Reload page so AuthContext picks up the changes
    window.location.reload();

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

export const handleGithubSignUp = async (): Promise<OAuthResult> => {
  const provider = new GithubAuthProvider();
  provider.addScope('user:email');
  return signInWithProvider(provider, 'github');
};

export const handleMicrosoftSignUp = async (): Promise<OAuthResult> => {
  const provider = new OAuthProvider('microsoft.com');
  provider.addScope('email');
  provider.addScope('profile');
  return signInWithProvider(provider, 'microsoft');
};
