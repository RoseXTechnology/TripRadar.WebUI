/**
 * Tests for error message handling
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { ERROR_MESSAGES, navigateToLogin, navigateToPasswordReset, parseBackendError } from './errorMessages';

// Mock window.location
const mockLocation = {
  origin: 'http://localhost:3000',
  href: '',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('ERROR_MESSAGES', () => {
  describe('EMAIL_ALREADY_EXISTS', () => {
    it('should return correct error config with concise message', () => {
      const context = { email: 'test@example.com' };
      const config = ERROR_MESSAGES.EMAIL_ALREADY_EXISTS(context);

      expect(config.title).toBe('Email Already Registered');
      expect(config.message).toBe('This email is already in use. Please log in or reset your password.');
      expect(config.severity).toBe('warning');
      expect(config.actions).toHaveLength(2);
    });

    it('should have correct action labels', () => {
      const context = { email: 'test@example.com' };
      const config = ERROR_MESSAGES.EMAIL_ALREADY_EXISTS(context);

      expect(config.actions?.[0].label).toBe('Log In');
      expect(config.actions?.[0].variant).toBe('primary');
      expect(config.actions?.[1].label).toBe('Reset Password');
      expect(config.actions?.[1].variant).toBe('secondary');
    });

    it('should have message under 100 characters', () => {
      const context = { email: 'test@example.com' };
      const config = ERROR_MESSAGES.EMAIL_ALREADY_EXISTS(context);

      expect(config.message.length).toBeLessThanOrEqual(100);
    });
  });
});

describe('parseBackendError', () => {
  it('should parse EMAIL_ALREADY_EXISTS error correctly', () => {
    const backendError = {
      response: {
        data: {
          code: 'EMAIL_ALREADY_EXISTS',
          email: 'test@example.com',
        },
      },
    };

    const config = parseBackendError(backendError);

    expect(config.title).toBe('Email Already Registered');
    expect(config.message).toBe('This email is already in use. Please log in or reset your password.');
    expect(config.severity).toBe('warning');
    expect(config.actions).toHaveLength(2);
  });

  it('should handle error without email context', () => {
    const backendError = {
      response: {
        data: {
          code: 'EMAIL_ALREADY_EXISTS',
        },
      },
    };

    const config = parseBackendError(backendError);

    expect(config.title).toBe('Email Already Registered');
    expect(config.actions).toHaveLength(2);
  });
});

describe('Navigation helpers', () => {
  beforeEach(() => {
    mockLocation.href = '';
  });

  describe('navigateToLogin', () => {
    it('should navigate to login page without email', () => {
      navigateToLogin();
      expect(mockLocation.href).toBe('http://localhost:3000/login');
    });

    it('should navigate to login page with email pre-fill', () => {
      navigateToLogin('test@example.com');
      expect(mockLocation.href).toBe('http://localhost:3000/login?email=test%40example.com');
    });
  });

  describe('navigateToPasswordReset', () => {
    it('should navigate to forgot password page without email', () => {
      navigateToPasswordReset();
      expect(mockLocation.href).toBe('http://localhost:3000/forgot-password');
    });

    it('should navigate to forgot password page with email pre-fill', () => {
      navigateToPasswordReset('test@example.com');
      expect(mockLocation.href).toBe('http://localhost:3000/forgot-password?email=test%40example.com');
    });
  });
});
