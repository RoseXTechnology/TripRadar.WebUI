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

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
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

    let errorData: ApiError;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        code: 'UNKNOWN_ERROR',
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    console.log('💥 API Error data:', errorData);
    throw new Error(errorData.message || 'API request failed');
  }
}

export const apiClient = new ApiClient();
