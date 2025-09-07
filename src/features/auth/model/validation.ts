import { z } from 'zod';
import { AUTH_MESSAGES } from './constants';

export const signupSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(50, 'Username too long'),
    email: z.string().email(AUTH_MESSAGES.validation.emailInvalid),
    password: z.string().min(8, AUTH_MESSAGES.validation.passwordMin),
    confirmPassword: z.string(),
    firstName: z.string().max(64, 'First name too long').optional(),
    lastName: z.string().max(64, 'Last name too long').optional(),
    phoneNumber: z.string().optional(),
    hasDataStorageConsent: z.boolean().refine(val => val === true, {
      message: 'You must agree to data storage consent',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: AUTH_MESSAGES.validation.passwordsNoMatch,
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
