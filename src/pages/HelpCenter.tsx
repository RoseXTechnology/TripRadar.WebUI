import React, { useState } from 'react';
import { 
  Search, 
  Book, 
  MessageSquare, 
  Bot, 
  CreditCard, 
  User, 
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Play,
  FileText,
  Lightbulb,
  Settings,
  Shield,
  Zap,
  Globe,
  Mail,
  Phone
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  articles: number;
}

const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using TripRadar',
    icon: Book,
    color: 'bg-blue-500',
    articles: 12
  },
  {
    id: 'ai-bot',
    title: 'AI Travel Assistant',
    description: 'How to use our AI bot via Telegram/WhatsApp',
    icon: Bot,
    color: 'bg-purple-500',
    articles: 8
  },
  {
    id: 'search',
    title: 'Search & Booking',
    description: 'Find flights, hotels, and plan your trips',
    icon: Search,
    color: 'bg-green-500',
    articles: 15
  },
  {
    id: 'billing',
    title: 'Billing & Subscriptions',
    description: 'Manage your account and payments',
    icon: CreditCard,
    color: 'bg-orange-500',
    articles: 10
  },
  {
    id: 'account',
    title: 'Account Management',
    description: 'Profile settings and security',
    icon: User,
    color: 'bg-indigo-500',
    articles: 7
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and solutions',
    icon: AlertTriangle,
    color: 'bg-red-500',
    articles: 9
  }
];

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How do I connect the AI bot to Telegram?',
    answer: 'To connect the AI bot to Telegram: 1) Go to your Dashboard, 2) Find the AI Bot Integration section, 3) Click "Enable Telegram", 4) Follow the setup instructions to connect @TripRadarBot, 5) Start chatting with commands like "What\'s my budget status?"',
    category: 'ai-bot'
  },
  {
    id: '2',
    question: 'How does the flight search work?',
    answer: 'Our flight search aggregates data from multiple airlines and booking platforms. Simply enter your departure and destination cities, select dates, and we\'ll show you the best options sorted by price, duration, and convenience.',
    category: 'search'
  },
  {
    id: '3',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through Stripe.',
    category: 'billing'
  },
  {
    id: '4',
    question: 'How do I create my first trip?',
    answer: 'Creating your first trip is easy: 1) Click "New Trip" on your dashboard, 2) Enter your destination and dates, 3) Set your budget and preferences, 4) Start adding flights, hotels, and activities, 5) Invite friends if it\'s a group trip.',
    category: 'getting-started'
  },
  {
    id: '5',
    question: 'Can I change my subscription plan?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time from the Billing section in your account settings. Changes take effect immediately, and we\'ll prorate the billing accordingly.',
    category: 'billing'
  },
  {
    id: '6',
    question: 'How do I reset my password?',
    answer: 'To reset your password: 1) Go to the login page, 2) Click "Forgot password?", 3) Enter your email address, 4) Check your email for reset instructions, 5) Follow the link to create a new password.',
    category: 'account'
  },
  {
    id: '7',
    question: 'Why is my search taking so long?',
    answer: 'Search times can vary based on destination popularity and current demand. International flights typically take 10-30 seconds. If searches consistently take longer, try clearing your browser cache or contact support.',
    category: 'troubleshooting'
  },
  {
    id: '8',
    question: 'How does group trip planning work?',
    answer: 'Group trips allow multiple people to collaborate: 1) Create a trip and mark it as "Group Trip", 2) Invite members via email, 3) Use voting features for decisions, 4) Share budgets and expenses, 5) Chat and coordinate through the platform.',
    category: 'getting-started'
  }
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of TripRadar.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {helpCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`group text-left p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-slide-up ${
                selectedCategory === category.id ? 'ring-2 ring-primary-500 border-primary-500' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {category.articles} articles
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {category.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {category.description}
              </p>
              
              <div className="flex items-center mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium">
                <span>Browse articles</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory ? 
                `${helpCategories.find(c => c.id === selectedCategory)?.title} FAQs` : 
                'Frequently Asked Questions'
              }
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                Show all FAQs
              </button>
            )}
          </div>

          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or browse our categories above.</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <div className={`transform transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </button>
                  
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                      <div className="pt-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Comprehensive guides and API docs</p>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1 mx-auto">
              <span>View Docs</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl w-fit mx-auto mb-4">
              <Play className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Step-by-step video guides</p>
            <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium flex items-center space-x-1 mx-auto">
              <span>Watch Videos</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl w-fit mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Connect with other travelers</p>
            <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium flex items-center space-x-1 mx-auto">
              <span>Join Community</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl w-fit mx-auto mb-4">
              <Mail className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get personalized help</p>
            <button className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 text-sm font-medium flex items-center space-x-1 mx-auto">
              <span>Contact Us</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Still Need Help?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of TripRadar. 
            Reach out anytime for personalized assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Email Support</span>
            </button>
            
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center space-x-2 border border-white/20">
              <MessageSquare className="h-5 w-5" />
              <span>Live Chat</span>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-8 text-blue-200 text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Fast Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Global Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}