import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { AUTH_MESSAGES } from 'features/auth';
import type { SignupFormData } from 'features/auth';
import { FormInput } from 'shared/ui';

interface DetailsStepProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
}

export const DetailsStep = ({ register, errors }: DetailsStepProps) => (
  <>
    <FormInput
      {...register('username')}
      id="username"
      type="text"
      label="Username"
      placeholder="Enter your username"
      icon={<FaUser className="h-5 w-5 text-content-muted" />}
      autoComplete="username"
      error={errors.username?.message}
      required
    />

    <FormInput
      {...register('password')}
      id="password"
      type="password"
      label={AUTH_MESSAGES.ui.password}
      placeholder={AUTH_MESSAGES.placeholders.createPassword}
      icon={<FaLock className="h-5 w-5 text-content-muted" />}
      autoComplete="new-password"
      error={errors.password?.message}
      required
    />

    <FormInput
      {...register('confirmPassword')}
      id="confirmPassword"
      type="password"
      label={AUTH_MESSAGES.ui.confirmPassword}
      placeholder={AUTH_MESSAGES.placeholders.confirmPassword}
      icon={<FaLock className="h-5 w-5 text-content-muted" />}
      autoComplete="new-password"
      error={errors.confirmPassword?.message}
      required
    />
  </>
);
