# ESLint Code Style Rules

## ✅ ALWAYS FOLLOW - Import Order Rules

**Imports must be ordered alphabetically within groups:**

```typescript
// ✅ Correct order
import type { CreateUserRequest } from 'shared/api';
import { useMutation } from '@tanstack/react-query';
import { authStorage } from 'shared/lib';
import { useAuthStore } from 'shared/store/auth';
import { authApi } from './authApi';

// ❌ Wrong order
import { useMutation } from '@tanstack/react-query';
import type { CreateUserRequest } from 'shared/api'; // Should be first (alphabetical)
```

**Import groups order:**

1. **builtin** - Node.js built-in modules
2. **external** - npm packages (react, @tanstack/react-query)
3. **internal** - internal aliases (shared/, features/, entities/)
4. **parent** - ../
5. **sibling** - ./
6. **index** - ./index

## ✅ ALWAYS USE - TypeScript Rules

**No explicit any:**

```typescript
// ✅ Correct
const data: CreateUserRequest = { ... };

// ❌ Wrong
const data: any = { ... };
```

**No unused variables:**

```typescript
// ✅ Correct
const { data, isLoading } = useQuery(...);

// ❌ Wrong
const { data, isLoading, error } = useQuery(...); // error not used
```

## ✅ ALWAYS USE - Code Quality Rules

**Prefer const over let:**

```typescript
// ✅ Correct
const apiClient = createApiClient();

// ❌ Wrong
let apiClient = createApiClient();
```

**No var declarations:**

```typescript
// ✅ Correct
const config = { ... };

// ❌ Wrong
var config = { ... };
```

## ✅ ALWAYS CHECK - Import Safety Rules

**No circular imports:**

```typescript
// ❌ Wrong - creates circular dependency
// fileA.ts imports fileB.ts
// fileB.ts imports fileA.ts

// ✅ Correct - extract shared logic to separate file
```

**No self imports:**

```typescript
// ❌ Wrong
import { something } from './currentFile';

// ✅ Correct - use direct reference or extract to separate file
```

## 🎯 Purpose

These rules ensure:

- Consistent code style across the project
- Better readability and maintainability
- Prevention of common TypeScript/JavaScript pitfalls
- Clean import structure without circular dependencies
