export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: 'free' | 'premium' | 'enterprise';
  preferences: {
    budgetRange: [number, number];
    accommodationType: string[];
    activities: string[];
    travelStyle: string;
    groupSize: string;
    dietary?: string[];
    transport?: string[];
    tripType?: string[];
    accessibility?: string[];
    languages?: string[];
    timePreference?: 'day' | 'night' | 'both';
  };
  privacySettings: {
    dataRetention: string;
    aiTraining: boolean;
    analytics: boolean;
    marketing: boolean;
  };
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
  type: 'warning' | 'danger' | 'info';
  message: string;
  threshold: number;
  triggered: boolean;
  date: string;
}

export interface Budget {
  total: number;
  spent: number;
  currency: string;
  categories: BudgetCategory[];
  alerts: BudgetAlert[];
}

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'member';
  status: 'invited' | 'accepted' | 'declined';
  permissions: string[];
}

export interface SatisfactionFactor {
  name: string;
  impact: number;
  description: string;
}

export interface SatisfactionPrediction {
  score: number;
  confidence: number;
  factors: SatisfactionFactor[];
  recommendations: string[];
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  participants: number;
  budget: Budget;
  image: string;
  isGroupTrip: boolean;
  groupMembers?: GroupMember[];
  satisfactionPrediction: SatisfactionPrediction;
  aiChatEnabled: boolean;
}

export interface TelegramBot {
  enabled: boolean;
  botUsername: string;
  chatId: string;
}

export interface WhatsAppBot {
  enabled: boolean;
  phoneNumber: string;
  verified: boolean;
}

export interface AIBotIntegration {
  telegram: TelegramBot;
  whatsapp: WhatsAppBot;
  features: string[];
}
