export interface Budget {
  readonly id: string;
  readonly tripId: string;
  readonly total: number;
  readonly spent: number;
  readonly currency: string;
  readonly categories: readonly BudgetCategory[];
  readonly alerts: readonly BudgetAlert[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface BudgetCategory {
  readonly id: string;
  readonly name: string;
  readonly allocated: number;
  readonly spent: number;
  readonly color: string;
  readonly icon?: string;
}

export interface BudgetAlert {
  readonly id: string;
  readonly type: BudgetAlertType;
  readonly message: string;
  readonly threshold: number;
  readonly triggered: boolean;
  readonly date: string;
  readonly categoryId?: string;
}

export type BudgetAlertType = 'warning' | 'critical' | 'info';

export interface BudgetTransaction {
  readonly id: string;
  readonly budgetId: string;
  readonly categoryId: string;
  readonly amount: number;
  readonly description: string;
  readonly date: string;
  readonly type: 'expense' | 'refund';
  readonly receipt?: string;
}

export interface Expense {
  readonly id: string;
  readonly tripId: string;
  readonly categoryId: string;
  readonly amount: number;
  readonly description: string;
  readonly date: string;
  readonly receipt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}