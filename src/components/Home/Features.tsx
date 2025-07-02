import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Shield, 
  Zap,
  Globe,
  BarChart3,
  Bell,
  Smartphone,
  CreditCard,
  MessageSquare,
  Bot,
  DollarSign,
  Target,
  Vote,
  Lock
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find flights, hotels, events, and local attractions with our comprehensive search engine.',
    color: 'bg-blue-500',
  },
  {
    icon: MapPin,
    title: 'Location Intelligence',
    description: 'Get real-time data on destinations, weather, charging stations, and points of interest.',
    color: 'bg-green-500',
  },
  {
    icon: Calendar,
    title: 'Smart Itinerary',
    description: 'Create and manage detailed itineraries with automated scheduling and optimization.',
    color: 'bg-purple-500',
  },
  {
    icon: Users,
    title: 'Group Trip Planning',
    description: 'Collaborate with friends and family using shared itineraries, voting, and real-time coordination.',
    color: 'bg-orange-500',
  },
  {
    icon: DollarSign,
    title: 'Budget Management',
    description: 'Set trip budgets, track expenses by category, and get alerts for budget overruns.',
    color: 'bg-emerald-500',
  },
  {
    icon: Target,
    title: 'Satisfaction Prediction',
    description: 'AI-powered satisfaction scoring based on your preferences and travel patterns.',
    color: 'bg-pink-500',
  },
  {
    icon: Bot,
    title: 'AI Travel Assistant',
    description: 'Chat with our AI via Telegram or WhatsApp for instant trip assistance and updates.',
    color: 'bg-indigo-500',
  },
  {
    icon: Vote,
    title: 'Group Voting',
    description: 'Make group decisions easy with built-in voting for activities, restaurants, and accommodations.',
    color: 'bg-cyan-500',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data is never used for AI training. Complete privacy protection with local processing.',
    color: 'bg-red-500',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Receive personalized notifications for deals, reminders, and travel updates.',
    color: 'bg-teal-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Access your travel plans anywhere with our responsive mobile-first design.',
    color: 'bg-violet-500',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Access travel information for 200+ countries with multi-language support.',
    color: 'bg-yellow-500',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="text-primary-600"> Perfect Trips</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI-powered planning to group collaboration and budget management, 
            TripRadar provides comprehensive tools for extraordinary journeys.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* AI Integration Showcase */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Chat with Your Travel Assistant
              </h3>
              <p className="text-lg text-indigo-100 mb-6">
                Get instant help via Telegram or WhatsApp. Ask about your budget, 
                weather updates, or get personalized recommendations - all while 
                keeping your data completely private.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Telegram</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Smartphone className="h-5 w-5" />
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="space-y-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-sm font-medium">💬 "What's my Tokyo trip budget status?"</p>
                </div>
                <div className="bg-primary-500/50 rounded-lg p-3 ml-8">
                  <p className="text-sm">🤖 Your Tokyo trip: $1,200 spent of $3,500 budget (34%). Flight budget at 67% - consider booking soon!</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-sm font-medium">💬 "Remind me to book hotel tomorrow"</p>
                </div>
                <div className="bg-primary-500/50 rounded-lg p-3 ml-8">
                  <p className="text-sm">🤖 ✅ Reminder set! I'll notify you tomorrow at 9 AM to book your Tokyo hotel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Guarantee */}
        <div className="mt-16 bg-white rounded-2xl p-8 border-2 border-gray-200">
          <div className="text-center">
            <div className="inline-flex p-4 bg-red-50 rounded-full mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Your Privacy is Our Priority
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              We never trace your data or use it for AI training. All processing happens locally, 
              and your personal information stays completely private and secure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                <Lock className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">No Data Training</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Local Processing</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                <Bot className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Encrypted AI Chat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Travel Experience?
            </h3>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who trust TripRadar for intelligent, 
              collaborative, and privacy-first trip planning.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors transform hover:scale-105">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}