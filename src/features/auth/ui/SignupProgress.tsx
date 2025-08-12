import { FaCheck } from 'react-icons/fa';
import type { SignupStep, SIGNUP_STEPS } from 'features/auth';
import { cn } from 'shared/lib/utils';

interface SignupProgressProps {
  steps: typeof SIGNUP_STEPS;
  currentStep: SignupStep;
  isStepCompleted: (step: SignupStep) => boolean;
  progress: number;
}

export const SignupProgress = ({ steps, currentStep, isStepCompleted, progress }: SignupProgressProps) => {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = isStepCompleted(step.id);

          return (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200',
                  isCurrent && 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-900',
                  isCompleted && !isCurrent && 'bg-green-500 text-white',
                  !isCurrent && !isCompleted && 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                )}
              >
                {isCompleted ? <FaCheck className="h-4 w-4" /> : index + 1}
              </div>
              <div className="mt-2">
                <div
                  className={cn(
                    'text-xs font-medium',
                    isCurrent && 'text-primary-600 dark:text-primary-400',
                    isCompleted && !isCurrent && 'text-green-600 dark:text-green-400',
                    !isCurrent && !isCompleted && 'text-gray-500 dark:text-gray-400'
                  )}
                >
                  {step.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
