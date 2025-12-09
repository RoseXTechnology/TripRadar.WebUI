---
inclusion: always
---

# Design Tokens & Color System

This document describes the design token system used in TripRadar. **Always use these tokens instead of hardcoded colors** to maintain consistency across light and dark modes.

## Color Token Categories

### Surface Colors (Backgrounds)

```typescript
// Main surfaces
bg-surface dark:bg-surface-dark                     // Primary background
bg-surface-accent dark:bg-surface-accent-dark       // Secondary/accent background

// Usage examples:
// - Main page backgrounds: bg-surface dark:bg-surface-dark
// - Cards, panels: bg-surface dark:bg-surface-dark
// - Info boxes, highlights: bg-surface-accent dark:bg-surface-accent-dark
```

### Content Colors (Text)

```typescript
// Text hierarchy
text-content dark:text-content-dark                           // Primary text
text-content-secondary dark:text-content-secondary-dark       // Secondary text
text-content-muted                                            // Muted/disabled text

// Usage examples:
// - Headings, important text: text-content dark:text-content-dark
// - Body text, descriptions: text-content-secondary dark:text-content-secondary-dark
// - Placeholders, disabled: text-content-muted
```

### Outline Colors (Borders)

```typescript
// Borders and dividers
border-outline dark:border-outline-dark                       // Primary borders
border-outline-secondary dark:border-outline-secondary-dark   // Secondary borders

// Usage examples:
// - Card borders: border border-outline dark:border-outline-dark
// - Dividers: border-t border-outline dark:border-outline-dark
```

### Button Colors

```typescript
// Interactive elements
bg-button dark:bg-button-dark                                 // Button background
text-button-text dark:text-button-text-dark                   // Button text
hover:bg-button-hover dark:hover:bg-button-hover-dark         // Button hover state

// Usage examples:
// - Primary buttons: bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark
```

### Primary/Secondary Colors

```typescript
// Brand colors (use sparingly for accents)
bg-primary-500 dark:bg-primary-600                            // Primary brand color
text-primary-600 dark:text-primary-400                        // Primary text accent
bg-secondary-500 dark:bg-secondary-600                        // Secondary brand color

// Usage examples:
// - Icons, badges: text-primary-600 dark:text-primary-400
// - Hover states: hover:bg-primary-50 dark:hover:bg-surface-accent-dark
```

## Common Patterns

### Information/Alert Boxes

```tsx
// ✅ CORRECT - Uses design tokens
<div className="bg-surface-accent dark:bg-surface-accent-dark border border-outline dark:border-outline-dark rounded-xl p-4">
  <p className="text-sm text-content dark:text-content-dark font-medium mb-2">
    Title
  </p>
  <p className="text-xs text-content-secondary dark:text-content-secondary-dark">
    Description text
  </p>
</div>

// ❌ WRONG - Hardcoded colors
<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
  <p className="text-blue-900 dark:text-blue-100">Text</p>
</div>
```

### Cards

```tsx
// ✅ CORRECT
<div className="bg-surface dark:bg-surface-dark border border-outline dark:border-outline-dark rounded-xl shadow-lg p-6">
  <h3 className="text-xl font-bold text-content dark:text-content-dark mb-2">Card Title</h3>
  <p className="text-content-secondary dark:text-content-secondary-dark">Card description</p>
</div>
```

### Buttons

```tsx
// ✅ CORRECT - Primary button
<button className="bg-button dark:bg-button-dark text-button-text dark:text-button-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark rounded-xl px-4 py-2">
  Click me
</button>

// ✅ CORRECT - Secondary button
<button className="border border-outline dark:border-outline-dark text-content dark:text-content-dark bg-surface dark:bg-surface-dark hover:bg-surface-accent dark:hover:bg-surface-accent-dark rounded-xl px-4 py-2">
  Secondary
</button>
```

### Hover States

```tsx
// ✅ CORRECT - Subtle hover
hover:bg-surface-accent dark:hover:bg-surface-accent-dark

// ✅ CORRECT - Primary hover
hover:bg-primary-50 dark:hover:bg-surface-accent-dark
```

## Rules

1. **Never use hardcoded colors** like `bg-blue-50`, `text-gray-900`, etc.
2. **Always pair light and dark variants** using the `dark:` prefix
3. **Use semantic tokens** that describe purpose, not appearance
4. **Test in both light and dark modes** before committing
5. **Prefer `rounded-xl`** over `rounded-lg` for consistency

## Exception Cases

Only use specific colors for:

- **Status indicators**: `bg-green-100`, `bg-red-100`, `bg-yellow-100` (with dark variants)
- **Brand-specific elements**: Primary/secondary colors for logos, special badges

Even in these cases, prefer using opacity with design tokens when possible:

```tsx
// ✅ Better
<div className="bg-surface-accent dark:bg-surface-accent-dark border-l-4 border-green-500">
  Success message
</div>

// ❌ Avoid
<div className="bg-green-50 dark:bg-green-900/20">
  Success message
</div>
```

## Token Reference

All tokens are defined in `tailwind.config.mjs` under the `colors` section. Refer to that file for the complete list and their values.
