import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleGoogleSignUp } from '../lib/oauth';
import { OAuthButtons } from './OAuthButtons';

// Mock the oauth handler
vi.mock('../lib/oauth', () => ({
  handleGoogleSignUp: vi.fn(),
}));

describe('OAuthButtons Loading States and Accessibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state with proper accessibility attributes during Google sign up', async () => {
    // Mock a delayed response
    vi.mocked(handleGoogleSignUp).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<OAuthButtons />);

    const googleButton = screen.getByRole('button', { name: /continue with google/i });

    // Initial state
    expect(googleButton).not.toBeDisabled();
    expect(screen.queryByText('Connecting to Google...')).not.toBeInTheDocument();

    // Click button to trigger loading
    fireEvent.click(googleButton);

    // Should show loading state immediately
    await waitFor(() => {
      expect(googleButton).toBeDisabled();
      expect(screen.getByText('Connecting to Google...')).toBeInTheDocument();
    });

    // Should have proper accessibility attributes during loading
    expect(googleButton).toHaveAttribute('aria-describedby', 'google-loading-status');
    expect(screen.getByText('Connecting to Google...')).toHaveAttribute('id', 'google-loading-status');

    // Loading spinner should be hidden from screen readers
    const spinner = googleButton.querySelector('.animate-spin');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');

    // Wait for loading to complete
    await waitFor(() => {
      expect(googleButton).not.toBeDisabled();
      expect(screen.queryByText('Connecting to Google...')).not.toBeInTheDocument();
    });
  });

  it('should handle errors gracefully and restore button state', async () => {
    // Mock an error
    vi.mocked(handleGoogleSignUp).mockRejectedValue(new Error('OAuth failed'));

    render(<OAuthButtons />);

    const googleButton = screen.getByRole('button', { name: /continue with google/i });

    fireEvent.click(googleButton);

    // Should show loading state
    await waitFor(() => {
      expect(googleButton).toBeDisabled();
    });

    // Should restore button state after error
    await waitFor(() => {
      expect(googleButton).not.toBeDisabled();
      expect(screen.queryByText('Connecting to Google...')).not.toBeInTheDocument();
    });
  });

  it('should have proper semantic structure and accessibility', () => {
    render(<OAuthButtons />);

    const googleButton = screen.getByRole('button', { name: /continue with google/i });

    // Button should have proper minimum touch target
    expect(googleButton).toHaveClass('min-h-[48px]');

    // Icon should be hidden from screen readers
    const icon = googleButton.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');

    // Button should have proper styling for disabled state
    expect(googleButton).toHaveClass('disabled:opacity-60', 'disabled:cursor-not-allowed');
  });
});
