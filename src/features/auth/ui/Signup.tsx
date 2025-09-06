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
    window.location.href = '/profile';

    setIsLoading(false);
  };

  const onSubmit = async (data: SignupFormData) => {
    if (currentStep === 'email') handleEmailStep(data.email);
    if (currentStep === 'details') handleDetailsStep(data);
    if (currentStep === 'confirmation') await handleFinalStep(data);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Hero-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl space-y-6 md:space-y-8">
        {/* Main Card */}
        <div className="bg-surface dark:bg-surface-dark rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-outline dark:border-outline-dark p-4 md:p-6 lg:p-8">
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
              <div className="relative mb-6 md:mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline dark:border-outline-dark"></div>
                </div>
                <div className="relative flex justify-center text-xs md:text-sm">
                  <span className="px-3 md:px-4 bg-surface dark:bg-surface-dark text-content-muted font-medium">
                    {AUTH_MESSAGES.ui.orContinueEmail}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
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
          <div className="mt-6 md:mt-8 text-center">
            <p className="text-content-secondary dark:text-content-secondary-dark text-sm md:text-base">
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
