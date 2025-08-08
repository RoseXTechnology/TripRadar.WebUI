import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Plus,
  Clock,
  Edit,
  X,
  Plane,
  Building,
  Utensils,
  Activity,
  Navigation,
  CheckCircle,
} from 'lucide-react';

interface TripPlan {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  status: 'draft' | 'planning' | 'booked' | 'active';
  image: string;
  activities: Activity[];
  timeline: TimelineItem[];
}

interface Activity {
  id: string;
  title: string;
  type: 'flight' | 'hotel' | 'restaurant' | 'activity' | 'transport';
  date: string;
  time?: string;
  duration?: string;
  cost?: number;
  location?: string;
  notes?: string;
  booked: boolean;
}

interface TimelineItem {
  id: string;
  day: number;
  date: string;
  activities: Activity[];
}

const sampleTrip: TripPlan = {
  id: '1',
  title: 'Tokyo Adventure',
  destination: 'Tokyo, Japan',
  startDate: '2024-03-15',
  endDate: '2024-03-22',
  travelers: 2,
  budget: 3500,
  status: 'planning',
  image:
    'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
  activities: [],
  timeline: [
    {
      id: '1',
      day: 1,
      date: '2024-03-15',
      activities: [
        {
          id: '1',
          title: 'Flight to Tokyo',
          type: 'flight',
          date: '2024-03-15',
          time: '14:30',
          duration: '14h 30m',
          cost: 899,
          location: 'JFK → NRT',
          booked: true,
        },
        {
          id: '2',
          title: 'Hotel Check-in',
          type: 'hotel',
          date: '2024-03-15',
          time: '15:00',
          location: 'Shibuya Grand Hotel',
          cost: 150,
          booked: false,
        },
      ],
    },
    {
      id: '2',
      day: 2,
      date: '2024-03-16',
      activities: [
        {
          id: '3',
          title: 'Senso-ji Temple Visit',
          type: 'activity',
          date: '2024-03-16',
          time: '09:00',
          duration: '2h',
          location: 'Asakusa',
          cost: 0,
          booked: false,
        },
        {
          id: '4',
          title: 'Sushi Lunch',
          type: 'restaurant',
          date: '2024-03-16',
          time: '12:30',
          location: 'Tsukiji Market',
          cost: 45,
          booked: false,
        },
      ],
    },
  ],
};

export default function TripPlanning() {
  const [trip, setTrip] = useState<TripPlan>(sampleTrip);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'overview'>('timeline');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="h-5 w-5 text-blue-500" />;
      case 'hotel':
        return <Building className="h-5 w-5 text-green-500" />;
      case 'restaurant':
        return <Utensils className="h-5 w-5 text-orange-500" />;
      case 'activity':
        return <Activity className="h-5 w-5 text-purple-500" />;
      case 'transport':
        return <Navigation className="h-5 w-5 text-indigo-500" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTotalCost = () => {
    return trip.timeline.reduce(
      (total, day) => total + day.activities.reduce((dayTotal, activity) => dayTotal + (activity.cost || 0), 0),
      0
    );
  };

  const getBookedCount = () => {
    return trip.timeline.reduce((total, day) => total + day.activities.filter(activity => activity.booked).length, 0);
  };

  const getTotalActivities = () => {
    return trip.timeline.reduce((total, day) => total + day.activities.length, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden mb-8">
          <div className="relative h-64">
            <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{trip.title}</h1>
              <p className="text-lg opacity-90">{trip.destination}</p>
            </div>
            <div className="absolute top-6 right-6">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  trip.status === 'planning'
                    ? 'bg-blue-100 text-blue-700'
                    : trip.status === 'booked'
                      ? 'bg-green-100 text-green-700'
                      : trip.status === 'active'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-700'
                }`}
              >
                {trip.status}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {Math.ceil(
                      (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)
                    )}{' '}
                    days
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Travelers</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{trip.travelers}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Budget</div>
                  <div className="font-semibold text-gray-900 dark:text-white">${trip.budget.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {getTotalActivities() > 0 ? Math.round((getBookedCount() / getTotalActivities()) * 100) : 0}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                viewMode === 'overview'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Overview
            </button>
          </div>

          <button
            onClick={() => setShowAddActivity(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Activity</span>
          </button>
        </div>

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="space-y-6">
            {trip.timeline.map(day => (
              <div
                key={day.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Day {day.day}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDay(day.day);
                      setShowAddActivity(true);
                    }}
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Activity</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {day.activities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No activities planned for this day</p>
                    </div>
                  ) : (
                    day.activities.map(activity => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      >
                        <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{activity.title}</h4>
                            <div className="flex items-center space-x-2">
                              {activity.cost && (
                                <span className="text-sm text-gray-600 dark:text-gray-400">${activity.cost}</span>
                              )}
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  activity.booked
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                }`}
                              >
                                {activity.booked ? 'Booked' : 'Pending'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            {activity.time && (
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{activity.time}</span>
                              </div>
                            )}
                            {activity.duration && <span>Duration: {activity.duration}</span>}
                            {activity.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{activity.location}</span>
                              </div>
                            )}
                          </div>

                          {activity.notes && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{activity.notes}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Overview */}
        {viewMode === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Budget Overview */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Budget Overview</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${trip.budget.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Budget</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${getTotalCost().toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Planned Expenses</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${(trip.budget - getTotalCost()).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget Usage</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {Math.round((getTotalCost() / trip.budget) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-primary-600"
                      style={{
                        width: `${Math.min(Math.round((getTotalCost() / trip.budget) * 100), 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Activity Types */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Activity Types</h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {['flight', 'hotel', 'restaurant', 'activity', 'transport'].map(type => {
                    const count = trip.timeline.reduce(
                      (total, day) => total + day.activities.filter(activity => activity.type === type).length,
                      0
                    );

                    return (
                      <div key={type} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="mx-auto w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-600 rounded-full mb-2">
                          {getActivityIcon(type)}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{count}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">{type}s</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Trip Details */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Trip Details</h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Destination</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{trip.destination}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Dates</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Travelers</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{trip.travelers} people</div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Trip Details</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>

                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <Plane className="h-5 w-5" />
                    <span>Search Flights</span>
                  </button>

                  <button className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    <Building className="h-5 w-5" />
                    <span>Find Hotels</span>
                  </button>

                  <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                    <Activity className="h-5 w-5" />
                    <span>Discover Activities</span>
                  </button>
                </div>
              </div>

              {/* Weather Forecast */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weather Forecast</h3>

                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Weather data will be available 7 days before your trip.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Activity Modal */}
        {showAddActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Add Activity {selectedDay ? `for Day ${selectedDay}` : ''}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter activity title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="flight">Flight</option>
                    <option value="hotel">Hotel</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="activity">Activity</option>
                    <option value="transport">Transport</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cost (USD)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Add any additional details"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="booked"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="booked" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Already booked
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Add Activity
                  </button>
                  <button
                    onClick={() => {
                      setShowAddActivity(false);
                      setSelectedDay(null);
                    }}
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
