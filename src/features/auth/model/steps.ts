export type SignupStep = 'email' | 'details' | 'confirmation';

export const SIGNUP_STEPS = [
  { id: 'email' as const, title: 'Get Started', description: 'Enter your email to begin' },
  { id: 'details' as const, title: 'Create Account', description: 'Complete your profile' },
  { id: 'confirmation' as const, title: 'Almost Done', description: 'Review and confirm' },
] as const;
