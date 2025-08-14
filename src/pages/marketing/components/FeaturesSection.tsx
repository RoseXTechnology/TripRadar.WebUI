import { useState, useEffect } from 'react';
import { User, Shield, Search, CreditCard, MessageSquare, Calendar, Check } from 'lucide-react';
import { useTheme } from 'app/providers/ThemeContext';

const features = [
  {
    icon: User,
    title: 'Smart Trip Planning',
    description: 'AI-powered itinerary creation with personalized recommendations based on your preferences.',
    features: ['AI recommendations', 'Custom itineraries', 'Budget optimization', 'Real-time updates'],
    gradient: 'from-blue-500 via-cyan-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    description: 'Enterprise-grade security with OAuth2 integration and encrypted data protection.',
    features: ['OAuth2 + PKCE', 'Data encryption', 'Secure sessions', 'Privacy controls'],
    gradient: 'from-purple-500 via-pink-500 to-red-500',
  },
  {
    icon: Search,
    title: 'Comprehensive Search',
    description: 'Search flights, hotels, events, and attractions from multiple providers worldwide.',
    features: ['Flight search', 'Hotel booking', 'Local events', 'Weather data'],
    gradient: 'from-green-500 via-teal-500 to-cyan-500',
  },
  {
    icon: CreditCard,
    title: 'Budget Management',
    description: 'Track expenses, set budgets, and get insights into your travel spending patterns.',
    features: ['Expense tracking', 'Budget alerts', 'Spending insights', 'Group splitting'],
    gradient: 'from-orange-500 via-red-500 to-pink-500',
  },
  {
    icon: MessageSquare,
    title: 'Group Collaboration',
    description: 'Plan trips together with friends and family using collaborative tools.',
    features: ['Group planning', 'Voting system', 'Shared budgets', 'Real-time chat'],
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated trip monitoring and scheduling with custom alerts and notifications.',
    features: ['Auto scheduling', 'Smart alerts', 'Calendar sync', 'Reminders'],
    gradient: 'from-pink-500 via-rose-500 to-orange-500',
  },
];

export const FeaturesSection = () => {
  const { actualTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const isDark = actualTheme === 'dark';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Everything You Need to Build</span>
              <br />
              <span
                className={
                  isDark
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                    : 'text-primary-600'
                }
              >
                Amazing Travel Apps
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              Our platform provides a complete toolkit for developers to create sophisticated travel applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3
                  className={`text-xl font-bold mb-3 transition-all duration-300 ${
                    isDark
                      ? 'text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text group-hover:text-transparent'
                      : 'text-gray-900 group-hover:text-primary-600'
                  }`}
                >
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-white/60 mb-4 leading-relaxed">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-white/70">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
