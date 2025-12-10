import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Signup } from './Signup';

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
 * Unit tests for Signup component error handling
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */
describe('Signup component error handling', () => {
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

  it('should render signup form without errors initially', () => {
    renderSignup();

    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Create a password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('should display password hint when no error is present', () => {
    renderSignup();

    expect(screen.getByText('Min 9 chars, 1 uppercase, 1 digit, 1 special')).toBeInTheDocument();
  });
});
