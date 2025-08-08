import { useEffect, useState } from 'react';
import {
  User,
  Shield,
  Search,
  CreditCard,
  MessageSquare,
  Calendar,
  Database,
  Lock,
  Clock,
  Globe,
  ArrowRight,
  Play,
  Check,
  ExternalLink,
  Code,
  Users,
  Server,
  Gauge,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAnimation } from '../components/AnimationProvider';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const { actualTheme } = useTheme();
  const { mousePosition } = useAnimation();

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate featured APIs
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: User,
      title: 'User Management',
      description: 'Complete user lifecycle management with enterprise-grade security',
      features: [
        'OAuth2 + PKCE authentication',
        'Secure registration & password reset',
        'User tiers & role management',
        'Profile customization',
      ],
      highlight: 'Enterprise-grade security with encrypted data',
      gradient: 'from-blue-500 via-cyan-500 to-purple-500',
      glowColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
      icon: Shield,
      title: 'Authentication & Authorization',
      description: 'Advanced OAuth2 implementation with enterprise identity management',
      features: ['OAuth2 + PKCE flow', 'Keycloak integration', 'JWT token management', 'Role-based access control'],
      highlight: 'Complete OAuth2 flow with enterprise identity management',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      glowColor: 'rgba(168, 85, 247, 0.5)',
    },
    {
      icon: Search,
      title: 'Search & Discovery APIs',
      description: 'Comprehensive travel data from multiple providers in real-time',
      features: ['Flight & hotel search', 'Local events & places', 'Maps & weather data', 'EV charging stations'],
      highlight: 'Real-time data from 50+ providers worldwide',
      gradient: 'from-green-500 via-teal-500 to-cyan-500',
      glowColor: 'rgba(34, 197, 94, 0.5)',
    },
    {
      icon: CreditCard,
      title: 'Payment Management',
      description: 'Seamless payment processing with automated billing systems',
      features: ['Stripe integration', 'Subscription management', 'Automated billing', 'Tier upgrades'],
      highlight: 'Automated billing and payment processing',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      glowColor: 'rgba(249, 115, 22, 0.5)',
    },
    {
      icon: MessageSquare,
      title: 'Feedback System',
      description: 'Advanced feedback collection and management dashboard',
      features: ['User feedback collection', 'Smart categorization', 'Admin dashboard', 'Analytics & insights'],
      highlight: 'AI-powered feedback analysis and categorization',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      glowColor: 'rgba(99, 102, 241, 0.5)',
    },
    {
      icon: Calendar,
      title: 'Scheduled Queries',
      description: 'Automated monitoring and execution with custom intervals',
      features: ['Automated monitoring', 'Custom schedules', 'Real-time alerts', 'Performance tracking'],
      highlight: 'Set-and-forget automation for data monitoring',
      gradient: 'from-pink-500 via-rose-500 to-orange-500',
      glowColor: 'rgba(236, 72, 153, 0.5)',
    },
    {
      icon: Database,
      title: 'GraphQL APIs',
      description: 'Powerful, flexible API with comprehensive data access',
      features: ['15+ query types', 'Advanced filtering', 'Real-time subscriptions', 'Schema introspection'],
      highlight: 'Type-safe queries with real-time data synchronization',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      glowColor: 'rgba(6, 182, 212, 0.5)',
    },
    {
      icon: Lock,
      title: 'Security Features',
      description: 'Enterprise-grade security and data protection',
      features: ['End-to-end encryption', 'Rate limiting', 'Input validation', 'Audit logging'],
      highlight: 'SOC 2 compliant with 99.9% uptime guarantee',
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      glowColor: 'rgba(16, 185, 129, 0.5)',
    },
  ];

  const integrations = [
    {
      name: 'Google Services',
      description: 'Maps, Places, Flights & Hotels',
      icon: '🌐',
      gradient: 'from-blue-400 to-blue-600',
      status: 'Connected',
    },
    {
      name: 'Stripe',
      description: 'Payment processing & subscriptions',
      icon: '💳',
      gradient: 'from-purple-400 to-purple-600',
      status: 'Connected',
    },
    {
      name: 'OpenWeatherMap',
      description: 'Global weather data & forecasts',
      icon: '🌤️',
      gradient: 'from-orange-400 to-orange-600',
      status: 'Connected',
    },
    {
      name: 'Keycloak',
      description: 'Identity & access management',
      icon: '🔐',
      gradient: 'from-blue-400 to-indigo-600',
      status: 'Connected',
    },
    {
      name: 'MailKit',
      description: 'Email delivery & notifications',
      icon: '📧',
      gradient: 'from-red-400 to-red-600',
      status: 'Connected',
    },
    {
      name: 'SerpApi',
      description: 'Search engine results & data',
      icon: '🔍',
      gradient: 'from-green-400 to-green-600',
      status: 'Connected',
    },
    {
      name: 'Open Charge Map',
      description: 'EV charging station data',
      icon: '⚡',
      gradient: 'from-cyan-400 to-cyan-600',
      status: 'Connected',
    },
    {
      name: 'UniRateApi',
      description: 'Currency exchange rates',
      icon: '💰',
      gradient: 'from-yellow-400 to-yellow-600',
      status: 'Connected',
    },
    {
      name: 'Calendarific',
      description: 'Global holidays & events',
      icon: '📅',
      gradient: 'from-indigo-400 to-indigo-600',
      status: 'Connected',
    },
    {
      name: 'OpenTripMap',
      description: 'Tourist attractions & POIs',
      icon: '🗺️',
      gradient: 'from-teal-400 to-teal-600',
      status: 'Connected',
    },
    {
      name: 'Transitland',
      description: 'Public transport data',
      icon: '🚌',
      gradient: 'from-emerald-400 to-emerald-600',
      status: 'Connected',
    },
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/flights',
      title: 'Flight Search API',
      description: 'Search and compare flights from multiple airlines worldwide',
      features: ['Real-time pricing', 'Multi-city routes', 'Flexible dates', 'Airline filters'],
      response: `{
  "flights": [
    {
      "id": "FL123",
      "airline": "Emirates",
      "price": 899,
      "duration": "14h 30m"
    }
  ]
}`,
    },
    {
      method: 'GET',
      endpoint: '/api/v1/hotels',
      title: 'Hotel Search API',
      description: 'Find and book accommodations with detailed amenities',
      features: ['Price comparison', 'Amenity filters', 'Guest reviews', 'Availability check'],
      response: `{
  "hotels": [
    {
      "id": "HT456",
      "name": "Grand Plaza",
      "rating": 4.8,
      "price": 299
    }
  ]
}`,
    },
    {
      method: 'GET',
      endpoint: '/api/v1/weather',
      title: 'Weather API',
      description: 'Comprehensive weather data and forecasts',
      features: ['Current conditions', '7-day forecast', 'Weather alerts', 'Historical data'],
      response: `{
  "current": {
    "temperature": 22,
    "condition": "sunny",
    "humidity": 65
  }
}`,
    },
    {
      method: 'GET',
      endpoint: '/api/v1/maps',
      title: 'Maps & Places API',
      description: 'Location data, geocoding, and place information',
      features: ['Geocoding', 'Place details', 'Nearby search', 'Route planning'],
      response: `{
  "places": [
    {
      "id": "PL789",
      "name": "Eiffel Tower",
      "rating": 4.6
    }
  ]
}`,
    },
    {
      method: 'GET',
      endpoint: '/api/v1/exchange-rates',
      title: 'Currency Exchange API',
      description: 'Real-time currency conversion and historical rates',
      features: ['Live rates', 'Historical data', 'Currency trends', 'Multi-currency'],
      response: `{
  "rates": {
    "USD": 1.0,
    "EUR": 0.85,
    "GBP": 0.73
  }
}`,
    },
    {
      method: 'GET',
      endpoint: '/api/v1/transport',
      title: 'Public Transport API',
      description: 'Transit schedules, routes, and real-time updates',
      features: ['Route planning', 'Real-time updates', 'Schedule data', 'Service alerts'],
      response: `{
  "routes": [
    {
      "id": "RT101",
      "duration": "25 min",
      "transfers": 1
    }
  ]
}`,
    },
  ];

  const stats = [
    { number: '15+', label: 'API Endpoints', icon: Server },
    { number: '50+', label: 'Data Providers', icon: Globe },
    { number: '99.9%', label: 'Uptime SLA', icon: Gauge },
    { number: '24/7', label: 'Support', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden pt-16">
      {/* Mouse Follower Spotlight */}
      <div
        className="fixed pointer-events-none z-0 w-96 h-96 rounded-full transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, ${actualTheme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)'} 0%, transparent 70%)`,
          opacity: actualTheme === 'dark' ? '0.2' : '0.6',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              actualTheme === 'dark' ? 'bg-white/20' : 'bg-primary-500/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-10 animate-pulse ${actualTheme === 'dark' ? 'opacity-10' : 'opacity-5'}`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            >
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl`} />
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            {/* Glassmorphic Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8">
              <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
              <span className="text-white/80 font-medium">Powered by Advanced AI</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent'
                    : 'text-gray-900'
                }`}
              >
                The Future of
              </span>
              <br />
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-pulse'
                    : 'text-primary-600'
                }`}
              >
                Travel Intelligence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-white/60 max-w-4xl mx-auto mb-12 leading-relaxed">
              Build extraordinary travel experiences with our comprehensive suite of APIs. From flight search to weather
              data, we provide everything you need to create the next generation of travel applications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-1">
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>

              <button className="group flex items-center space-x-3 text-white/80 hover:text-white transition-colors">
                <div className="p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl group-hover:bg-white/10 transition-all duration-300">
                  <Play className="h-6 w-6 ml-1" />
                </div>
                <span className="font-semibold text-lg">View Documentation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                    : 'text-gray-900'
                }`}
              >
                Everything You Need to Build
              </span>
              <br />
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                    : 'text-primary-600'
                }`}
              >
                Amazing Travel Apps
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              Our platform provides a complete toolkit for developers to create sophisticated travel and location-based
              applications with enterprise-grade reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 transform ${isVisible ? 'animate-slide-up' : ''} hover-glow-${actualTheme}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: `0 0 0 1px ${feature.glowColor}00, 0 0 20px ${feature.glowColor}00`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${feature.glowColor}, 0 0 40px ${feature.glowColor}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${feature.glowColor}00, 0 0 20px ${feature.glowColor}00`;
                }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3
                  className={`text-xl font-bold mb-3 transition-all duration-300 ${
                    actualTheme === 'dark'
                      ? 'text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text group-hover:text-transparent'
                      : 'text-gray-900 group-hover:text-primary-600'
                  }`}
                >
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-white/60 mb-4 leading-relaxed">{feature.description}</p>

                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-white/70">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 border border-white/10`}
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white/90">💡 {feature.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Showcase Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful API Endpoints
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              Access comprehensive travel data through our RESTful APIs with real-time responses and extensive
              documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {apiEndpoints.map((api, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 animate-slide-up hover-glow-${actualTheme}"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Method & Endpoint */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-bold">{api.method}</span>
                  <code className="text-cyan-600 dark:text-cyan-300 font-mono text-sm bg-gray-100 dark:bg-black/20 px-3 py-1 rounded border border-gray-200 dark:border-white/10">
                    {api.endpoint}
                  </code>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{api.title}</h3>
                <p className="text-gray-600 dark:text-white/60 mb-4">{api.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {api.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Response Example */}
                <div className="bg-gray-100 dark:bg-black/30 backdrop-blur-xl rounded-xl p-3 border border-gray-200 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 dark:text-white/60 font-medium">Response</span>
                    <button className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
                      <Code className="h-3 w-3" />
                    </button>
                  </div>
                  <pre className="text-xs text-green-600 dark:text-green-300 font-mono overflow-hidden">
                    {api.response}
                  </pre>
                </div>

                {/* Try Button */}
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Try API</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Seamless Integrations</h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              Connect with leading travel and technology providers to access comprehensive data and services through a
              single, unified API.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className={`group relative bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'animate-slide-up' : ''} hover-glow-${actualTheme}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                ></div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${integration.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {integration.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{integration.name}</h3>
                <p className="text-gray-600 dark:text-white/60 text-sm mb-4">{integration.description}</p>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="bg-green-500/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 border border-green-500/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{integration.status}</span>
                  </span>
                  <button className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
              Join thousands of developers building the future of travel technology
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex p-4 bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl mb-4 group-hover:bg-gray-50 dark:group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="h-8 w-8 text-primary-600 dark:text-cyan-400" />
                </div>
                <div
                  className={`text-4xl md:text-6xl font-bold mb-2 transition-all duration-300 ${
                    actualTheme === 'dark'
                      ? 'text-white group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent'
                      : 'text-gray-900 group-hover:text-primary-600'
                  }`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-12 hover-glow-${actualTheme}">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/60 mb-12 max-w-2xl mx-auto">
              Start building with our comprehensive APIs today. Get access to real-time travel data, powerful search
              capabilities, and enterprise-grade infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-1">
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                <span>View Documentation</span>
                <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-gray-600 dark:text-white/60">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500 dark:text-green-400" />
                <span>Enterprise security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-500 dark:text-green-400" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
