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
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl font-medium text-content dark:text-content-dark bg-surface-accent dark:bg-surface-accent-dark hover:bg-surface dark:hover:bg-surface-dark border border-outline dark:border-outline-dark transition-colors text-sm md:text-base"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={cn(
          'group relative flex-1 flex justify-center items-center gap-2 py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl font-semibold transition-all duration-200 text-sm md:text-base',
          'border border-content dark:border-outline text-surface dark:text-content bg-content dark:bg-surface hover:bg-content-secondary dark:hover:bg-surface-accent',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transform hover:-translate-y-0.5',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {isLoading ? (
          <>
            <div className="animate-spin h-4 w-4 md:h-5 md:w-5 border-2 border-surface dark:border-content border-t-transparent rounded-full"></div>
            <span>{AUTH_MESSAGES.ui.creatingAccount}</span>
          </>
        ) : (
          <>
            <span>{currentStep === 'confirmation' ? AUTH_MESSAGES.ui.createAccountBtn : 'Continue'}</span>
            <FaArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
};
