import {
  BarChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Zap,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  Search,
  Bot,
  MapPin,
  DollarSign,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

// Define token usage data types
interface TokenUsage {
  date: string;
  tokens: number;
  operation: string;
  category: string;
}

interface DailyUsage {
  date: string;
  tokens: number;
}

export default function TokenUsage() {
  const { actualTheme } = useTheme();
  const { user } = useApp();
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly'>('daily');
  const [sortField, setSortField] = useState<'date' | 'tokens' | 'operation'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mock data for token usage
  const [tokenUsageData, setTokenUsageData] = useState<TokenUsage[]>([
    {
      date: '2025-02-15',
      tokens: 1250,
      operation: 'Flight Search',
      category: 'search',
    },
    {
      date: '2025-02-15',
      tokens: 850,
      operation: 'AI Trip Planning',
      category: 'ai',
    },
    {
      date: '2025-02-14',
      tokens: 620,
      operation: 'Hotel Search',
      category: 'search',
    },
    {
      date: '2025-02-14',
      tokens: 430,
      operation: 'Weather API',
      category: 'api',
    },
    {
      date: '2025-02-13',
      tokens: 1100,
      operation: 'AI Chat Assistant',
      category: 'ai',
    },
    {
      date: '2025-02-13',
      tokens: 780,
      operation: 'Currency Conversion',
      category: 'api',
    },
    {
      date: '2025-02-12',
      tokens: 950,
      operation: 'Flight Search',
      category: 'search',
    },
    {
      date: '2025-02-12',
      tokens: 520,
      operation: 'Local Recommendations',
      category: 'ai',
    },
    {
      date: '2025-02-11',
      tokens: 1300,
      operation: 'AI Chat Assistant',
      category: 'ai',
    },
    {
      date: '2025-02-11',
      tokens: 480,
      operation: 'Event Search',
      category: 'search',
    },
    {
      date: '2025-02-10',
      tokens: 720,
      operation: 'Budget Analysis',
      category: 'ai',
    },
    {
      date: '2025-02-10',
      tokens: 630,
      operation: 'Map Rendering',
      category: 'api',
    },
    {
      date: '2025-02-09',
      tokens: 890,
      operation: 'Flight Search',
      category: 'search',
    },
    {
      date: '2025-02-09',
      tokens: 760,
      operation: 'AI Trip Planning',
      category: 'ai',
    },
  ]);

  // Monthly data (aggregated)
  const [monthlyData, setMonthlyData] = useState<DailyUsage[]>([
    { date: '2025-02', tokens: 12280 },
    { date: '2025-01', tokens: 10450 },
    { date: '2024-12', tokens: 8920 },
    { date: '2024-11', tokens: 7650 },
    { date: '2024-10', tokens: 9340 },
    { date: '2024-09', tokens: 6780 },
  ]);

  // Token limits based on subscription
  const tokenLimits = {
    free: 5000,
    premium: 50000,
    enterprise: 500000,
  };

  // Get current token limit based on user subscription
  const currentLimit = tokenLimits[user?.subscription as keyof typeof tokenLimits] || tokenLimits.free;

  // Calculate total tokens used in current period
  const totalTokensUsed =
    timeframe === 'daily' ? tokenUsageData.reduce((sum, item) => sum + item.tokens, 0) : monthlyData[0]?.tokens || 0;

  // Calculate percentage of limit used
  const percentageUsed = Math.min(Math.round((totalTokensUsed / currentLimit) * 100), 100);

  // Determine if user is close to limit
  const isNearLimit = percentageUsed >= 90;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Function to refresh data
  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  // Function to download CSV
  const downloadCSV = () => {
    const data = timeframe === 'daily' ? tokenUsageData : monthlyData;

    // Create CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Add headers
    if (timeframe === 'daily') {
      csvContent += 'Date,Tokens,Operation,Category\n';
      // Add rows
      data.forEach((item: any) => {
        csvContent += `${item.date},${item.tokens},${item.operation},${item.category}\n`;
      });
    } else {
      csvContent += 'Month,Tokens\n';
      // Add rows
      data.forEach((item: any) => {
        csvContent += `${item.date},${item.tokens}\n`;
      });
    }

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `token_usage_${timeframe}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  // Function to handle sorting
  const handleSort = (field: 'date' | 'tokens' | 'operation') => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Sort and filter data
  const sortedData = [...tokenUsageData]
    .filter(item => {
      if (!searchQuery) return true;
      return (
        item.operation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortField === 'tokens') {
        return sortDirection === 'asc' ? a.tokens - b.tokens : b.tokens - a.tokens;
      } else {
        return sortDirection === 'asc'
          ? a.operation.localeCompare(b.operation)
          : b.operation.localeCompare(a.operation);
      }
    });

  // Get operation icon
  const getOperationIcon = (operation: string) => {
    if (operation.toLowerCase().includes('search')) return <Search className="h-4 w-4" />;
    if (operation.toLowerCase().includes('ai')) return <Bot className="h-4 w-4" />;
    if (operation.toLowerCase().includes('map')) return <MapPin className="h-4 w-4" />;
    if (operation.toLowerCase().includes('budget')) return <DollarSign className="h-4 w-4" />;
    return <Zap className="h-4 w-4" />;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (timeframe === 'monthly') {
      const [year, month] = dateString.split('-');
      return `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' })} ${year}`;
    } else {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Token Usage</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor your API token consumption and usage patterns</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={downloadCSV}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Download CSV"
            >
              <Download className="h-5 w-5" />
            </button>

            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
              </button>

              {showTooltip && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 z-10 animate-fade-in">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">About Tokens</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Tokens are consumed when you use API features like search, AI assistance, and data processing.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your current plan allows {currentLimit.toLocaleString()} tokens per month.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Usage Progress */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Usage This {timeframe === 'daily' ? 'Week' : 'Month'}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setTimeframe('daily')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      timeframe === 'daily'
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setTimeframe('monthly')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      timeframe === 'monthly'
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {totalTokensUsed.toLocaleString()}
                    </span>{' '}
                    of {currentLimit.toLocaleString()} tokens
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      percentageUsed >= 90
                        ? 'text-red-600 dark:text-red-400'
                        : percentageUsed >= 75
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-green-600 dark:text-green-400'
                    }`}
                  >
                    {percentageUsed}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      percentageUsed >= 90 ? 'bg-red-600' : percentageUsed >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${percentageUsed}%` }}
                  ></div>
                </div>
              </div>

              {isNearLimit && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">
                      You're approaching your token limit
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                      Consider upgrading your plan to avoid service interruptions.
                    </p>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center space-x-1 text-xs font-medium text-red-800 dark:text-red-300 mt-2 hover:text-red-900 dark:hover:text-red-200"
                    >
                      <span>View Plans</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Usage Stats */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Breakdown</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Search className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tokenUsageData
                      .filter(item => item.category === 'search')
                      .reduce((sum, item) => sum + item.tokens, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">tokens used</div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tokenUsageData
                      .filter(item => item.category === 'ai')
                      .reduce((sum, item) => sum + item.tokens, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">tokens used</div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Zap className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">API</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tokenUsageData
                      .filter(item => item.category === 'api')
                      .reduce((sum, item) => sum + item.tokens, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">tokens used</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Chart */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm mb-8 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Usage Over Time</span>
            </h3>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Calendar className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 relative">
            {/* This would be replaced with an actual chart component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <BarChart className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {timeframe === 'daily' ? 'Daily' : 'Monthly'} usage chart would be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage History */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Usage History</span>
            </h3>

            <div className="w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search operations..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {timeframe === 'daily' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        {sortField === 'date' &&
                          (sortDirection === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('operation')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Operation</span>
                        {sortField === 'operation' &&
                          (sortDirection === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('tokens')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Tokens</span>
                        {sortField === 'tokens' &&
                          (sortDirection === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`p-1 rounded-full ${
                              item.category === 'search'
                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                : item.category === 'ai'
                                  ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                                  : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                            }`}
                          >
                            {getOperationIcon(item.operation)}
                          </div>
                          <span className="text-sm text-gray-900 dark:text-white">{item.operation}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {item.tokens.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.category === 'search'
                              ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                              : item.category === 'ai'
                                ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'
                                : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                          }`}
                        >
                          {item.category.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {sortedData.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No matching records found</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Month
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Tokens
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      % of Limit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {monthlyData.map((item, index) => {
                    const monthPercentage = Math.round((item.tokens / currentLimit) * 100);

                    return (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatDate(item.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {item.tokens.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${
                                  monthPercentage >= 90
                                    ? 'bg-red-600'
                                    : monthPercentage >= 75
                                      ? 'bg-yellow-500'
                                      : 'bg-green-500'
                                }`}
                                style={{
                                  width: `${Math.min(monthPercentage, 100)}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{monthPercentage}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">Showing {sortedData.length} records</div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ChevronDown className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">Page 1 of 1</span>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade CTA (only show if not on enterprise plan) */}
        {user?.subscription !== 'enterprise' && (
          <div
            className="mt-8 bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white text-center animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <h3 className="text-2xl font-bold mb-4">Need More Tokens?</h3>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Upgrade your plan to get more tokens and unlock additional features.
            </p>
            <Link
              to="/pricing"
              className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center space-x-2"
            >
              <span>View Pricing Plans</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
