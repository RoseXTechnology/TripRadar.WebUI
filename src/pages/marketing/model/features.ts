import { Search, MapPin, Calendar, Users, DollarSign, Target, Bot, Vote, Lock } from 'lucide-react';

export const FEATURES = [
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find flights, hotels, events, and local attractions with our comprehensive search engine.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MapPin,
    title: 'Location Intelligence',
    description: 'Get real-time data on destinations, weather, charging stations, and points of interest.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Calendar,
    title: 'Smart Itinerary',
    description: 'Create and manage detailed itineraries with automated scheduling and optimization.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Group Trip Planning',
    description: 'Collaborate with friends and family using shared itineraries, voting, and real-time coordination.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: DollarSign,
    title: 'Budget Management',
    description: 'Set trip budgets, track expenses by category, and get alerts for budget overruns.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Target,
    title: 'Satisfaction Prediction',
    description: 'AI-powered satisfaction scoring based on your preferences and travel patterns.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Bot,
    title: 'AI Travel Assistant',
    description: 'Chat with our AI via Telegram or WhatsApp for instant trip assistance and updates.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Vote,
    title: 'Group Voting',
    description: 'Make group decisions easy with built-in voting for activities, restaurants, and accommodations.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data is never used for AI training. Complete privacy protection with local processing.',
    color: 'from-red-500 to-pink-500',
  },
] as const;
