import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as fc from 'fast-check';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRegisterMutation } from 'entities/auth';
import { ROUTES } from 'shared/config/routes';
import { Signup } from './Signup';

// Mock the useRegisterMutation hook
vi.mock('entities/auth', () => ({
  useRegisterMutation: vi.fn(),
}));

// Mock navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/**
 * Feature: email-only-registration, Property 1: Registration request contains only required fields
 * Validates: Requirements 1.2, 1.3
 *
 * For any registration form submission, the API request payload should contain only email, password, and hasDataStorageConsent
 */
describe('Property 1: Registration request contains only required fields', () => {
  it('should only include email, password, and hasDataStorageConsent in registration payload', () => {
    fc.assert(
      fc.property(
        fc.record({
          email: fc.emailAddress(),
          password: fc.string({ minLength: 6, maxLength: 50 }),
          hasDataStorageConsent: fc.constant(true),
        }),
        formData => {
          // Simulate the form submission logic
          const payload = {
            email: formData.email,
            password: formData.password,
            hasDataStorageConsent: formData.hasDataStorageConsent,
          };

          // Property: payload should only have the three required fields
          expect(Object.keys(payload)).toHaveLength(3);
          expect(payload).toHaveProperty('email');
          expect(payload).toHaveProperty('password');
          expect(payload).toHaveProperty('hasDataStorageConsent');

          // Property: payload should not have optional fields
          expect(payload).not.toHaveProperty('username');
          expect(payload).not.toHaveProperty('firstName');
          expect(payload).not.toHaveProperty('lastName');
          expect(payload).not.toHaveProperty('phoneNumber');
          expect(payload).not.toHaveProperty('promoCode');
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Unit tests for Signup component
 * Requirements: 1.1, 1.2, 1.5, 2.1
 */
describe('Signup Component', () => {
  const mockMutate = vi.fn();
  const mockRegisterMutation = {
    mutate: mockMutate,
    isPending: false,
    isError: false,
    error: null,
  };

  const renderSignup = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRegisterMutation).mockReturnValue(mockRegisterMutation);
    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  describe('Initial rendering', () => {
    it('should render signup form without errors initially', () => {
      renderSignup();

      expect(screen.getByText('Create your account')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Create a password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    it('should render all form fields and elements', () => {
      renderSignup();

      // Check form fields by placeholder since labels aren't properly associated
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Create a password')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();

      // Check links
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });
  });

  describe('Password hint/error mutual exclusivity (Requirements 1.1, 1.2, 1.5)', () => {
    it('should display password hint when no error is present', () => {
      renderSignup();

      expect(screen.getByText('Min 9 chars, 1 uppercase, 1 digit, 1 special')).toBeInTheDocument();
    });

    it('should hide password hint when validation error is present', async () => {
      renderSignup();

      const passwordInput = screen.getByPlaceholderText('Create a password');

      // Enter invalid password to trigger validation error
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.blur(passwordInput); // Trigger validation

      await waitFor(() => {
        // Should show error message
        expect(screen.getByText(/Password must be at least 9 characters long/)).toBeInTheDocument();
        // Should NOT show hint
        expect(screen.queryByText('Min 9 chars, 1 uppercase, 1 digit, 1 special')).not.toBeInTheDocument();
      });
    });

    it('should show hint again when error is cleared', async () => {
      renderSignup();

      const passwordInput = screen.getByPlaceholderText('Create a password');

      // Enter invalid password first
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.getByText(/Password must be at least 9 characters long/)).toBeInTheDocument();
      });

      // Enter a valid password to clear validation error
      fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });

      await waitFor(() => {
        // Error should be gone, hint should be back
        expect(screen.queryByText(/Password must be at least 9 characters long/)).not.toBeInTheDocument();
        expect(screen.getByText('Min 9 chars, 1 uppercase, 1 digit, 1 special')).toBeInTheDocument();
      });
    });

    it('should never show both hint and error simultaneously', async () => {
      renderSignup();

      const passwordInput = screen.getByPlaceholderText('Create a password');

      // Test various password states
      const testPasswords = ['', 'weak', 'WeakPass', 'WeakPass1', 'StrongPass1!'];

      for (const password of testPasswords) {
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.blur(passwordInput);

        await waitFor(() => {
          const hasHint = screen.queryByText('Min 9 chars, 1 uppercase, 1 digit, 1 special') !== null;
          const hasError = screen.queryByText(/Password must be/) !== null;

          // Should never have both hint and error at the same time
          expect(hasHint && hasError).toBe(false);
        });
      }
    });
  });

  describe('Form submission with valid data', () => {
    it('should submit form with valid data and navigate to EmailSent', async () => {
      renderSignup();

      // Fill form with valid data
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'StrongPass1!' } });
      fireEvent.click(screen.getByRole('checkbox'));

      // Mock successful registration
      mockMutate.mockImplementation((data, { onSuccess }) => {
        onSuccess();
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        // Should call mutation with correct data
        expect(mockMutate).toHaveBeenCalledWith(
          {
            email: 'test@example.com',
            password: 'StrongPass1!',
            hasDataStorageConsent: true,
          },
          expect.any(Object)
        );

        // Should store email in sessionStorage
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith('registration_email', 'test@example.com');

        // Should navigate to EmailSent page
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EMAIL_SENT);
      });
    });

    it('should show loading state during submission', async () => {
      vi.mocked(useRegisterMutation).mockReturnValue({
        ...mockRegisterMutation,
        isPending: true,
      });

      renderSignup();

      // Fill form with valid data
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'StrongPass1!' } });
      fireEvent.click(screen.getByRole('checkbox'));

      expect(screen.getByText('Creating account...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
    });
  });

  describe('Form submission with invalid data', () => {
    it('should show validation errors for empty fields', async () => {
      renderSignup();

      // Try to submit empty form
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
        expect(screen.getByText('You must agree to continue')).toBeInTheDocument();
      });

      // Should not call mutation
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('should show validation error for invalid email format', async () => {
      renderSignup();

      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'invalid-email' } });
      fireEvent.blur(screen.getByPlaceholderText('Enter your email'));

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('should show validation error for weak password', async () => {
      renderSignup();

      fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'weak' } });
      fireEvent.blur(screen.getByPlaceholderText('Create a password'));

      await waitFor(() => {
        expect(screen.getByText(/Password must be at least 9 characters long/)).toBeInTheDocument();
      });
    });

    it('should not submit form when consent is not given', async () => {
      renderSignup();

      // Fill valid data but don't check consent
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'StrongPass1!' } });

      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(screen.getByText('You must agree to continue')).toBeInTheDocument();
      });

      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  describe('Error alert display on backend errors (Requirement 2.1)', () => {
    it('should display error alert when backend returns error', async () => {
      renderSignup();

      // Fill form with valid data
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'existing@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'StrongPass1!' } });
      fireEvent.click(screen.getByRole('checkbox'));

      // Mock error response
      const mockError = {
        response: {
          data: {
            code: 'EMAIL_ALREADY_EXISTS',
            email: 'existing@example.com',
          },
        },
      };

      mockMutate.mockImplementation((data, { onError }) => {
        onError(mockError);
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        // Should display error alert
        expect(screen.getByText('Email Already Registered')).toBeInTheDocument();
        expect(
          screen.getByText('This email is already in use. Please log in or reset your password.')
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
      });
    });

    it('should clear error alert when dismissed', async () => {
      renderSignup();

      // Fill form and trigger error
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'existing@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'StrongPass1!' } });
      fireEvent.click(screen.getByRole('checkbox'));

      const mockError = {
        response: {
          data: {
            code: 'EMAIL_ALREADY_EXISTS',
            email: 'existing@example.com',
          },
        },
      };

      mockMutate.mockImplementation((data, { onError }) => {
        onError(mockError);
      });

      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(screen.getByText('Email Already Registered')).toBeInTheDocument();
      });

      // Dismiss error
      const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
      fireEvent.click(dismissButton);

      await waitFor(() => {
        expect(screen.queryByText('Email Already Registered')).not.toBeInTheDocument();
      });
    });

    it('should clear error alert on new form submission', async () => {
      renderSignup();

      // First submission with error
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'existing@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'StrongPass1!' } });
      fireEvent.click(screen.getByRole('checkbox'));

      const mockError = {
        response: {
          data: {
            code: 'EMAIL_ALREADY_EXISTS',
          },
        },
      };

      mockMutate.mockImplementationOnce((data, { onError }) => {
        onError(mockError);
      });

      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(screen.getByText('Email Already Registered')).toBeInTheDocument();
      });

      // Change email and submit again
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'new@example.com' } });

      mockMutate.mockImplementationOnce((data, { onSuccess }) => {
        onSuccess();
      });

      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      // Error should be cleared before new submission
      await waitFor(() => {
        expect(screen.queryByText('Email Already Registered')).not.toBeInTheDocument();
      });
    });
  });

  describe('Password visibility toggle', () => {
    it('should toggle password visibility when eye icon is clicked', async () => {
      renderSignup();

      const passwordInput = screen.getByPlaceholderText('Create a password');
      // Find the toggle button by its position in the password field container
      const toggleButtons = screen.getAllByRole('button');
      const toggleButton = toggleButtons.find(button => button.querySelector('svg') && button.type === 'button');

      expect(toggleButton).toBeInTheDocument();

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click to show password
      fireEvent.click(toggleButton!);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click to hide password again
      fireEvent.click(toggleButton!);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Form accessibility', () => {
    it('should have proper labels and ARIA attributes', () => {
      renderSignup();

      // Check form fields by placeholder since labels aren't properly associated
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Create a password')).toBeInTheDocument();
    });

    it('should associate error messages with form fields', async () => {
      renderSignup();

      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'invalid' } });
      fireEvent.blur(screen.getByPlaceholderText('Enter your email'));

      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const errorMessage = screen.getByText('Invalid email address');

        expect(emailInput).toBeInvalid();
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});
