import { useAuth } from 'app/providers/AuthContext';
import { User, Key, Info, CheckCircle, AlertTriangle, Clock, FileText, ArrowRight, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

export default function TestAccount() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginAsTestUser = () => {
    // Create test user data
    const testUser = {
      id: 'test-user-1',
      name: 'Test User',
      email: 'test@tripradar.io',
      avatar:
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
      subscription: 'premium',
    };

    // Log in as test user
    login(testUser);

    // Navigate to dashboard
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
            <User className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Test Account</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Use our test account to explore all features of TripRadar without creating a new account.
          </p>
        </div>

        {/* Test Account Info */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Info className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span>Test Account Information</span>
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Details</h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Username:</strong> test@tripradar.io
                  </p>
                  <p>
                    <strong>Password:</strong> TestUser123
                  </p>
                  <p>
                    <strong>Subscription:</strong> Premium (All features enabled)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <Key className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Access & Permissions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  The test account has full access to all features and functionality, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Trip planning and management</li>
                  <li>Budget tracking and expense management</li>
                  <li>Group trip coordination</li>
                  <li>AI travel assistant</li>
                  <li>Advanced search capabilities</li>
                  <li>All premium features</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg mt-1">
                <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Session Information</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Test account sessions have the following characteristics:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Session persists until you manually log out</li>
                  <li>Data changes are saved but reset every 24 hours</li>
                  <li>Multiple simultaneous sessions are allowed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-1">Important Notes</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
                  <li>This account is for testing purposes only</li>
                  <li>Data entered in this account may be visible to other testers</li>
                  <li>Do not enter real personal information or payment details</li>
                  <li>The account is reset periodically</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span>Test Account Limitations</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-red-100 dark:bg-red-900/20 rounded-full mt-0.5">
                <X className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">No Email Notifications</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Email notifications are disabled for test accounts.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-red-100 dark:bg-red-900/20 rounded-full mt-0.5">
                <X className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">No Payment Processing</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Payment features are simulated but no actual transactions occur.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-red-100 dark:bg-red-900/20 rounded-full mt-0.5">
                <X className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">No External API Integrations</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Third-party integrations use mock data instead of live connections.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 bg-red-100 dark:bg-red-900/20 rounded-full mt-0.5">
                <X className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">No Account Modification</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You cannot change the email, password, or subscription level of the test account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Explore TripRadar?</h3>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Log in with our test account to experience all premium features without creating an account.
          </p>
          <button
            onClick={handleLoginAsTestUser}
            className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2 mx-auto"
          >
            <span>Log in as Test User</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-blue-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Full feature access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Premium enabled</span>
            </div>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/help"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center space-x-3"
          >
            <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-gray-900 dark:text-white font-medium">Help Center</span>
          </Link>

          <Link
            to="/api-docs"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center space-x-3"
          >
            <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-gray-900 dark:text-white font-medium">API Documentation</span>
          </Link>

          <Link
            to="/feedback"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center space-x-3"
          >
            <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-gray-900 dark:text-white font-medium">Provide Feedback</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
