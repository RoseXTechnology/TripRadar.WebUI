export interface Budget {
  id: string;
  tripId: string;
  totalBudget: number;
  currency: string;
  categories: BudgetCategory[];
  expenses: Expense[];
  createdAt: string;
  updatedAt: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  color: string;
}

export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  receipt?: string;
  createdBy: string;
}
