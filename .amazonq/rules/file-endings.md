# File Endings Rules

## ✅ ALWAYS USE - Newline at End of File

**All files must end with a newline character:**

```typescript
// ✅ Correct - ends with newline
export const MyComponent = () => {
  return <div>Hello</div>;
};
// <- newline here
```

```typescript
// ❌ Wrong - no newline at end
export const MyComponent = () => {
  return <div>Hello</div>;
}; // <- no newline here
```

## 🔧 AUTOMATIC ENFORCEMENT

**This is enforced by:**

- Prettier configuration
- ESLint rule `eol-last`
- Most editors can auto-add newlines on save

## 🎯 Purpose

This ensures:

- Consistent file formatting across the project
- Proper POSIX compliance (files should end with newline)
- Prevents git diff issues
- Better compatibility with command-line tools
