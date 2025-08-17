import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { useApp } from 'app/providers/AppContext';

export const DashboardOverview = () => {
  const { trips } = useApp();

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

  return (
    <div className="space-y-8">
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
        {/* Right Sidebar */}
        <div className="space-y-6"></div>
      </div>
    </div>
  );
};
