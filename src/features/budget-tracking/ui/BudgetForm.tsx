import { Button, Input, Select } from 'shared/ui';
import { useForm, validateRequired } from 'shared/lib';
import { useBudget } from '../model/useBudget';

interface BudgetFormProps {
  tripId: string;
  onSuccess?: () => void;
}

export function BudgetForm({ tripId, onSuccess }: BudgetFormProps) {
  const { addExpense, addExpenseLoading, budget } = useBudget(tripId);
  const { values, errors, setValue, setError, reset } = useForm({
    categoryId: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const categoryOptions =
    budget?.categories.map(cat => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryError = validateRequired(values.categoryId);
    const amountError = values.amount <= 0 ? 'Amount must be greater than 0' : null;
    const descriptionError = validateRequired(values.description);

    if (categoryError) setError('categoryId', categoryError);
    if (amountError) setError('amount', amountError);
    if (descriptionError) setError('description', descriptionError);

    if (categoryError || amountError || descriptionError) return;

    try {
      await addExpense({
        ...values,
        createdBy: 'current-user', // Should come from auth context
      });
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Category"
        value={values.categoryId}
        onChange={e => setValue('categoryId', e.target.value)}
        options={categoryOptions}
        error={errors.categoryId}
        placeholder="Select category"
        required
      />

      <Input
        label="Amount"
        type="number"
        value={values.amount}
        onChange={e => setValue('amount', Number(e.target.value))}
        error={errors.amount}
        min="0"
        step="0.01"
        required
      />

      <Input
        label="Description"
        value={values.description}
        onChange={e => setValue('description', e.target.value)}
        error={errors.description}
        required
      />

      <Input label="Date" type="date" value={values.date} onChange={e => setValue('date', e.target.value)} required />

      <Button type="submit" loading={addExpenseLoading} className="w-full">
        Add Expense
      </Button>
    </form>
  );
}
