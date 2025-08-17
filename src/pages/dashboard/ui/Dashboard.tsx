import { DashboardOverview } from 'features/dashboard';

export const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardOverview />
    </div>
  </div>
);
