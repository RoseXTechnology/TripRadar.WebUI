import { useState, useEffect } from 'react';
import {
  Star,
  Clock,
  Camera,
  Compass,
  Mountain,
  Building,
  TreePine,
  Waves,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Heart,
  Utensils,
  Armchair as Wheelchair,
  Bus,
  Globe,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from 'app/providers/AppContext';
import { useAuth } from 'app/providers/AuthContext';

const destinations = [
  {
    id: 1,
    name: 'Kyoto, Japan',
    image:
      'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.9,
    reviews: 2847,
    type: 'Cultural',
    duration: '3-5 days',
    highlights: ['Temples', 'Gardens', 'Traditional Culture'],
    description:
      'Immerse yourself in traditional Japanese culture with ancient temples, serene gardens, and timeless traditions.',
    estimatedCost: 1200,
    bestTime: 'Spring/Fall',
    tags: {
      dietary: ['vegetarian', 'vegan'],
      accommodation: ['hotel', 'hostel', 'airbnb'],
      transport: ['public-transport', 'walking'],
      tripType: ['cultural', 'relaxation'],
      accessibility: ['wheelchair'],
      languages: ['japanese', 'english'],
      activities: ['day'],
    },
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    image:
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.8,
    reviews: 1923,
    type: 'Coastal',
    duration: '4-6 days',
    highlights: ['Sunsets', 'Architecture', 'Wineries'],
    description:
      'Experience breathtaking sunsets, iconic white-washed buildings, and world-class wines on this Greek island paradise.',
    estimatedCost: 1800,
    bestTime: 'Summer',
    tags: {
      dietary: ['mediterranean'],
      accommodation: ['hotel', 'airbnb', 'resort'],
      transport: ['rental-car', 'taxi'],
      tripType: ['relaxation', 'luxury'],
      accessibility: [],
      languages: ['greek', 'english'],
      activities: ['day', 'night'],
    },
  },
  {
    id: 3,
    name: 'Swiss Alps',
    image:
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.9,
    reviews: 3156,
    type: 'Adventure',
    duration: '5-7 days',
    highlights: ['Hiking', 'Skiing', 'Mountain Views'],
    description:
      'Adventure awaits in the majestic Swiss Alps with world-class skiing, hiking trails, and stunning mountain vistas.',
    estimatedCost: 2500,
    bestTime: 'Winter/Summer',
    tags: {
      dietary: ['dairy-free', 'gluten-free'],
      accommodation: ['hotel', 'resort', 'camping'],
      transport: ['public-transport', 'rental-car'],
      tripType: ['adventure', 'luxury'],
      accessibility: ['limited-mobility'],
      languages: ['german', 'french', 'italian', 'english'],
      activities: ['day', 'outdoor'],
    },
  },
  {
    id: 4,
    name: 'Marrakech, Morocco',
    image:
      'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.7,
    reviews: 2134,
    type: 'Cultural',
    duration: '3-4 days',
    highlights: ['Markets', 'Architecture', 'Cuisine'],
    description:
      'Dive into the vibrant culture of Morocco with bustling souks, stunning architecture, and incredible cuisine.',
    estimatedCost: 900,
    bestTime: 'Spring/Fall',
    tags: {
      dietary: ['halal'],
      accommodation: ['hotel', 'riad'],
      transport: ['taxi', 'walking'],
      tripType: ['cultural', 'budget'],
      accessibility: [],
      languages: ['arabic', 'french'],
      activities: ['day', 'night'],
    },
  },
  {
    id: 5,
    name: 'Bali, Indonesia',
    image:
      'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.8,
    reviews: 4521,
    type: 'Tropical',
    duration: '7-10 days',
    highlights: ['Beaches', 'Temples', 'Rice Terraces'],
    description: 'Discover the perfect blend of spiritual culture, stunning landscapes, and tropical paradise in Bali.',
    estimatedCost: 1400,
    bestTime: 'Dry Season',
    tags: {
      dietary: ['vegetarian', 'vegan'],
      accommodation: ['hotel', 'resort', 'airbnb'],
      transport: ['rental-car', 'taxi'],
      tripType: ['relaxation', 'adventure', 'cultural'],
      accessibility: [],
      languages: ['indonesian', 'english'],
      activities: ['day', 'outdoor', 'water'],
    },
  },
  {
    id: 6,
    name: 'Iceland Ring Road',
    image:
      'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.9,
    reviews: 1876,
    type: 'Nature',
    duration: '8-12 days',
    highlights: ['Waterfalls', 'Glaciers', 'Northern Lights'],
    description:
      "Journey through Iceland's dramatic landscapes featuring powerful waterfalls, ancient glaciers, and the magical Northern Lights.",
    estimatedCost: 3200,
    bestTime: 'Summer',
    tags: {
      dietary: ['gluten-free', 'dairy-free'],
      accommodation: ['hotel', 'camping', 'airbnb'],
      transport: ['rental-car'],
      tripType: ['adventure', 'nature'],
      accessibility: [],
      languages: ['icelandic', 'english'],
      activities: ['day', 'outdoor'],
    },
  },
];

const categories = [
  { name: 'All', icon: Compass, active: true },
  { name: 'Cultural', icon: Building, active: false },
  { name: 'Adventure', icon: Mountain, active: false },
  { name: 'Nature', icon: TreePine, active: false },
  { name: 'Coastal', icon: Waves, active: false },
];

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { requireAuth } = useAuth();
  const { user } = useApp();
  const navigate = useNavigate();
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  // Apply user preferences to filter destinations
  useEffect(() => {
    if (user?.preferences) {
      // Convert user preferences to filter format
      const userFilters: Record<string, string[]> = {};

      if (user.preferences.dietary) userFilters.dietary = user.preferences.dietary;
      if (user.preferences.accommodationType) userFilters.accommodation = user.preferences.accommodationType;
      if (user.preferences.transport) userFilters.transport = user.preferences.transport;
      if (user.preferences.tripType) userFilters.tripType = [user.preferences.travelStyle];
      if (user.preferences.accessibility) userFilters.accessibility = user.preferences.accessibility;
      if (user.preferences.languages) userFilters.languages = user.preferences.languages;
      if (user.preferences.activities) userFilters.activities = user.preferences.activities;

      setActiveFilters(userFilters);
    }
  }, [user]);

  // Filter destinations based on category, search query, and user preferences
  useEffect(() => {
    let filtered = destinations;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(destination => destination.type === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        destination =>
          destination.name.toLowerCase().includes(query) ||
          destination.description.toLowerCase().includes(query) ||
          destination.highlights.some(highlight => highlight.toLowerCase().includes(query))
      );
    }

    // Filter by user preferences if any are active
    if (Object.keys(activeFilters).length > 0) {
      filtered = filtered.filter(destination => {
        // For each preference category
        return Object.entries(activeFilters).every(([category, selectedOptions]) => {
          // Skip if no options selected for this category
          if (!selectedOptions || selectedOptions.length === 0) return true;

          // Skip if destination doesn't have tags for this category
          if (!destination.tags[category as keyof typeof destination.tags]) return true;

          // Check if any of the destination's tags for this category match the selected options
          return selectedOptions.some(option =>
            destination.tags[category as keyof typeof destination.tags].includes(option)
          );
        });
      });
    }

    setFilteredDestinations(filtered);
  }, [selectedCategory, searchQuery, activeFilters]);

  const handleCreateTrip = (destination: (typeof destinations)[0]) => {
    if (!requireAuth()) return;

    // Navigate to trip planning with pre-populated data
    navigate('/trip-planning', {
      state: {
        destination: destination.name,
        estimatedCost: destination.estimatedCost,
        duration: destination.duration,
        highlights: destination.highlights,
        type: destination.type,
      },
    });
  };

  const handleAddToTrip = (destination: (typeof destinations)[0]) => {
    if (!requireAuth()) return;

    // Navigate to trips page with option to add to existing trip
    navigate('/trips', {
      state: {
        addDestination: destination,
      },
    });
  };

  const toggleFilter = (category: string, option: string) => {
    setActiveFilters(prev => {
      const current = [...(prev[category] || [])];

      if (current.includes(option)) {
        // Remove the option if already selected
        return {
          ...prev,
          [category]: current.filter(item => item !== option),
        };
      } else {
        // Add the option if not already selected
        return {
          ...prev,
          [category]: [...current, option],
        };
      }
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  // Preference categories for filtering
  const filterCategories = [
    {
      id: 'dietary',
      name: 'Dietary',
      icon: Utensils,
      options: [
        { id: 'vegetarian', label: 'Vegetarian' },
        { id: 'vegan', label: 'Vegan' },
        { id: 'halal', label: 'Halal' },
        { id: 'kosher', label: 'Kosher' },
        { id: 'gluten-free', label: 'Gluten Free' },
        { id: 'dairy-free', label: 'Dairy Free' },
      ],
    },
    {
      id: 'accommodation',
      name: 'Accommodation',
      icon: Building,
      options: [
        { id: 'hotel', label: 'Hotels' },
        { id: 'hostel', label: 'Hostels' },
        { id: 'airbnb', label: 'Airbnb' },
        { id: 'resort', label: 'Resorts' },
        { id: 'camping', label: 'Camping' },
      ],
    },
    {
      id: 'transport',
      name: 'Transportation',
      icon: Bus,
      options: [
        { id: 'public-transport', label: 'Public Transport' },
        { id: 'rental-car', label: 'Rental Car' },
        { id: 'taxi', label: 'Taxi/Rideshare' },
        { id: 'walking', label: 'Walking' },
        { id: 'cycling', label: 'Cycling' },
      ],
    },
    {
      id: 'tripType',
      name: 'Trip Type',
      icon: Globe,
      options: [
        { id: 'adventure', label: 'Adventure' },
        { id: 'relaxation', label: 'Relaxation' },
        { id: 'cultural', label: 'Cultural' },
        { id: 'budget', label: 'Budget' },
        { id: 'luxury', label: 'Luxury' },
      ],
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      icon: Wheelchair,
      options: [
        { id: 'wheelchair', label: 'Wheelchair Access' },
        { id: 'limited-mobility', label: 'Limited Mobility' },
        { id: 'kid-friendly', label: 'Kid Friendly' },
        { id: 'pet-friendly', label: 'Pet Friendly' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Amazing Destinations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore handpicked destinations and hidden gems from around the world. Let our curated recommendations
            inspire your next adventure.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations, activities, or experiences..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {Object.values(activeFilters).flat().length > 0 && (
                <span className="bg-primary-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {Object.values(activeFilters).flat().length}
                </span>
              )}
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {filterCategories.map(category => (
                  <div key={category.id}>
                    <div className="flex items-center space-x-2 mb-3">
                      <category.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.options.map(option => {
                        const isActive = activeFilters[category.id]?.includes(option.id);

                        return (
                          <button
                            key={option.id}
                            onClick={() => toggleFilter(category.id, option.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-2 border-primary-500'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* User Preferences Notice */}
              {user?.preferences && Object.keys(activeFilters).length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <span className="font-medium">Personalized Results:</span> Showing destinations that match your
                        preferences.
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        You can adjust your preferences in Settings or modify the filters above.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {destination.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${destination.estimatedCost}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold group-hover:text-primary-200 transition-colors">
                    {destination.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-sm">{destination.rating}</span>
                    </div>
                    <span className="text-sm opacity-75">({destination.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{destination.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Camera className="h-4 w-4" />
                    <span>{destination.bestTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.highlights.map(highlight => (
                    <span
                      key={highlight}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleCreateTrip(destination)}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Trip</span>
                  </button>
                  <button
                    onClick={() => handleAddToTrip(destination)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Add to Trip</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <Compass className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No destinations found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or category filters.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Our travel experts can help you discover hidden gems and create custom itineraries tailored to your
              interests and preferences.
            </p>
            <button
              onClick={() => requireAuth()}
              className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Get Personalized Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
