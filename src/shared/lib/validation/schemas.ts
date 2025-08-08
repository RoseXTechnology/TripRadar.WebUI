import { isValidEmail, isValidPassword, validateRequired } from '../utils';

export interface ValidationRule<T> {
  validate: (value: T) => string | null;
  message?: string;
}

export const authValidation = {
  email: (value: string): string | null => {
    const required = validateRequired(value);
    if (required) return required;

    if (!isValidEmail(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  password: (value: string): string | null => {
    const required = validateRequired(value);
    if (required) return required;

    if (!isValidPassword(value)) {
      return 'Password must be at least 8 characters long';
    }
    return null;
  },

  confirmPassword: (password: string, confirmPassword: string): string | null => {
    const required = validateRequired(confirmPassword);
    if (required) return required;

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  },
};
