import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from 'app/providers/ThemeContext';
import { THEME } from 'shared/config/constants';
import { ROUTES } from 'shared/config/routes';

export const HeroSection = () => {
  const { actualTheme } = useTheme();
  const isDark = actualTheme === THEME.DARK;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="transform transition-all duration-1000 translate-y-0 opacity-100">
          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span
              className={
                isDark
                  ? 'bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent'
                  : 'text-gray-900'
              }
            >
              Smart Travel
            </span>
            <br />
            <span
              className={
                isDark
                  ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-pulse'
                  : 'text-primary-600'
              }
            >
              Management
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
            Plan, track, and optimize your trips with our comprehensive travel management platform. From flights to
            local experiences, we've got you covered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Link
              to={ROUTES.SIGNUP}
              className="group relative bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-400 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-500 flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
