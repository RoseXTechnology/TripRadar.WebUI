import { Search, X, ArrowRight, FileText, Book, Code, Users, MapPin, Calendar, Command, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/config/routes';

interface QuickSearchProps {
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'pages' | 'features' | 'help' | 'api';
  icon: React.ComponentType<{ className?: string }>;
}

const searchData: SearchResult[] = [
  // Pages
  {
    id: '1',
    title: 'Dashboard',
    description: 'View your trips and travel overview',
    url: '/dashboard',
    category: 'pages',
    icon: MapPin,
  },
  {
    id: '2',
    title: 'Search Flights',
    description: 'Find and compare flight prices',
    url: '/search',
    category: 'pages',
    icon: Search,
  },
  {
    id: '3',
    title: 'My Trips',
    description: 'Manage your travel itineraries',
    url: '/trips',
    category: 'pages',
    icon: Calendar,
  },
  {
    id: '4',
    title: 'Budget Tracker',
    description: 'Track your travel expenses',
    url: '/budget',
    category: 'pages',
    icon: MapPin,
  },
  {
    id: '5',
    title: 'Blog',
    description: 'Travel tips and insights',
    url: '/blog',
    category: 'pages',
    icon: FileText,
  },
  {
    id: '6',
    title: 'Help Center',
    description: 'Get help and support',
    url: '/help',
    category: 'pages',
    icon: Book,
  },
  {
    id: '7',
    title: 'Contact Us',
    description: 'Get in touch with our team',
    url: '/contact',
    category: 'pages',
    icon: Users,
  },

  // Features
  {
    id: '8',
    title: 'AI Travel Assistant',
    description: 'Chat with our AI via Telegram/WhatsApp',
    url: '/features#ai-bot',
    category: 'features',
    icon: Users,
  },
  {
    id: '9',
    title: 'Group Trip Planning',
    description: 'Collaborate with friends and family',
    url: '/features#group-trips',
    category: 'features',
    icon: Users,
  },
  {
    id: '10',
    title: 'Budget Management',
    description: 'Track expenses and set budgets',
    url: '/features#budget',
    category: 'features',
    icon: MapPin,
  },

  // Help
  {
    id: '11',
    title: 'Getting Started',
    description: 'Learn how to use TripRadar',
    url: '/help#getting-started',
    category: 'help',
    icon: Book,
  },
  {
    id: '12',
    title: 'AI Bot Setup',
    description: 'How to connect Telegram/WhatsApp',
    url: '/help#ai-bot',
    category: 'help',
    icon: Book,
  },
  {
    id: '13',
    title: 'Billing Guide',
    description: 'Understand pricing and billing',
    url: '/help#billing',
    category: 'help',
    icon: Book,
  },

  // API
  {
    id: '14',
    title: 'Flight Search API',
    description: 'Search flights programmatically',
    url: '/api/flights',
    category: 'api',
    icon: Code,
  },
  {
    id: '15',
    title: 'Hotel Search API',
    description: 'Find accommodations via API',
    url: '/api/hotels',
    category: 'api',
    icon: Code,
  },
  {
    id: '16',
    title: 'Weather API',
    description: 'Get weather data for destinations',
    url: '/api/weather',
    category: 'api',
    icon: Code,
  },
];

export default function QuickSearch({ onClose }: QuickSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches] = useState(['Dashboard', 'Flight Search', 'Budget Tracker']);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        navigate(results[selectedIndex].url);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, onClose, navigate]);
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pages':
        return 'text-blue-600 dark:text-blue-400';
      case 'features':
        return 'text-green-600 dark:text-green-400';
      case 'help':
        return 'text-purple-600 dark:text-purple-400';
      case 'api':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, features, help..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
          />
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border">ESC</kbd>
            <span>to close</span>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            /* Recent Searches */
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent</span>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    onClick={() => setQuery(search)}
                  >
                    {search}
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Command className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Actions</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={ROUTES.DASHBOARD}
                    onClick={onClose}
                    className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Dashboard</span>
                  </Link>
                  <Link
                    to="/search"
                    onClick={onClose}
                    className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Search className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Search</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Search Results */
            <div className="p-2">
              {results.map((result, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <Link
                    key={result.id}
                    to={result.url}
                    onClick={onClose}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <result.icon
                        className={`h-4 w-4 ${
                          isSelected ? 'text-primary-600 dark:text-primary-400' : getCategoryColor(result.category)
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3
                          className={`font-medium truncate ${
                            isSelected ? 'text-primary-900 dark:text-primary-100' : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {result.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full capitalize ${
                            isSelected
                              ? 'bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {result.category}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {result.description}
                      </p>
                    </div>
                    {isSelected && <ArrowRight className="h-4 w-4 text-primary-600 dark:text-primary-400" />}
                  </Link>
                );
              })}
            </div>
          ) : (
            /* No Results */
            <div className="p-8 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try searching for something else</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↑↓</kbd>
                <span>navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↵</kbd>
                <span>select</span>
              </div>
            </div>
            <div className="text-gray-400">Search powered by TripRadar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
