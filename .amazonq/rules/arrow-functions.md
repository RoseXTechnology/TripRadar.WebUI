# Arrow Functions Rules

## ✅ ALWAYS USE - Arrow Functions

**Use arrow functions everywhere possible:**

```typescript
// ✅ Correct - arrow functions
const MyComponent = () => {
  return <div>Hello</div>;
};

export const useCustomHook = () => {
  return useState(false);
};

const handleClick = () => {
  console.log('clicked');
};

const fetchData = async () => {
  return await api.getData();
};

// ✅ Correct - arrow functions in arrays
const items = data.map(item => item.name);
const filtered = items.filter(item => item.length > 0);
```

## ❌ NEVER USE - Function Declarations

**Forbidden patterns:**

```typescript
// ❌ Wrong - function declarations
function MyComponent() {
  return <div>Hello</div>;
}

export function useCustomHook() {
  return useState(false);
}

function handleClick() {
  console.log('clicked');
}

async function fetchData() {
  return await api.getData();
}
```

## 🔧 EXCEPTIONS - When Arrow Functions Not Possible

**Only use function declarations when technically required:**

```typescript
// ✅ Exception - function hoisting needed
function recursiveFunction(n: number): number {
  if (n <= 1) return 1;
  return n * recursiveFunction(n - 1);
}

// ✅ Exception - generator functions
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

// ✅ Exception - constructor functions (rare)
function Person(name: string) {
  this.name = name;
}
```

## 🎯 Purpose

This ensures:

- Consistent code style across the project
- Lexical `this` binding (prevents `this` confusion)
- More concise and modern JavaScript/TypeScript
- Better readability and maintainability
- Consistent with React functional components pattern
