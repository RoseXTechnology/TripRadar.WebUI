import { z } from 'zod';

import { AUTH_MESSAGES } from './constants';

export const signupSchema = z
  .object({
    name: z.string().min(2, AUTH_MESSAGES.validation.nameMin),
    email: z.string().email(AUTH_MESSAGES.validation.emailInvalid),
    password: z.string().min(8, AUTH_MESSAGES.validation.passwordMin),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: AUTH_MESSAGES.validation.passwordsNoMatch,
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
