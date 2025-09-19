import { z } from 'zod';
import { AUTH_MESSAGES } from './constants';

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .max(50, 'Username too long')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
    email: z.string().email(AUTH_MESSAGES.validation.emailInvalid),
    password: z
      .string()
      .min(8, AUTH_MESSAGES.validation.passwordMin)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
      ),
    confirmPassword: z.string(),
    firstName: z.string().max(64, 'First name too long').optional(),
    lastName: z.string().max(64, 'Last name too long').optional(),
    phoneNumber: z
      .string()
      .regex(/^\+[1-9]\d{2,15}$/, 'Phone number must be in E.164 format (+12345678901)')
      .optional()
      .or(z.literal('')),
    hasDataStorageConsent: z.boolean().refine(val => val === true, {
      message: 'You must agree to data storage consent',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: AUTH_MESSAGES.validation.passwordsNoMatch,
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
