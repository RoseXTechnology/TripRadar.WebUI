import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaGoogle, FaGithub, FaMicrosoft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { handleGoogleSignUp, handleGithubSignUp, handleMicrosoftSignUp } from 'features/auth/lib/oauth';
import { useAuthStore } from 'shared/store/auth';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock authentication - in production, validate credentials with backend
    const userName = formData.email.split('@')[0].replace(/[^a-zA-Z]/g, '');
    login({
      id: Date.now().toString(),
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: formData.email,
      avatar: `https://ui-avatars.com/api/?name=${userName}&background=6366f1&color=fff`,
      subscription: 'free',
    });
    setIsLoading(false);
  };

  const handleGoogleSignIn = () => handleGoogleSignUp();
  const handleGithubSignIn = () => handleGithubSignUp();
  const handleMicrosoftSignIn = () => handleMicrosoftSignUp();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Hero-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10">
        <div className="w-full space-y-6 md:space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 group mb-8"></Link>

            <h2 className="text-2xl md:text-3xl font-bold text-content dark:text-content-dark mb-2">Welcome back</h2>
            <p className="text-content-secondary dark:text-content-secondary-dark">
              Sign in to your account to continue your travel journey
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-surface dark:bg-surface-dark rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-outline dark:border-outline-dark p-6 md:p-8">
            {/* OAuth Buttons */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 border border-outline dark:border-outline-dark rounded-lg md:rounded-xl text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark transition-all duration-200 font-medium text-sm md:text-base"
              >
                <FaGoogle className="h-4 w-4 md:h-5 md:w-5" />
                <span>Continue with Google</span>
              </button>

              <button
                onClick={handleGithubSignIn}
                className="w-full flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 border border-outline dark:border-outline-dark rounded-lg md:rounded-xl text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark transition-all duration-200 font-medium text-sm md:text-base"
              >
                <FaGithub className="h-4 w-4 md:h-5 md:w-5" />
                <span>Continue with GitHub</span>
              </button>

              <button
                onClick={handleMicrosoftSignIn}
                className="w-full flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 border border-outline dark:border-outline-dark rounded-lg md:rounded-xl text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark transition-all duration-200 font-medium text-sm md:text-base"
              >
                <FaMicrosoft className="h-4 w-4 md:h-5 md:w-5" />
                <span>Continue with Microsoft</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-4 md:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline dark:border-outline-dark"></div>
              </div>
              <div className="relative flex justify-center text-xs md:text-sm">
                <span className="px-3 md:px-4 bg-surface dark:bg-surface-dark text-content-muted font-medium">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs md:text-sm font-medium text-content dark:text-content-dark mb-1.5 md:mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 md:h-5 md:w-5 text-content-muted" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="block w-full pl-8 md:pl-10 pr-3 py-2.5 md:py-3 border border-outline dark:border-outline-dark rounded-lg md:rounded-xl placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-surface dark:bg-surface-dark text-content dark:text-content-dark text-sm md:text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs md:text-sm font-medium text-content dark:text-content-dark mb-1.5 md:mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-4 w-4 md:h-5 md:w-5 text-content-muted" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="block w-full pl-8 md:pl-10 pr-8 md:pr-10 py-2.5 md:py-3 border border-outline dark:border-outline-dark rounded-lg md:rounded-xl placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-surface dark:bg-surface-dark text-content dark:text-content-dark text-sm md:text-base"
                    placeholder="Enter your password"
                  />
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
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3 w-3 md:h-4 md:w-4 text-primary-600 focus:ring-primary-500 border-outline dark:border-outline-dark rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-xs md:text-sm text-content dark:text-content-dark"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-xs md:text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center items-center gap-2 py-2.5 md:py-3 px-4 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark rounded-lg md:rounded-xl font-medium hover:bg-button-hover dark:hover:bg-button-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 md:h-5 md:w-5 border-2 border-surface dark:border-content border-t-transparent rounded-full"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <FaArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-4 md:mt-6 text-center">
              <p className="text-content-secondary dark:text-content-secondary-dark text-sm md:text-base">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
