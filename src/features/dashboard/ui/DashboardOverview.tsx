import { AIBotIntegration, BudgetOverview, GroupTripManager, SatisfactionPredictor } from 'features/dashboard';
import { Plus, MapPin, Calendar, Users, TrendingUp, DollarSign, ArrowRight, Shield, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useApp } from '../../../context/AppContext';

export default function DashboardOverview() {
  const { user, trips, currentTrip, aiBot, setAiBot } = useApp();

  const stats = [
    {
      label: 'Active Trips',
      value: trips.filter(t => t.status === 'active').length,
      icon: MapPin,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Planned Trips',
      value: trips.filter(t => t.status === 'planning').length,
      icon: Calendar,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Total Travelers',
      value: trips.reduce((sum, trip) => sum + trip.participants, 0),
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      label: 'Total Budget',
      value: `$${trips.reduce((sum, trip) => sum + (trip.budget?.total || 0), 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: 'Book flight tickets for Tokyo',
      trip: 'Tokyo Adventure',
      due: '2024-02-15',
      priority: 'high',
    },
    {
      id: 2,
      task: 'Reserve hotel in Shibuya',
      trip: 'Tokyo Adventure',
      due: '2024-02-20',
      priority: 'medium',
    },
    {
      id: 3,
      task: 'Apply for visa',
      trip: 'European Explorer',
      due: '2024-03-01',
      priority: 'high',
    },
    {
      id: 4,
      task: 'Book restaurant reservations',
      trip: 'Tokyo Adventure',
      due: '2024-03-10',
      priority: 'low',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Good morning, {user?.name?.split(' ')[0]}! ✈️</h1>
            <p className="text-blue-100 text-lg mb-2">
              Ready to plan your next adventure? You have {trips.length} trips in progress.
            </p>
            {/* Privacy Badge */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Privacy Protected - No Data Training</span>
            </div>
          </div>
          <Link
            to="/trips/new"
            className="mt-4 md:mt-0 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Trip</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Trip */}
        {currentTrip && (
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative h-48">
                <img src={currentTrip.image} alt={currentTrip.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{currentTrip.title}</h3>
                  <p className="text-sm opacity-90">{currentTrip.destination}</p>
                </div>
                {currentTrip.isGroupTrip && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Group Trip</span>
                  </div>
                )}
                {currentTrip.aiChatEnabled && (
                  <div className="absolute top-4 left-4 bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Bot className="h-4 w-4" />
                    <span>AI Enabled</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(currentTrip.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{currentTrip.participants} travelers</span>
                    </div>
                    {currentTrip.budget && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${currentTrip.budget.total.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentTrip.status === 'planning'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : currentTrip.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {currentTrip.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span>Planning Progress: 65%</span>
                  </div>
                  <Link
                    to={`/trips/${currentTrip.id}`}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center space-x-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Budget Overview */}
            {currentTrip.budget && <BudgetOverview budget={currentTrip.budget} />}

            {/* Group Trip Manager */}
            {currentTrip.isGroupTrip && currentTrip.groupMembers && (
              <GroupTripManager groupMembers={currentTrip.groupMembers} tripId={currentTrip.id} />
            )}
          </div>
        )}

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Bot Integration */}
          <AIBotIntegration aiBot={aiBot} onUpdate={setAiBot} />

          {/* Satisfaction Prediction */}
          {currentTrip?.satisfactionPrediction && (
            <SatisfactionPredictor prediction={currentTrip.satisfactionPrediction} />
          )}

          {/* Upcoming Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Tasks</h3>
              <Link
                to="/tasks"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingTasks.slice(0, 4).map(task => (
                <div
                  key={task.id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div
                    className={`p-1 rounded-full mt-1 ${
                      task.priority === 'high'
                        ? 'bg-red-100 dark:bg-red-900/20'
                        : task.priority === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/20'
                          : 'bg-green-100 dark:bg-green-900/20'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === 'high'
                          ? 'bg-red-500'
                          : task.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{task.task}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {task.trip} • Due {new Date(task.due).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>

            <div className="space-y-3">
              <Link
                to="/search"
                className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-700 transition-colors">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <span className="text-sm font-medium">Search Destinations</span>
              </Link>

              <Link
                to="/weather"
                className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
              >
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-700 transition-colors">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-300" />
                </div>
                <span className="text-sm font-medium">Check Weather</span>
              </Link>

              <Link
                to="/currency"
                className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-700 transition-colors">
                  <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </div>
                <span className="text-sm font-medium">Currency Exchange</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
