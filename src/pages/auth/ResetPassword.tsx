import React, { useState } from 'react';
import { FaCheckCircle, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from 'entities/auth';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const username = searchParams.get('username') || '';

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPasswordMutation = useResetPasswordMutation();

  if (!token) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-content dark:text-content-dark mb-2">Invalid reset link</h2>
          <p className="text-content-secondary dark:text-content-secondary-dark mb-4">
            This password reset link is invalid or has expired.
          </p>
          <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700">
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    resetPasswordMutation.mutate(
      { token, newPassword: formData.newPassword, username },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: error => {
          console.error('Reset password failed:', error);
          alert('Failed to reset password. Please try again or request a new reset link.');
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-6 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>

            <h2 className="text-xl font-bold text-content dark:text-content-dark mb-2">Password reset successful</h2>

            <p className="text-content-secondary dark:text-content-secondary-dark mb-4">
              Your password has been successfully reset. You can now log in with your new password.
            </p>

            <Link
              to="/login"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-surface px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Go to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-content dark:text-content-dark mb-2">
            Reset your password
          </h2>
          <p className="text-content-secondary dark:text-content-secondary-dark">Enter your new password below</p>
        </div>

        <div className="bg-surface dark:bg-surface-dark rounded-xl shadow-lg border border-outline dark:border-outline-dark p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-content dark:text-content-dark mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-content-muted" />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.newPassword}
                  onChange={e => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="block w-full pl-10 pr-10 py-3 border border-outline dark:border-outline-dark rounded-xl placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-surface dark:bg-surface-dark text-content dark:text-content-dark"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-content-muted hover:text-content dark:hover:text-content-dark" />
                  ) : (
                    <FaEye className="h-5 w-5 text-content-muted hover:text-content dark:hover:text-content-dark" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-content dark:text-content-dark mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-content-muted" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="block w-full pl-10 pr-10 py-3 border border-outline dark:border-outline-dark rounded-xl placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-surface dark:bg-surface-dark text-content dark:text-content-dark"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-content-muted hover:text-content dark:hover:text-content-dark" />
                  ) : (
                    <FaEye className="h-5 w-5 text-content-muted hover:text-content dark:hover:text-content-dark" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-surface bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
