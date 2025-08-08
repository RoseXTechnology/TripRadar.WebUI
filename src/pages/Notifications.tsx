import { useState, useEffect } from 'react';
import {
  Bell,
  Check,
  X,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  Search,
  Trash2,
  DollarSign,
  Users,
  MapPin,
  Settings,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'trip' | 'budget' | 'system' | 'group' | 'security';
  actionUrl?: string;
}

export default function Notifications() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { actualTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Budget Alert',
      message: 'Your Tokyo trip budget is 85% used. Consider reviewing your expenses.',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      category: 'budget',
    },
    {
      id: '2',
      type: 'info',
      title: 'Trip Reminder',
      message: 'Your flight to Tokyo departs in 3 days. Check-in is now available.',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      category: 'trip',
    },
    {
      id: '3',
      type: 'success',
      title: 'Group Vote Complete',
      message: 'Restaurant voting for Day 2 dinner is complete. Le Comptoir du Relais won!',
      timestamp: '2024-01-14T18:45:00Z',
      read: true,
      category: 'group',
    },
    {
      id: '4',
      type: 'info',
      title: 'Weather Update',
      message: 'Rain expected in Tokyo tomorrow. Pack an umbrella!',
      timestamp: '2024-01-14T16:20:00Z',
      read: true,
      category: 'trip',
    },
    {
      id: '5',
      type: 'error',
      title: 'Security Alert',
      message: 'New login detected from Chrome on Windows in New York.',
      timestamp: '2024-01-14T14:10:00Z',
      read: false,
      category: 'security',
    },
    {
      id: '6',
      type: 'success',
      title: 'Payment Processed',
      message: 'Your premium subscription has been renewed successfully.',
      timestamp: '2024-01-13T12:00:00Z',
      read: true,
      category: 'system',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trip':
        return <MapPin className="h-4 w-4" />;
      case 'budget':
        return <DollarSign className="h-4 w-4" />;
      case 'group':
        return <Users className="h-4 w-4" />;
      case 'security':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter =
      filter === 'all' || (filter === 'read' && notification.read) || (filter === 'unread' && !notification.read);

    const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;

    const matchesSearch =
      searchQuery === '' ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    // Handle mark as read logic
    console.log('Mark as read:', id);
  };

  const handleMarkAllAsRead = () => {
    // Handle mark all as read logic
    console.log('Mark all as read');
  };

  const handleDeleteNotification = (id: string) => {
    // Handle delete notification logic
    console.log('Delete notification:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-3">
              <Bell className="h-8 w-8" />
              <span>Notifications</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with your travel activities and important alerts
            </p>
          </div>

          {unreadCount > 0 && (
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <span className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                {unreadCount} unread
              </span>
              <button
                onClick={handleMarkAllAsRead}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex space-x-2">
              {['all', 'unread', 'read'].map(filterOption => (
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
              <option value="group">Group</option>
              <option value="security">Security</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center animate-slide-up">
              <Bell className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No notifications found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ? 'Try adjusting your search or filters.' : "You're all caught up!"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-200 hover:shadow-md animate-slide-up ${
                  !notification.read ? 'ring-2 ring-primary-500/20 bg-primary-50/50 dark:bg-primary-900/10' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  {/* Type Icon */}
                  <div className="flex-shrink-0 mt-1">{getTypeIcon(notification.type)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3
                            className={`text-lg font-semibold ${
                              !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.read && <div className="w-2 h-2 bg-primary-500 rounded-full"></div>}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">{notification.message}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getCategoryIcon(notification.category)}
                            <span className="capitalize">{notification.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Delete notification"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notification Settings Link */}
        <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Notification Preferences</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Customize which notifications you receive and how you receive them.
            </p>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-primary-700 transition-colors">
              Manage Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
