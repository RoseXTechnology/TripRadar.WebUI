import {
  CreditCard,
  Download,
  Check,
  AlertTriangle,
  DollarSign,
  Calendar,
  ArrowRight,
  Star,
  Clock,
  RefreshCw,
  MapPin,
  Bot,
} from 'lucide-react';
import React, { useState } from 'react';

import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export default function Billing() {
  const { user } = useApp();
  const { actualTheme } = useTheme();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowCancelModal(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <CreditCard className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Please sign in</h2>
          <p className="text-gray-600 dark:text-gray-400">You need to be logged in to view your billing information.</p>
        </div>
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Billing & Subscription</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your subscription and payment information</p>
        </div>

        <div className="space-y-8">
          {/* Current Plan */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Current Plan</span>
            </h3>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white capitalize mb-1">
                  {user.subscription} Plan
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {user.subscription === 'premium' ? '$10/month' : 'Free forever'}
                </div>
                {user.subscription === 'premium' && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Next billing date: March 15, 2025</div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    user.subscription === 'premium'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {user.subscription === 'premium' ? 'Active' : 'Free'}
                </div>

                {user.subscription === 'premium' ? (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel Plan
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors">
                    Upgrade to Premium
                  </button>
                )}
              </div>
            </div>

            {/* Plan Features */}
            {user.subscription === 'premium' && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Premium Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Unlimited trips',
                    'AI travel assistant',
                    'Advanced budget tracking',
                    'Group trip coordination',
                    'Priority support',
                    'Ad-free experience',
                    'Offline access',
                    'Premium templates',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span>Payment Methods</span>
              </h3>

              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                Add New Card
              </button>
            </div>

            {user.subscription === 'premium' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Expires 12/25</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs">
                      Default
                    </span>
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                <CreditCard className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">No payment methods added yet</p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                  Add Payment Method
                </button>
              </div>
            )}
          </div>

          {/* Billing History */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Billing History</span>
            </h3>

            {user.subscription === 'premium' ? (
              <div className="space-y-4">
                {[
                  {
                    date: 'Feb 15, 2025',
                    amount: '$10.00',
                    status: 'Paid',
                    id: 'INV-2025-0215',
                  },
                  {
                    date: 'Jan 15, 2025',
                    amount: '$10.00',
                    status: 'Paid',
                    id: 'INV-2025-0115',
                  },
                  {
                    date: 'Dec 15, 2024',
                    amount: '$10.00',
                    status: 'Paid',
                    id: 'INV-2024-1215',
                  },
                ].map((invoice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{invoice.date}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{invoice.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">{invoice.amount}</div>
                      <div className="text-sm text-green-600 dark:text-green-400">{invoice.status}</div>
                    </div>
                    <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">No billing history available</p>
              </div>
            )}
          </div>

          {/* Billing Address */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span>Billing Address</span>
              </h3>

              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                Edit Address
              </button>
            </div>

            {user.subscription === 'premium' ? (
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                <p className="text-gray-900 dark:text-white font-medium">{user.name}</p>
                <p className="text-gray-600 dark:text-gray-400">123 Travel Street</p>
                <p className="text-gray-600 dark:text-gray-400">San Francisco, CA 94103</p>
                <p className="text-gray-600 dark:text-gray-400">United States</p>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                <p className="text-gray-600 dark:text-gray-400">No billing address added yet</p>
                <button className="mt-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                  Add Billing Address
                </button>
              </div>
            )}
          </div>

          {/* Subscription Management */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Subscription Management</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Auto-renewal</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {user.subscription === 'premium'
                      ? 'Your subscription will automatically renew on March 15, 2025'
                      : 'Enable auto-renewal when you upgrade'}
                  </div>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                  <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white"></span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Email Receipts</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Receive email receipts for all payments
                  </div>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                  <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Comparison */}
          {user.subscription !== 'premium' && (
            <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Upgrade to Premium</h3>
              <p className="text-blue-100 mb-6">
                Get access to all premium features and enhance your travel experience.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Bot className="h-5 w-5" />
                    <span>AI Travel Assistant</span>
                  </h4>
                  <p className="text-sm text-blue-100">
                    Chat with our AI via Telegram or WhatsApp for instant trip assistance.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Advanced Budget Tools</span>
                  </h4>
                  <p className="text-sm text-blue-100">Detailed expense tracking, alerts, and financial insights.</p>
                </div>
              </div>

              <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2 mx-auto">
                <span>Upgrade Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Cancel Subscription Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cancel Subscription</h3>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to cancel your premium subscription? You'll lose access to all premium features at
                the end of your current billing period.
              </p>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Your subscription will remain active until March 15, 2025. You can reactivate anytime before then to
                    maintain continuous access.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={isLoading}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Cancel Subscription</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
