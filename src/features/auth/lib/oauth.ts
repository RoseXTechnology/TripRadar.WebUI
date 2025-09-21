import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { authApi } from 'features/auth';
import { authStorage } from 'shared/api';
import { auth } from 'shared/lib/firebase';
import { createUserFromRegistration } from 'shared/lib/user-utils';
import { useAuthStore } from 'shared/store/auth';

type OAuthProviderType = 'google';

interface OAuthResult {
  success: boolean;
  user?: {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar: string;
    subscription: 'basic' | 'essential' | 'advanced';
  };
  error?: string;
}

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
    const idToken = await result.user.getIdToken();

    // Отправляем ID token на backend
    const loginResponse = await authApi.googleLogin({ id_token: idToken });

    // Сохраняем токены
    authStorage.setTokens({
      authToken: loginResponse.token,
      refreshToken: loginResponse.refreshToken,
    });

    // Создаем пользователя из Google данных
    const userData = {
      username: result.user.email?.split('@')[0] || 'user',
      email: result.user.email || '',
      name: result.user.displayName || 'User',
    };

    const user = createUserFromRegistration(userData);
    useAuthStore.getState().login(user);

    window.location.href = '/profile';
    return { success: true };
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
