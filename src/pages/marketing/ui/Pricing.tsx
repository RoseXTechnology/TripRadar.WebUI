import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCreateCheckoutMutation } from 'entities/payment/api';
import { usePricingQuery } from 'entities/pricing';
import type { UserTierType, BillingPeriodType } from 'shared/api';
import { ROUTES } from 'shared/config/routes';

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { data: pricingData, isLoading, error } = usePricingQuery();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const createCheckout = useCreateCheckoutMutation();

  const pricingTiers = useMemo(() => pricingData?.tiers || [], [pricingData]);

  const handleGetStarted = (tierId: string) => {
    // Map tier names to backend enum values
    const tierMap: Record<string, UserTierType> = {
      basic: 'basic',
      essential: 'essential',
      advanced: 'advanced',
    };

    const targetTierType = tierMap[tierId.toLowerCase()];
    const billingPeriodType: BillingPeriodType = isAnnual ? 'yearly' : 'monthly';

    if (targetTierType && targetTierType !== 'basic') {
      createCheckout.mutate({
        targetTierType,
        billingPeriodType,
      });
    }
  };

  // Set middle tier as default when data loads
  useEffect(() => {
    if (pricingTiers.length > 0 && !selectedTier) {
      setSelectedTier(pricingTiers[Math.floor(pricingTiers.length / 2)]?.id);
    }
  }, [pricingTiers, selectedTier]);

  // Calculate average discount for badge
  const averageDiscount =
    pricingTiers.length > 0
      ? Math.round(
          pricingTiers.reduce((acc, tier) => {
            if (tier.price.monthly > 0 && tier.price.annual > 0) {
              return acc + (1 - tier.price.annual / (tier.price.monthly * 12)) * 100;
            }
            return acc;
          }, 0) / pricingTiers.filter(t => t.price.monthly > 0 && t.price.annual > 0).length
        )
      : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <div className="text-content dark:text-content-dark">Loading pricing...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">Failed to load pricing</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 bg-gradient-to-br from-primary-50 via-surface to-secondary-50 dark:from-surface-dark dark:via-surface-accent-dark dark:to-surface-dark">
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
              {isAnnual && averageDiscount > 0 && (
                <span className="absolute left-1/2 translate-x-24 px-2 py-1 bg-primary-50 dark:bg-surface-accent-dark text-primary-600 dark:text-primary-500 text-xs font-medium rounded-full whitespace-nowrap">
                  Save {averageDiscount}%
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
            const isSelected = tier.id === selectedTier;

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col h-full cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-600/20 dark:to-secondary-600/20 border-2 border-primary-500 dark:border-primary-600 shadow-xl scale-105'
                    : 'bg-surface dark:bg-surface-accent-dark border border-outline dark:border-outline-dark shadow-lg'
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-content dark:text-content-dark mb-2">
                    {tier.name}
                  </h3>

                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-bold text-content dark:text-content-dark">${price}</span>
                    {price > 0 && (
                      <span className="text-sm text-content-secondary dark:text-content-secondary-dark">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6 flex-grow">
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {tier.tokensPerMonthLimit?.toLocaleString() || 'Unlimited'}
                    </div>
                    <div className="text-sm text-content-secondary dark:text-content-secondary-dark">
                      tokens per month
                    </div>
                  </div>
                </div>

                {tier.id === 'basic' ? (
                  <Link
                    to={ROUTES.SIGNUP}
                    className="block w-full py-3 px-6 rounded-xl text-center font-medium transition-all duration-200 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark"
                  >
                    {tier.cta}
                  </Link>
                ) : tier.id === 'enterprise' ? (
                  <Link
                    to="/contact"
                    className="block w-full py-3 px-6 rounded-xl text-center font-medium transition-all duration-200 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark"
                  >
                    {tier.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleGetStarted(tier.id)}
                    disabled={createCheckout.isPending}
                    className="w-full py-3 px-6 rounded-xl text-center font-medium transition-all duration-200 bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createCheckout.isPending ? 'Processing...' : tier.cta}
                  </button>
                )}
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
