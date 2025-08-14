import type { Trip } from 'entities/trip';

export const tripApi = {
  getTrips: async (): Promise<Trip[]> => {
    // Mock implementation - replace with actual API call
    return [];
  },

  createTrip: async (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> => {
    // Mock implementation - replace with actual API call
    const now = new Date().toISOString();
    return {
      ...tripData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
  },

  updateTrip: async (): Promise<Trip> => {
    // Mock implementation - replace with actual API call
    throw new Error('Not implemented');
  },

  deleteTrip: async (): Promise<void> => {
    // Mock implementation - replace with actual API call
    return;
  },
};
