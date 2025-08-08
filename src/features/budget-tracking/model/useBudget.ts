import { useState, useEffect } from 'react';
import { useApi } from 'shared/lib';
import { budgetApi, type Budget, type Expense } from 'entities/budget';

export function useBudget(tripId: string) {
  const [budget, setBudget] = useState<Budget | null>(null);
  const { execute: fetchBudget, loading: budgetLoading } = useApi<Budget>();
  const { execute: addExpense, loading: addExpenseLoading } = useApi<Expense>();
  const { execute: updateExpense, loading: updateExpenseLoading } = useApi<Expense>();

  const loadBudget = async () => {
    const response = await fetchBudget(() => budgetApi.getBudget(tripId));
    setBudget(response.data);
  };

  const handleAddExpense = async (expenseData: Omit<Expense, 'id'>) => {
    const response = await addExpense(() => budgetApi.addExpense(tripId, expenseData));
    if (response.data && budget) {
      setBudget({
        ...budget,
        expenses: [...budget.expenses, response.data],
      });
    }
    return response;
  };

  const handleUpdateExpense = async (expenseId: string, expenseData: Partial<Expense>) => {
    const response = await updateExpense(() => budgetApi.updateExpense(tripId, expenseId, expenseData));
    if (response.data && budget) {
      setBudget({
        ...budget,
        expenses: budget.expenses.map(expense => (expense.id === expenseId ? response.data : expense)),
      });
    }
    return response;
  };

  useEffect(() => {
    if (tripId) {
      loadBudget();
    }
  }, [tripId]);

  return {
    budget,
    budgetLoading,
    addExpense: handleAddExpense,
    updateExpense: handleUpdateExpense,
    addExpenseLoading,
    updateExpenseLoading,
    refetch: loadBudget,
  };
}
