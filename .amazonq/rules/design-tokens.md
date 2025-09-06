# Design Tokens Rules

## Color Usage Rules

### ✅ ALWAYS USE - Custom Tokens from tailwind.config.mjs

**Brand Colors:**

- `primary-50`, `primary-500`, `primary-600`, `primary-700`
- `secondary-50`, `secondary-500`, `secondary-600`, `secondary-700`

**Surface (Backgrounds):**

- `surface` (light theme)
- `surface-dark` (dark theme)
- `surface-accent` (accent background light)
- `surface-accent-dark` (accent background dark)

**Content (Text):**

- `content` (primary text light)
- `content-dark` (primary text dark)
- `content-secondary` (secondary text light)
- `content-secondary-dark` (secondary text dark)
- `content-muted` (muted text)

**Outline (Borders):**

- `outline` (borders light)
- `outline-dark` (borders dark)
- `outline-secondary` (secondary borders light)
- `outline-secondary-dark` (secondary borders dark)

### ❌ NEVER USE - Standard Tailwind Colors

**Forbidden:**

- `gray-*`, `blue-*`, `purple-*`, `red-*`, `green-*`, etc.
- `bg-white`, `bg-black`, `text-white`, `text-black`
- `border-gray-200`, `text-gray-600`, etc.
- Inline styles or hardcoded hex values
- Any color not defined in tailwind.config.mjs

### 🎯 Purpose

This ensures:

- Consistent theming across all components
- Easy theme switching by changing only tailwind.config.mjs
- Centralized color management
- No orphaned colors when themes change
