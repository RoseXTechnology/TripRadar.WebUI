import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Bell, 
  Globe, 
  Moon, 
  Sun, 
  Shield, 
  Lock, 
  Key, 
  Smartphone, 
  MessageSquare,
  Bot,
  Zap,
  Database,
  Clock,
  Eye,
  EyeOff,
  Save,
  X,
  Check,
  AlertTriangle,
  BarChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { user, setUser } = useApp();
  const { theme, setTheme, actualTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    tripReminders: true,
    priceAlerts: true,
    marketingEmails: false,
    weeklyDigest: true
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    dataRetention: user?.privacySettings?.dataRetention || 'minimal',
    aiTraining: user?.privacySettings?.aiTraining || false,
    analytics: user?.privacySettings?.analytics || false,
    marketing: user?.privacySettings?.marketing || false,
    shareLocation: false,
    activityTracking: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: '30m',
    passwordLastChanged: '2024-01-15'
  });
  
  const [aiSettings, setAiSettings] = useState({
    aiEnabled: true,
    telegramEnabled: true,
    whatsappEnabled: true,
    proactiveAlerts: true,
    smartSuggestions: true,
    language: 'en'
  });
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleSecurityChange = (setting: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleAIChange = (setting: string) => {
    setAiSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (passwordError) setPasswordError('');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 2000);
  };

  const handleSaveGeneral = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user data
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
    }
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success state after a delay
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  };

  const handleSavePrivacy = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user privacy settings
    if (user) {
      setUser({
        ...user,
        privacySettings: {
          dataRetention: privacySettings.dataRetention,
          aiTraining: privacySettings.aiTraining,
          analytics: privacySettings.analytics,
          marketing: privacySettings.marketing
        }
      });
    }
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success state after a delay
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Please sign in</h2>
          <p className="text-gray-600 dark:text-gray-400">You need to be logged in to view your settings.</p>
        </div>
      </div>
    );
  }

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                    activeTab === 'general'
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>General</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                    activeTab === 'privacy'
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Shield className="h-5 w-5" />
                  <span>Privacy</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                    activeTab === 'security'
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Lock className="h-5 w-5" />
                  <span>Security</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                    activeTab === 'ai'
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Bot className="h-5 w-5" />
                  <span>AI Assistant</span>
                </button>
                
                <Link
                  to="/settings/usage"
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                    activeTab === 'usage'
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <BarChart className="h-5 w-5" />
                  <span>Token Usage</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">General Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Profile Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Preferences */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Language
                          </label>
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="ja">日本語</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Timezone
                          </label>
                          <select
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">Eastern Time (ET)</option>
                            <option value="America/Chicago">Central Time (CT)</option>
                            <option value="America/Denver">Mountain Time (MT)</option>
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            <option value="Europe/London">London (GMT)</option>
                            <option value="Europe/Paris">Paris (CET)</option>
                            <option value="Asia/Tokyo">Tokyo (JST)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date Format
                          </label>
                          <select
                            name="dateFormat"
                            value={formData.dateFormat}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Currency
                          </label>
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="JPY">JPY (¥)</option>
                            <option value="CAD">CAD ($)</option>
                            <option value="AUD">AUD ($)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Theme */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setTheme('light')}
                          className={`flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-colors ${
                            theme === 'light'
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <Sun className="h-6 w-6 text-yellow-500" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
                        </button>
                        
                        <button
                          onClick={() => setTheme('dark')}
                          className={`flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-colors ${
                            theme === 'dark'
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <Moon className="h-6 w-6 text-indigo-500" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
                        </button>
                        
                        <button
                          onClick={() => setTheme('system')}
                          className={`flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-colors ${
                            theme === 'system'
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-indigo-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">System</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveGeneral}
                        disabled={isSubmitting}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Saving...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Saved!</span>
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
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Email Notifications</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('emailNotifications')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings.emailNotifications
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings.emailNotifications
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Trip Reminders</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Reminders about upcoming trips</div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('tripReminders')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings.tripReminders
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings.tripReminders
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Price Alerts</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Notifications about price changes</div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('priceAlerts')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings.priceAlerts
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings.priceAlerts
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Marketing Emails</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Promotional emails and offers</div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('marketingEmails')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings.marketingEmails
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings.marketingEmails
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Weekly Digest</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Weekly summary of your activity</div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('weeklyDigest')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings.weeklyDigest
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings.weeklyDigest
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Push Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Push Notifications</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Receive notifications on your device</div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('pushNotifications')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings.pushNotifications
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings.pushNotifications
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        disabled={isSubmitting}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Saving...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Saved!</span>
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
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Data Privacy */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Privacy</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Data Retention
                          </label>
                          <select
                            value={privacySettings.dataRetention}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, dataRetention: e.target.value as 'minimal' | 'standard' }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="minimal">Minimal - Only keep essential data</option>
                            <option value="standard">Standard - Keep data for improved experience</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">AI Training</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Allow your data to improve our AI</div>
                          </div>
                          <button
                            onClick={() => handlePrivacyChange('aiTraining')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.aiTraining
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.aiTraining
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Analytics</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Allow anonymous usage analytics</div>
                          </div>
                          <button
                            onClick={() => handlePrivacyChange('analytics')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.analytics
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.analytics
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Marketing</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Allow personalized marketing</div>
                          </div>
                          <button
                            onClick={() => handlePrivacyChange('marketing')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.marketing
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.marketing
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Location & Activity */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Location & Activity</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Share Location</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Share your location with the app</div>
                          </div>
                          <button
                            onClick={() => handlePrivacyChange('shareLocation')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.shareLocation
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.shareLocation
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Activity Tracking</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Track your in-app activity</div>
                          </div>
                          <button
                            onClick={() => handlePrivacyChange('activityTracking')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.activityTracking
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.activityTracking
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Data Export & Deletion */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Export & Deletion</h3>
                      <div className="space-y-4">
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <Database className="h-4 w-4" />
                          <span>Export My Data</span>
                        </button>
                        
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <X className="h-4 w-4" />
                          <span>Delete My Account</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSavePrivacy}
                        disabled={isSubmitting}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Saving...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Saved!</span>
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
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Password */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Password</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Change Password</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Last changed: {new Date(securitySettings.passwordLastChanged).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                    
                    {/* Two-Factor Authentication */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Add an extra layer of security to your account
                          </div>
                        </div>
                        <button
                          onClick={() => handleSecurityChange('twoFactorAuth')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            securitySettings.twoFactorAuth
                              ? 'bg-primary-600'
                              : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              securitySettings.twoFactorAuth
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    {/* Login Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Login Notifications</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Login Notifications</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Get notified when someone logs into your account
                          </div>
                        </div>
                        <button
                          onClick={() => handleSecurityChange('loginNotifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            securitySettings.loginNotifications
                              ? 'bg-primary-600'
                              : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              securitySettings.loginNotifications
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    {/* Session Timeout */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Session Timeout</h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="font-medium text-gray-900 dark:text-white mb-2">Session Timeout</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Automatically log out after a period of inactivity
                        </div>
                        <select
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="15m">15 minutes</option>
                          <option value="30m">30 minutes</option>
                          <option value="1h">1 hour</option>
                          <option value="4h">4 hours</option>
                          <option value="never">Never</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Active Sessions */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="font-medium text-gray-900 dark:text-white mb-2">Current Session</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          This is your current active session
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Chrome on Windows</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Started: {new Date().toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">
                              Current
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        disabled={isSubmitting}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Saving...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Saved!</span>
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
              )}

              {/* AI Assistant Settings */}
              {activeTab === 'ai' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">AI Assistant Settings</h2>
                  
                  <div className="space-y-6">
                    {/* General AI Settings */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">AI Assistant</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Enable AI travel assistant</div>
                          </div>
                          <button
                            onClick={() => handleAIChange('aiEnabled')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              aiSettings.aiEnabled
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                aiSettings.aiEnabled
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Proactive Notifications</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Allow AI to send proactive alerts</div>
                          </div>
                          <button
                            onClick={() => handleAIChange('proactiveAlerts')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              aiSettings.proactiveAlerts
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                aiSettings.proactiveAlerts
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Smart Suggestions</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Receive AI-powered recommendations</div>
                          </div>
                          <button
                            onClick={() => handleAIChange('smartSuggestions')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              aiSettings.smartSuggestions
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                aiSettings.smartSuggestions
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Messaging Platforms */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Messaging Platforms</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <MessageSquare className="h-6 w-6 text-blue-500" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Telegram</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {aiSettings.telegramEnabled ? '@TripRadarBot' : 'Not connected'}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAIChange('telegramEnabled')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              aiSettings.telegramEnabled
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                aiSettings.telegramEnabled
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-6 w-6 text-green-500" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">WhatsApp</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {aiSettings.whatsappEnabled ? '+1 (555) 123-4567' : 'Not connected'}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAIChange('whatsappEnabled')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              aiSettings.whatsappEnabled
                                ? 'bg-primary-600'
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                aiSettings.whatsappEnabled
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI Language */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">AI Language</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          AI Assistant Language
                        </label>
                        <select
                          value={aiSettings.language}
                          onChange={(e) => setAiSettings(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="ja">日本語</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Privacy Notice */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Privacy First AI</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            Your conversations are encrypted and never stored. Our AI processes requests locally 
                            and doesn't learn from your personal data.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        disabled={isSubmitting}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Saving...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Saved!</span>
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
              )}
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                  <Key className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswordCurrent ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPasswordCurrent ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswordNew ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordNew(!showPasswordNew)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPasswordNew ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10 ${
                        passwordError ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPasswordConfirm ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordError}</p>
                  )}
                </div>
                
                {/* Password Requirements */}
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password Requirements:</div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-green-500" />
                      <span>At least 8 characters long</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-green-500" />
                      <span>Include at least one uppercase letter</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-green-500" />
                      <span>Include at least one number</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-green-500" />
                      <span>Include at least one special character</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Updating...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Updated!</span>
                      </>
                    ) : (
                      <span>Update Password</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}