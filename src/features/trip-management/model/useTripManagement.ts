import { tripApi, type Trip } from 'entities/trip';
import { useState, useEffect } from 'react';
import { useApi } from 'shared/lib';

export function useTripManagement() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { execute: fetchTrips, loading: tripsLoading } = useApi<Trip[]>();
  const { execute: createTrip, loading: createLoading } = useApi<Trip>();
  const { execute: updateTrip, loading: updateLoading } = useApi<Trip>();
  const { execute: deleteTrip, loading: deleteLoading } = useApi<void>();

  const loadTrips = async () => {
    const response = await fetchTrips(() => tripApi.getTrips());
    setTrips(response.data || []);
  };

  const handleCreateTrip = async (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await createTrip(() => tripApi.createTrip(tripData));
    if (response.data) {
      setTrips(prev => [...prev, response.data]);
    }
    return response;
  };

  const handleUpdateTrip = async (id: string, tripData: Partial<Trip>) => {
    const response = await updateTrip(() => tripApi.updateTrip(id, tripData));
    if (response.data) {
      setTrips(prev => prev.map(trip => (trip.id === id ? response.data : trip)));
    }
    return response;
  };

  const handleDeleteTrip = async (id: string) => {
    await deleteTrip(() => tripApi.deleteTrip(id));
    setTrips(prev => prev.filter(trip => trip.id !== id));
  };

  useEffect(() => {
    loadTrips();
  }, []);

  return {
    trips,
    tripsLoading,
    createTrip: handleCreateTrip,
    updateTrip: handleUpdateTrip,
    deleteTrip: handleDeleteTrip,
    createLoading,
    updateLoading,
    deleteLoading,
    refetch: loadTrips,
  };
}
