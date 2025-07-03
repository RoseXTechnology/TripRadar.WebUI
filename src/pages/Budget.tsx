import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  PieChart,
  Calendar,
  Target,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import BudgetForm from '../components/Budget/BudgetForm';

// Backend-provided budget categories
const BUDGET_CATEGORIES = [
  { id: 'flights', name: 'Flights', color: 'bg-blue-500' },
  { id: 'hotels', name: 'Hotels', color: 'bg-green-500' },
  { id: 'food', name: 'Food & Dining', color: 'bg-orange-500' },
  { id: 'activities', name: 'Activities', color: 'bg-purple-500' },
  { id: 'transport', name: 'Transportation', color: 'bg-indigo-500' },
  { id: 'shopping', name: 'Shopping', color: 'bg-pink-500' },
  { id: 'miscellaneous', name: 'Miscellaneous', color: 'bg-gray-500' }
];

export default function Budget() {
  const { requireAuth } = useAuth();
  const { currentTrip, setCurrentTrip } = useApp();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showEditBudget, setShowEditBudget] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddExpense = () => {
    if (!requireAuth()) return;
    
    // Handle adding expense logic here
    console.log('Adding expense:', newExpense);
    setNewExpense({
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddExpense(false);
  };

  const handleShowAddExpense = () => {
    if (!requireAuth()) return;
    setShowAddExpense(true);
  };

  const handleSaveBudget = (budgetData: any) => {
    if (currentTrip) {
      const updatedTrip = {
        ...currentTrip,
        budget: {
          ...currentTrip.budget,
          total: budgetData.total,
          currency: budgetData.currency,
          categories: budgetData.categories
        }
      };
      
      setCurrentTrip(updatedTrip);
    }
    
    setShowEditBudget(false);
  };

  if (!currentTrip?.budget) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300 pt-16">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 max-w-md">
          <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">No Budget Set</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Set up a budget for your trip to start tracking expenses.</p>
          <button 
            onClick={() => setShowEditBudget(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <Plus className="h-5 w-5" />
            <span>Create Budget</span>
          </button>
        </div>
      </div>
    );
  }

  const budget = currentTrip.budget;
  const spentPercentage = (budget.spent / budget.total) * 100;
  const remainingBudget = budget.total - budget.spent;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trip Budget</h1>
            <p className="text-gray-600 dark:text-gray-400">{currentTrip.title} - {currentTrip.destination}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => setShowEditBudget(true)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Edit className="h-5 w-5" />
              <span>Adjust Budget</span>
            </button>
            <button
              onClick={handleShowAddExpense}
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Budget</span>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${budget.total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{budget.currency}</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Spent</span>
              <TrendingDown className="h-5 w-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${budget.spent.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{spentPercentage.toFixed(1)}% of budget</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Remaining</span>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${remainingBudget.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{(100 - spentPercentage).toFixed(1)}% remaining</div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Daily Average</span>
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${Math.round(remainingBudget / 7).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Per day remaining</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Budget Categories */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Budget Categories</h3>
              
              <div className="space-y-6">
                {budget.categories.map((category) => {
                  const percentage = category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0;
                  const remaining = category.allocated - category.spent;
                  
                  return (
                    <div key={category.id} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                          <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Allocated</span>
                          <div className="font-semibold text-gray-900 dark:text-white">${category.allocated.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Spent</span>
                          <div className="font-semibold text-red-600 dark:text-red-400">${category.spent.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Remaining</span>
                          <div className={`font-semibold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            ${remaining.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{percentage.toFixed(1)}% used</span>
                          {percentage > 90 && (
                            <span className="text-red-600 dark:text-red-400 font-medium">Over budget!</span>
                          )}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              percentage > 90 ? 'bg-red-500' :
                              percentage > 75 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Expenses */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Expenses</h3>
                <button 
                  onClick={handleShowAddExpense}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Expense</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Sample expenses */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Flight Booking</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Feb 10, 2024</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600 dark:text-red-400">-$800</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Flights</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Hotel Deposit</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Feb 8, 2024</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600 dark:text-red-400">-$400</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Hotels</div>
                  </div>
                </div>
                
                {/* Empty state if no expenses */}
                {budget.spent === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No expenses recorded yet</p>
                    <button 
                      onClick={handleShowAddExpense}
                      className="mt-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                    >
                      Add your first expense
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Budget Alerts & Insights */}
          <div className="space-y-6">
            {/* Budget Alerts */}
            {budget.alerts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Budget Alerts</span>
                </h3>
                
                <div className="space-y-3">
                  {budget.alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'critical' 
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-500' 
                          : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                          alert.type === 'critical' ? 'text-red-500' : 'text-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{alert.message}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Triggered on {new Date(alert.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Budget Insights */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-primary-500" />
                <span>Budget Insights</span>
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-blue-900 dark:text-blue-400">On Track</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    You're spending at a good pace. Keep monitoring your daily expenses.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-900 dark:text-green-400">Savings Opportunity</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Consider local restaurants to save on food expenses.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowEditBudget(true)}
                  className="w-full flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Adjust Budget</span>
                </button>
                
                <button 
                  onClick={() => requireAuth()}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Category</span>
                </button>
                
                <button 
                  onClick={() => requireAuth()}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <PieChart className="h-4 w-4" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Expense</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select category</option>
                    {BUDGET_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="What was this expense for?"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleAddExpense}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Add Expense
                  </button>
                  <button
                    onClick={() => setShowAddExpense(false)}
                    className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Budget Modal */}
        {showEditBudget && (
          <BudgetForm 
            onClose={() => setShowEditBudget(false)}
            onSave={handleSaveBudget}
            initialData={budget}
            isEditing={true}
          />
        )}
      </div>
    </div>
  );
}