import { env } from 'shared/config';
import { authStorage } from 'shared/lib';

export interface ApiError {
  code: string;
  message: string;
}

export class ApiClient {
  private baseURL: string;
  private apiKey: string;
  private internalApiKey: string;

  constructor() {
    this.baseURL = env.API_BASE_URL;
    this.apiKey = env.API_KEY;
    this.internalApiKey = env.INTERNAL_API_KEY;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

    console.log('🚀 API Request:', {
      endpoint,
      method: options.method || 'GET',
      headers: requestData.headers,
      body: options.body,
    });

    const response = await fetch(url, requestData);

    if (!response.ok) {
      console.log('❌ API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      await this.handleError(response);
    }

    const result = await response.json();
    console.log('✅ API Success:', result);
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
   * Internal API methods - automatically include X-Internal-Auth header
   * Use these methods for all requests to /api/v{version}/internals/* endpoints
   */

  async internalGet<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers: {
        'X-Internal-Auth': this.internalApiKey,
      },
    });
  }

  async internalPost<T, D = object>(endpoint: string, data?: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {
        'X-Internal-Auth': this.internalApiKey,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async internalPut<T, D = object>(endpoint: string, data?: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: {
        'X-Internal-Auth': this.internalApiKey,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async internalPatch<T, D = object>(endpoint: string, data?: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      headers: {
        'X-Internal-Auth': this.internalApiKey,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async internalDelete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: {
        'X-Internal-Auth': this.internalApiKey,
      },
    });
  }

  private async handleError(response: Response): Promise<never> {
    console.log('🚨 Handling error:', response.status, response.url);

    if (response.status === 401) {
      // Токен истек - очищаем и перенаправляем на логин
      console.log('🔒 Unauthorized - clearing tokens');
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

    console.log('💥 API Error data:', errorData);

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
      console.log('🔗 TELEGRAM_REQUIRED error detected, email:', errorData.email);
      throw error;
    }

    throw new Error(errorData.detail || errorData.message || 'API request failed');
  }
}

export const apiClient = new ApiClient();
