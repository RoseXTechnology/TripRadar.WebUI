import { MessageSquare, Star, Send, CheckCircle, Bug, Lightbulb, Zap, Palette, FileText, Search } from 'lucide-react';
import React, { useState } from 'react';

import { useTheme } from '../context/ThemeContext';

interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'bug' | 'feature' | 'performance' | 'ui' | 'documentation';
  rating: number;
  status: 'pending' | 'reviewed' | 'implemented' | 'rejected';
  submittedAt: string;
  author: string;
}

// Backend-provided feedback categories
const FEEDBACK_CATEGORIES = [
  {
    id: 'general',
    label: 'General',
    icon: MessageSquare,
    color: 'bg-blue-500',
  },
  { id: 'bug', label: 'Bug Report', icon: Bug, color: 'bg-red-500' },
  {
    id: 'feature',
    label: 'Feature Request',
    icon: Lightbulb,
    color: 'bg-green-500',
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: Zap,
    color: 'bg-yellow-500',
  },
  { id: 'ui', label: 'UI/UX', icon: Palette, color: 'bg-purple-500' },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: FileText,
    color: 'bg-indigo-500',
  },
];

const feedbackHistory: FeedbackItem[] = [
  {
    id: '1',
    title: 'Add dark mode to mobile app',
    content: 'Would love to see dark mode support in the mobile application for better nighttime usage.',
    category: 'feature',
    rating: 5,
    status: 'implemented',
    submittedAt: '2024-01-10',
    author: 'You',
  },
  {
    id: '2',
    title: 'Search results loading slowly',
    content: 'Flight search takes too long to load results, especially for international destinations.',
    category: 'performance',
    rating: 3,
    status: 'reviewed',
    submittedAt: '2024-01-08',
    author: 'You',
  },
  {
    id: '3',
    title: 'Improve budget tracking UI',
    content: 'The budget tracking interface could be more intuitive with better visual indicators.',
    category: 'ui',
    rating: 4,
    status: 'pending',
    submittedAt: '2024-01-05',
    author: 'You',
  },
];

export default function Feedback() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general' as const,
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { actualTheme } = useTheme();
  const [formErrors, setFormErrors] = useState({
    title: '',
    content: '',
    category: '',
  });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    let hasErrors = false;
    const errors = {
      title: '',
      content: '',
      category: '',
    };

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
      hasErrors = true;
    }

    if (!formData.content.trim()) {
      errors.content = 'Feedback details are required';
      hasErrors = true;
    }

    if (!formData.category) {
      errors.category = 'Please select a category';
      hasErrors = true;
    }

    setFormErrors(errors);

    if (hasErrors) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        title: '',
        content: '',
        category: 'general',
        rating: 5,
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'implemented':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return FEEDBACK_CATEGORIES.find(cat => cat.id === categoryId) || FEEDBACK_CATEGORIES[0];
  };

  const filteredFeedback = feedbackHistory.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Share Your Feedback</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Help us improve TripRadar by sharing your thoughts, reporting bugs, or suggesting new features.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Submit Feedback</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {FEEDBACK_CATEGORIES.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            category: category.id as any,
                          }));
                          setFormErrors(prev => ({ ...prev, category: '' }));
                        }}
                        className={`flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-all ${
                          formData.category === category.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                          {category.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.category}</p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, title: e.target.value }));
                      setFormErrors(prev => ({ ...prev, title: '' }));
                    }}
                    placeholder="Brief description of your feedback"
                    className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      formErrors.title ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.title}</p>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Details</label>
                  <textarea
                    rows={6}
                    value={formData.content}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        content: e.target.value,
                      }));
                      setFormErrors(prev => ({ ...prev, content: '' }));
                    }}
                    placeholder="Please provide detailed information about your feedback..."
                    className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      formErrors.content ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.content}</p>
                  )}
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Overall Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating }))}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating <= formData.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                      {formData.rating} out of 5 stars
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Submitting...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Feedback Submitted!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Feedback History */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Feedback</h3>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                {['all', 'pending', 'reviewed', 'implemented', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filter === status
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
              {filteredFeedback.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">No feedback found</p>
                </div>
              ) : (
                filteredFeedback.map(item => {
                  const categoryInfo = getCategoryInfo(item.category);

                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow animate-slide-up"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{item.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{item.content}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded ${categoryInfo.color}`}>
                            <categoryInfo.icon className="h-3 w-3 text-white" />
                          </div>
                          <span>{categoryInfo.label}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white text-center animate-slide-up">
          <h3 className="text-2xl font-bold mb-4">Thank You for Your Feedback!</h3>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Your input helps us build a better travel platform. We review all feedback carefully and use it to
            prioritize improvements and new features.
          </p>
        </div>
      </div>
    </div>
  );
}
