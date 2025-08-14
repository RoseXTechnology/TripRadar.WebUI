import React, { useState, useEffect } from 'react';
import {
  Search as SearchIcon,
  MapPin,
  Calendar,
  Users,
  Plane,
  Building,
  Ticket,
  Map,
  CloudSun,
  Zap,
  Banknote,
  PartyPopper,
  Star,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from 'app/providers/ThemeContext';

const searchCategories = [
  { id: 'flights', name: 'Flights', icon: Plane, color: 'bg-blue-500' },
  { id: 'hotels', name: 'Hotels', icon: Building, color: 'bg-green-500' },
  { id: 'events', name: 'Events', icon: Ticket, color: 'bg-purple-500' },
  { id: 'places', name: 'Places', icon: Map, color: 'bg-orange-500' },
  { id: 'weather', name: 'Weather', icon: CloudSun, color: 'bg-yellow-500' },
  { id: 'charging', name: 'EV Charging', icon: Zap, color: 'bg-red-500' },
  { id: 'currency', name: 'Currency', icon: Banknote, color: 'bg-indigo-500' },
  { id: 'holidays', name: 'Holidays', icon: PartyPopper, color: 'bg-pink-500' },
];

// Mock flight search results
const mockFlights = [
  {
    id: 'FL1',
    airline: 'Emirates',
    logo: 'https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '08:30',
      date: '2025-03-15',
    },
    arrival: {
      airport: 'DXB',
      city: 'Dubai',
      time: '05:45',
      date: '2025-03-16',
    },
    duration: '12h 15m',
    stops: 0,
    price: 899,
    currency: 'USD',
    bookingUrl: 'https://www.emirates.com',
  },
  {
    id: 'FL2',
    airline: 'Singapore Airlines',
    logo: 'https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '10:15',
      date: '2025-03-15',
    },
    arrival: {
      airport: 'DXB',
      city: 'Dubai',
      time: '08:30',
      date: '2025-03-16',
    },
    duration: '13h 15m',
    stops: 1,
    stopAirports: ['LHR'],
    price: 845,
    currency: 'USD',
    bookingUrl: 'https://www.singaporeair.com',
  },
  {
    id: 'FL3',
    airline: 'Qatar Airways',
    logo: 'https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '21:45',
      date: '2025-03-15',
    },
    arrival: {
      airport: 'DXB',
      city: 'Dubai',
      time: '19:20',
      date: '2025-03-16',
    },
    duration: '14h 35m',
    stops: 1,
    stopAirports: ['DOH'],
    price: 925,
    currency: 'USD',
    bookingUrl: 'https://www.qatarairways.com',
  },
];

// Mock hotel search results
const mockHotels = [
  {
    id: 'HT1',
    name: 'Grand Plaza Hotel',
    image:
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
    location: 'Downtown Dubai',
    rating: 4.8,
    reviews: 1245,
    price: 299,
    currency: 'USD',
    amenities: ['Pool', 'Spa', 'Gym', 'Free WiFi', 'Restaurant'],
    bookingUrl: 'https://www.booking.com',
  },
  {
    id: 'HT2',
    name: 'Skyline Luxury Suites',
    image:
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
    location: 'Dubai Marina',
    rating: 4.6,
    reviews: 876,
    price: 245,
    currency: 'USD',
    amenities: ['Pool', 'Gym', 'Free WiFi', 'Breakfast', 'Bar'],
    bookingUrl: 'https://www.hotels.com',
  },
  {
    id: 'HT3',
    name: 'Desert Oasis Resort',
    image:
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
    location: 'Palm Jumeirah',
    rating: 4.9,
    reviews: 2103,
    price: 450,
    currency: 'USD',
    amenities: ['Beach Access', 'Pool', 'Spa', 'Gym', 'Multiple Restaurants'],
    bookingUrl: 'https://www.expedia.com',
  },
];

// Mock places search results
const mockPlaces = [
  {
    id: 'PL1',
    name: 'Burj Khalifa',
    image:
      'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
    category: 'Landmark',
    rating: 4.7,
    reviews: 15420,
    description: "World's tallest building with observation decks offering panoramic views of the city.",
    location: 'Downtown Dubai',
    websiteUrl: 'https://www.burjkhalifa.ae',
  },
  {
    id: 'PL2',
    name: 'Dubai Mall',
    image:
      'https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
    category: 'Shopping',
    rating: 4.8,
    reviews: 12350,
    description: "One of the world's largest shopping malls featuring retail, entertainment, and dining options.",
    location: 'Downtown Dubai',
    websiteUrl: 'https://www.thedubaimall.com',
  },
  {
    id: 'PL3',
    name: 'Palm Jumeirah',
    image:
      'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
    category: 'Landmark',
    rating: 4.6,
    reviews: 8920,
    description: 'Artificial archipelago with luxury hotels, restaurants, and beautiful beaches.',
    location: 'Jumeirah',
    websiteUrl: 'https://www.visitdubai.com',
  },
];

