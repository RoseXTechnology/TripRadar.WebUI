import { useTheme } from 'app/providers/ThemeContext';
import { XCircle, ArrowRight, AlertTriangle, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutCancel() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { actualTheme } = useTheme();

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 pt-16">
      {/* Mouse Follower Spotlight - Only in dark mode */}
      {actualTheme === 'dark' && (
        <div
          className="fixed pointer-events-none z-0 w-96 h-96 rounded-full opacity-20 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {/* Canceled Icon */}
          <div className="inline-flex p-4 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
            <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Payment Canceled</h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Your payment was canceled. No charges were made to your account. You can try again anytime.
          </p>
        </div>

        {/* Possible Reasons */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm mb-8 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span>Common Reasons for Cancellation</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">You decided not to complete the purchase at this time</p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                There might have been an issue with your payment method
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-0.5">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                The payment process was interrupted due to a technical issue
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                If you believe this cancellation was in error or you need assistance, please contact our support team.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="space-y-4 mb-8">
            <Link
              to="/pricing"
              className="block w-full sm:w-auto sm:inline-flex items-center justify-center space-x-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <span>Return to Pricing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/dashboard"
              className="block w-full sm:w-auto sm:inline-flex items-center justify-center space-x-2 px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mt-4 sm:mt-0 sm:ml-4"
            >
              <span>Go to Dashboard</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@tripradar.io" className="hover:text-primary-600 dark:hover:text-primary-400">
                support@tripradar.io
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">
                Live Chat Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
