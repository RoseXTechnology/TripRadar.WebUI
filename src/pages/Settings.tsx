import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Plug, 
  Camera, 
  Edit3, 
  Check, 
  X, 
  AlertTriangle, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff,
  Chrome,
  Github,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Download,
  ExternalLink,
  Settings as SettingsIcon,
  ChevronRight,
  Save,
  RefreshCw,
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
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

type SettingsSection = 'account' | 'notifications' | 'security' | 'integrations';

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
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

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
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
      </div>
    </div>
  );
}