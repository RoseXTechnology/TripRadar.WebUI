import { useTheme } from 'app/providers/ThemeContext';
import { FEATURES } from '../model/features';

export const FeaturesSection = () => {
  const { actualTheme } = useTheme();
  const isDark = actualTheme === 'dark';

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Everything You Need for</span>
            <br />
            <span
              className={
                isDark
                  ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                  : 'text-primary-600'
              }
            >
              Perfect Trips
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
            From AI-powered planning to group collaboration and budget management, TripRadar provides comprehensive
            tools for extraordinary journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={`group bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 animate-slide-up hover-glow-${actualTheme}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3
                className={`text-xl font-semibold mb-3 transition-all duration-300 ${
                  isDark
                    ? 'text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text group-hover:text-transparent'
                    : 'text-gray-900 group-hover:text-primary-600'
                }`}
              >
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-white/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
