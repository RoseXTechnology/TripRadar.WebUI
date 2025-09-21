# API Hooks Naming Rules

## ✅ ALWAYS USE - Consistent Hook Naming

**All API hooks must follow these patterns:**

- `useSomethingQuery` for React Query queries (useQuery)
- `useSomethingMutation` for React Query mutations (useMutation)

**Examples:**

```typescript
// ✅ Correct naming
export function usePricingQuery() { return useQuery(...) }
export function useRegisterMutation() { return useMutation(...) }
export function useCreateCheckoutMutation() { return useMutation(...) }
export function useUpdateProfileMutation() { return useMutation(...) }

// ❌ Wrong naming
export function useRegister() { ... }
export function useCreateCheckout() { ... }
export function usePricing() { ... }
export function useRegisterQuery() { return useMutation(...) } // Wrong suffix
```

## ❌ NEVER USE - Inconsistent Naming

**Forbidden patterns:**

- `useSomething()` without Query/Mutation suffix
- Wrong suffix for hook type (Query for mutations, Mutation for queries)
- Mixed naming conventions in the same codebase

## 🎯 Purpose

This ensures:

- Clear distinction between queries and mutations
- Easy identification of React Query hooks
- Better code readability and maintainability
- Consistent naming across all API hooks
