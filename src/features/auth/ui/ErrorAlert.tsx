/**
 * ErrorAlert component for displaying errors with actions
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

import React from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { ErrorConfig } from '../lib/errorMessages';

interface ErrorAlertProps extends ErrorConfig {
  onDismiss?: () => void;
  children?: React.ReactNode;
}

export const ErrorAlert = ({ title, message, severity, actions, onDismiss, children }: ErrorAlertProps) => {
  const severityStyles = {
    error: 'bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark',
    warning: 'bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark',
    info: 'bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark',
  };

  const iconStyles = {
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400',
  };

  const Icon = {
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }[severity];

  return (
    <div
      className={`rounded-xl p-4 transition-all duration-200 ${severityStyles[severity]}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconStyles[severity]}`} aria-hidden="true" />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-content dark:text-content-dark mb-1">{title}</h3>
          <p className="text-sm text-content-secondary dark:text-content-secondary-dark">{message}</p>

          {children}

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={
                    action.variant === 'primary'
                      ? 'px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md'
                      : 'px-4 py-2.5 border border-outline dark:border-outline-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark text-content dark:text-content-dark rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md'
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
            className="text-content-muted hover:text-content dark:hover:text-content-dark transition-all duration-200 flex-shrink-0 p-1 rounded-lg hover:bg-surface-accent dark:hover:bg-surface-accent-dark"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
