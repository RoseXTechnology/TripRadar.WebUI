import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const EmailConfirmed = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Hero-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10">
        <div className="w-full max-w-md space-y-6 md:space-y-8">
          {/* Success Card */}
          <div className="bg-surface dark:bg-surface-dark rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-outline dark:border-outline-dark p-6 md:p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <FaCheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-500 mx-auto" />
            </div>

            {/* Header */}
            <h1 className="text-2xl md:text-3xl font-bold text-content dark:text-content-dark mb-4">
              Email Confirmed!
            </h1>

            <p className="text-content-secondary dark:text-content-secondary-dark mb-8 text-sm md:text-base">
              Great! Your email has been successfully confirmed. You can now sign in to your TripRadar account and start
              planning your next adventure.
            </p>

            {/* Sign In Button */}
            <Link
              to="/login"
              className="group relative w-full flex justify-center items-center gap-2 py-2.5 md:py-3 px-4 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark rounded-lg md:rounded-xl font-medium hover:bg-button-hover dark:hover:bg-button-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              <span>Sign In to Your Account</span>
              <FaArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Additional Info */}
            <p className="mt-6 text-xs md:text-sm text-content-muted">
              Ready to explore the world with TripRadar? Sign in and discover amazing travel destinations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
