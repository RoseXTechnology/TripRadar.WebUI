import React, { useState } from 'react';
import { FaDollarSign, FaPlus, FaSave, FaTimes } from 'react-icons/fa';

interface BudgetCategory {
  id: string;
  name: string;
  allocated: string | number;
  color: string;
  spent?: number;
}

interface BudgetData {
  total: string | number;
  currency: string;
  categories: BudgetCategory[];
}

// Backend-provided budget categories
const BUDGET_CATEGORIES = [
  { id: 'flights', name: 'Flights', color: 'bg-blue-500' },
  { id: 'hotels', name: 'Hotels', color: 'bg-green-500' },
  { id: 'food', name: 'Food & Dining', color: 'bg-orange-500' },
  { id: 'activities', name: 'Activities', color: 'bg-purple-500' },
  { id: 'transport', name: 'Transportation', color: 'bg-indigo-500' },
  { id: 'shopping', name: 'Shopping', color: 'bg-pink-500' },
  { id: 'miscellaneous', name: 'Miscellaneous', color: 'bg-gray-500' },
];

interface BudgetFormProps {
  onClose: () => void;
  onSave: (budgetData: BudgetData) => void;
  initialData?: Partial<BudgetData>;
  isEditing?: boolean;
}

export default function BudgetForm({ onClose, onSave, initialData, isEditing = false }: BudgetFormProps) {
  const [formData, setFormData] = useState({
    total: initialData?.total || '',
    currency: initialData?.currency || 'USD',
    categories: initialData?.categories || [
      { id: 'flights', name: 'Flights', allocated: '', color: 'bg-blue-500' },
      { id: 'hotels', name: 'Hotels', allocated: '', color: 'bg-green-500' },
      {
        id: 'food',
        name: 'Food & Dining',
        allocated: '',
        color: 'bg-orange-500',
      },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (index: number, field: string, value: string) => {
    const updatedCategories = [...formData.categories];
    updatedCategories[index] = { ...updatedCategories[index], [field]: value };
    setFormData(prev => ({ ...prev, categories: updatedCategories }));

    // Clear error
    const errorKey = `category-${index}-${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addCategory = () => {
    // Find a category that's not already in the list
    const usedCategoryIds = formData.categories.map(cat => cat.id);
    const availableCategory = BUDGET_CATEGORIES.find(cat => !usedCategoryIds.includes(cat.id));

    if (availableCategory) {
      setFormData(prev => ({
        ...prev,
        categories: [
          ...prev.categories,
          {
            id: availableCategory.id,
            name: availableCategory.name,
            allocated: '',
            color: availableCategory.color,
          },
        ],
      }));
    }
  };

  const removeCategory = (index: number) => {
    const updatedCategories = [...formData.categories];
    updatedCategories.splice(index, 1);
    setFormData(prev => ({ ...prev, categories: updatedCategories }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.total) {
      newErrors.total = 'Total budget is required';
    } else if (isNaN(Number(formData.total)) || Number(formData.total) <= 0) {
      newErrors.total = 'Total budget must be a positive number';
    }

    formData.categories.forEach((category, index) => {
      if (!category.allocated) {
        newErrors[`category-${index}-allocated`] = 'Amount is required';
      } else if (isNaN(Number(category.allocated)) || Number(category.allocated) < 0) {
        newErrors[`category-${index}-allocated`] = 'Amount must be a positive number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Convert string values to numbers
    const processedData = {
      ...formData,
      total: Number(formData.total),
      categories: formData.categories.map(cat => ({
        ...cat,
        allocated: Number(cat.allocated),
        spent: initialData?.categories?.find((c: BudgetCategory) => c.id === cat.id)?.spent || 0,
      })),
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSave(processedData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Budget' : 'Create Budget'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Total Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Budget</label>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleInputChange}
                placeholder="Enter total budget"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.total ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
            </div>
            {errors.total && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.total}</p>}
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="CAD">CAD ($)</option>
              <option value="AUD">AUD ($)</option>
            </select>
          </div>

          {/* Budget Categories */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Budget Categories</label>
              <button
                type="button"
                onClick={addCategory}
                disabled={formData.categories.length >= BUDGET_CATEGORIES.length}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlus className="h-4 w-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.categories.map((category, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${category.color} flex-shrink-0`}></div>

                  <select
                    value={category.id}
                    onChange={e => {
                      const selectedCategory = BUDGET_CATEGORIES.find(cat => cat.id === e.target.value);
                      if (selectedCategory) {
                        handleCategoryChange(index, 'id', selectedCategory.id);
                        handleCategoryChange(index, 'name', selectedCategory.name);
                        handleCategoryChange(index, 'color', selectedCategory.color);
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {BUDGET_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <div className="relative w-32">
                    <FaDollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={category.allocated}
                      onChange={e => handleCategoryChange(index, 'allocated', e.target.value)}
                      placeholder="Amount"
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors[`category-${index}-allocated`]
                          ? 'border-red-300 dark:border-red-700'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                  </div>

                  {formData.categories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCategory(index)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="h-4 w-4" />
                  <span>{isEditing ? 'Update Budget' : 'Create Budget'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
