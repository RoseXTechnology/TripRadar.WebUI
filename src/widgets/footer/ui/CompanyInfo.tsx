import { FaTwitter, FaGithub, FaLinkedin, FaPlane } from 'react-icons/fa';

export const CompanyInfo = () => {
  return (
    <div className="md:col-span-2 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <FaPlane className="h-6 w-6 text-white" />
          </div>
        </div>
        <span className="text-xl font-bold text-gray-900 dark:text-white">TripRadar</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        Smart travel management platform for modern travelers. Plan, track, and optimize your trips with AI-powered
        intelligence and comprehensive travel data.
      </p>
      <div className="flex space-x-4">
        <a
          href="#"
          className="p-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <FaTwitter className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="p-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <FaGithub className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="p-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <FaLinkedin className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};
