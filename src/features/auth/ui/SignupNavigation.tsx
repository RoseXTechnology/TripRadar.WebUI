import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AUTH_MESSAGES } from 'features/auth';
import { cn } from 'shared/lib/utils';

interface SignupNavigationProps {
  currentStep: string;
  canGoPrev: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  onPrevStep: () => void;
}

export const SignupNavigation = ({
  currentStep,
  canGoPrev,
  isLoading,
  isDisabled,
  onPrevStep,
}: SignupNavigationProps) => {
  return (
    <div className="flex space-x-4">
      {canGoPrev && (
        <button
          type="button"
          onClick={onPrevStep}
          className="flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={cn(
          'group relative flex-1 flex justify-center items-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200',
          'border border-transparent text-white bg-primary-600 hover:bg-primary-700',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {isLoading ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>{AUTH_MESSAGES.ui.creatingAccount}</span>
          </>
        ) : (
          <>
            <span>{currentStep === 'confirmation' ? AUTH_MESSAGES.ui.createAccountBtn : 'Continue'}</span>
            <FaArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
};
