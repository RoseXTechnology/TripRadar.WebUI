import { FaCheck, FaRobot, FaChartBar, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const TokenUsageSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-16">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Understanding Token Usage</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What are tokens?</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Tokens are the units of consumption for our API and AI features. Each API call or AI interaction consumes a
            specific number of tokens based on complexity and resource usage.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mt-1">
                <FaSearch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Search Operations</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1 token per search query (flights, hotels, activities)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mt-1">
                <FaRobot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">AI Interactions</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1-5 tokens per AI message (depending on complexity)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mt-1">
                <FaMapMarkerAlt className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Map & Location Data</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">1 token per location lookup or map rendering</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Token Usage Examples</h4>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Basic Plan Example</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">With 5 tokens per month, you could:</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start space-x-2">
                  <FaCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Perform 5 flight searches</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Or search for 3 flights and 2 hotels</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Or any combination totaling 5 tokens</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Essential Plan Example</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">With 20 tokens per day, you could:</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start space-x-2">
                  <FaCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Send 10 AI chat messages</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Perform 5 flight searches</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Check weather for 5 locations</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/settings/usage"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center space-x-1"
            >
              <FaChartBar className="h-4 w-4" />
              <span>View detailed token usage examples</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
