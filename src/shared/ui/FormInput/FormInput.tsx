import React, { forwardRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { cn } from 'shared/lib/utils';

interface FormInputProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel';
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, name, type, label, placeholder, icon, error, required = false, autoComplete, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-xs md:text-sm font-medium text-content dark:text-content-dark mb-1.5 md:mb-2"
        >
          {label}
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-content-muted [&>svg]:h-4 [&>svg]:w-4 md:[&>svg]:h-5 md:[&>svg]:w-5">{icon}</div>
          </div>
          <input
            {...props}
            ref={ref}
            id={id}
            name={name}
            type={inputType}
            autoComplete={autoComplete}
            required={required}
            className={cn(
              'block w-full pl-8 md:pl-10 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all text-sm md:text-base',
              'border placeholder-content-muted',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'bg-surface dark:bg-surface-dark text-content dark:text-content-dark',
              isPassword ? 'pr-8 md:pr-10' : 'pr-3',
              error ? 'border-red-500 focus:ring-red-500' : 'border-outline dark:border-outline-dark'
            )}
            placeholder={placeholder}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FaEyeSlash className="h-4 w-4 md:h-5 md:w-5 text-content-muted hover:text-content dark:hover:text-content-dark" />
              ) : (
                <FaEye className="h-4 w-4 md:h-5 md:w-5 text-content-muted hover:text-content dark:hover:text-content-dark" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs md:text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
