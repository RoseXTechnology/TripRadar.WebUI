import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EmailConfirmed } from './EmailConfirmed';

// Mock the TelegramConnect component since we're testing session management
vi.mock('features/auth/ui/TelegramConnect', () => ({
  TelegramConnect: ({ email }: { email: string }) => (
    <div data-testid="telegram-connect">TelegramConnect with email: {email}</div>
  ),
}));

// Mock the auth store
vi.mock('shared/store/auth', () => ({
  useAuthStore: () => ({
    login: vi.fn(),
  }),
}));

const renderWithProviders = (component: React.ReactElement, searchParams = '') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          {/* Mock search params by setting window.location */}
          {searchParams && (window.location.search = searchParams)}
          {component}
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('EmailConfirmed Session Management', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    // Clear URL search params
    window.location.search = '';
  });

  it('should retrieve email from URL parameters when available', () => {
    // Set URL parameter
    Object.defineProperty(window, 'location', {
      value: {
        search: '?email=test@example.com',
      },
      writable: true,
    });

    renderWithProviders(<EmailConfirmed />);

    // Should show TelegramConnect with the email from URL
    expect(screen.getByTestId('telegram-connect')).toHaveTextContent('TelegramConnect with email: test@example.com');
  });

  it('should fallback to sessionStorage when URL parameter is not available', () => {
    // Set email in sessionStorage
    sessionStorage.setItem('registration_email', 'session@example.com');

    renderWithProviders(<EmailConfirmed />);

    // Should show TelegramConnect with the email from sessionStorage
    expect(screen.getByTestId('telegram-connect')).toHaveTextContent('TelegramConnect with email: session@example.com');
  });

  it('should show error message when email is not available in URL or sessionStorage', () => {
    // No email in URL or sessionStorage
    renderWithProviders(<EmailConfirmed />);

    // Should show error message
    expect(screen.getByText('Registration Information Missing')).toBeInTheDocument();
    expect(screen.getByText(/Unable to retrieve your registration information/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to Login' })).toBeInTheDocument();
  });

  it('should prioritize URL parameter over sessionStorage', () => {
    // Set both URL parameter and sessionStorage
    sessionStorage.setItem('registration_email', 'session@example.com');
    Object.defineProperty(window, 'location', {
      value: {
        search: '?email=url@example.com',
      },
      writable: true,
    });

    renderWithProviders(<EmailConfirmed />);

    // Should use URL parameter, not sessionStorage
    expect(screen.getByTestId('telegram-connect')).toHaveTextContent('TelegramConnect with email: url@example.com');
  });
});
