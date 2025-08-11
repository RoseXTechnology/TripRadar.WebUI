import { useTheme } from 'app/providers/ThemeContext';
import { CheckCircle, ArrowRight, Shield, Bot, DollarSign, Users, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export default function CheckoutSuccess() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { actualTheme } = useTheme();

  // Mock subscription data
  const subscription = {
    plan: 'Premium',
    startDate: new Date().toLocaleDateString(),
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    amount: '$10.00',
    interval: 'monthly',
    orderId: 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    paymentMethod: 'Visa ending in 4242',
  };

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
          {/* Success Icon */}
          <div className="inline-flex p-4 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
            <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Payment Successful!</h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Your premium subscription has been activated successfully. Thank you for your purchase!
          </p>
        </div>

        {/* Order Details */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm mb-8 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Plan</span>
              <span className="font-medium text-gray-900 dark:text-white">{subscription.plan}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Amount</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {subscription.amount} / {subscription.interval}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Start Date</span>
              <span className="font-medium text-gray-900 dark:text-white">{subscription.startDate}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Next Billing Date</span>
              <span className="font-medium text-gray-900 dark:text-white">{subscription.nextBillingDate}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Order ID</span>
              <span className="font-medium text-gray-900 dark:text-white">{subscription.orderId}</span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
              <span className="font-medium text-gray-900 dark:text-white">{subscription.paymentMethod}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              <Download className="h-4 w-4" />
              <span>Download Receipt</span>
            </button>
          </div>
        </div>

        {/* Premium Features */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm mb-8 animate-slide-up"
          style={{ animationDelay: '0.5s' }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Premium Benefits</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">AI Travel Assistant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chat with our AI via Telegram or WhatsApp for instant trip assistance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Advanced Budget Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Detailed expense tracking, alerts, and financial insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Group Trip Planning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Collaborate with friends and family on trip planning.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Priority Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get faster responses and dedicated assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className="space-y-4 mb-8">
            <Link
              to={ROUTES.DASHBOARD}
              className="block w-full sm:w-auto sm:inline-flex items-center justify-center space-x-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to={ROUTES.BILLING}
              className="block w-full sm:w-auto sm:inline-flex items-center justify-center space-x-2 px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mt-4 sm:mt-0 sm:ml-4"
            >
              <span>Manage Subscription</span>
            </Link>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
}
