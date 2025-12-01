import { createElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import * as fc from 'fast-check';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CreateUserRequest } from 'shared/api';
import { authApi } from './authApi';
import { useRegisterMutation } from './useRegister';

// Mock the authApi
vi.mock('./authApi', () => ({
  authApi: {
    register: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ children }: any) => {
    return createElement(QueryClientProvider, { client: queryClient }, children);
  };
};

describe('useRegisterMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Feature: email-only-registration, Property 2: API errors are displayed to users
   * Validates: Requirements 1.5, 9.1
   *
   * For any backend error response, the error message should be displayed in the UI
   */
  it(
    'property: API errors are displayed to users',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random error messages
          fc.string({ minLength: 1, maxLength: 200 }),
          async errorMessage => {
            // Setup: Mock API to reject with the error message
            vi.mocked(authApi.register).mockRejectedValueOnce(new Error(errorMessage));

            // Create a valid registration request
            const validRequest: CreateUserRequest = {
              email: 'test@example.com',
              password: 'password123',
              hasDataStorageConsent: true,
              firstName: null,
              lastName: null,
              phoneNumber: null,
              promoCode: null,
            };

            // Execute: Render hook and trigger mutation
            const { result } = renderHook(() => useRegisterMutation(), {
              wrapper: createWrapper(),
            });

            // Use mutateAsync to properly wait for the error
            try {
              await result.current.mutateAsync(validRequest);
              // If we get here, the mutation succeeded when it should have failed
              throw new Error('Expected mutation to fail but it succeeded');
            } catch (error) {
              // Verify: Error message matches the generated error message
              // This is the key property: the error message from the backend
              // is accessible and can be displayed to the user
              expect(error).toBeInstanceOf(Error);
              expect((error as Error).message).toBe(errorMessage);
            }
          }
        ),
        { numRuns: 100 }
      );
    },
    { timeout: 30000 }
  );
});

/**
 * Feature: email-only-registration, Property 6: Promo code errors are displayed
 * Validates: Requirements 3.4
 *
 * For any backend rejection of a promo code, the error message should be displayed to the user
 */
it(
  'property: Promo code errors are displayed',
  async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate random promo codes and error messages
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 1, maxLength: 200 }),
        async (promoCode, errorMessage) => {
          // Setup: Mock API to reject with a promo code error
          vi.mocked(authApi.register).mockRejectedValueOnce(new Error(errorMessage));

          // Create a registration request with a promo code
          const requestWithPromo: CreateUserRequest = {
            email: 'test@example.com',
            password: 'password123',
            hasDataStorageConsent: true,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            promoCode: promoCode,
          };

          // Execute: Render hook and trigger mutation
          const { result } = renderHook(() => useRegisterMutation(), {
            wrapper: createWrapper(),
          });

          // Use mutateAsync to properly wait for the error
          try {
            await result.current.mutateAsync(requestWithPromo);
            // If we get here, the mutation succeeded when it should have failed
            throw new Error('Expected mutation to fail but it succeeded');
          } catch (error) {
            // Verify: Error message is accessible and can be displayed
            // This validates that promo code errors from the backend
            // are properly propagated to the UI
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toBe(errorMessage);
          }
        }
      ),
      { numRuns: 100 }
    );
  },
  { timeout: 30000 }
);
