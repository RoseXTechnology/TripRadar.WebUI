import { useState } from 'react';
import { SIGNUP_STEPS, type SignupStep } from 'features/auth';

export const useSignupSteps = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = SIGNUP_STEPS[currentStepIndex].id;
  const progress = ((currentStepIndex + 1) / SIGNUP_STEPS.length) * 100;
  const canGoPrev = currentStepIndex > 0;

  const nextStep = () => {
    if (currentStepIndex < SIGNUP_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const goToStep = (step: SignupStep) => {
    const index = SIGNUP_STEPS.findIndex(s => s.id === step);
    if (index !== -1) {
      setCurrentStepIndex(index);
    }
  };

  const isStepCompleted = (step: SignupStep) => {
    const stepIndex = SIGNUP_STEPS.findIndex(s => s.id === step);
    return stepIndex < currentStepIndex;
  };

  return {
    currentStep,
    steps: SIGNUP_STEPS,
    progress,
    nextStep,
    prevStep,
    goToStep,
    isStepCompleted,
    canGoPrev,
  };
};
