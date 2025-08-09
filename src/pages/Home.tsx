import { useTheme } from 'app/providers/ThemeContext';
import {
  ArrowRight,
  Play,
  Star,
  Shield,
  Users,
  Bot,
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Target,
  Vote,
  Lock,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VideoModal } from 'shared/ui';
import { useAnimation } from 'shared/ui/animation-provider';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { actualTheme } = useTheme();
  const { mousePosition } = useAnimation();

  useEffect(() => {
    setIsVisible(true);

    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'fixed inset-0 overflow-hidden pointer-events-none z-0';
      particlesContainer.id = 'home-particles';

      // Remove any existing particles container
      const existingContainer = document.getElementById('home-particles');
      if (existingContainer) {
        existingContainer.remove();
      }

      // Create particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = `absolute w-1 h-1 rounded-full animate-pulse ${
          actualTheme === 'dark' ? 'bg-white/20' : 'bg-primary-500/10'
        }`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.animationDuration = `${2 + Math.random() * 3}s`;

        particlesContainer.appendChild(particle);
      }

      document.body.appendChild(particlesContainer);
    };

    createParticles();

    // Cleanup on unmount
    return () => {
      const particlesContainer = document.getElementById('home-particles');
      if (particlesContainer) {
        particlesContainer.remove();
      }
    };
  }, [actualTheme]);

  const features = [
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Find flights, hotels, events, and local attractions with our comprehensive search engine.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MapPin,
      title: 'Location Intelligence',
      description: 'Get real-time data on destinations, weather, charging stations, and points of interest.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Calendar,
      title: 'Smart Itinerary',
      description: 'Create and manage detailed itineraries with automated scheduling and optimization.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Group Trip Planning',
      description: 'Collaborate with friends and family using shared itineraries, voting, and real-time coordination.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: DollarSign,
      title: 'Budget Management',
      description: 'Set trip budgets, track expenses by category, and get alerts for budget overruns.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Target,
      title: 'Satisfaction Prediction',
      description: 'AI-powered satisfaction scoring based on your preferences and travel patterns.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Bot,
      title: 'AI Travel Assistant',
      description: 'Chat with our AI via Telegram or WhatsApp for instant trip assistance and updates.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Vote,
      title: 'Group Voting',
      description: 'Make group decisions easy with built-in voting for activities, restaurants, and accommodations.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your data is never used for AI training. Complete privacy protection with local processing.',
      color: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden pt-16">
      {/* Mouse Follower Spotlight - In both light and dark themes */}
      <div
        className="fixed pointer-events-none z-0 w-96 h-96 rounded-full transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, ${actualTheme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)'} 0%, transparent 70%)`,
          opacity: actualTheme === 'dark' ? '0.2' : '0.6',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Shapes - In both light and dark themes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-pulse ${actualTheme === 'dark' ? 'opacity-10' : 'opacity-5'}`}
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
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full px-6 py-3 mb-8">
              <Star className="h-4 w-4 text-yellow-500 fill-current animate-pulse" />
              <span className="text-gray-700 dark:text-white/80 text-sm font-medium">Trusted by 50k+ travelers</span>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent'
                    : 'text-gray-900'
                }`}
              >
                Smart Travel
              </span>
              <br />
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-pulse'
                    : 'text-primary-600'
                }`}
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
                to="/signup"
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-1"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setShowVideoModal(true)}
                className="group flex items-center space-x-3 text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <div className="p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-all duration-300">
                  <Play className="h-6 w-6 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                    actualTheme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'
                      : 'text-primary-600'
                  }`}
                >
                  500K+
                </div>
                <div className="text-gray-600 dark:text-blue-200">Trips Planned</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                    actualTheme === 'dark'
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent'
                      : 'text-green-600'
                  }`}
                >
                  50+
                </div>
                <div className="text-gray-600 dark:text-blue-200">Countries</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                    actualTheme === 'dark'
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'
                      : 'text-yellow-600'
                  }`}
                >
                  4.9
                </div>
                <div className="text-gray-600 dark:text-blue-200">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Everything You Need for</span>
              <br />
              <span
                className={`${
                  actualTheme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                    : 'text-primary-600'
                }`}
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
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-slide-up' : ''} hover-glow-${actualTheme}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 transition-all duration-300 ${
                    actualTheme === 'dark'
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

      {/* Privacy Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-12 hover-glow-${actualTheme}">
            <div className="inline-flex p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Privacy is Our Priority</h3>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto mb-6">
              We never trace your data or use it for AI training. All processing happens locally, and your personal
              information stays completely private and secure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 px-4 py-2 rounded-full hover:bg-white/20 dark:hover:bg-white/20 transition-colors">
                <Lock className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">No Data Training</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 px-4 py-2 rounded-full hover:bg-white/20 dark:hover:bg-white/20 transition-colors">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Local Processing</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 px-4 py-2 rounded-full hover:bg-white/20 dark:hover:bg-white/20 transition-colors">
                <Bot className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Encrypted AI Chat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 dark:from-blue-500/20 dark:to-purple-600/20 backdrop-blur-xl border border-blue-500/30 dark:border-blue-500/30 rounded-3xl p-12 animate-slide-up">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Travel Experience?
            </h3>
            <p className="text-xl text-gray-600 dark:text-white/60 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who trust TripRadar for intelligent, collaborative, and privacy-first trip
              planning.
            </p>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="AI Travel Assistant Demo"
        description="This demo shows how to use our AI Travel Assistant via Telegram and WhatsApp for instant trip management, budget tracking, and personalized recommendations."
      />
    </div>
  );
}
