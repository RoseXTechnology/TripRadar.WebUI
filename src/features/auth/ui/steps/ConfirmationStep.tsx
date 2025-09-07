import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { SignupFormData } from 'features/auth';
import { ROUTES } from 'shared/config/routes';

interface ConfirmationStepProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
}

export const ConfirmationStep = ({ register, errors }: ConfirmationStepProps) => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-content dark:text-content-dark mb-2">Welcome aboard! 🎉</h3>
      <p className="text-content-secondary dark:text-content-secondary-dark">
        You're almost ready to start your travel journey
      </p>
    </div>

    <div className="flex items-start space-x-4 pt-2">
      <input
        {...register('hasDataStorageConsent')}
        id="hasDataStorageConsent"
        type="checkbox"
        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-outline dark:border-outline-dark rounded flex-shrink-0"
      />
      <div>
        <label
          htmlFor="hasDataStorageConsent"
          className="text-sm text-content-secondary dark:text-content-secondary-dark leading-6"
        >
          I agree to data storage and processing, and accept the{' '}
          <Link
            to={ROUTES.TERMS}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to={ROUTES.PRIVACY}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Privacy Policy
          </Link>
        </label>
        {errors.hasDataStorageConsent && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.hasDataStorageConsent.message}</p>
        )}
      </div>
    </div>
  </div>
);
