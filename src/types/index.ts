export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: 'free' | 'premium' | 'enterprise';
  preferences?: UserPreferences;
  privacySettings?: PrivacySettings;
}

export interface UserPreferences {
  budgetRange: [number, number];
  accommodationType: string[];
  activities: string[];
  travelStyle: 'budget' | 'comfort' | 'luxury';
  groupSize: 'solo' | 'couple' | 'small-group' | 'large-group';
  dietary?: string[];
  transport?: string[];
  tripType?: string[];
  accessibility?: string[];
  languages?: string[];
  timePreference?: 'day' | 'night' | 'both';
}

export interface PrivacySettings {
  dataRetention: 'minimal' | 'standard';
  aiTraining: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  participants: number;
  budget?: TripBudget;
  image?: string;
  isGroupTrip?: boolean;
  groupMembers?: GroupMember[];
  satisfactionPrediction?: SatisfactionPrediction;
  aiChatEnabled?: boolean;
}

export interface TripBudget {
  total: number;
  spent: number;
  categories: BudgetCategory[];
  alerts: BudgetAlert[];
  currency: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface BudgetAlert {
  id: string;
  type: 'warning' | 'critical';
  message: string;
  threshold: number;
  triggered: boolean;
  date: string;
}

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'organizer' | 'member';
  status: 'invited' | 'accepted' | 'declined';
  permissions: string[];
  preferences?: Record<string, string[]>;
}

export interface SatisfactionPrediction {
  score: number;
  factors: SatisfactionFactor[];
  recommendations: string[];
  confidence: number;
}

export interface SatisfactionFactor {
  name: string;
  impact: number;
  description: string;
}

export interface AIBotIntegration {
  telegram: {
    enabled: boolean;
    botUsername: string;
    chatId?: string;
  };
  whatsapp: {
    enabled: boolean;
    phoneNumber: string;
    verified: boolean;
  };
  features: string[];
}

export interface SearchFilters {
  destination: string;
  startDate: string;
  endDate: string;
  guests: number;
  budget?: number;
  preferences?: Record<string, string[]>;
}

export interface FlightResult {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
}

export interface HotelResult {
  id: string;
  name: string;
  rating: number;
  price: number;
  image: string;
  amenities: string[];
  location: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

export interface Vote {
  id: string;
  tripId: string;
  title: string;
  description: string;
  options: VoteOption[];
  deadline: string;
  status: 'active' | 'completed' | 'cancelled';
  createdBy: string;
}

export interface VoteOption {
  id: string;
  title: string;
  description?: string;
  votes: string[];
  cost?: number;
}

export interface PreferenceSchema {
  categories: PreferenceCategory[];
}

export interface PreferenceCategory {
  id: string;
  name: string;
  description: string;
  options: PreferenceOption[];
}

export interface PreferenceOption {
  id: string;
  label: string;
  icon?: string;
}
