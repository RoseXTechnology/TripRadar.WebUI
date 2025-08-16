import { useState } from 'react';
import { BillingToggle, PricingCard, FeatureComparison, TokenUsageSection } from '../components';

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
    color: 'border-gray-200 dark:border-gray-700',
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

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Essential');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no complicated tiers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BillingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map(tier => (
            <PricingCard
              key={tier.name}
              tier={tier}
              isAnnual={isAnnual}
              isSelected={selectedTier === tier.name}
              onSelect={() => setSelectedTier(tier.name)}
            />
          ))}
        </div>

        <FeatureComparison />
        <TokenUsageSection />
      </div>
    </div>
  );
}
