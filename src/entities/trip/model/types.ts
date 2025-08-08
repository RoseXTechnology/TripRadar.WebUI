export interface Trip {
  id: string;
  title: string;
  description?: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  budget: number;
  currency: string;
  participants: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TripItinerary {
  id: string;
  tripId: string;
  day: number;
  date: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location: string;
  cost?: number;
  category: 'transport' | 'accommodation' | 'food' | 'activity' | 'other';
}
