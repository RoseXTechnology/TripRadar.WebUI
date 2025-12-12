import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleGoogleSignUp } from '../lib/oauth';
import { OAuthButtons } from './OAuthButtons';

// Mock the oauth handler
vi.mock('../lib/oauth', () => ({
  handleGoogleSignUp: vi.fn(),
}));

describe('OAuthButtons Functionality and Accessibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call handleGoogleSignUp when Google button is clicked', async () => {
    vi.mocked(handleGoogleSignUp).mockResolvedValue({ success: true });

    render(<OAuthButtons />);

    const googleButton = screen.getByRole('button', { name: /continue with google/i });
    fireEvent.click(googleButton);

    expect(handleGoogleSignUp).toHaveBeenCalledTimes(1);
  });

  it('should handle OAuth errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(handleGoogleSignUp).mockResolvedValue({ success: false, error: 'OAuth failed' });

    render(<OAuthButtons />);

    const googleButton = screen.getByRole('button', { name: /continue with google/i });
    fireEvent.click(googleButton);

    // Should not throw error and button should remain clickable
    expect(googleButton).not.toBeDisabled();

    consoleSpy.mockRestore();
  });

  it('should have proper semantic structure and accessibility', () => {
    render(<OAuthButtons />);

    const googleButton = screen.getByRole('button', { name: /continue with google/i });

    // Button should have proper minimum touch target
    expect(googleButton).toHaveClass('min-h-[48px]');

    // Icon should be hidden from screen readers
    const icon = googleButton.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');

    // Button should be accessible and clickable
    expect(googleButton).toBeEnabled();
  });
});
