export interface Trip {
  readonly id: string;
  readonly title: string;
  readonly destination: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly status: TripStatus;
  readonly participants: number;
  readonly budget?: TripBudget;
  readonly image?: string;
  readonly isGroupTrip: boolean;
  readonly groupMembers?: readonly GroupMember[];
  readonly satisfactionPrediction?: SatisfactionPrediction;
  readonly aiChatEnabled: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type TripStatus = 'planning' | 'active' | 'completed' | 'cancelled';

export interface TripBudget {
  readonly total: number;
  readonly spent: number;
  readonly currency: string;
}

export interface GroupMember {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar?: string;
  readonly role: 'organizer' | 'member';
  readonly status: 'invited' | 'accepted' | 'declined';
  readonly permissions: readonly string[];
  readonly preferences?: Record<string, readonly string[]>;
}

export interface SatisfactionPrediction {
  readonly score: number;
  readonly factors: readonly SatisfactionFactor[];
  readonly recommendations: readonly string[];
  readonly confidence: number;
}

export interface SatisfactionFactor {
  readonly name: string;
  readonly impact: number;
  readonly description: string;
}

export interface Vote {
  readonly id: string;
  readonly tripId: string;
  readonly title: string;
  readonly description: string;
  readonly options: readonly VoteOption[];
  readonly deadline: string;
  readonly status: 'active' | 'completed' | 'cancelled';
  readonly createdBy: string;
}

export interface VoteOption {
  readonly id: string;
  readonly title: string;
  readonly votes: readonly string[];
  readonly cost?: number;
}
