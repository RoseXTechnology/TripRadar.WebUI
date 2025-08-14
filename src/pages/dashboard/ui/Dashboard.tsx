import { useEffect } from 'react';
import { useTheme } from 'app/providers/ThemeContext';
import { DashboardOverview } from 'features/dashboard';
import { useAnimation } from 'shared/ui/animation-provider';

export default function Dashboard() {
  const { actualTheme } = useTheme();
  const { createParticles, removeParticles } = useAnimation();

  // Animation effects for both light and dark themes
  useEffect(() => {
    // Create floating particles
    createParticles('dashboard-particles');

    // Cleanup on unmount
    return () => {
      removeParticles('dashboard-particles');
    };
  }, [actualTheme, createParticles, removeParticles]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardOverview />
      </div>
    </div>
  );
}
