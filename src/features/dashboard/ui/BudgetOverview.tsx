import { DollarSign, AlertTriangle } from 'lucide-react';
import { Budget as TripBudget, BudgetCategory } from '../../../entities/budget';

interface BudgetOverviewProps {
  budget: TripBudget;
}

export default function BudgetOverview({ budget }: BudgetOverviewProps) {
  const spentPercentage = (budget.spent / budget.total) * 100;
  const remainingBudget = budget.total - budget.spent;

  const getCategoryPercentage = (category: BudgetCategory) => {
    return category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 dark:text-red-400';
    if (percentage >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trip Budget</h3>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">{budget.currency}</span>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">${budget.total.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Budget</div>
        </div>
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${budget.spent.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Spent</div>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${remainingBudget.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
          <span className={`text-sm font-medium ${getStatusColor(spentPercentage)}`}>
            {spentPercentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(spentPercentage)}`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white">Budget Categories</h4>
        {budget.categories.map(category => {
          const percentage = getCategoryPercentage(category);
          return (
            <div key={category.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${category.spent.toLocaleString()} / ${category.allocated.toLocaleString()}
                  </div>
                  <div className={`text-xs ${getStatusColor(percentage)}`}>{percentage.toFixed(1)}%</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget Alerts */}
      {budget.alerts.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>Budget Alerts</span>
          </h4>
          {budget.alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'critical'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
              }`}
            >
              <div className="flex items-start space-x-2">
                <AlertTriangle
                  className={`h-4 w-4 mt-0.5 ${alert.type === 'critical' ? 'text-red-500' : 'text-yellow-500'}`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Triggered on {new Date(alert.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
