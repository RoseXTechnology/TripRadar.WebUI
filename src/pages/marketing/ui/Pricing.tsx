import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

const pricingTiers = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for exploring',
    features: ['5 trips per month', 'Basic planning tools', 'Mobile app access', 'Community support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 12, annual: 10 },
    description: 'For serious travelers',
    features: [
      'Unlimited trips',
      'AI travel assistant',
      'Advanced analytics',
      'Priority support',
      'Team collaboration',
      'Custom integrations',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 49, annual: 39 },
    description: 'For organizations',
    features: [
      'Everything in Pro',
      'Advanced security',
      'Custom branding',
      'Dedicated support',
      'API access',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-accent-dark dark:to-surface-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10 dark:from-primary-400/5 dark:to-secondary-400/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-content dark:text-content-dark mb-12 tracking-tight"
              style={{ lineHeight: '1.3' }}
            >
              Choose your plan
            </h1>

            {/* Billing Toggle */}
            <div className="relative flex items-center justify-center gap-3 mb-12">
              <span
                className={`text-sm font-medium ${!isAnnual ? 'text-content dark:text-content-dark' : 'text-content-muted dark:text-content-secondary-dark'}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual
                    ? 'bg-interactive-active dark:bg-interactive-active-dark'
                    : 'bg-interactive dark:bg-interactive-dark'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-surface dark:bg-surface transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${isAnnual ? 'text-content dark:text-content-dark' : 'text-content-muted dark:text-content-secondary-dark'}`}
              >
                Annual
              </span>

              {/* Save badge positioned absolutely */}
              {isAnnual && (
                <span className="absolute left-1/2 translate-x-24 px-2 py-1 bg-primary-50 dark:bg-surface-accent-dark text-primary-600 dark:text-primary-500 text-xs font-medium rounded-full whitespace-nowrap">
                  Save 20%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {pricingTiers.map(tier => {
            const price = isAnnual ? tier.price.annual : tier.price.monthly;
            const isPopular = tier.popular;

            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-105 flex flex-col h-full ${
                  isPopular
                    ? 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-600/20 dark:to-secondary-600/20 border-2 border-primary-500 dark:border-primary-600 shadow-xl'
                    : 'bg-surface dark:bg-surface-accent-dark border border-outline dark:border-outline-dark shadow-lg hover:shadow-xl'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-content dark:text-content-dark mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm sm:text-base text-content-secondary dark:text-content-secondary-dark mb-4">
                    {tier.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-bold text-content dark:text-content-dark">${price}</span>
                    {price > 0 && (
                      <span className="text-sm text-content-secondary dark:text-content-secondary-dark">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-500 flex-shrink-0 mt-1" />
                      <span className="text-sm text-content dark:text-content-dark">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={tier.name === 'Enterprise' ? '/contact' : ROUTES.SIGNUP}
                  className={`block w-full py-3 px-6 rounded-xl text-center font-medium transition-all duration-200 ${
                    isPopular
                      ? 'bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark shadow-lg hover:shadow-xl'
                      : 'bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-content dark:text-content-dark mb-3">Questions?</h2>
          <p className="text-content-secondary dark:text-content-secondary-dark mb-6">
            We're here to help. Contact our team for any questions about pricing or features.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-50 dark:bg-surface-accent-dark text-content dark:text-content-dark rounded-xl hover:bg-secondary-50 dark:hover:bg-outline-dark transition-colors text-sm font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};
