# Named Exports Rules

## ✅ ALWAYS USE - Named Exports

**Use named exports for all components, hooks, and utilities:**

```typescript
// ✅ Correct - named exports
export const MyComponent = () => {
  return <div>Hello</div>;
};

export const useCustomHook = () => {
  return useState(false);
};

export const utilityFunction = (data: string) => {
  return data.toUpperCase();
};
```

## ❌ NEVER USE - Default Exports

**Forbidden patterns:**

```typescript
// ❌ Wrong - default exports
const MyComponent = () => {
  return <div>Hello</div>;
};
export default MyComponent;

// ❌ Wrong - direct default export
export default function MyComponent() {
  return <div>Hello</div>;
}
```

## 🔧 IMPORT/EXPORT PATTERNS

**Correct import/export patterns:**

```typescript
// ✅ Correct imports
import { MyComponent, useCustomHook } from './MyComponent';
import { Button, Input } from 'shared/ui';

// ✅ Correct barrel exports (index.ts)
export { MyComponent } from './MyComponent';
export { useCustomHook } from './useCustomHook';
```

## 🎯 Purpose

This ensures:

- Better tree-shaking (unused exports can be eliminated)
- Explicit imports (clear what's being used)
- Easier refactoring (IDE can track usage better)
- Consistent import patterns across the project
- No naming conflicts when importing
- Better TypeScript support and autocomplete
