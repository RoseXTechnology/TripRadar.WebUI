import { type Trip } from 'entities/trip';
import { MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import { formatDate, formatCurrency } from 'shared/lib';
import { Badge, Button } from 'shared/ui';

interface TripCardProps {
  trip: Trip;
  onEdit?: (trip: Trip) => void;
  onDelete?: (tripId: string) => void;
}

export function TripCard({ trip, onEdit, onDelete }: TripCardProps) {
  const getStatusVariant = (status: Trip['status']) => {
    switch (status) {
      case 'planning':
        return 'secondary';
      case 'active':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{trip.title}</h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {trip.destination}
          </div>
        </div>
        <Badge variant={getStatusVariant(trip.status)}>{trip.status}</Badge>
      </div>

      {trip.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{trip.description}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </span>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <DollarSign className="h-4 w-4 mr-2" />
          <span>{formatCurrency(trip.budget, trip.currency)}</span>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Users className="h-4 w-4 mr-2" />
          <span>{trip.participants.length} participants</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={() => onEdit(trip)}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button variant="danger" size="sm" onClick={() => onDelete(trip.id)}>
            Delete
          </Button>
        )}
        <Button size="sm">
          <a href={`/trips/${trip.id}`}>View Details</a>
        </Button>
      </div>
    </div>
  );
}
