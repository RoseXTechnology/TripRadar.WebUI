import { useState } from 'react';
import { User, Settings, CreditCard, LogOut, Edit2, Check, X } from 'lucide-react';
import { useAuthStore } from 'shared/store/auth';

export default function Profile() {
  const { user, updateUser, logout } = useAuthStore();
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
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const renderProfileSection = () => (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-content-dark mb-2">Profile Information</h2>
      </div>

      <div className="space-y-8">
        {/* Name */}
        <div className="border-b border-gray-200 dark:border-outline-dark pb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-content-dark mb-1">
                Display Name
              </label>
              {isEditing.name ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={e => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-outline-dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-content-dark bg-white dark:bg-surface-dark"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSave('name')}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-md transition-colors"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleCancel('name')}
                    className="p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-surface-accent-dark rounded-md transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="group flex items-center justify-between py-2">
                  <span className="text-gray-900 dark:text-content-dark font-medium">{user?.name}</span>
                  <button
                    onClick={() => setIsEditing(prev => ({ ...prev, name: true }))}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="border-b border-gray-200 dark:border-outline-dark pb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-content-dark mb-1">
                Email Address
              </label>
              {isEditing.email ? (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={editValues.email}
                    onChange={e => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-outline-dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-content-dark bg-white dark:bg-surface-dark"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSave('email')}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-md transition-colors"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleCancel('email')}
                    className="p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-surface-accent-dark rounded-md transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="group flex items-center justify-between py-2">
                  <span className="text-gray-900 dark:text-content-dark font-medium">{user?.email}</span>
                  <button
                    onClick={() => setIsEditing(prev => ({ ...prev, email: true }))}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-content-dark mb-1">
                Subscription Plan
              </label>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="text-gray-900 dark:text-content-dark font-medium capitalize">
                    {user?.subscription}
                  </span>
                  {user?.subscription === 'premium' && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                      Pro
                    </span>
                  )}
                </div>
                {user?.subscription !== 'premium' && (
                  <button className="px-3 py-1.5 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark border border-outline dark:border-outline-dark hover:bg-button-hover dark:hover:bg-button-hover-dark text-sm font-medium rounded-md transition-colors">
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'preferences':
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

  // Если нет пользователя - редирект на логин
  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="relative min-h-screen pt-16 bg-surface-accent dark:bg-surface-accent-dark">
      {/* CTA-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface-accent to-secondary-50 dark:from-surface-accent-dark dark:via-gray-800 dark:to-primary-600/20" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-secondary-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-primary-600/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-600/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-content-dark mb-2">Account Settings</h1>
          <p className="text-gray-600 dark:text-content-secondary-dark text-lg">
            Manage your profile and account preferences
          </p>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mb-8">
          <div className="bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-gray-200 dark:border-outline-dark overflow-hidden">
            <div className="flex">
              {sidebarItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeSection === item.id
                      ? 'text-button-text dark:text-button-text-dark bg-button dark:bg-button-dark'
                      : 'text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark'
                  } ${index !== sidebarItems.length - 1 ? 'border-r border-gray-200 dark:border-outline-dark' : ''}`}
                >
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-500" />
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-surface dark:bg-surface-accent-dark rounded-lg shadow-sm border border-gray-200 dark:border-outline-dark p-6">
                <nav className="space-y-2">
                  {sidebarItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 border ${
                        activeSection === item.id
                          ? 'bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark border-outline dark:border-outline-dark shadow-sm'
                          : 'text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark border-transparent'
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          activeSection === item.id
                            ? 'text-button-text dark:text-button-text-dark'
                            : 'text-content-muted'
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Sign Out */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-outline-dark">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-content-secondary dark:text-content-secondary-dark hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-surface dark:bg-surface-accent-dark rounded-lg shadow-sm border border-gray-200 dark:border-outline-dark">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Mobile Sign Out */}
        <div className="lg:hidden mt-8">
          <div className="bg-surface dark:bg-surface-accent-dark rounded-lg shadow-sm border border-gray-200 dark:border-outline-dark">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
