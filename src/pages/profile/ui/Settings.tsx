import { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Shield,
  Plug,
  Camera,
  Check,
  AlertTriangle,
  Trash2,
  Plus,
  Chrome,
  Github,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Settings as SettingsIcon,
  ChevronRight,
  Sparkles,
  Palette,
  Monitor,
  LogOut,
  Key,
  Database,
  Zap,
  BarChart,
  CreditCard,
  Link as LinkIcon,
  Search,
  Bot,
  Info,
  Users,
  UserPlus,
  Star,
  RefreshCw,
  Save,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from 'app/providers/AppContext';
import { useTheme } from 'app/providers/ThemeContext';
import { THEME } from 'shared/config/constants';

// Define types locally since they're specific to this component
interface PreferenceCategory {
  id: string;
  name: string;
  description: string;
  options: { id: string; label: string }[];
}

interface PreferenceSchema {
  categories: PreferenceCategory[];
}

type SettingsSection = 'account' | 'notifications' | 'security' | 'integrations' | 'preferences' | 'group';

export default function Settings() {
  const { user } = useApp();
  const { theme, actualTheme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [preferenceSchema, setPreferenceSchema] = useState<PreferenceSchema | null>(null);
  const [userPreferences, setUserPreferences] = useState<Record<string, string[]>>({});
  const [showAddGroupMemberModal, setShowAddGroupMemberModal] = useState(false);
  const [newGroupMember, setNewGroupMember] = useState({
    name: '',
    email: '',
    role: 'member',
  });
  const [groupMembers, setGroupMembers] = useState([
    {
      id: '1',
      name: 'Alex Thompson',
      email: 'alex@example.com',
      role: 'organizer',
      status: 'accepted',
      preferences: {
        dietary: ['vegetarian'],
        accommodationType: ['hotel', 'airbnb'],
        transport: ['public-transport', 'walking'],
        tripType: ['cultural', 'adventure'],
        languages: ['english', 'spanish'],
      },
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'member',
      status: 'accepted',
      preferences: {
        dietary: ['gluten-free'],
        accommodationType: ['hotel'],
        transport: ['rental-car'],
        tripType: ['luxury'],
        languages: ['english', 'french'],
      },
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'member',
      status: 'invited',
      preferences: {},
    },
  ]);

  const fetchPreferenceSchema = async () => {
    // Mock preference schema
    const mockSchema: PreferenceSchema = {
      categories: [
        {
          id: 'dietary',
          name: 'Dietary Preferences',
          description: 'Select your dietary requirements and preferences',
          options: [
            { id: 'vegetarian', label: 'Vegetarian' },
            { id: 'vegan', label: 'Vegan' },
            { id: 'gluten-free', label: 'Gluten-free' },
            { id: 'halal', label: 'Halal' },
            { id: 'kosher', label: 'Kosher' },
          ],
        },
        {
          id: 'accommodation',
          name: 'Accommodation Type',
          description: 'Choose your preferred types of accommodation',
          options: [
            { id: 'hotel', label: 'Hotel' },
            { id: 'airbnb', label: 'Airbnb' },
            { id: 'hostel', label: 'Hostel' },
            { id: 'resort', label: 'Resort' },
          ],
        },
      ],
    };
    setPreferenceSchema(mockSchema);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    fetchPreferenceSchema();

    // Initialize user preferences
    if (user?.preferences) {
      const formattedPreferences: Record<string, string[]> = {};

      if (user.preferences.dietary) formattedPreferences.dietary = user.preferences.dietary;
      if (user.preferences.accommodationType) formattedPreferences.accommodation = user.preferences.accommodationType;
      if (user.preferences.activities) formattedPreferences.activities = user.preferences.activities;
      if (user.preferences.travelStyle) formattedPreferences.tripType = [user.preferences.travelStyle];
      if (user.preferences.transport) formattedPreferences.transport = user.preferences.transport;
      if (user.preferences.languages) formattedPreferences.languages = user.preferences.languages;
      if (user.preferences.accessibility) formattedPreferences.accessibility = user.preferences.accessibility;

      setUserPreferences(formattedPreferences);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [user]);

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    username: 'alexthompson',
    bio: 'Travel enthusiast and digital nomad exploring the world one trip at a time.',
    website: 'https://alexthompson.dev',
    location: 'San Francisco, CA',
  });

  const [accountData, setAccountData] = useState({
    email: user?.email || '',
    language: 'en',
    timezone: 'America/Los_Angeles',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    productUpdates: true,
    marketingEmails: false,
    weeklyDigest: true,
    securityAlerts: true,
    tripReminders: true,
    budgetAlerts: true,
    groupUpdates: true,
  });

  const [securitySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '24h',
    loginNotifications: true,
  });

  const sidebarItems = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Sparkles },
    { id: 'group', label: 'Group Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Plug },
  ];

  const connectedAccounts = [
    { provider: 'Google', icon: Chrome, connected: true, email: user?.email },
    { provider: 'GitHub', icon: Github, connected: false, email: null },
    { provider: 'Microsoft', icon: Globe, connected: false, email: null },
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      id: 2,
      device: 'iPhone 15 Pro',
      location: 'San Francisco, CA',
      lastActive: '1 hour ago',
      current: false,
    },
    {
      id: 3,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: '2 days ago',
      current: false,
    },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const togglePreference = (categoryId: string, optionId: string) => {
    setUserPreferences(prev => {
      const current = [...(prev[categoryId] || [])];

      if (current.includes(optionId)) {
        // Remove the option if already selected
        return {
          ...prev,
          [categoryId]: current.filter(item => item !== optionId),
        };
      } else {
        // Add the option if not already selected
        return {
          ...prev,
          [categoryId]: [...current, optionId],
        };
      }
    });
  };

  const handleAddGroupMember = () => {
    if (newGroupMember.name && newGroupMember.email) {
      const newMember = {
        id: `${groupMembers.length + 1}`,
        name: newGroupMember.name,
        email: newGroupMember.email,
        role: newGroupMember.role,
        status: 'invited',
        preferences: {},
      };

      setGroupMembers([...groupMembers, newMember]);
      setNewGroupMember({
        name: '',
        email: '',
        role: 'member',
      });
      setShowAddGroupMemberModal(false);
    }
  };

  const renderAccountSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your account information and preferences</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h3>

        {/* Avatar Section */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative group">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
            />
            <button className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="space-y-2">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors">
              Upload new picture
            </button>
            <button className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Remove picture
            </button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={accountData.email}
              onChange={e => setAccountData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <select
              value={accountData.language}
              onChange={e => setAccountData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
            <select
              value={accountData.timezone}
              onChange={e => setAccountData(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="Europe/London">London</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Theme Preferences */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Theme Preferences</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Light Theme */}
          <button
            onClick={() => setTheme(THEME.LIGHT)}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              theme === THEME.LIGHT
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sun className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white">Light</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clean and bright interface</p>
              </div>
              {theme === THEME.LIGHT && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </button>

          {/* Dark Theme */}
          <button
            onClick={() => setTheme(THEME.DARK)}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              theme === THEME.DARK
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Moon className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white">Dark</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</p>
              </div>
              {theme === THEME.DARK && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </button>

          {/* System Theme */}
          <button
            onClick={() => setTheme('system')}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              theme === 'system'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white">System</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Match system preference</p>
              </div>
              {theme === 'system' && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Current theme:</strong> {theme === 'system' ? `System (${actualTheme})` : theme}
          </p>
        </div>
      </div>

      {/* Token Usage */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <BarChart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span>Token Usage</span>
          </h3>

          <Link
            to="/settings/usage"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center space-x-1"
          >
            <span>View Details</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">12,280</span> of 50,000 tokens used this month
            </div>
            <div className="text-sm font-medium text-primary-600 dark:text-primary-400">24.6%</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div className="h-2.5 rounded-full bg-primary-600" style={{ width: '24.6%' }}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Search className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</span>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">4,190</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">tokens used</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Bot className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI</span>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">5,760</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">tokens used</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Zap className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">API</span>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">2,330</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">tokens used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Connected Accounts</h3>
        <div className="space-y-4">
          {connectedAccounts.map((account, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <account.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{account.provider}</div>
                  {account.connected && account.email && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">{account.email}</div>
                  )}
                </div>
              </div>
              <button
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  account.connected
                    ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                    : 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                {account.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your travel preferences to get personalized recommendations
        </p>
      </div>

      {/* Preferences Form */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Travel Preferences</h3>
          <button
            onClick={() => setUserPreferences({})}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Reset All
          </button>
        </div>

        {preferenceSchema ? (
          <div className="space-y-8">
            {preferenceSchema.categories.map(category => (
              <div key={category.id} className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.options.map(option => {
                    const isSelected = userPreferences[category.id]?.includes(option.id);

                    return (
                      <button
                        key={option.id}
                        onClick={() => togglePreference(category.id, option.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          isSelected
                            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-2 border-primary-500'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">Loading preferences...</p>
          </div>
        )}
      </div>

      {/* Preference Usage */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">How We Use Your Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mt-1">
              <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Personalized Search Results</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We'll prioritize search results that match your preferences, such as hotels with vegetarian restaurants
                if you have dietary restrictions.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mt-1">
              <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">AI Recommendations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our AI assistant will use your preferences to suggest destinations, activities, and accommodations that
                match your travel style.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mt-1">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Group Trip Planning</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When planning group trips, we can combine everyone's preferences to find options that work for the whole
                group.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your preferences are only used to personalize your experience and are never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGroupSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Group Management</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage group members and their preferences for collaborative trip planning
        </p>
      </div>

      {/* Group Members */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Group Members</h3>
          <button
            onClick={() => setShowAddGroupMemberModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Member</span>
          </button>
        </div>

        <div className="space-y-4">
          {groupMembers.map(member => (
            <div key={member.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={`https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1`}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {member.role === 'organizer' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'accepted'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}
                  >
                    {member.status}
                  </span>
                  <div className="relative">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <SettingsIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Member Preferences */}
              {member.status === 'accepted' && Object.keys(member.preferences || {}).length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Preferences</h4>
                    <button className="text-xs text-primary-600 dark:text-primary-400">Edit</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(member.preferences || {}).flatMap(([category, values]) =>
                      values.map((value: string) => (
                        <span
                          key={`${category}-${value}`}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                        >
                          {value}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Group Preference Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Info className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Group Preference Settings</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Include All Group Members' Preferences</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                When enabled, search results and recommendations will consider all group members' preferences
              </div>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
              <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white"></span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Preference Weighting</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                How to handle conflicting preferences between group members
              </div>
            </div>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="equal">Equal Weight</option>
              <option value="organizer">Prioritize Organizer</option>
              <option value="majority">Majority Rules</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Notification on Preference Changes</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Notify group members when someone updates their preferences
              </div>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
              <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white"></span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Group preferences are used when planning trips together. Each member can set their own preferences, and
              our system will find options that work for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose how you want to be notified about updates and activities
        </p>
      </div>

      {/* Email Notifications */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Email Notifications</h3>
        <div className="space-y-4">
          {[
            {
              key: 'emailNotifications',
              label: 'Email notifications',
              description: 'Receive notifications via email',
            },
            {
              key: 'productUpdates',
              label: 'Product updates',
              description: 'Get notified about new features and improvements',
            },
            {
              key: 'marketingEmails',
              label: 'Marketing emails',
              description: 'Receive promotional content and offers',
            },
            {
              key: 'weeklyDigest',
              label: 'Weekly digest',
              description: 'Summary of your travel activity',
            },
          ].map(setting => (
            <div
              key={setting.key}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl"
            >
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{setting.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</div>
              </div>
              <button
                onClick={() =>
                  setNotificationSettings(prev => ({
                    ...prev,
                    [setting.key]: !prev[setting.key as keyof typeof prev],
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings[setting.key as keyof typeof notificationSettings]
                    ? 'bg-primary-600'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings[setting.key as keyof typeof notificationSettings]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Push Notifications</h3>
        <div className="space-y-4">
          {[
            {
              key: 'tripReminders',
              label: 'Trip reminders',
              description: 'Get reminded about upcoming trips and tasks',
            },
            {
              key: 'budgetAlerts',
              label: 'Budget alerts',
              description: 'Notifications when you exceed budget limits',
            },
            {
              key: 'groupUpdates',
              label: 'Group updates',
              description: 'Updates from group trips and collaborations',
            },
            {
              key: 'securityAlerts',
              label: 'Security alerts',
              description: 'Important security and account notifications',
            },
          ].map(setting => (
            <div
              key={setting.key}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl"
            >
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{setting.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</div>
              </div>
              <button
                onClick={() =>
                  setNotificationSettings(prev => ({
                    ...prev,
                    [setting.key]: !prev[setting.key as keyof typeof prev],
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings[setting.key as keyof typeof notificationSettings]
                    ? 'bg-primary-600'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings[setting.key as keyof typeof notificationSettings]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Security Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your account security and privacy settings</p>
      </div>

      {/* Password */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Password</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
          <div className="flex items-center space-x-3">
            <Key className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Password</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</div>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">2FA Protection</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {securitySettings.twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
              </div>
            </div>
          </div>
          <button
            onClick={() => {}}
            className={`font-medium ${
              securitySettings.twoFactorEnabled
                ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
                : 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
            }`}
          >
            {securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Active Sessions</h3>
        <div className="space-y-4">
          {activeSessions.map(session => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                    <span>{session.device}</span>
                    {session.current && (
                      <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              {!session.current && (
                <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-6 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Danger Zone</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Sign out all devices</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sign out of all devices except this one</div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <LogOut className="h-4 w-4" />
              <span>Sign Out All</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
            <div>
              <div className="font-medium text-red-900 dark:text-red-400">Delete account</div>
              <div className="text-sm text-red-600 dark:text-red-500">Permanently delete your account and all data</div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center space-x-2 px-4 py-2 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Integrations</h2>
        <p className="text-gray-600 dark:text-gray-400">Connect with external services and manage API access</p>
      </div>

      {/* API Keys */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">API Keys</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Production API Key</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">sk_live_••••••••••••••••</div>
              </div>
            </div>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
              Regenerate
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Test API Key</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">sk_test_••••••••••••••••</div>
              </div>
            </div>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Webhooks</h3>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Webhook</span>
          </button>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400">No webhooks configured</div>
          <div className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Add webhooks to receive real-time notifications
          </div>
        </div>
      </div>

      {/* External Services */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">External Services</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <LinkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Telegram Bot</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Connect your Telegram account for AI assistance
                </div>
              </div>
            </div>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
              Connect
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <LinkIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">WhatsApp</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Connect your WhatsApp for mobile assistance
                </div>
              </div>
            </div>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
              Connect
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Payment Methods</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Manage your payment methods</div>
              </div>
            </div>
            <Link
              to="/billing"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
            >
              Manage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountSection();
      case 'preferences':
        return renderPreferencesSection();
      case 'group':
        return renderGroupSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'security':
        return renderSecuritySection();
      case 'integrations':
        return renderIntegrationsSection();
      default:
        return renderAccountSection();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Please sign in</h2>
          <p className="text-gray-600 dark:text-gray-400">You need to be logged in to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 pt-16">
      {/* Mouse Follower Spotlight - Only in dark mode */}
      {actualTheme === THEME.DARK && (
        <div
          className="fixed pointer-events-none z-0 w-96 h-96 rounded-full opacity-20 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sticky top-24">
              <nav className="space-y-2">
                {sidebarItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SettingsSection)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${activeSection === item.id ? 'rotate-90' : ''}`}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}

            {/* Save Button */}
            <div className="mt-8 flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">Changes are saved automatically</div>
              <button
                onClick={() => handleSave()}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 animate-slide-up z-50">
            <Check className="h-5 w-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Modals */}
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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

        {/* Add Group Member Modal */}
        {showAddGroupMemberModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                  <UserPlus className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Group Member</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={newGroupMember.name}
                    onChange={e =>
                      setNewGroupMember({
                        ...newGroupMember,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter member's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={newGroupMember.email}
                    onChange={e =>
                      setNewGroupMember({
                        ...newGroupMember,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter member's email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <select
                    value={newGroupMember.role}
                    onChange={e =>
                      setNewGroupMember({
                        ...newGroupMember,
                        role: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="member">Member</option>
                    <option value="organizer">Organizer</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddGroupMemberModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGroupMember}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
