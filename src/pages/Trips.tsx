import { Plus, Calendar, Users, MapPin, DollarSign } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAnimation } from '../components/AnimationProvider';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export default function Trips() {
  const { trips } = useApp();
  const { actualTheme } = useTheme();
  const { createParticles, removeParticles } = useAnimation();

  // Animation effects for both light and dark themes
  useEffect(() => {
    // Create floating particles
    createParticles('trips-particles');

    // Cleanup on unmount
    return () => {
      removeParticles('trips-particles');
    };
  }, [actualTheme, createParticles, removeParticles]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Trips</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage and track all your travel adventures</p>
          </div>
          <Link
            to="/trip-planning"
            className="mt-4 sm:mt-0 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2 hover-lift"
          >
            <Plus className="h-5 w-5" />
            <span>New Trip</span>
          </Link>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, index) => (
            <Link
              key={trip.id}
              to={`/trip-planning`}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 animate-slide-up hover-glow-${actualTheme}"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold group-hover:text-primary-200 transition-colors">{trip.title}</h3>
                  <p className="text-sm opacity-90">{trip.destination}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{trip.participants} travelers</span>
                  </div>
                  {trip.budget && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>${trip.budget.total.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {Math.ceil(
                        (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {trips.length === 0 && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center animate-slide-up">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No trips yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start planning your first adventure!</p>
            <Link
              to="/trip-planning"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2 hover-lift"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Trip</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
