import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Globe, 
  Plane, 
  Headphones, 
  Bus, 
  AlertTriangle, 
  Package, 
  Map, 
  Smartphone, 
  Wifi, 
  Utensils, 
  Languages, 
  Shield,
  Bell,
  ArrowRight,
  Check,
  Mail,
  ChevronRight,
  Star,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'coming-soon' | 'in-development' | 'beta';
  eta: string;
  isPremium: boolean;
}

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { actualTheme } = useTheme();
  const featureRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all feature cards
    Object.values(featureRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true);
        setTimeout(() => setIsSubscribed(false), 3000);
        setEmail('');
      }, 500);
    }
  };

  const upcomingFeatures: FeatureCard[] = [
    {
      id: 'public-events',
      title: 'Public Events',
      description: 'Discover local events, festivals, and activities happening during your trip. Get recommendations based on your interests and preferences.',
      icon: Calendar,
      status: 'coming-soon',
      eta: 'Q2 2025',
      isPremium: false
    },
    {
      id: 'visa-requirements',
      title: 'Visa & Border Requirements',
      description: 'Get up-to-date information on visa requirements, entry restrictions, and necessary documentation for your destination.',
      icon: Globe,
      status: 'in-development',
      eta: 'Q3 2025',
      isPremium: true
    },
    {
      id: 'flight-tracking',
      title: 'Real-time Flight Tracking',
      description: 'Track your flights in real-time, receive delay notifications, and get assistance with rebooking if your flight is cancelled.',
      icon: Plane,
      status: 'beta',
      eta: 'Q2 2025',
      isPremium: true
    },
    {
      id: 'audio-guides',
      title: 'Audio Guides',
      description: 'Listen to professional audio guides for popular attractions, landmarks, and museums in multiple languages.',
      icon: Headphones,
      status: 'coming-soon',
      eta: 'Q4 2025',
      isPremium: true
    },
    {
      id: 'public-transport',
      title: 'Public Transport Routing',
      description: 'Navigate public transportation systems in foreign cities with ease. Get real-time schedules, route planning, and fare information.',
      icon: Bus,
      status: 'in-development',
      eta: 'Q3 2025',
      isPremium: false
    },
    {
      id: 'disaster-alerts',
      title: 'Global Disaster Alerts',
      description: 'Receive timely alerts about natural disasters, civil unrest, or other safety concerns that might affect your travel plans.',
      icon: AlertTriangle,
      status: 'coming-soon',
      eta: 'Q2 2025',
      isPremium: true
    },
    {
      id: 'luggage-storage',
      title: 'Luggage Storage',
      description: 'Find and book secure luggage storage locations in major cities worldwide, allowing you to explore hands-free.',
      icon: Package,
      status: 'coming-soon',
      eta: 'Q3 2025',
      isPremium: false
    },
    {
      id: 'offline-maps',
      title: 'Offline Maps',
      description: 'Download detailed maps for offline use, complete with points of interest, navigation, and local recommendations.',
      icon: Map,
      status: 'beta',
      eta: 'Q2 2025',
      isPremium: false
    },
    {
      id: 'esim-services',
      title: 'eSIM Services',
      description: 'Purchase and activate eSIMs for your destination directly through our platform, ensuring you stay connected while traveling.',
      icon: Smartphone,
      status: 'in-development',
      eta: 'Q4 2025',
      isPremium: true
    },
    {
      id: 'wifi-hotspots',
      title: 'WiFi Hotspots',
      description: 'Find reliable WiFi hotspots worldwide with speed tests, security ratings, and connection instructions.',
      icon: Wifi,
      status: 'coming-soon',
      eta: 'Q3 2025',
      isPremium: false
    },
    {
      id: 'restaurant-reservations',
      title: 'Restaurant Reservations',
      description: 'Book tables at popular restaurants in advance, with special deals and recommendations based on your dietary preferences.',
      icon: Utensils,
      status: 'in-development',
      eta: 'Q2 2025',
      isPremium: true
    },
    {
      id: 'free-translations',
      title: 'Free Translations',
      description: 'Translate signs, menus, and conversations in real-time using your camera or microphone, even without an internet connection.',
      icon: Languages,
      status: 'coming-soon',
      eta: 'Q4 2025',
      isPremium: false
    },
    {
      id: 'insurance',
      title: 'Travel Insurance',
      description: 'Compare and purchase travel insurance policies tailored to your specific trip details and requirements.',
      icon: Shield,
      status: 'in-development',
      eta: 'Q3 2025',
      isPremium: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'coming-soon':
        return <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium">Coming Soon</span>;
      case 'in-development':
        return <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-medium">In Development</span>;
      case 'beta':
        return <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">Beta</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      {/* Mouse Follower Spotlight - Only in dark mode */}
      {actualTheme === 'dark' && (
        <div 
          className="fixed pointer-events-none z-0 w-96 h-96 rounded-full opacity-20 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Roadmap</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Coming Soon to TripRadar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Exciting new features on our roadmap. Subscribe to get notified when they launch.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {upcomingFeatures.map((feature, index) => (
            <div
              key={feature.id}
              ref={el => featureRefs.current[feature.id] = el}
              className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 opacity-0 translate-y-10`}
              style={{ transitionDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${feature.isPremium ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(feature.status)}
                  {feature.isPremium && (
                    <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-medium">Premium</span>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{feature.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">ETA:</span> {feature.eta}
                </div>
                <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center space-x-1">
                  <span>{selectedFeature === feature.id ? 'Less Info' : 'More Info'}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${selectedFeature === feature.id ? 'rotate-90' : ''}`} />
                </button>
              </div>
              
              {/* Expanded Details */}
              {selectedFeature === feature.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Benefits</h4>
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Save time and reduce travel stress</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Enhance your travel experience</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Access exclusive information</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Development Status:</span> {feature.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Notify Me When Available</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated on New Features
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to be the first to know when new features are released.
          </p>
          
          {isSubscribed ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto animate-slide-up">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="p-2 bg-green-500 rounded-full">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Thank You!</h3>
              </div>
              <p className="text-blue-100">
                You've been subscribed to our newsletter. We'll notify you when new features are released.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          )}
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Feature launch notifications</span>
            </div>
          </div>
        </div>

        {/* Feature Request */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Have a Feature Request?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            We're always looking to improve TripRadar. If you have an idea for a feature that would make your travel experience better, we'd love to hear it!
          </p>
          <Link
            to="/feedback"
            className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <span>Submit Feature Request</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}