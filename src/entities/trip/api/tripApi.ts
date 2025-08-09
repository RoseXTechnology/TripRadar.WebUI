import type { Trip } from '../model/types';

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

  updateTrip: async (id: string, tripData: Partial<Trip>): Promise<Trip> => {
    // Mock implementation - replace with actual API call
    throw new Error('Not implemented');
  },

  deleteTrip: async (id: string): Promise<void> => {
    // Mock implementation - replace with actual API call
    return;
  },
};
