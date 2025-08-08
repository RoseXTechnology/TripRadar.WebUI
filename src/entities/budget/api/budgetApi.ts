import { api } from 'shared/api';
import type { Budget, Expense } from '../model/types';

export const budgetApi = {
  getBudget: (tripId: string) => api.get<Budget>(`/trips/${tripId}/budget`),

  updateBudget: (tripId: string, data: Partial<Budget>) => api.put<Budget>(`/trips/${tripId}/budget`, data),

  addExpense: (tripId: string, expense: Omit<Expense, 'id'>) => api.post<Expense>(`/trips/${tripId}/expenses`, expense),

  updateExpense: (tripId: string, expenseId: string, data: Partial<Expense>) =>
    api.put<Expense>(`/trips/${tripId}/expenses/${expenseId}`, data),

  deleteExpense: (tripId: string, expenseId: string) => api.delete<void>(`/trips/${tripId}/expenses/${expenseId}`),
};
