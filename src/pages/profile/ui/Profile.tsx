import { useState } from 'react';
import {
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  CreditCard,
  LogOut,
  ChevronRight,
  Edit2,
  Check,
  X,
  Camera,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { useTheme } from 'app/providers/ThemeContext';
import { THEME } from 'shared/config/constants';
import { useAuthStore } from 'shared/store/auth';

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
  });
  const [editValues, setEditValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = (field: keyof typeof isEditing) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
    if (field === 'name') updateUser({ name: editValues.name });
    if (field === 'email') updateUser({ email: editValues.email });
  };

  const handleCancel = (field: keyof typeof isEditing) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
    setEditValues(prev => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || '',
    }));
  };

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-content dark:text-content-dark mb-1">Profile</h2>
        <p className="text-sm text-content-secondary dark:text-content-secondary-dark">
          Manage your personal information
        </p>
      </div>

      <div className="space-y-4">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative group">
            <img src={user?.avatar} alt={user?.name} className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover" />
            <button className="absolute inset-0 bg-surface-dark/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-5 w-5 text-content-dark" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <button className="text-sm text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400">
              Change photo
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-content dark:text-content-dark mb-2">Name</label>
          {isEditing.name ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editValues.name}
                onChange={e => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1 px-3 py-2 bg-surface dark:bg-surface-dark border border-outline dark:border-outline-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-content dark:text-content-dark"
              />
              <button
                onClick={() => handleSave('name')}
                className="p-2 text-primary-600 dark:text-primary-500 hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-lg"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleCancel('name')}
                className="p-2 text-content-secondary dark:text-content-secondary-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-3 py-2 bg-surface-accent dark:bg-surface-accent-dark rounded-lg">
              <span className="text-content dark:text-content-dark">{user?.name}</span>
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, name: true }))}
                className="p-1 text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-content dark:text-content-dark mb-2">Email</label>
          {isEditing.email ? (
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={editValues.email}
                onChange={e => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                className="flex-1 px-3 py-2 bg-surface dark:bg-surface-dark border border-outline dark:border-outline-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-content dark:text-content-dark"
              />
              <button
                onClick={() => handleSave('email')}
                className="p-2 text-primary-600 dark:text-primary-500 hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-lg"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleCancel('email')}
                className="p-2 text-content-secondary dark:text-content-secondary-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-3 py-2 bg-surface-accent dark:bg-surface-accent-dark rounded-lg">
              <span className="text-content dark:text-content-dark">{user?.email}</span>
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, email: true }))}
                className="p-1 text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Subscription */}
        <div>
          <label className="block text-sm font-medium text-content dark:text-content-dark mb-2">Subscription</label>
          <div className="flex items-center justify-between px-3 py-2 bg-surface-accent dark:bg-surface-accent-dark rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-content dark:text-content-dark capitalize">{user?.subscription}</span>
              {user?.subscription === 'premium' && (
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs rounded-full">
                  Pro
                </span>
              )}
            </div>
            {user?.subscription !== 'premium' && (
              <button className="text-sm text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400">
                Upgrade
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-content dark:text-content-dark mb-1">Appearance</h2>
        <p className="text-sm text-content-secondary dark:text-content-secondary-dark">
          Customize how TripRadar looks and feels
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-content dark:text-content-dark mb-3">Theme</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setTheme(THEME.LIGHT)}
            className={`p-3 rounded-lg border-2 transition-colors ${
              theme === THEME.LIGHT
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-outline dark:border-outline-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark'
            }`}
          >
            <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2">
              <Sun className="h-5 w-5 text-content dark:text-content-dark" />
              <div className="text-sm text-content dark:text-content-dark">Light</div>
            </div>
          </button>
          <button
            onClick={() => setTheme(THEME.DARK)}
            className={`p-3 rounded-lg border-2 transition-colors ${
              theme === THEME.DARK
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-outline dark:border-outline-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark'
            }`}
          >
            <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2">
              <Moon className="h-5 w-5 text-content dark:text-content-dark" />
              <div className="text-sm text-content dark:text-content-dark">Dark</div>
            </div>
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`p-3 rounded-lg border-2 transition-colors ${
              theme === 'system'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                : 'border-outline dark:border-outline-dark hover:border-outline-secondary dark:hover:border-outline-secondary-dark'
            }`}
          >
            <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2">
              <Monitor className="h-5 w-5 text-content dark:text-content-dark" />
              <div className="text-sm text-content dark:text-content-dark">System</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'appearance':
        return renderAppearanceSection();
      case 'preferences':
      case 'notifications':
      case 'security':
      case 'billing':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-content-secondary dark:text-content-secondary-dark">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} settings coming soon
            </p>
          </div>
        );
      default:
        return renderProfileSection();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-surface dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-content-muted mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-content dark:text-content-dark mb-2">Please sign in</h2>
          <p className="text-content-secondary dark:text-content-secondary-dark">
            You need to be logged in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark pt-16">
      <div className="max-w-6xl mx-auto px-4 py-4 lg:px-8 lg:py-8">
        {/* Mobile Navigation */}
        <div className="lg:hidden mb-6">
          <div className="bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-lg p-2">
            <div className="grid grid-cols-3 gap-1">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex flex-col items-center gap-1 px-2 py-3 text-xs rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary-600 text-white'
                      : 'text-content dark:text-content-dark hover:bg-surface dark:hover:bg-surface-dark'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-lg p-2">
              <nav className="space-y-1">
                {sidebarItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary-600 text-white'
                        : 'text-content dark:text-content-dark hover:bg-surface dark:hover:bg-surface-dark'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Sign Out */}
            <div className="mt-6">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-md transition-colors">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-lg p-4 lg:p-6">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Mobile Sign Out */}
        <div className="lg:hidden mt-6">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-lg transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
