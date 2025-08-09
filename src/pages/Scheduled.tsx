import {
  Calendar,
  Clock,
  Plus,
  Bell,
  Bot,
  MapPin,
  DollarSign,
  Check,
  Edit,
  Trash2,
  Play,
  Pause,
  Settings,
  Search,
} from 'lucide-react';
import { useState } from 'react';

interface ScheduledItem {
  id: string;
  title: string;
  description: string;
  type: 'reminder' | 'automation' | 'notification' | 'task';
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  nextRun: string;
  status: 'active' | 'paused' | 'completed';
  category: 'trip' | 'budget' | 'booking' | 'weather' | 'general';
}

const scheduledItems: ScheduledItem[] = [
  {
    id: '1',
    title: 'Flight Check-in Reminder',
    description: 'Remind me to check in for my Tokyo flight 24 hours before departure',
    type: 'reminder',
    frequency: 'once',
    nextRun: '2024-03-14T10:00:00Z',
    status: 'active',
    category: 'trip',
  },
  {
    id: '2',
    title: 'Budget Alert - Tokyo Trip',
    description: 'Send notification when Tokyo trip budget reaches 80%',
    type: 'automation',
    frequency: 'daily',
    nextRun: '2024-03-15T09:00:00Z',
    status: 'active',
    category: 'budget',
  },
  {
    id: '3',
    title: 'Weather Update - Paris',
    description: 'Daily weather forecast for Paris trip',
    type: 'notification',
    frequency: 'daily',
    nextRun: '2024-03-15T08:00:00Z',
    status: 'active',
    category: 'weather',
  },
  {
    id: '4',
    title: 'Hotel Booking Reminder',
    description: 'Book hotel for European trip by March 20th',
    type: 'task',
    frequency: 'once',
    nextRun: '2024-03-18T12:00:00Z',
    status: 'active',
    category: 'booking',
  },
  {
    id: '5',
    title: 'Weekly Trip Summary',
    description: 'Send weekly summary of all active trips and upcoming tasks',
    type: 'automation',
    frequency: 'weekly',
    nextRun: '2024-03-17T10:00:00Z',
    status: 'paused',
    category: 'general',
  },
];

export default function Scheduled() {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredItems = scheduledItems.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      case 'automation':
        return <Bot className="h-5 w-5 text-blue-500" />;
      case 'notification':
        return <Bell className="h-5 w-5 text-green-500" />;
      case 'task':
        return <Check className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trip':
        return <MapPin className="h-4 w-4" />;
      case 'budget':
        return <DollarSign className="h-4 w-4" />;
      case 'booking':
        return <Calendar className="h-4 w-4" />;
      case 'weather':
        return <Clock className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const formatNextRun = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `In ${diffInHours} hours`;
    } else if (diffInHours < 48) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-3">
              <Calendar className="h-8 w-8" />
              <span>Scheduled</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your automated tasks, reminders, and notifications
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Schedule</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scheduled items..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex space-x-2">
              {['all', 'active', 'paused'].map(filterOption => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === filterOption
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="trip">Trip</option>
              <option value="budget">Budget</option>
              <option value="booking">Booking</option>
              <option value="weather">Weather</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Scheduled</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{scheduledItems.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {scheduledItems.filter(i => i.status === 'active').length}
                </p>
              </div>
              <Play className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Paused</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {scheduledItems.filter(i => i.status === 'paused').length}
                </p>
              </div>
              <Pause className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Due Today</p>
                <p className="text-2xl font-bold text-purple-600">3</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Scheduled Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No scheduled items found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery
                  ? 'Try adjusting your search or filters.'
                  : 'Create your first scheduled item to get started.'}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Create Schedule
              </button>
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Type Icon */}
                    <div className="flex-shrink-0 mt-1">{getTypeIcon(item.type)}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'active'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                              : item.status === 'paused'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Next: {formatNextRun(item.nextRun)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="capitalize">{item.frequency}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(item.category)}
                          <span className="capitalize">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      className={`p-2 rounded-lg transition-colors ${
                        item.status === 'active'
                          ? 'text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          : 'text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={item.status === 'active' ? 'Pause' : 'Resume'}
                    >
                      {item.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>

                    <button
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Schedule</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter schedule title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="reminder">Reminder</option>
                    <option value="automation">Automation</option>
                    <option value="notification">Notification</option>
                    <option value="task">Task</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="once">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what this schedule does"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Create Schedule
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
