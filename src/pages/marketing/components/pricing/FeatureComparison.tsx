import { FaCheck, FaTimes } from 'react-icons/fa';

export const FeatureComparison = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-16">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Compare Features</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Feature
              </th>
              <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Basic
              </th>
              <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Essential
              </th>
              <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Advanced
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="py-4 text-sm text-gray-900 dark:text-white">API Tokens</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">5/month</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">20/day</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">50/day</td>
            </tr>
            <tr>
              <td className="py-4 text-sm text-gray-900 dark:text-white">AI Chat Assistant</td>
              <td className="py-4 text-center">
                <FaTimes className="h-5 w-5 text-gray-400 mx-auto" />
              </td>
              <td className="py-4 text-center">
                <FaCheck className="h-5 w-5 text-green-500 mx-auto" />
              </td>
              <td className="py-4 text-center">
                <FaCheck className="h-5 w-5 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="py-4 text-sm text-gray-900 dark:text-white">Group Trip Planning</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Limited</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Up to 10 people</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Unlimited</td>
            </tr>
            <tr>
              <td className="py-4 text-sm text-gray-900 dark:text-white">Budget Tracking</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Basic</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced + AI</td>
            </tr>
            <tr>
              <td className="py-4 text-sm text-gray-900 dark:text-white">Trip Analytics</td>
              <td className="py-4 text-center">
                <FaTimes className="h-5 w-5 text-gray-400 mx-auto" />
              </td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Basic</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced</td>
            </tr>
            <tr>
              <td className="py-4 text-sm text-gray-900 dark:text-white">API Access</td>
              <td className="py-4 text-center">
                <FaTimes className="h-5 w-5 text-gray-400 mx-auto" />
              </td>
              <td className="py-4 text-center">
                <FaTimes className="h-5 w-5 text-gray-400 mx-auto" />
              </td>
              <td className="py-4 text-center">
                <FaCheck className="h-5 w-5 text-green-500 mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="py-4 text-sm text-gray-900 dark:text-white">Support</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Email</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Priority Email</td>
              <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Phone & Chat</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
