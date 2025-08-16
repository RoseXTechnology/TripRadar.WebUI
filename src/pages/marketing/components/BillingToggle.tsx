interface BillingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
}

export const BillingToggle = ({ isAnnual, onToggle }: BillingToggleProps) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1 rounded-xl shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => onToggle(false)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              !isAnnual
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => onToggle(true)}
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
  );
};
