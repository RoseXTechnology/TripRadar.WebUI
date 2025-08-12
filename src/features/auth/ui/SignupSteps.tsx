import { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { SignupFormData } from 'features/auth';
import { EmailStep, DetailsStep, ConfirmationStep } from './steps';

interface SignupStepsProps {
  currentStep: string;
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  agreedToTerms: boolean;
  setAgreedToTerms: (value: boolean) => void;
}

export const SignupSteps = ({ currentStep, register, errors, agreedToTerms, setAgreedToTerms }: SignupStepsProps) => {
  switch (currentStep) {
    case 'email':
      return <EmailStep register={register} errors={errors} />;

    case 'details':
      return <DetailsStep register={register} errors={errors} />;

    case 'confirmation':
      return <ConfirmationStep agreedToTerms={agreedToTerms} setAgreedToTerms={setAgreedToTerms} />;

    default:
      return null;
  }
};
