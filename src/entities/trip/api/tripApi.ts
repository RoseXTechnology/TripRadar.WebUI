import { api } from 'shared/api';
import type { Trip, TripItinerary } from 'entities/trip';

export const tripApi = {
  getTrips: () => api.get<Trip[]>('/trips'),

  getTrip: (id: string) => api.get<Trip>(`/trips/${id}`),

  createTrip: (data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => api.post<Trip>('/trips', data),

  updateTrip: (id: string, data: Partial<Trip>) => api.put<Trip>(`/trips/${id}`, data),

  deleteTrip: (id: string) => api.delete<void>(`/trips/${id}`),

  getTripItinerary: (tripId: string) => api.get<TripItinerary[]>(`/trips/${tripId}/itinerary`),

  updateItinerary: (tripId: string, data: TripItinerary[]) =>
    api.put<TripItinerary[]>(`/trips/${tripId}/itinerary`, data),
};
