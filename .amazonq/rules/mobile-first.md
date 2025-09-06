# Mobile-First Design Rules

## ✅ ALWAYS USE - Mobile-First Approach

**Base Styles (Mobile):**

- Write base styles without breakpoint prefixes
- Target mobile devices (320px+) as default
- Use semantic HTML that works on all devices

**Progressive Enhancement:**

- Add desktop features with `sm:`, `md:`, `lg:`, `xl:` prefixes
- Enhance mobile experience for larger screens
- Never hide essential functionality on mobile

## ❌ NEVER USE - Desktop-First Patterns

**Forbidden Patterns:**

```jsx
// ❌ Desktop-first (wrong)
<nav className="hidden md:flex">
<button className="md:hidden">
<div className="w-full md:w-auto">

// ✅ Mobile-first (correct)
<nav className="flex md:hidden">
<button className="block md:hidden">
<div className="w-auto md:w-full">
```

## 🎯 Implementation Guidelines

**Navigation:**

- Show mobile menu by default
- Hide mobile menu on desktop with `md:hidden`
- Show desktop nav on larger screens with `md:flex`

**Layout:**

- Stack elements vertically on mobile
- Use horizontal layout on desktop with `md:flex-row`
- Full width on mobile, constrained on desktop

**Typography:**

- Readable sizes on mobile (16px+ base)
- Scale up for desktop with `md:text-lg`, `lg:text-xl`

**Spacing:**

- Compact spacing on mobile (`p-4`, `gap-2`)
- Generous spacing on desktop (`md:p-8`, `md:gap-6`)

## 🔧 Common Patterns

```jsx
// Mobile menu (visible on mobile, hidden on desktop)
<div className="block md:hidden">

// Desktop nav (hidden on mobile, visible on desktop)
<nav className="hidden md:flex">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Responsive text
<h1 className="text-2xl md:text-4xl lg:text-6xl">

// Responsive spacing
<div className="p-4 md:p-8 lg:p-12">
```

## 📱 Testing Requirements

- Test on mobile devices first (iPhone SE, Android)
- Ensure touch targets are 44px+ minimum
- Verify text is readable without zooming
- Check that all functionality works on mobile
