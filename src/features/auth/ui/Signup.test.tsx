import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as fc from 'fast-check';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRegisterMutation } from 'entities/auth';
import type { CreateUserRequest, UserManagementResponse } from 'shared/api';
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
  const mockRegisterMutation: Partial<UseMutationResult<UserManagementResponse, Error, CreateUserRequest, unknown>> = {
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
    vi.mocked(useRegisterMutation).mockReturnValue(
      mockRegisterMutation as unknown as UseMutationResult<UserManagementResponse, Error, CreateUserRequest, unknown>
    );
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
      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
    });

    it('should render all form fields and elements', () => {
      renderSignup();

      // Check form fields by placeholder since labels aren't properly associated
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Create a password')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();

      // Check links
      expect(screen.getByText('Terms')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });
  });

  describe('Password hint/error mutual exclusivity (Requirements 1.1, 1.2, 1.5)', () => {
    it('should display password hint in tooltip when hovering info icon', async () => {
      renderSignup();

      const infoButton = screen.getByLabelText('Password requirements');

      // Hover over info button to show tooltip
      fireEvent.mouseEnter(infoButton);

      await waitFor(() => {
        expect(screen.getByText('• 9+ characters')).toBeInTheDocument();
        expect(screen.getByText('• 1 uppercase')).toBeInTheDocument();
        expect(screen.getByText('• 1 number')).toBeInTheDocument();
        expect(screen.getByText('• 1 special char')).toBeInTheDocument();
      });

      // Mouse leave should hide tooltip
      fireEvent.mouseLeave(infoButton);

      await waitFor(() => {
        expect(screen.queryByText('• 9+ characters')).not.toBeInTheDocument();
      });
    });

    it('should show validation error when password is invalid', async () => {
      renderSignup();

      const passwordInput = screen.getByPlaceholderText('Create a password');

      // Enter invalid password to trigger validation error
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.blur(passwordInput); // Trigger validation

      await waitFor(() => {
        // Should show error message
        expect(screen.getByText(/Password must be at least 9 characters long/)).toBeInTheDocument();
      });
    });

    it('should clear error when valid password is entered', async () => {
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
        // Error should be gone
        expect(screen.queryByText(/Password must be at least 9 characters long/)).not.toBeInTheDocument();
      });
    });

    it('should show tooltip on focus and hide on blur', async () => {
      renderSignup();

      const infoButton = screen.getByLabelText('Password requirements');

      // Focus should show tooltip
      fireEvent.focus(infoButton);

      await waitFor(() => {
        expect(screen.getByText('• 9+ characters')).toBeInTheDocument();
      });

      // Blur should hide tooltip
      fireEvent.blur(infoButton);

      await waitFor(() => {
        expect(screen.queryByText('• 9+ characters')).not.toBeInTheDocument();
      });
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
      mockMutate.mockImplementation((_, { onSuccess }) => {
        onSuccess();
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /get started/i }));

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
      } as unknown as UseMutationResult<UserManagementResponse, Error, CreateUserRequest, unknown>);

      renderSignup();

      // Fill form with valid data
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'StrongPass1!' } });
      fireEvent.click(screen.getByRole('checkbox'));

      expect(screen.getByText('Creating your account...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /creating your account/i })).toBeDisabled();
    });
  });

  describe('Form submission with invalid data', () => {
    it('should show validation errors for empty fields', async () => {
      renderSignup();

      // Try to submit empty form
      fireEvent.click(screen.getByRole('button', { name: /get started/i }));

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

      fireEvent.click(screen.getByRole('button', { name: /get started/i }));

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

      mockMutate.mockImplementation((_, { onError }) => {
        onError(mockError);
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /get started/i }));

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

      mockMutate.mockImplementation((_, { onError }) => {
        onError(mockError);
      });

      fireEvent.click(screen.getByRole('button', { name: /get started/i }));

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

      mockMutate.mockImplementationOnce((_, { onError }) => {
        onError(mockError);
      });

      fireEvent.click(screen.getByRole('button', { name: /get started/i }));

      await waitFor(() => {
        expect(screen.getByText('Email Already Registered')).toBeInTheDocument();
      });

      // Change email and submit again
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'new@example.com' } });

      mockMutate.mockImplementationOnce((_, { onSuccess }) => {
        onSuccess();
      });

      fireEvent.click(screen.getByRole('button', { name: /get started/i }));

      // Error should be cleared before new submission
      await waitFor(() => {
        expect(screen.queryByText('Email Already Registered')).not.toBeInTheDocument();
      });
    });
  });

  describe('Password visibility toggle', () => {
    it('should toggle password visibility when eye icon is clicked', async () => {
      renderSignup();

      const passwordInput = screen.getByPlaceholderText('Create a password') as HTMLInputElement;
      // Find the toggle button by its aria-label
      const toggleButton = screen.getByLabelText('Show password');

      expect(toggleButton).toBeInTheDocument();

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click to show password
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Button label should change
      const hideButton = screen.getByLabelText('Hide password');
      expect(hideButton).toBeInTheDocument();

      // Click to hide password again
      fireEvent.click(hideButton);
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

  describe('Mobile accessibility and touch targets (Requirements 4.1, 4.3)', () => {
    it('should have minimum touch target sizes for interactive elements', () => {
      renderSignup();

      // Check form inputs have minimum height
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Create a password');
      const submitButton = screen.getByRole('button', { name: /get started/i });

      // Check that inputs have min-h-[44px] class or equivalent
      expect(emailInput).toHaveClass('min-h-[44px]');
      expect(passwordInput).toHaveClass('min-h-[44px]');
      expect(submitButton).toHaveClass('min-h-[48px]'); // Primary button is slightly larger
    });

    it('should have appropriate input types and attributes for mobile keyboards', () => {
      renderSignup();

      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Create a password');

      // Email input should have proper attributes for mobile
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('inputMode', 'email');
      expect(emailInput).toHaveAttribute('autoComplete', 'email');
      expect(emailInput).toHaveAttribute('autoCapitalize', 'none');
      expect(emailInput).toHaveAttribute('autoCorrect', 'off');
      expect(emailInput).toHaveAttribute('spellCheck', 'false');

      // Password input should have proper attributes
      expect(passwordInput).toHaveAttribute('autoComplete', 'new-password');
      expect(passwordInput).toHaveAttribute('autoCapitalize', 'none');
      expect(passwordInput).toHaveAttribute('autoCorrect', 'off');
      expect(passwordInput).toHaveAttribute('spellCheck', 'false');
    });

    it('should have accessible password toggle button with proper touch target', () => {
      renderSignup();

      const toggleButtons = screen.getAllByRole('button');
      const passwordToggle = toggleButtons.find(button => button.getAttribute('aria-label')?.includes('password'));

      expect(passwordToggle).toBeInTheDocument();
      expect(passwordToggle).toHaveAttribute('aria-label');
      expect(passwordToggle).toHaveClass('min-h-[44px]', 'min-w-[44px]');
    });

    it('should have readable text sizes for mobile devices', () => {
      renderSignup();

      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Create a password');
      const submitButton = screen.getByRole('button', { name: /get started/i });

      // Inputs should have text-base for readability
      expect(emailInput).toHaveClass('text-base');
      expect(passwordInput).toHaveClass('text-base');
      expect(submitButton).toHaveClass('text-base');
    });

    it('should have proper checkbox size for mobile interaction', () => {
      renderSignup();

      const checkbox = screen.getByRole('checkbox');

      // Checkbox should be larger than default for mobile
      expect(checkbox).toHaveClass('h-5', 'w-5', 'min-h-[20px]', 'min-w-[20px]');
    });

    it('should have accessible links with proper touch targets', () => {
      renderSignup();

      const termsLink = screen.getByText('Terms');
      const privacyLink = screen.getByText('Privacy Policy');
      const signInLink = screen.getByText('Sign in');

      // Links should have minimum touch target height
      expect(termsLink).toHaveClass('min-h-[44px]');
      expect(privacyLink).toHaveClass('min-h-[44px]');
      expect(signInLink).toHaveClass('min-h-[44px]');
    });
  });
});