export default function Search() {
  const [activeCategory, setActiveCategory] = useState('flights');
  const [searchQuery, setSearchQuery] = useState('');

  const { actualTheme } = useTheme();
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    location: '',
    radius: '10',
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
    setShowResults(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderSearchForm = () => {
    switch (activeCategory) {
      case 'flights':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  placeholder="Departure city"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="Destination city"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={1}>1 Passenger</option>
                  <option value={2}>2 Passengers</option>
                  <option value={3}>3 Passengers</option>
                  <option value={4}>4+ Passengers</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'hotels':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="City or hotel name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${searchCategories.find(c => c.id === activeCategory)?.name.toLowerCase()}...`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Radius</label>
                <select
                  name="radius"
                  value={formData.radius}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                </select>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Searching for the best options...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We're scanning thousands of results to find you the perfect match.
            </p>
          </div>
        </div>
      );
    }

    if (showResults) {
      switch (activeCategory) {
        case 'flights':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {mockFlights.length} flights found
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Page {1} of 3</span>
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {mockFlights.map(flight => (
                <div
                  key={flight.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-all duration-200 animate-slide-up"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img src={flight.logo} alt={flight.airline} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{flight.airline}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Flight #{flight.id}</div>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {flight.departure.time}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{flight.departure.airport}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">{flight.departure.city}</div>
                      </div>

                      <div className="text-center flex flex-col items-center justify-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{flight.duration}</div>
                        <div className="w-full h-px bg-gray-300 dark:bg-gray-600 relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{flight.arrival.time}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{flight.arrival.airport}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">{flight.arrival.city}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">${flight.price}</div>
                      <a
                        href={flight.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors inline-flex items-center space-x-1"
                      >
                        <span>View Details</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );

        case 'hotels':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {mockHotels.length} hotels found
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Page {1} of 5</span>
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockHotels.map(hotel => (
                  <div
                    key={hotel.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 animate-slide-up"
                  >
                    <div className="relative h-48">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        ${hotel.price}/night
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{hotel.name}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{hotel.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(hotel.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : i < hotel.rating
                                    ? 'text-yellow-400 fill-current opacity-50'
                                    : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {hotel.rating} ({hotel.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                            +{hotel.amenities.length - 3} more
                          </span>
                        )}
                      </div>

                      <a
                        href={hotel.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center space-x-1"
                      >
                        <span>View Details</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'places':
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {mockPlaces.length} places found
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Page {1} of 4</span>
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPlaces.map(place => (
                  <div
                    key={place.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 animate-slide-up"
                  >
                    <div className="relative h-48">
                      <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                        {place.category}
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{place.name}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{place.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(place.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : i < place.rating
                                    ? 'text-yellow-400 fill-current opacity-50'
                                    : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {place.rating} ({place.reviews.toLocaleString()} reviews)
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{place.description}</p>

                      <a
                        href={place.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center space-x-1"
                      >
                        <span>View Details</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        default: {
          const CategoryIcon = searchCategories.find(c => c.id === activeCategory)?.icon;
          return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                {CategoryIcon && <CategoryIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Search {searchCategories.find(c => c.id === activeCategory)?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Enter your search criteria above to find{' '}
                  {searchCategories.find(c => c.id === activeCategory)?.name.toLowerCase()}.
                </p>
                <button
                  onClick={handleSearch}
                  className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
                >
                  <SearchIcon className="h-5 w-5" />
                  <span>Search Now</span>
                </button>
              </div>
            </div>
          );
        }
      }
    }

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <SearchIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to explore?</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a category above and start searching for your next adventure.
          </p>
        </div>
      </div>
    );
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
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Search & Discover</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find everything you need for your perfect trip - from flights and hotels to local events and hidden gems.
          </p>
        </div>

        {/* Search Categories */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
            {searchCategories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setShowResults(false);
                }}
                className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
                }`}
              >
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="space-y-6">
            {renderSearchForm()}

            {/* Search Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <SearchIcon className="h-5 w-5" />
                    <span>Search {searchCategories.find(c => c.id === activeCategory)?.name}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {renderSearchResults()}
      </div>
    </div>
  );
}
