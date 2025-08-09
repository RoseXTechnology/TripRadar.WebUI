import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
}

export function Input({ label, error, icon: Icon, helperText, className = '', ...props }: InputProps) {
  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
    Icon ? 'pl-10' : ''
  } ${error ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} ${className}`;

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />}
        <input className={inputClasses} {...props} />
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {helperText && !error && <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
}
