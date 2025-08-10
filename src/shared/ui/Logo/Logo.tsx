import { Radar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <Link to="/" className="flex items-center space-x-3 group">
    <div className="relative">
      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
        <Radar className="h-6 w-6 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
    </div>
    <span className="text-xl font-bold text-gray-900 dark:text-white">TripRadar</span>
  </Link>
);
