import { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { SignupFormData } from 'features/auth';
import { EmailStep, DetailsStep, ConfirmationStep } from './steps';

interface SignupStepsProps {
  currentStep: string;
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
}

export const SignupSteps = ({ currentStep, register, errors }: SignupStepsProps) => {
  switch (currentStep) {
    case 'email':
      return <EmailStep register={register} errors={errors} />;

    case 'details':
      return <DetailsStep register={register} errors={errors} />;

    case 'confirmation':
      return <ConfirmationStep register={register} errors={errors} />;

    default:
      return null;
  }
};
