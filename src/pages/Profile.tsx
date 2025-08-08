import { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Moon,
  Sun,
  Camera,
  Edit3,
  Check,
  X,
  Activity,
  LogOut,
  Trash2,
  Github,
  Chrome,
  Settings,
  AlertTriangle,
  Calendar,
  MapPin,
  DollarSign,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { user, setUser } = useApp();
  const { actualTheme } = useTheme();
  const [isEditing, setIsEditing] = useState({
    name: false,
    bio: false,
    email: false,
  });
  const [editValues, setEditValues] = useState({
    name: user?.name || '',
    bio: 'Travel enthusiast and digital nomad exploring the world one trip at a time.',
    email: user?.email || '',
  });
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEdit = (field: keyof typeof isEditing) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = (field: keyof typeof isEditing) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
    if (field === 'name' && user) {
      setUser({ ...user, name: editValues.name });
    }
    if (field === 'email' && user) {
      setUser({ ...user, email: editValues.email });
    }
  };

  const handleCancel = (field: keyof typeof isEditing) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
    setEditValues(prev => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || '',
    }));
  };

  const connectedAccounts = [
    { provider: 'Google', icon: Chrome, connected: true, email: user?.email },
    { provider: 'GitHub', icon: Github, connected: false, email: null },
  ];

  const usageStats = [
    { label: 'Trips Created', value: '12', icon: MapPin },
    { label: 'Total Spent', value: '$24,500', icon: DollarSign },
    { label: 'Days Traveled', value: '89', icon: Calendar },
    { label: 'Countries Visited', value: '8', icon: Globe },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Please sign in</h2>
          <p className="text-gray-600 dark:text-gray-400">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      {/* Mouse Follower Spotlight - Only in dark theme */}
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Avatar */}
              <div className="relative group">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <button className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-3">
                {/* Name */}
                <div className="flex items-center space-x-3">
                  {isEditing.name ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={e =>
                          setEditValues(prev => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-primary-500 focus:outline-none dark:bg-gray-800"
                      />
                      <button
                        onClick={() => handleSave('name')}
                        className="p-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleCancel('name')}
                        className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                      <button
                        onClick={() => handleEdit('name')}
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="flex items-start space-x-3">
                  {isEditing.bio ? (
                    <div className="flex-1 space-y-2">
                      <textarea
                        value={editValues.bio}
                        onChange={e =>
                          setEditValues(prev => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                        className="w-full text-gray-600 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800"
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave('bio')}
                          className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 dark:hover:bg-primary-500"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleCancel('bio')}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-2">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{editValues.bio}</p>
                      <button
                        onClick={() => handleEdit('bio')}
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Subscription Badge */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.subscription === 'premium'
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {user.subscription === 'premium' ? '✨ Premium' : 'Free Plan'}
                  </span>
                  {user.subscription !== 'premium' && (
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Travel Statistics</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {usageStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl mb-3">
                    <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Information */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Account Information</span>
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  {isEditing.email ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="email"
                        value={editValues.email}
                        onChange={e =>
                          setEditValues(prev => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        onClick={() => handleSave('email')}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleCancel('email')}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-900 dark:text-white">{user.email}</span>
                      <button
                        onClick={() => handleEdit('email')}
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-900 dark:text-white">••••••••</span>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Connected Accounts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Connected Accounts
                  </label>
                  <div className="space-y-3">
                    {connectedAccounts.map((account, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <account.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{account.provider}</div>
                            {account.connected && account.email && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">{account.email}</div>
                            )}
                          </div>
                        </div>
                        <button
                          className={`text-sm font-medium ${
                            account.connected
                              ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
                              : 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
                          }`}
                        >
                          {account.connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Preferences</span>
              </h3>

              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, theme: 'light' }))}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                        preferences.theme === 'light'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                        preferences.theme === 'dark'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                  <select
                    value={preferences.language}
                    onChange={e =>
                      setPreferences(prev => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>

                {/* Notifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Notifications
                  </label>
                  <div className="space-y-3">
                    {[
                      {
                        key: 'emailNotifications',
                        label: 'Email notifications',
                        icon: Mail,
                      },
                      {
                        key: 'pushNotifications',
                        label: 'Push notifications',
                        icon: Bell,
                      },
                      {
                        key: 'marketingEmails',
                        label: 'Marketing emails',
                        icon: Mail,
                      },
                      {
                        key: 'weeklyDigest',
                        label: 'Weekly digest',
                        icon: Calendar,
                      },
                    ].map(setting => (
                      <div key={setting.key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <setting.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-900 dark:text-white">{setting.label}</span>
                        </div>
                        <button
                          onClick={() =>
                            setPreferences(prev => ({
                              ...prev,
                              [setting.key]: !prev[setting.key as keyof typeof prev],
                            }))
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences[setting.key as keyof typeof preferences]
                              ? 'bg-primary-600'
                              : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences[setting.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-6 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Danger Zone</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Sign out</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sign out of your account on this device
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                <div>
                  <div className="font-medium text-red-900 dark:text-red-400">Delete account</div>
                  <div className="text-sm text-red-600 dark:text-red-500">
                    Permanently delete your account and all data
                  </div>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Account</h3>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and will permanently delete
                all your data, trips, and preferences.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                  <Lock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
