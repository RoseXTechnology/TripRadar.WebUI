import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  type SignupFormData,
  OAuthButtons,
  SignupNavigation,
  useSignupSteps,
  SignupProgress,
  AUTH_MESSAGES,
  useRegisterMutation,
} from 'features/auth';
import { ROUTES } from 'shared/config/routes';
import { SignupSteps } from './SignupSteps';

export const Signup = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const { currentStep, steps, progress, nextStep, prevStep, canGoPrev, isStepCompleted } = useSignupSteps();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      hasDataStorageConsent: false,
    },
  });

  const handleEmailStep = (email: string) => {
    if (email && email.includes('@')) {
      nextStep();
    }
  };

  const handleDetailsStep = (data: SignupFormData) => {
    if (data.username && data.password && data.confirmPassword) {
      nextStep();
    }
  };

  const handleFinalStep = async (data: SignupFormData) => {
    if (!data.hasDataStorageConsent) return;

    try {
      await registerMutation.mutateAsync({
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
        phoneNumber: data.phoneNumber || undefined,
        hasDataStorageConsent: data.hasDataStorageConsent,
      });

      // Успешная регистрация и автоматический логин
      navigate('/profile');
    } catch (error) {
      console.error('Registration failed:', error);
      // Ошибка будет отображена через registerMutation.error
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    if (currentStep === 'email') handleEmailStep(data.email);
    if (currentStep === 'details') handleDetailsStep(data);
    if (currentStep === 'confirmation') await handleFinalStep(data);
  };

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
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

          {/* Error Message */}
          {registerMutation.error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{registerMutation.error.message}</p>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <SignupSteps currentStep={currentStep} register={register} errors={errors} />

            <SignupNavigation
              currentStep={currentStep}
              canGoPrev={canGoPrev}
              isLoading={registerMutation.isPending}
              isDisabled={
                registerMutation.isPending ||
                (currentStep === 'email' && !watch('email')) ||
                (currentStep === 'details' &&
                  (!watch('username') || !watch('password') || !watch('confirmPassword'))) ||
                (currentStep === 'confirmation' && !watch('hasDataStorageConsent'))
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
