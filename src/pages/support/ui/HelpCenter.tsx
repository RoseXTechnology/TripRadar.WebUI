import React, { useState } from 'react';
import {
  FiSearch,
  FiBook,
  FiMessageSquare,
  FiCreditCard,
  FiUser,
  FiAlertTriangle,
  FiChevronRight,
  FiChevronDown,
  FiMapPin,
} from 'react-icons/fi';

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
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  articles: number;
}

const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using TripRadar',
    icon: FiBook,
    color: 'bg-blue-500',
    articles: 12,
  },
  {
    id: 'ai-bot',
    title: 'AI Travel Assistant',
    description: 'How to use our AI bot via Telegram/WhatsApp',
    icon: FiMessageSquare,
    color: 'bg-purple-500',
    articles: 8,
  },
  {
    id: 'trip-planning',
    title: 'Trip Planning',
    description: 'Create itineraries and organize your travel plans',
    icon: FiMapPin,
    color: 'bg-green-500',
    articles: 15,
  },
  {
    id: 'billing',
    title: 'Billing & Subscriptions',
    description: 'Manage your account and payments',
    icon: FiCreditCard,
    color: 'bg-orange-500',
    articles: 10,
  },
  {
    id: 'account',
    title: 'Account Management',
    description: 'Profile settings and security',
    icon: FiUser,
    color: 'bg-indigo-500',
    articles: 7,
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and solutions',
    icon: FiAlertTriangle,
    color: 'bg-red-500',
    articles: 9,
  },
];

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How do I connect the AI bot to Telegram?',
    answer:
      'To connect the AI bot to Telegram: 1) Go to your Dashboard, 2) Find the AI Bot Integration section, 3) Click "Enable Telegram", 4) Follow the setup instructions to connect @TripRadarBot, 5) Start chatting with commands like "What\'s my budget status?"',
    category: 'ai-bot',
  },
  {
    id: '2',
    question: 'How do I create a trip itinerary?',
    answer:
      "To create an itinerary: 1) Click 'New Trip' on your dashboard, 2) Add your destinations and dates, 3) Use our planning tools to add activities, restaurants, and attractions, 4) Organize your schedule day by day, 5) Share with travel companions for collaboration.",
    category: 'trip-planning',
  },
  {
    id: '3',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for subscription payments. All transactions are processed securely.',
    category: 'billing',
  },
  {
    id: '4',
    question: 'How do I create my first trip?',
    answer:
      'Creating your first trip is easy: 1) Click "New Trip" on your dashboard, 2) Enter your destination and dates, 3) Set your budget and preferences, 4) Start planning activities and places to visit, 5) Invite friends if it\'s a group trip.',
    category: 'getting-started',
  },
  {
    id: '5',
    question: 'Can I change my subscription plan?',
    answer:
      "Yes! You can upgrade or downgrade your plan at any time from the Billing section in your account settings. Changes take effect immediately, and we'll prorate the billing accordingly.",
    category: 'billing',
  },
  {
    id: '6',
    question: 'How do I reset my password?',
    answer:
      'To reset your password: 1) Go to the login page, 2) Click "Forgot password?", 3) Enter your email address, 4) Check your email for reset instructions, 5) Follow the link to create a new password.',
    category: 'account',
  },
  {
    id: '7',
    question: 'How do I track my travel budget?',
    answer:
      'Budget tracking is easy: 1) Set your total trip budget when creating a trip, 2) Add estimated costs for activities, meals, and transportation, 3) Track actual expenses as you plan, 4) Get alerts when approaching budget limits, 5) View spending breakdown by category.',
    category: 'trip-planning',
  },
  {
    id: '8',
    question: 'How does group trip planning work?',
    answer:
      'Group trips allow multiple people to collaborate: 1) Create a trip and mark it as "Group Trip", 2) Invite members via email, 3) Use voting features for decisions, 4) Share budgets and expenses, 5) Chat and coordinate through the platform.',
    category: 'getting-started',
  },
];

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch =
      searchQuery === '' ||
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of TripRadar.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FiSearch className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {helpCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`text-left p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${
                selectedCategory === category.id ? 'ring-2 ring-primary-500 border-primary-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{category.articles} articles</div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{category.description}</p>

              <div className="flex items-center mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium">
                <span>Browse articles</span>
                <FiChevronRight className="h-4 w-4 ml-1" />
              </div>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory
                ? `${helpCategories.find(c => c.id === selectedCategory)?.title} FAQs`
                : 'Frequently Asked Questions'}
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
                <FiSearch className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or browse our help categories above.
                </p>
              </div>
            ) : (
              filteredFAQs.map(faq => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
                    <FiChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 pt-4 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Still need help?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors inline-flex items-center space-x-2">
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
