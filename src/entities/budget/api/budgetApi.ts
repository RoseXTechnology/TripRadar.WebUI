import { Budget, Expense } from '../model/types';

export const budgetApi = {
  getBudget: async (tripId: string): Promise<Budget> => {
    // Mock API call
    return {} as Budget;
  },

  addExpense: async (tripId: string, expense: Omit<Expense, 'id'>): Promise<Expense> => {
    // Mock API call
    return expense as Expense;
  },

  updateExpense: async (tripId: string, expenseId: string, expense: Partial<Expense>): Promise<Expense> => {
    // Mock API call
    return expense as Expense;
  },
};
