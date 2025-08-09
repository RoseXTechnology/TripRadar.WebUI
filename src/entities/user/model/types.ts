export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar?: string;
  readonly subscription: UserSubscription;
  readonly preferences: UserPreferences;
  readonly privacySettings: PrivacySettings;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type UserSubscription = 'free' | 'premium' | 'enterprise';

export interface UserPreferences {
  readonly budgetRange: readonly [number, number];
  readonly accommodationType: readonly string[];
  readonly activities: readonly string[];
  readonly travelStyle: 'budget' | 'comfort' | 'luxury';
  readonly groupSize: 'solo' | 'couple' | 'small-group' | 'large-group';
  readonly dietary?: readonly string[];
  readonly transport?: readonly string[];
  readonly tripType?: readonly string[];
  readonly accessibility?: readonly string[];
  readonly languages?: readonly string[];
  readonly timePreference?: 'day' | 'night' | 'both';
}

export interface PrivacySettings {
  readonly dataRetention: 'minimal' | 'standard';
  readonly aiTraining: boolean;
  readonly analytics: boolean;
  readonly marketing: boolean;
}

export interface AIBotIntegration {
  readonly telegram: {
    readonly enabled: boolean;
    readonly botUsername?: string;
    readonly chatId?: string;
  };
  readonly whatsapp: {
    readonly enabled: boolean;
    readonly phoneNumber?: string;
    readonly verified?: boolean;
  };
  readonly features: readonly string[];
}
