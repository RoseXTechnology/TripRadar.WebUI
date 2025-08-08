import { Button, Input, Select } from 'shared/ui';
import { useForm, validateRequired } from 'shared/lib';
import { useTripManagement } from 'features/trip-management';

interface CreateTripFormProps {
  onSuccess?: () => void;
}

export function CreateTripForm({ onSuccess }: CreateTripFormProps) {
  const { createTrip, createLoading } = useTripManagement();
  const { values, errors, setValue, setError } = useForm({
    title: '',
    description: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: 0,
    currency: 'USD',
  });

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const titleError = validateRequired(values.title);
    const destinationError = validateRequired(values.destination);
    const startDateError = validateRequired(values.startDate);
    const endDateError = validateRequired(values.endDate);

    if (titleError) setError('title', titleError);
    if (destinationError) setError('destination', destinationError);
    if (startDateError) setError('startDate', startDateError);
    if (endDateError) setError('endDate', endDateError);

    if (titleError || destinationError || startDateError || endDateError) return;

    try {
      await createTrip({
        ...values,
        status: 'planning' as const,
        participants: [],
        createdBy: 'current-user', // Should come from auth context
      });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create trip:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Trip Title"
        value={values.title}
        onChange={e => setValue('title', e.target.value)}
        error={errors.title}
        required
      />

      <Input
        label="Description"
        value={values.description}
        onChange={e => setValue('description', e.target.value)}
        multiline
      />

      <Input
        label="Destination"
        value={values.destination}
        onChange={e => setValue('destination', e.target.value)}
        error={errors.destination}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={values.startDate}
          onChange={e => setValue('startDate', e.target.value)}
          error={errors.startDate}
          required
        />

        <Input
          label="End Date"
          type="date"
          value={values.endDate}
          onChange={e => setValue('endDate', e.target.value)}
          error={errors.endDate}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Budget"
          type="number"
          value={values.budget}
          onChange={e => setValue('budget', Number(e.target.value))}
          min="0"
        />

        <Select
          label="Currency"
          value={values.currency}
          onChange={e => setValue('currency', e.target.value)}
          options={currencyOptions}
        />
      </div>

      <Button type="submit" loading={createLoading} className="w-full">
        Create Trip
      </Button>
    </form>
  );
}
