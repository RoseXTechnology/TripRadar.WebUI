import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa';
import { AUTH_MESSAGES } from 'features/auth';
import type { SignupFormData } from 'features/auth';
import { FormInput } from 'shared/ui';

interface EmailStepProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
}

export const EmailStep = ({ register, errors }: EmailStepProps) => (
  <FormInput
    {...register('email')}
    id="email"
    type="email"
    label={AUTH_MESSAGES.ui.emailAddress}
    placeholder={AUTH_MESSAGES.placeholders.enterEmail}
    icon={<FaEnvelope className="h-5 w-5 text-gray-400" />}
    autoComplete="email"
    error={errors.email?.message}
    required
  />
);
