import { Link } from 'react-router-dom';
import { AUTH_MESSAGES } from 'features/auth';
import { ROUTES } from 'shared/config/routes';

interface ConfirmationStepProps {
  agreedToTerms: boolean;
  setAgreedToTerms: (value: boolean) => void;
}

export const ConfirmationStep = ({ agreedToTerms, setAgreedToTerms }: ConfirmationStepProps) => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Welcome aboard! 🎉</h3>
      <p className="text-gray-600 dark:text-gray-400">You're almost ready to start your travel journey</p>
    </div>

    <div className="flex items-start space-x-4 pt-2">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        checked={agreedToTerms}
        onChange={e => setAgreedToTerms(e.target.checked)}
        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded flex-shrink-0"
      />
      <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 leading-6">
        {AUTH_MESSAGES.ui.agreeToTerms}{' '}
        <Link
          to={ROUTES.TERMS}
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
        >
          {AUTH_MESSAGES.ui.termsOfService}
        </Link>{' '}
        and{' '}
        <Link
          to={ROUTES.PRIVACY}
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
        >
          {AUTH_MESSAGES.ui.privacyPolicy}
        </Link>
      </label>
    </div>
  </div>
);
