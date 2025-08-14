import { Budget, Expense } from '../model/types';

export const budgetApi = {
  getBudget: async (): Promise<Budget> => {
    // Mock API call
    return {} as Budget;
  },

  addExpense: async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
    // Mock API call
    return expense as Expense;
  },

  updateExpense: async (expense: Partial<Expense>): Promise<Expense> => {
    // Mock API call
    return expense as Expense;
  },
};
