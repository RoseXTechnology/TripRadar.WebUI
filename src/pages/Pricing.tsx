import {
  Check,
  X,
  Star,
  Shield,
  Users,
  Bot,
  Globe,
  ArrowRight,
  BarChart,
  DollarSign,
  Calendar,
  MessageSquare,
  Search,
  MapPin,
  Smartphone,
  Lock,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '../context/ThemeContext';

const pricingTiers = [
  {
    name: 'Basic',
    price: { monthly: 0, annual: 0 },
    tokens: '5 tokens',
    description: 'Perfect for trying out TripRadar',
    features: [
      '5 API tokens per month',
      'Basic search functionality',
      'Trip planning tools',
      'Email support',
      'Mobile app access',
      'Basic weather data',
    ],
    limitations: ['No AI chat assistant', 'Limited group features', 'No advanced analytics'],
    cta: 'Get Started',
    popular: false,
    color: 'border-gray-200 dark:border-gray-700',
  },
  {
    name: 'Essential',
    price: { monthly: 10, annual: 8 },
    tokens: '20 tokens/day',
    description: 'Best for regular travelers',
    features: [
      '20 API tokens per day',
      'AI chat assistant (Telegram/WhatsApp)',
      'Advanced search & filtering',
      'Budget tracking & alerts',
      'Group trip planning',
      'Real-time notifications',
      'Priority email support',
      'Weather forecasts & alerts',
    ],
    limitations: [],
    cta: 'Subscribe',
    popular: true,
    color: 'border-primary-500',
  },
  {
    name: 'Advanced',
    price: { monthly: 20, annual: 16 },
    tokens: '50 tokens/day',
    description: 'For power users and travel professionals',
    features: [
      '50 API tokens per day',
      'Full AI assistant capabilities',
      'Advanced analytics & insights',
      'Satisfaction prediction AI',
      'Unlimited group trips',
      'Custom integrations',
      'Phone & chat support',
      'API access',
      'White-label options',
    ],
    limitations: [],
    cta: 'Subscribe',
    popular: false,
    color: 'border-gray-200 dark:border-gray-700',
  },
];

const faqs = [
  {
    question: 'What are API tokens and how do they work?',
    answer:
      "API tokens are used for each search query or AI interaction. One token equals one search request (flights, hotels, weather, etc.) or one AI chat message. Unused tokens don't roll over to the next billing period.",
  },
  {
    question: 'Can I change my plan at any time?',
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly. Downgrades take effect at the next billing cycle.",
  },
  {
    question: 'Is my data safe and private?',
    answer:
      'Absolutely. We never trace your data or use it for AI training. All processing happens locally where possible, and your personal information stays completely private and secure with end-to-end encryption.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with TripRadar, contact our support team for a full refund within 30 days of your purchase.",
  },
  {
    question: 'How does the AI chat assistant work?',
    answer:
      'Our AI assistant integrates with Telegram and WhatsApp, allowing you to manage your trips through simple chat messages. You can check budgets, get weather updates, set reminders, and receive personalized recommendations - all while maintaining complete privacy.',
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { actualTheme } = useTheme();

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
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

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
              Simple, Transparent Pricing
            </h1>
            <p
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              Start free and scale as you grow. No hidden fees, no complicated tiers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1 rounded-xl shadow-sm">
            <div className="flex items-center">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  !isAnnual
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  isAnnual
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 ${tier.color} ${
                tier.popular ? 'ring-2 ring-primary-500 ring-opacity-20' : ''
              } hover:shadow-lg transition-all duration-300 animate-slide-up hover-glow-${actualTheme}`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{tier.description}</p>

                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        ${isAnnual ? tier.price.annual : tier.price.monthly}
                      </span>
                      {tier.price.monthly > 0 && (
                        <span className="text-gray-600 dark:text-gray-400 ml-2">/{isAnnual ? 'month' : 'month'}</span>
                      )}
                    </div>
                    {isAnnual && tier.price.monthly > 0 && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Billed annually (${tier.price.annual * 12}/year)
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2 inline-block">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tier.tokens}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {tier.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-start space-x-3">
                      <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500 dark:text-gray-400">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to={tier.price.monthly > 0 ? '/checkout' : '/signup'}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                    tier.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-16 animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Compare Features</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Basic
                  </th>
                  <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Essential
                  </th>
                  <th className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Advanced
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">API Tokens</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">5/month</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">20/day</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">50/day</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">AI Chat Assistant</td>
                  <td className="py-4 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">Group Trip Planning</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Limited</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Up to 10 people</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">Budget Tracking</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Basic</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced + AI</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">Trip Analytics</td>
                  <td className="py-4 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Basic</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">API Access</td>
                  <td className="py-4 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">Support</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Email</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Priority Email</td>
                  <td className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">Phone & Chat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Choose TripRadar */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-16 animate-slide-up"
          style={{ animationDelay: '0.7s' }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Why Choose TripRadar?</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Bot,
                title: 'AI-Powered Assistant',
                description: 'Chat with our AI via Telegram/WhatsApp for instant trip management',
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'Your data is never traced or used for AI training - complete privacy protection',
              },
              {
                icon: Users,
                title: 'Group Collaboration',
                description: 'Plan trips together with shared budgets, voting, and real-time coordination',
              },
              {
                icon: Globe,
                title: 'Global Coverage',
                description: 'Access travel data for 200+ countries with multi-language support',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="inline-flex p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Token Usage Explanation */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-16 animate-slide-up"
          style={{ animationDelay: '0.9s' }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Understanding Token Usage
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What are tokens?</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tokens are the units of consumption for our API and AI features. Each API call or AI interaction
                consumes a specific number of tokens based on complexity and resource usage.
              </p>

              <div className="space-y-4 mt-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mt-1">
                    <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">Search Operations</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1 token per search query (flights, hotels, activities)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mt-1">
                    <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">AI Interactions</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1-5 tokens per AI message (depending on complexity)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mt-1">
                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">Map & Location Data</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1 token per location lookup or map rendering
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Token Usage Examples</h4>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Basic Plan Example</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">With 5 tokens per month, you could:</p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Perform 5 flight searches</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Or search for 3 flights and 2 hotels</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Or any combination totaling 5 tokens</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Essential Plan Example</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">With 20 tokens per day, you could:</p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Send 10 AI chat messages</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Perform 5 flight searches</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Check weather for 5 locations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/settings/usage"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center space-x-1"
                >
                  <BarChart className="h-4 w-4" />
                  <span>View detailed token usage examples</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 animate-slide-up"
          style={{ animationDelay: '1s' }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h3>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  <div className={`transform transition-transform ${openFaq === index ? 'rotate-45' : ''}`}>
                    <div className="w-4 h-4 relative">
                      <div className="absolute inset-0 w-4 h-0.5 bg-gray-400 dark:bg-gray-500 top-1/2 transform -translate-y-1/2"></div>
                      <div className="absolute inset-0 h-4 w-0.5 bg-gray-400 dark:bg-gray-500 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: '1.1s' }}>
          <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Travel Experience?</h3>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who trust TripRadar for intelligent, collaborative, and privacy-first trip
              planning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <section
        className="py-24 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 animate-slide-up"
        style={{ animationDelay: '1.2s' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Everything You Need for <span className="text-primary-600 dark:text-primary-400">Perfect Trips</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[
              {
                icon: Search,
                title: 'Powerful Search',
                description: 'Find flights, hotels, activities, and more with our comprehensive search engine',
              },
              {
                icon: Bot,
                title: 'AI Travel Assistant',
                description: 'Get personalized recommendations and assistance via Telegram or WhatsApp',
              },
              {
                icon: DollarSign,
                title: 'Budget Management',
                description: 'Track expenses, set budgets, and receive alerts to stay on financial track',
              },
              {
                icon: Users,
                title: 'Group Planning',
                description: 'Collaborate with friends and family on trip planning with voting and shared itineraries',
              },
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description: 'Optimize your itinerary with AI-powered scheduling suggestions',
              },
              {
                icon: MessageSquare,
                title: 'Real-time Notifications',
                description: 'Stay updated with alerts about flight changes, weather, and travel advisories',
              },
              {
                icon: Smartphone,
                title: 'Mobile Access',
                description: 'Access your travel plans anywhere with our responsive mobile-first design',
              },
              {
                icon: MapPin,
                title: 'Location Intelligence',
                description: 'Discover hidden gems and local favorites with our location-based recommendations',
              },
              {
                icon: Lock,
                title: 'Privacy Protection',
                description: 'Your data is never used for AI training and stays completely private',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center animate-slide-up"
                style={{ animationDelay: `${1.3 + index * 0.1}s` }}
              >
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 animate-slide-up" style={{ animationDelay: '1.4s' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Trusted by Travelers <span className="text-primary-600 dark:text-primary-400">Worldwide</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'TripRadar has completely transformed how I plan trips. The AI assistant is like having a personal travel agent in my pocket!',
                author: 'Sarah K.',
                role: 'Digital Nomad',
                image:
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
              },
              {
                quote:
                  "The budget tracking feature alone is worth the subscription. I've saved hundreds on my last trip by staying aware of my spending.",
                author: 'Michael T.',
                role: 'Business Traveler',
                image:
                  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
              },
              {
                quote:
                  "Planning group trips used to be a nightmare. With TripRadar's voting and shared itineraries, it's actually fun now!",
                author: 'Emma L.',
                role: 'Family Traveler',
                image:
                  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all animate-slide-up"
                style={{ animationDelay: `${1.5 + index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white dark:bg-gray-800 animate-slide-up" style={{ animationDelay: '1.6s' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Begin with our free plan and upgrade as your needs grow. No credit card required to get started.
          </p>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-primary-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all inline-flex items-center space-x-2 transform hover:-translate-y-1"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
