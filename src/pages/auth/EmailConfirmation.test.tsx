import { createElement } from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import * as fc from 'fast-check';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from 'shared/api';
import { EmailConfirmation } from './EmailConfirmation';

// Mock the apiClient
vi.mock('shared/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const createWrapper = (username: string, token: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ children }: any) => {
    return createElement(
      MemoryRouter,
      { initialEntries: [`/confirm-email?username=${username}&token=${token}`] },
      createElement(Routes, null, createElement(Route, { path: '/confirm-email', element: children }))
    );
  };
};

describe('EmailConfirmation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: email-only-registration, Property 7: Email confirmation errors are handled
   * Validates: Requirements 4.4
   *
   * For any email confirmation failure, an error message with instructions should be displayed
   */
  it(
    'property: Email confirmation errors are handled',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate URL-safe usernames (alphanumeric, dash, underscore)
          fc.stringMatching(/^[a-zA-Z0-9_-]{3,50}$/).filter(s => s.trim().length > 0),
          // Generate URL-safe tokens (alphanumeric, dash, underscore)
          fc.stringMatching(/^[a-zA-Z0-9_-]{10,100}$/).filter(s => s.trim().length > 0),
          // Generate readable error messages with at least one word
          fc
            .array(fc.stringMatching(/^[a-zA-Z0-9]+$/), { minLength: 1, maxLength: 10 })
            .map(words => words.join(' '))
            .filter(s => s.length >= 5 && s.length <= 100),
          async (username, token, errorMessage) => {
            // Clean up before each iteration
            cleanup();

            // Setup: Mock API to reject with the error message
            vi.mocked(apiClient.get).mockRejectedValueOnce(new Error(errorMessage));

            // Execute: Render the component with the generated username and token
            const Wrapper = createWrapper(username, token);
            render(createElement(EmailConfirmation), { wrapper: Wrapper });

            // Verify: Wait for error state to be displayed
            await waitFor(
              () => {
                // Check that the error heading is displayed
                const errorHeading = screen.getByRole('heading', { name: /confirmation failed/i });
                expect(errorHeading).toBeInTheDocument();

                // Check that the error message is displayed
                expect(screen.getByText(errorMessage)).toBeInTheDocument();

                // Check that instructions are provided
                expect(screen.getByText(/try clicking the confirmation link/i)).toBeInTheDocument();

                // Check that action buttons are available
                expect(screen.getByRole('link', { name: /go to login/i })).toBeInTheDocument();
                expect(screen.getByRole('link', { name: /back to signup/i })).toBeInTheDocument();
              },
              { timeout: 5000 }
            );

            // Cleanup after verification
            cleanup();
          }
        ),
        { numRuns: 100 }
      );
    },
    { timeout: 120000 }
  );
});
