import { useState, useEffect } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfileQuery, useUpdateProfileMutation } from 'entities/user/api';
import type { UpdateUserProfileRequest } from 'shared/api';
import { useAuthStore } from 'shared/store/auth';

export const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useProfileQuery(user?.name || '');
  const updateProfile = useUpdateProfileMutation();

  const [formData, setFormData] = useState<UpdateUserProfileRequest>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    timezone: '',
    languageCode: '',
    countryCode: '',
    allowsMarketingEmails: false,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phoneNumber: profile.phoneNumber || '',
        timezone: profile.timezone || '',
        languageCode: profile.languageCode || '',
        countryCode: profile.countryCode || '',
        allowsMarketingEmails: profile.allowsMarketingEmails || false,
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.name) return;

    updateProfile.mutate(
      { username: user.name, data: formData },
      {
        onSuccess: () => {
          navigate('/profile');
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading profile...</p>
      </div>
    );

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

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 text-gray-400 hover:text-content dark:hover:text-content-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-content-dark mb-2">Edit Profile</h1>
            <p className="text-gray-600 dark:text-content-secondary-dark text-lg">Update your profile information</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-surface dark:bg-surface-accent-dark rounded-lg shadow-sm border border-gray-200 dark:border-outline-dark">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-content-dark mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName || ''}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-outline-dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-content-dark bg-white dark:bg-surface-dark"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-content-dark mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-outline-dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-content-dark bg-white dark:bg-surface-dark"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 dark:border-outline-dark pt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-content-dark mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-content-dark mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber || ''}
                      onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-outline-dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-content-dark bg-white dark:bg-surface-dark"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="border-t border-gray-200 dark:border-outline-dark pt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-content-dark mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-content-dark mb-2">
                      Timezone
                    </label>
                    <input
                      type="text"
                      value={formData.timezone || ''}
                      onChange={e => setFormData({ ...formData, timezone: e.target.value })}
                      placeholder="e.g., America/New_York"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-outline-dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-content-dark bg-white dark:bg-surface-dark"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={formData.allowsMarketingEmails || false}
                      onChange={e => setFormData({ ...formData, allowsMarketingEmails: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-outline-dark rounded"
                    />
                    <label htmlFor="marketing" className="text-sm text-gray-700 dark:text-content-dark">
                      Allow marketing emails and notifications
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 dark:border-outline-dark pt-8 flex gap-4">
                <button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="flex items-center gap-2 px-6 py-3 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark border border-outline dark:border-outline-dark hover:bg-button-hover dark:hover:bg-button-hover-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors font-medium"
                >
                  <Save className="h-4 w-4" />
                  {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-6 py-3 bg-surface dark:bg-surface-dark text-content-secondary dark:text-content-secondary-dark border border-gray-300 dark:border-outline-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-md transition-colors font-medium"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
