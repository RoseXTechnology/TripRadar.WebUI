import { FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

interface PricingTier {
  name: string;
  price: { monthly: number; annual: number };
  tokens: string;
  description: string;
  features: string[];
  limitations: string[];
  cta: string;
  popular: boolean;
  color: string;
}

interface PricingCardProps {
  tier: PricingTier;
  isAnnual: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export const PricingCard = ({ tier, isAnnual, isSelected, onSelect }: PricingCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 cursor-pointer hover:shadow-lg transition-all duration-300 ${
        isSelected ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-20' : tier.color
      }`}
    >
      <div className="p-8 h-full flex flex-col">
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
        <div className="space-y-4 mb-8 flex-grow">
          {tier.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <FaCheck className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
          {tier.limitations.map((limitation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <FaTimes className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400">{limitation}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <Link
            to={tier.price.monthly > 0 ? ROUTES.CHECKOUT : ROUTES.SIGNUP}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
              isSelected
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
            }`}
          >
            <span>{tier.cta}</span>
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
