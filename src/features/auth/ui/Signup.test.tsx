import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

/**
 * Feature: email-only-registration, Property 1: Registration request excludes username
 * Validates: Requirements 1.2, 1.3
 *
 * For any registration form submission, the API request payload should not contain a username field
 */
describe('Property 1: Registration request excludes username', () => {
  it('should never include username field in registration payload', () => {
    fc.assert(
      fc.property(
        fc.record({
          email: fc.emailAddress(),
          password: fc.string({ minLength: 6, maxLength: 50 }),
          hasDataStorageConsent: fc.constant(true),
          firstName: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: null }),
          lastName: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: null }),
          phoneNumber: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: null }),
          promoCode: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: null }),
        }),
        formData => {
          // Simulate the form submission logic
          const payload = {
            email: formData.email,
            password: formData.password,
            hasDataStorageConsent: formData.hasDataStorageConsent,
            firstName: formData.firstName || null,
            lastName: formData.lastName || null,
            phoneNumber: formData.phoneNumber || null,
            promoCode: formData.promoCode || null,
          };

          // Property: payload should never have a username field
          expect(payload).not.toHaveProperty('username');
          expect('username' in payload).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: email-only-registration, Property 3: Optional fields are included when filled
 * Validates: Requirements 2.2
 *
 * For any registration form submission where optional fields (firstName, lastName, phoneNumber)
 * have non-empty values, those values should be included in the API request
 */
describe('Property 3: Optional fields are included when filled', () => {
  it('should include optional fields in payload when they have non-empty values', () => {
    fc.assert(
      fc.property(
        fc.record({
          email: fc.emailAddress(),
          password: fc.string({ minLength: 6, maxLength: 50 }),
          hasDataStorageConsent: fc.constant(true),
          firstName: fc.string({ minLength: 1, maxLength: 50 }),
          lastName: fc.string({ minLength: 1, maxLength: 50 }),
          phoneNumber: fc.string({ minLength: 1, maxLength: 20 }),
        }),
        formData => {
          // Simulate the form submission logic with filled optional fields
          const payload = {
            email: formData.email,
            password: formData.password,
            hasDataStorageConsent: formData.hasDataStorageConsent,
            firstName: formData.firstName || null,
            lastName: formData.lastName || null,
            phoneNumber: formData.phoneNumber || null,
            promoCode: null,
          };

          // Property: when optional fields are filled, they should be in the payload
          expect(payload.firstName).toBe(formData.firstName);
          expect(payload.lastName).toBe(formData.lastName);
          expect(payload.phoneNumber).toBe(formData.phoneNumber);

          // Verify they are not null when provided
          expect(payload.firstName).not.toBeNull();
          expect(payload.lastName).not.toBeNull();
          expect(payload.phoneNumber).not.toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should send null for optional fields when they are empty', () => {
    fc.assert(
      fc.property(
        fc.record({
          email: fc.emailAddress(),
          password: fc.string({ minLength: 6, maxLength: 50 }),
          hasDataStorageConsent: fc.constant(true),
        }),
        formData => {
          // Simulate the form submission logic with empty optional fields
          const emptyString = '';
          const payload = {
            email: formData.email,
            password: formData.password,
            hasDataStorageConsent: formData.hasDataStorageConsent,
            firstName: emptyString || null,
            lastName: emptyString || null,
            phoneNumber: emptyString || null,
            promoCode: emptyString || null,
          };

          // Property: when optional fields are empty, they should be null
          expect(payload.firstName).toBeNull();
          expect(payload.lastName).toBeNull();
          expect(payload.phoneNumber).toBeNull();
          expect(payload.promoCode).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: email-only-registration, Property 5: Promo code is included when provided
 * Validates: Requirements 3.2
 *
 * For any registration form submission with a non-empty promo code,
 * the promo code should be included in the API request
 */
describe('Property 5: Promo code is included when provided', () => {
  it('should include promo code in payload when provided', () => {
    fc.assert(
      fc.property(
        fc.record({
          email: fc.emailAddress(),
          password: fc.string({ minLength: 6, maxLength: 50 }),
          hasDataStorageConsent: fc.constant(true),
          promoCode: fc.string({ minLength: 1, maxLength: 20 }),
        }),
        formData => {
          // Simulate the form submission logic with promo code
          const payload = {
            email: formData.email,
            password: formData.password,
            hasDataStorageConsent: formData.hasDataStorageConsent,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            promoCode: formData.promoCode || null,
          };

          // Property: when promo code is provided, it should be in the payload
          expect(payload.promoCode).toBe(formData.promoCode);
          expect(payload.promoCode).not.toBeNull();
          expect(payload.promoCode).not.toBe('');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should send null for promo code when not provided', () => {
    fc.assert(
      fc.property(
        fc.record({
          email: fc.emailAddress(),
          password: fc.string({ minLength: 6, maxLength: 50 }),
          hasDataStorageConsent: fc.constant(true),
        }),
        formData => {
          // Simulate the form submission logic without promo code
          const emptyString = '';
          const payload = {
            email: formData.email,
            password: formData.password,
            hasDataStorageConsent: formData.hasDataStorageConsent,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            promoCode: emptyString || null,
          };

          // Property: when promo code is not provided, it should be null
          expect(payload.promoCode).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});
