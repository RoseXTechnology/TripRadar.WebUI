export interface BudgetFormData {
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void;
  initialData?: Partial<BudgetFormData>;
}
