import { useState } from 'react';
import { User, Settings, CreditCard, LogOut, ChevronRight, Edit2, Check, X, Camera } from 'lucide-react';
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-content dark:text-content-dark mb-2">Profile</h2>
        <p className="text-content-secondary dark:text-content-secondary-dark">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 p-0.5">
              <img src={user?.avatar} alt={user?.name} className="w-full h-full rounded-2xl object-cover" />
            </div>
            <button className="absolute inset-0 bg-surface-dark/60 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
              <Camera className="h-6 w-6 text-surface" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-2">
            <h3 className="text-lg font-semibold text-content dark:text-content-dark">{user?.name}</h3>
            <p className="text-sm text-content-secondary dark:text-content-secondary-dark">{user?.email}</p>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all duration-200">
              <Camera className="h-4 w-4" />
              Change photo
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="bg-surface-accent/50 dark:bg-surface-accent-dark/50 rounded-xl p-4 border border-outline/30 dark:border-outline-dark/30">
          <label className="block text-sm font-semibold text-content dark:text-content-dark mb-3">Display Name</label>
          {isEditing.name ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={editValues.name}
                onChange={e => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1 px-4 py-3 bg-surface dark:bg-surface-dark border border-outline dark:border-outline-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-content dark:text-content-dark transition-all duration-200"
                autoFocus
              />
              <button
                onClick={() => handleSave('name')}
                className="p-3 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleCancel('name')}
                className="p-3 text-content-secondary dark:text-content-secondary-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-xl transition-all duration-200 hover:scale-105"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="group flex items-center justify-between px-4 py-3 bg-surface/50 dark:bg-surface-dark/50 rounded-xl hover:bg-surface dark:hover:bg-surface-dark transition-all duration-200">
              <span className="text-content dark:text-content-dark font-medium">{user?.name}</span>
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, name: true }))}
                className="p-2 text-content-muted group-hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="bg-surface-accent/50 dark:bg-surface-accent-dark/50 rounded-xl p-4 border border-outline/30 dark:border-outline-dark/30">
          <label className="block text-sm font-semibold text-content dark:text-content-dark mb-3">Email Address</label>
          {isEditing.email ? (
            <div className="flex items-center gap-3">
              <input
                type="email"
                value={editValues.email}
                onChange={e => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                className="flex-1 px-4 py-3 bg-surface dark:bg-surface-dark border border-outline dark:border-outline-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-content dark:text-content-dark transition-all duration-200"
                autoFocus
              />
              <button
                onClick={() => handleSave('email')}
                className="p-3 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleCancel('email')}
                className="p-3 text-content-secondary dark:text-content-secondary-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-xl transition-all duration-200 hover:scale-105"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="group flex items-center justify-between px-4 py-3 bg-surface/50 dark:bg-surface-dark/50 rounded-xl hover:bg-surface dark:hover:bg-surface-dark transition-all duration-200">
              <span className="text-content dark:text-content-dark font-medium">{user?.email}</span>
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, email: true }))}
                className="p-2 text-content-muted group-hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Subscription */}
        <div className="bg-surface-accent/50 dark:bg-surface-accent-dark/50 rounded-xl p-4 border border-outline/30 dark:border-outline-dark/30">
          <label className="block text-sm font-semibold text-content dark:text-content-dark mb-3">
            Subscription Plan
          </label>
          <div className="flex items-center justify-between px-4 py-3 bg-surface/50 dark:bg-surface-dark/50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-content dark:text-content-dark font-medium capitalize">{user?.subscription}</span>
              {user?.subscription === 'premium' && (
                <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-surface text-xs font-semibold rounded-full shadow-sm">
                  Pro
                </span>
              )}
            </div>
            {user?.subscription !== 'premium' && (
              <button className="px-4 py-2 bg-surface text-content border border-content text-sm font-medium rounded-lg hover:bg-surface-accent transition-all duration-200 hover:scale-105 shadow-sm">
                Upgrade
              </button>
            )}
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
    <div className="relative min-h-screen pt-16">
      {/* Hero-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-dark-secondary dark:to-primary-600/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-content dark:text-content-dark mb-2">Settings</h1>
          <p className="text-content-secondary dark:text-content-secondary-dark">Manage your account and preferences</p>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mb-8">
          <div className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-xl border border-outline/50 dark:border-outline-dark/50 rounded-2xl p-3 shadow-lg">
            <div className="grid grid-cols-3 gap-2">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`group flex flex-col items-center gap-2 px-3 py-4 text-xs font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                    activeSection === item.id
                      ? 'bg-surface text-content shadow-lg border border-content'
                      : 'text-content dark:text-content-dark hover:bg-surface-accent/50 dark:hover:bg-surface-accent-dark/50'
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 transition-colors ${
                      activeSection === item.id ? 'text-content' : 'text-content-muted group-hover:text-primary-500'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-xl border border-outline/50 dark:border-outline-dark/50 rounded-2xl p-4 shadow-lg">
                <nav className="space-y-2">
                  {sidebarItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`group w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                        activeSection === item.id
                          ? 'bg-surface text-content shadow-lg border border-content'
                          : 'text-content dark:text-content-dark hover:bg-surface-accent/50 dark:hover:bg-surface-accent-dark/50'
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 transition-colors ${
                          activeSection === item.id ? 'text-content' : 'text-content-muted group-hover:text-primary-500'
                        }`}
                      />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          activeSection === item.id
                            ? 'rotate-90 text-content'
                            : 'text-content-muted group-hover:text-primary-500'
                        }`}
                      />
                    </button>
                  ))}
                </nav>

                {/* Sign Out */}
                <div className="mt-6 pt-4 border-t border-outline/30 dark:border-outline-dark/30">
                  <button
                    onClick={logout}
                    className="group w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark hover:bg-surface-accent/50 dark:hover:bg-surface-accent-dark/50 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <LogOut className="h-5 w-5 text-content-muted group-hover:text-primary-500 transition-colors" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-xl border border-outline/50 dark:border-outline-dark/50 rounded-2xl p-6 lg:p-8 shadow-lg min-h-[600px]">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Mobile Sign Out */}
        <div className="lg:hidden mt-8">
          <button
            onClick={logout}
            className="group w-full flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium text-content-secondary dark:text-content-secondary-dark hover:text-content dark:hover:text-content-dark bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-xl border border-outline/50 dark:border-outline-dark/50 rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogOut className="h-5 w-5 text-content-muted group-hover:text-primary-500 transition-colors" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
