interface AuthTokens {
  authToken: string;
  refreshToken: string;
}

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },

  setTokens: (tokens: AuthTokens): void => {
    localStorage.setItem('authToken', tokens.authToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  },

  clearTokens: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  },

  hasValidToken: (): boolean => {
    return !!authStorage.getToken();
  },
};
