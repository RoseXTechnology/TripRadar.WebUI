import { createContext, useContext, useState, ReactNode } from 'react';

import { User, Trip, AIBotIntegration } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
  currentTrip: Trip | null;
  setCurrentTrip: (trip: Trip | null) => void;
  isAuthenticated: boolean;
  aiBot: AIBotIntegration;
  setAiBot: (bot: AIBotIntegration) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    avatar:
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    subscription: 'premium',
    preferences: {
      budgetRange: [1000, 5000],
      accommodationType: ['hotel', 'apartment'],
      activities: ['sightseeing', 'food', 'culture'],
      travelStyle: 'comfort',
      groupSize: 'couple',
    },
    privacySettings: {
      dataRetention: 'minimal',
      aiTraining: false,
      analytics: false,
      marketing: false,
    },
  });

  const [trips, setTrips] = useState<Trip[]>([
    {
      id: '1',
      title: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      status: 'planning',
      participants: 2,
      budget: {
        total: 3500,
        spent: 1200,
        currency: 'USD',
        categories: [
          {
            id: '1',
            name: 'Flights',
            allocated: 1200,
            spent: 800,
            color: 'bg-blue-500',
          },
          {
            id: '2',
            name: 'Hotels',
            allocated: 1000,
            spent: 400,
            color: 'bg-green-500',
          },
          {
            id: '3',
            name: 'Food',
            allocated: 800,
            spent: 0,
            color: 'bg-orange-500',
          },
          {
            id: '4',
            name: 'Activities',
            allocated: 500,
            spent: 0,
            color: 'bg-purple-500',
          },
        ],
        alerts: [
          {
            id: '1',
            type: 'warning',
            message: 'Flight budget is 67% used',
            threshold: 60,
            triggered: true,
            date: '2024-02-10',
          },
        ],
      },
      image:
        'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      isGroupTrip: false,
      satisfactionPrediction: {
        score: 8.7,
        confidence: 0.85,
        factors: [
          {
            name: 'Budget Alignment',
            impact: 0.9,
            description: 'Your budget matches typical costs for this destination',
          },
          {
            name: 'Activity Preferences',
            impact: 0.8,
            description: 'Selected activities align with your interests',
          },
          {
            name: 'Travel Style Match',
            impact: 0.9,
            description: 'Accommodations match your comfort preferences',
          },
        ],
        recommendations: [
          'Consider booking a traditional ryokan for an authentic experience',
          'Add a day trip to Mount Fuji based on your nature preferences',
          'Book restaurant reservations early for popular spots',
        ],
      },
      aiChatEnabled: true,
    },
    {
      id: '2',
      title: 'European Explorer',
      destination: 'Paris, France',
      startDate: '2024-05-10',
      endDate: '2024-05-20',
      status: 'planning',
      participants: 4,
      budget: {
        total: 5200,
        spent: 800,
        currency: 'USD',
        categories: [
          {
            id: '1',
            name: 'Flights',
            allocated: 1800,
            spent: 800,
            color: 'bg-blue-500',
          },
          {
            id: '2',
            name: 'Hotels',
            allocated: 1600,
            spent: 0,
            color: 'bg-green-500',
          },
          {
            id: '3',
            name: 'Food',
            allocated: 1200,
            spent: 0,
            color: 'bg-orange-500',
          },
          {
            id: '4',
            name: 'Activities',
            allocated: 600,
            spent: 0,
            color: 'bg-purple-500',
          },
        ],
        alerts: [],
      },
      image:
        'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      isGroupTrip: true,
      groupMembers: [
        {
          id: '1',
          name: 'Alex Thompson',
          email: 'alex@example.com',
          role: 'organizer',
          status: 'accepted',
          permissions: ['edit', 'invite', 'vote'],
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          role: 'member',
          status: 'accepted',
          permissions: ['vote', 'comment'],
        },
        {
          id: '3',
          name: 'Mike Chen',
          email: 'mike@example.com',
          role: 'member',
          status: 'accepted',
          permissions: ['vote', 'comment'],
        },
        {
          id: '4',
          name: 'Emma Wilson',
          email: 'emma@example.com',
          role: 'member',
          status: 'invited',
          permissions: ['vote', 'comment'],
        },
      ],
      satisfactionPrediction: {
        score: 9.2,
        confidence: 0.92,
        factors: [
          {
            name: 'Group Compatibility',
            impact: 0.95,
            description: 'Group preferences are well-aligned',
          },
          {
            name: 'Destination Match',
            impact: 0.9,
            description: 'Paris matches group interests perfectly',
          },
          {
            name: 'Budget Distribution',
            impact: 0.9,
            description: 'Budget allocation is optimal for group size',
          },
        ],
        recommendations: [
          'Book group activities in advance for better rates',
          'Consider apartment rental for group bonding',
          'Plan free walking tours for budget-friendly exploration',
        ],
      },
      aiChatEnabled: true,
    },
  ]);

  const [currentTrip, setCurrentTrip] = useState<Trip | null>(trips[0]);

  const [aiBot, setAiBot] = useState<AIBotIntegration>({
    telegram: {
      enabled: true,
      botUsername: '@TripRadarBot',
      chatId: '123456789',
    },
    whatsapp: {
      enabled: true,
      phoneNumber: '+1234567890',
      verified: true,
    },
    features: [
      'Trip Planning Assistance',
      'Budget Tracking',
      'Real-time Updates',
      'Group Coordination',
      'Booking Reminders',
      'Weather Alerts',
      'Local Recommendations',
    ],
  });

  const value = {
    user,
    setUser,
    trips,
    setTrips,
    currentTrip,
    setCurrentTrip,
    isAuthenticated: !!user,
    aiBot,
    setAiBot,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
