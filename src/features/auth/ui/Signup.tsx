import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  type SignupFormData,
  OAuthButtons,
  SignupNavigation,
  useSignupSteps,
  SignupProgress,
  AUTH_MESSAGES,
} from 'features/auth';
import { ROUTES } from 'shared/config/routes';
import { SignupSteps } from './SignupSteps';

export const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { currentStep, steps, progress, nextStep, prevStep, canGoPrev, isStepCompleted } = useSignupSteps();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleEmailStep = (email: string) => {
    if (email && email.includes('@')) {
      nextStep();
    }
  };

  const handleDetailsStep = (data: SignupFormData) => {
    if (data.name && data.password && data.confirmPassword) {
      nextStep();
    }
  };

  const handleFinalStep = async (data: SignupFormData) => {
    if (!agreedToTerms) return;

    setIsLoading(true);

    // Mock signup for development
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=6366f1&color=fff`,
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    console.log('Mock signup successful:', user);
    window.location.href = '/dashboard';

    setIsLoading(false);
  };

  const onSubmit = async (data: SignupFormData) => {
    if (currentStep === 'email') handleEmailStep(data.email);
    if (currentStep === 'details') handleDetailsStep(data);
    if (currentStep === 'confirmation') await handleFinalStep(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Progress */}
          <SignupProgress
            steps={steps}
            currentStep={currentStep}
            isStepCompleted={isStepCompleted}
            progress={progress}
          />

          {/* OAuth Buttons - only on first step */}
          {currentStep === 'email' && (
            <>
              <OAuthButtons />

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                    {AUTH_MESSAGES.ui.orContinueEmail}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <SignupSteps
              currentStep={currentStep}
              register={register}
              errors={errors}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
            />

            <SignupNavigation
              currentStep={currentStep}
              canGoPrev={canGoPrev}
              isLoading={isLoading}
              isDisabled={
                isLoading ||
                (currentStep === 'email' && !watch('email')) ||
                (currentStep === 'details' && (!watch('name') || !watch('password') || !watch('confirmPassword'))) ||
                (currentStep === 'confirmation' && !agreedToTerms)
              }
              onPrevStep={prevStep}
            />
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {AUTH_MESSAGES.ui.alreadyHaveAccount}{' '}
              <Link
                to={ROUTES.LOGIN}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold"
              >
                {AUTH_MESSAGES.ui.signIn}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
