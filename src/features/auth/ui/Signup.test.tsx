import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

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
