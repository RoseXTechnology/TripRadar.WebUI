import { env } from 'shared/config';
import { authStorage } from 'shared/lib';

export interface ApiError {
  code: string;
  message: string;
}

export class ApiClient {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = env.API_BASE_URL;
    this.apiKey = env.API_KEY;
  }

  async request<T>(endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = authStorage.getToken();

    const requestData = {
      url,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        'X-ClientId': '127.0.0.1',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, requestData);

    if (!response.ok) {
      try {
        await this.handleError(response);
      } catch (error) {
        // Если токен был обновлен, повторяем запрос один раз
        if (error instanceof Error && error.message === 'TOKEN_REFRESHED' && retryCount === 0) {
          return this.request<T>(endpoint, options, retryCount + 1);
        }
        throw error;
      }
    }

    const result = await response.json();
    return result;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T, D = object>(endpoint: string, data?: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T, D = object>(endpoint: string, data?: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T, D = object>(endpoint: string, data?: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshTokens(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const url = `${this.baseURL}/api/v1/tokens/refresh-tokens`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        'X-ClientId': '127.0.0.1',
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
        usernameOrEmail: '', // Может потребоваться, проверим
      }),
    });

    if (!response.ok) {
      throw new Error(`Refresh failed: ${response.status}`);
    }

    return response.json();
  }

  private async handleError(response: Response): Promise<never> {
    if (response.status === 401) {
      // Попытка обновить токен
      const refreshToken = authStorage.getRefreshToken();
      if (refreshToken) {
        try {
          const refreshResponse = await this.refreshTokens(refreshToken);
          if (refreshResponse.token && refreshResponse.refreshToken) {
            authStorage.setTokens({
              authToken: refreshResponse.token,
              refreshToken: refreshResponse.refreshToken,
            });
            // Не выбрасываем ошибку, позволяем повторить запрос
            throw new Error('TOKEN_REFRESHED');
          }
        } catch {
          // Token refresh failed
        }
      }

      // Если обновление не удалось - очищаем и перенаправляем на логин
      authStorage.clearTokens();
      window.location.href = '/login';
      throw new Error('Unauthorized - redirecting to login');
    }

    let errorData: ApiError & { type?: string; error?: string; errorCode?: string; email?: string; detail?: string };
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        code: 'UNKNOWN_ERROR',
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    // For 403 errors with TELEGRAM_REQUIRED, preserve the full error data
    // Backend format: { errorCode: "TELEGRAM_REQUIRED", email: "user@example.com" }
    // Also support legacy formats: { type: "TELEGRAM_REQUIRED", ... } or { error: "TELEGRAM_REQUIRED", ... }
    const isTelegramRequired =
      response.status === 403 &&
      (errorData.errorCode === 'TELEGRAM_REQUIRED' ||
        errorData.type === 'TELEGRAM_REQUIRED' ||
        errorData.error === 'TELEGRAM_REQUIRED');

    if (isTelegramRequired) {
      const error = new Error(errorData.detail || errorData.message || 'Telegram account linking required') as Error & {
        email?: string;
        isTelegramRequired?: boolean;
        statusCode?: number;
      };
      error.email = errorData.email;
      error.isTelegramRequired = true;
      error.statusCode = 403;
      throw error;
    }

    // Create error with preserved response data
    const error = new Error(errorData.detail || errorData.message || 'API request failed') as Error & {
      response?: {
        data?: unknown;
        status?: number;
      };
      code?: string;
    };

    // Preserve error data for proper error handling in components
    error.response = {
      data: errorData,
      status: response.status,
    };
    error.code = errorData.errorCode || errorData.code;

    throw error;
  }
}

export const apiClient = new ApiClient();
