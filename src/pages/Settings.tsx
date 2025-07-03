import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Bell, Shield, Plug, Camera, Edit3, Check, X, AlertTriangle, Trash2, Plus, Eye, EyeOff, Chrome, Github, Smartphone, Globe, Moon, Sun, Download, ExternalLink, Settings as SettingsIcon, ChevronRight, Save, RefreshCw, Sparkles, Palette, Monitor, LogOut, Key, Database, Zap, BarChart, CreditCard, Link as LinkIcon, Search, Bot, Users, DollarSign, Utensils, Building, Bus, Armchair as Wheelchair, Languages, Sun as SunIcon, Moon as MoonIcon, Coffee, Heart, UserPlus, UserMinus, UserX, UserCheck, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

type SettingsSection = 'account' | 'notifications' | 'security' | 'integrations' | 'preferences' | 'group';

// Define preference categories and options
interface PreferenceOption {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface PreferenceCategory {
  id: string;
  name: string;
  description: string;
  options: PreferenceOption[];
}

interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'member';
  preferences: Record<string, string[]>;
}

export default function Settings() {
  const { user, setUser } = useApp();
  const { theme, actualTheme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'member' });

  // User preferences state
  const [userPreferences, setUserPreferences] = useState<Record<string, string[]>>({
    dietary: [],
    accommodation: [],
    transport: [],
    tripType: [],
    accessibility: [],
    languages: [],
    activities: []
  });

  // Group members state
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([
    {
      id: '1',
      name: 'Alex Thompson',
      email: 'alex@example.com',
      role: 'owner',
      preferences: {
        dietary: ['vegetarian'],
        accommodation: ['hotel'],
        transport: ['public-transport'],
        tripType: ['adventure'],
        accessibility: [],
        languages: ['english'],
        activities: ['day']
      }
    }
  ]);

  // Group settings
  const [groupSettings, setGroupSettings] = useState({
    mergePreferences: true,
    notifyMembers: true,
    allowMemberEditing: false
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate fetching preferences from API
    const fetchPreferences = async () => {
      setIsLoadingPreferences(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set mock user preferences
      setUserPreferences({
        dietary: ['vegetarian'],
        accommodation: ['hotel', 'airbnb'],
        transport: ['public-transport'],
        tripType: ['adventure', 'budget'],
        accessibility: [],
        languages: ['english', 'spanish'],
        activities: ['day']
      });
      
      setIsLoadingPreferences(false);
    };
    
    fetchPreferences();
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    username: 'alexthompson',
    bio: 'Travel enthusiast and digital nomad exploring the world one trip at a time.',
    website: 'https://alexthompson.dev',
    location: 'San Francisco, CA'
  });

  const [accountData, setAccountData] = useState({
    email: user?.email || '',
    language: 'en',
    timezone: 'America/Los_Angeles'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    productUpdates: true,
    marketingEmails: false,
    weeklyDigest: true,
    securityAlerts: true,
    tripReminders: true,
    budgetAlerts: true,
    groupUpdates: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '24h',
    loginNotifications: true
  });

  const sidebarItems = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'group', label: 'Group Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Plug }
  ];

  const connectedAccounts = [
    { provider: 'Google', icon: Chrome, connected: true, email: user?.email },
    { provider: 'GitHub', icon: Github, connected: false, email: null },
    { provider: 'Microsoft', icon: Globe, connected: false, email: null }
  ];

  const activeSessions = [
    { id: 1, device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'iPhone 15 Pro', location: 'San Francisco, CA', lastActive: '1 hour ago', current: false },
    { id: 3, device: 'Chrome on Windows', location: 'New York, NY', lastActive: '2 days ago', current: false }
  ];

  // Preference categories and options
  const preferenceCategories: PreferenceCategory[] = [
    {
      id: 'dietary',
      name: 'Dietary Preferences',
      description: 'Your food preferences while traveling',
      options: [
        { id: 'vegetarian', label: 'Vegetarian', icon: Utensils },
        { id: 'vegan', label: 'Vegan', icon: Utensils },
        { id: 'halal', label: 'Halal', icon: Utensils },
        { id: 'kosher', label: 'Kosher', icon: Utensils },
        { id: 'gluten-free', label: 'Gluten Free', icon: Utensils },
        { id: 'dairy-free', label: 'Dairy Free', icon: Utensils }
      ]
    },
    {
      id: 'accommodation',
      name: 'Accommodation Preferences',
      description: 'Your preferred places to stay',
      options: [
        { id: 'hotel', label: 'Hotels', icon: Building },
        { id: 'hostel', label: 'Hostels', icon: Building },
        { id: 'airbnb', label: 'Airbnb', icon: Building },
        { id: 'resort', label: 'Resorts', icon: Building },
        { id: 'camping', label: 'Camping', icon: Building }
      ]
    },
    {
      id: 'transport',
      name: 'Transportation Preferences',
      description: 'How you prefer to get around',
      options: [
        { id: 'public-transport', label: 'Public Transport', icon: Bus },
        { id: 'rental-car', label: 'Rental Car', icon: Bus },
        { id: 'taxi', label: 'Taxi/Rideshare', icon: Bus },
        { id: 'walking', label: 'Walking', icon: Bus },
        { id: 'cycling', label: 'Cycling', icon: Bus }
      ]
    },
    {
      id: 'tripType',
      name: 'Trip Type Preferences',
      description: 'Your preferred travel styles',
      options: [
        { id: 'adventure', label: 'Adventure', icon: Globe },
        { id: 'relaxation', label: 'Relaxation', icon: Globe },
        { id: 'cultural', label: 'Cultural', icon: Globe },
        { id: 'budget', label: 'Budget', icon: DollarSign },
        { id: 'luxury', label: 'Luxury', icon: DollarSign }
      ]
    },
    {
      id: 'accessibility',
      name: 'Accessibility Needs',
      description: 'Your accessibility requirements',
      options: [
        { id: 'wheelchair', label: 'Wheelchair Access', icon: Wheelchair },
        { id: 'limited-mobility', label: 'Limited Mobility', icon: Wheelchair },
        { id: 'visual-impairment', label: 'Visual Impairment', icon: Wheelchair },
        { id: 'hearing-impairment', label: 'Hearing Impairment', icon: Wheelchair },
        { id: 'kid-friendly', label: 'Kid Friendly', icon: Wheelchair },
        { id: 'pet-friendly', label: 'Pet Friendly', icon: Wheelchair }
      ]
    },
    {
      id: 'languages',
      name: 'Languages',
      description: 'Languages you speak or prefer',
      options: [
        { id: 'english', label: 'English', icon: Languages },
        { id: 'spanish', label: 'Spanish', icon: Languages },
        { id: 'french', label: 'French', icon: Languages },
        { id: 'german', label: 'German', icon: Languages },
        { id: 'japanese', label: 'Japanese', icon: Languages },
        { id: 'chinese', label: 'Chinese', icon: Languages }
      ]
    },
    {
      id: 'activities',
      name: 'Activity Preferences',
      description: 'When you prefer to be active',
      options: [
        { id: 'day', label: 'Day Activities', icon: SunIcon },
        { id: 'night', label: 'Night Activities', icon: MoonIcon },
        { id: 'indoor', label: 'Indoor Activities', icon: Building },
        { id: 'outdoor', label: 'Outdoor Activities', icon: Globe },
        { id: 'water', label: 'Water Activities', icon: Globe }
      ]
    }
  ];

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handlePreferenceToggle = (categoryId: string, optionId: string) => {
    setUserPreferences(prev => {
      const currentPrefs = [...(prev[categoryId] || [])];
      
      if (currentPrefs.includes(optionId)) {
        // Remove the option if already selected
        return {
          ...prev,
          [categoryId]: currentPrefs.filter(id => id !== optionId)
        };
      } else {
        // Add the option if not already selected
        return {
          ...prev,
          [categoryId]: [...currentPrefs, optionId]
        };
      }
    });
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const newMemberId = (groupMembers.length + 1).toString();
      
      setGroupMembers(prev => [
        ...prev,
        {
          id: newMemberId,
          name: newMember.name,
          email: newMember.email,
          role: newMember.role as 'owner' | 'member',
          preferences: {
            dietary: [],
            accommodation: [],
            transport: [],
            tripType: [],
            accessibility: [],
            languages: [],
            activities: []
          }
        }
      ]);
      
      setNewMember({ name: '', email: '', role: 'member' });
      setShowAddMemberModal(false);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setGroupMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleMemberPreferenceToggle = (memberId: string, categoryId: string, optionId: string) => {
    setGroupMembers(prev => {
      return prev.map(member => {
        if (member.id === memberId) {
          const currentPrefs = [...(member.preferences[categoryId] || [])];
          
          if (currentPrefs.includes(optionId)) {
            // Remove the option if already selected
            return {
              ...member,
              preferences: {
                ...member.preferences,
                [categoryId]: currentPrefs.filter(id => id !== optionId)
              }
            };
          } else {
            // Add the option if not already selected
            return {
              ...member,
              preferences: {
                ...member.preferences,
                [categoryId]: [...currentPrefs, optionId]
              }
            };
          }
        }
        return member;
      });
    });
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
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={accountData.email}
              onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <select
              value={accountData.language}
              onChange={(e) => setAccountData(prev => ({ ...prev, language: e.target.value }))}
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
              onChange={(e) => setAccountData(prev => ({ ...prev, timezone: e.target.value }))}
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
            onClick={() => setTheme('light')}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              theme === 'light'
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
              {theme === 'light' && (
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
            onClick={() => setTheme('dark')}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              theme === 'dark'
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
              {theme === 'dark' && (
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
            <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
              24.6%
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full bg-primary-600"
              style={{ width: '24.6%' }}
            ></div>
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
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Travel Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set your travel preferences to personalize your search results and recommendations
        </p>
      </div>

      {isLoadingPreferences ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your preferences...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {preferenceCategories.map((category) => (
            <div key={category.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.options.map((option) => {
                  const isSelected = userPreferences[category.id]?.includes(option.id);
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => handlePreferenceToggle(category.id, option.id)}
                      className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-colors ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <option.icon className={`h-5 w-5 ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`} />
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-primary-700 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preference Usage</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mt-1">
              <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Search Results</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your preferences will be used to personalize search results for flights, hotels, and activities.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mt-1">
              <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">AI Recommendations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our AI will use your preferences to provide personalized travel recommendations.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mt-1">
              <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Discover Page</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover page will show destinations and experiences that match your preferences.
              </p>
            </div>
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
          Manage your travel group members and their preferences
        </p>
      </div>

      {/* Group Settings */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Group Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Merge All Preferences</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Combine all group members' preferences when searching or planning trips
              </div>
            </div>
            <button
              onClick={() => setGroupSettings(prev => ({ ...prev, mergePreferences: !prev.mergePreferences }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                groupSettings.mergePreferences ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  groupSettings.mergePreferences ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Notify Members of Changes</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Send notifications to group members when trip details change
              </div>
            </div>
            <button
              onClick={() => setGroupSettings(prev => ({ ...prev, notifyMembers: !prev.notifyMembers }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                groupSettings.notifyMembers ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  groupSettings.notifyMembers ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Allow Member Editing</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Let members edit trip details and add activities
              </div>
            </div>
            <button
              onClick={() => setGroupSettings(prev => ({ ...prev, allowMemberEditing: !prev.allowMemberEditing }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                groupSettings.allowMemberEditing ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  groupSettings.allowMemberEditing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Group Members */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Group Members</h3>
          <button
            onClick={() => setShowAddMemberModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Member</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {groupMembers.map((member) => (
            <div key={member.id} className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                    <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>{member.name}</span>
                      {member.role === 'owner' && (
                        <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs">
                          Owner
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{member.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    title="Edit Member"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  {member.role !== 'owner' && (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      title="Remove Member"
                    >
                      <UserMinus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Member Preferences */}
              <div className="p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Member Preferences</h4>
                
                <div className="space-y-4">
                  {preferenceCategories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {category.options.map((option) => {
                          const isSelected = member.preferences[category.id]?.includes(option.id);
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleMemberPreferenceToggle(member.id, category.id, option.id)}
                              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                isSelected
                                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              <option.icon className="h-3 w-3" />
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Preference Summary */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Group Preference Summary</h3>
        
        <div className="space-y-4">
          {preferenceCategories.map((category) => {
            // Get all unique preferences across all members for this category
            const allPreferences = new Set<string>();
            groupMembers.forEach(member => {
              (member.preferences[category.id] || []).forEach(pref => {
                allPreferences.add(pref);
              });
            });
            
            // Convert to array and map to labels
            const preferenceLabels = Array.from(allPreferences).map(prefId => {
              const option = category.options.find(opt => opt.id === prefId);
              return option?.label || prefId;
            });
            
            return (
              <div key={category.id} className="space-y-1">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {preferenceLabels.length > 0 
                    ? preferenceLabels.join(', ') 
                    : 'No preferences set'}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">How Group Preferences Work</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                When "Merge All Preferences" is enabled, search results and recommendations will consider all group members' preferences. This helps find options that work for everyone in your group.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">Choose how you want to be notified about updates and activities</p>
      </div>

      {/* Email Notifications */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email notifications', description: 'Receive notifications via email' },
            { key: 'productUpdates', label: 'Product updates', description: 'Get notified about new features and improvements' },
            { key: 'marketingEmails', label: 'Marketing emails', description: 'Receive promotional content and offers' },
            { key: 'weeklyDigest', label: 'Weekly digest', description: 'Summary of your travel activity' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{setting.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</div>
              </div>
              <button
                onClick={() => setNotificationSettings(prev => ({ 
                  ...prev, 
                  [setting.key]: !prev[setting.key as keyof typeof prev] 
                }))}
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
            { key: 'tripReminders', label: 'Trip reminders', description: 'Get reminded about upcoming trips and tasks' },
            { key: 'budgetAlerts', label: 'Budget alerts', description: 'Notifications when you exceed budget limits' },
            { key: 'groupUpdates', label: 'Group updates', description: 'Updates from group trips and collaborations' },
            { key: 'securityAlerts', label: 'Security alerts', description: 'Important security and account notifications' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{setting.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</div>
              </div>
              <button
                onClick={() => setNotificationSettings(prev => ({ 
                  ...prev, 
                  [setting.key]: !prev[setting.key as keyof typeof prev] 
                }))}
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
            onClick={() => setShow2FAModal(true)}
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
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
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
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Sign out all devices</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sign out of all devices except this one</div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <LogOut className="h-4 w-4" />
              <span>Sign Out All</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-xl bg-red-50 dark:bg-red-900/20">
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
          <div className="text-sm text-gray-400 dark:text-gray-500 mt-1">Add webhooks to receive real-time notifications</div>
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
                <div className="text-sm text-gray-500 dark:text-gray-400">Connect your Telegram account for AI assistance</div>
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
                <div className="text-sm text-gray-500 dark:text-gray-400">Connect your WhatsApp for mobile assistance</div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sticky top-24">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
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
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      activeSection === item.id ? 'rotate-90' : ''
                    }`} />
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
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Changes are saved automatically
              </div>
              <button
                onClick={() => handleSave(activeSection)}
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
                Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data, trips, and preferences.
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
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

        {/* Add Member Modal */}
        {showAddMemberModal && (
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
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter member name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter member email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="member">Member</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddMember}
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