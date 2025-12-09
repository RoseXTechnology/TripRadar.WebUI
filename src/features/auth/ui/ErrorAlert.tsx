/**
 * ErrorAlert component for displaying errors with actions
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import type { ErrorConfig } from '../lib/errorMessages';

interface ErrorAlertProps extends ErrorConfig {
  onDismiss?: () => void;
}

export const ErrorAlert = ({ title, message, severity, actions, onDismiss }: ErrorAlertProps) => {
  const severityStyles = {
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  };

  const iconStyles = {
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400',
  };

  const Icon = {
    error: FaExclamationCircle,
    warning: FaExclamationTriangle,
    info: FaInfoCircle,
  }[severity];

  return (
    <div className={`rounded-lg border p-4 ${severityStyles[severity]}`} role="alert" aria-live="polite">
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconStyles[severity]}`} aria-hidden="true" />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-content dark:text-content-dark mb-1">{title}</h3>
          <p className="text-sm text-content-secondary dark:text-content-secondary-dark">{message}</p>

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={
                    action.variant === 'primary'
                      ? 'px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors'
                      : 'px-4 py-2 border border-outline dark:border-outline-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark text-content dark:text-content-dark rounded-lg text-sm font-medium transition-colors'
                  }
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-content-muted hover:text-content dark:hover:text-content-dark transition-colors flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
