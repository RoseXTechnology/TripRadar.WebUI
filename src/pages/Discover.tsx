import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Camera,
  Compass,
  Mountain,
  Building,
  TreePine,
  Waves,
  Plus,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const destinations = [
  {
    id: 1,
    name: 'Kyoto, Japan',
    image: 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.9,
    reviews: 2847,
    type: 'Cultural',
    duration: '3-5 days',
    highlights: ['Temples', 'Gardens', 'Traditional Culture'],
    description: 'Immerse yourself in traditional Japanese culture with ancient temples, serene gardens, and timeless traditions.',
    estimatedCost: 1200,
    bestTime: 'Spring/Fall'
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.8,
    reviews: 1923,
    type: 'Coastal',
    duration: '4-6 days',
    highlights: ['Sunsets', 'Architecture', 'Wineries'],
    description: 'Experience breathtaking sunsets, iconic white-washed buildings, and world-class wines on this Greek island paradise.',
    estimatedCost: 1800,
    bestTime: 'Summer'
  },
  {
    id: 3,
    name: 'Swiss Alps',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.9,
    reviews: 3156,
    type: 'Adventure',
    duration: '5-7 days',
    highlights: ['Hiking', 'Skiing', 'Mountain Views'],
    description: 'Adventure awaits in the majestic Swiss Alps with world-class skiing, hiking trails, and stunning mountain vistas.',
    estimatedCost: 2500,
    bestTime: 'Winter/Summer'
  },
  {
    id: 4,
    name: 'Marrakech, Morocco',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.7,
    reviews: 2134,
    type: 'Cultural',
    duration: '3-4 days',
    highlights: ['Markets', 'Architecture', 'Cuisine'],
    description: 'Dive into the vibrant culture of Morocco with bustling souks, stunning architecture, and incredible cuisine.',
    estimatedCost: 900,
    bestTime: 'Spring/Fall'
  },
  {
    id: 5,
    name: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.8,
    reviews: 4521,
    type: 'Tropical',
    duration: '7-10 days',
    highlights: ['Beaches', 'Temples', 'Rice Terraces'],
    description: 'Discover the perfect blend of spiritual culture, stunning landscapes, and tropical paradise in Bali.',
    estimatedCost: 1400,
    bestTime: 'Dry Season'
  },
  {
    id: 6,
    name: 'Iceland Ring Road',
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    rating: 4.9,
    reviews: 1876,
    type: 'Nature',
    duration: '8-12 days',
    highlights: ['Waterfalls', 'Glaciers', 'Northern Lights'],
    description: 'Journey through Iceland\'s dramatic landscapes featuring powerful waterfalls, ancient glaciers, and the magical Northern Lights.',
    estimatedCost: 3200,
    bestTime: 'Summer'
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
  const navigate = useNavigate();

  const filteredDestinations = destinations.filter(destination => {
    const matchesCategory = selectedCategory === 'All' || destination.type === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.highlights.some(highlight => highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleCreateTrip = (destination: any) => {
    if (!requireAuth()) return;
    
    // Navigate to trip planning with pre-populated data
    navigate('/trip-planning', { 
      state: { 
        destination: destination.name,
        estimatedCost: destination.estimatedCost,
        duration: destination.duration,
        highlights: destination.highlights,
        type: destination.type
      }
    });
  };

  const handleAddToTrip = (destination: any) => {
    if (!requireAuth()) return;
    
    // Navigate to trips page with option to add to existing trip
    navigate('/trips', { 
      state: { 
        addDestination: destination
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Amazing Destinations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore handpicked destinations and hidden gems from around the world. 
            Let our curated recommendations inspire your next adventure.
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {categories.map((category) => (
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
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {destination.description}
                </p>
                
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
                  {destination.highlights.map((highlight) => (
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
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Our travel experts can help you discover hidden gems and create custom itineraries 
              tailored to your interests and preferences.
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