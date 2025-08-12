# TripRadar Travel Platform

A modern travel planning and budget tracking web application built with React, TypeScript, and Tailwind CSS.

## Features

- 🏠 **Trip Planning** - Create and manage travel itineraries
- 💰 **Budget Tracking** - Monitor travel expenses and budgets
- 🔍 **Travel Search** - Discover destinations and plan trips
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔐 **Authentication** - User registration and login system
- 📊 **Dashboard** - Overview of trips, budgets, and activities

## Tech Stack

### Core Technologies

- **Frontend**: React 18, TypeScript 5.5
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Architecture**: Feature-Sliced Design (FSD)
- **Icons**: Lucide React
- **Routing**: React Router DOM 6.21

### State Management

- **Client State**: Zustand 4.5 (replacing React Context)
- **Server State**: TanStack React Query 5.0
- **Validation**: Zod 3.22 for runtime type checking

### Development Tools

- **Linting**: ESLint 9.9 with TypeScript strict rules
- **Formatting**: Prettier 3.6
- **Testing**: Vitest + Testing Library (planned)
- **Documentation**: Storybook (planned)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Test Accounts

For testing authentication (mock data for development):

- **Email**: john@example.com **Password**: password123

> 💡 OAuth buttons (Google, GitHub, Microsoft) also work with mock data for quick testing

### Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

## Project Structure (Feature-Sliced Design)

```
src/
├── app/                    # Application layer
│   ├── providers/          # App providers (Theme, Query, etc.)
│   ├── router/            # Routing configuration
│   └── store/             # Global store setup
├── pages/                  # Pages layer
│   ├── dashboard/         # Dashboard page
│   ├── trips/             # Trips pages
│   └── auth/              # Auth pages
├── widgets/                # Widgets layer
│   ├── header/            # Header widget
│   ├── trip-card/         # Trip card widget
│   └── budget-overview/   # Budget overview widget
├── features/               # Features layer
│   ├── auth/              # Authentication feature
│   ├── trip-management/   # Trip management feature
│   └── budget-tracking/   # Budget tracking feature
├── entities/               # Entities layer
│   ├── user/              # User entity
│   ├── trip/              # Trip entity
│   └── budget/            # Budget entity
└── shared/                 # Shared layer
    ├── ui/                # UI components
    ├── lib/               # Utilities and hooks
    ├── api/               # API configuration
    └── config/            # App configuration
```

### Import Rules

```typescript
// ✅ Allowed imports (following FSD rules)
import { Button } from 'shared/ui';
import { useAuth } from 'features/auth';
import { User } from 'entities/user';

// ❌ Forbidden imports
import { LoginForm } from 'features/auth/ui/LoginForm'; // Direct file import
import { Dashboard } from 'pages/dashboard'; // Page from feature
```

## Architecture Decisions

### Why Zustand over Redux?

- **Simplicity**: 5 lines vs 50+ lines for same functionality
- **TypeScript**: Excellent built-in TypeScript support
- **Size**: 2.9KB vs 11KB+ for Redux Toolkit
- **Performance**: No unnecessary re-renders
- **Persistence**: Built-in localStorage integration

### Why Zod for validation?

- **Type Safety**: Runtime validation + TypeScript types
- **Developer Experience**: Excellent error messages
- **Composability**: Easy to combine and extend schemas
- **Security**: Prevents invalid data from entering the system

### Why React Query?

- **Server State**: Perfect separation from client state
- **Caching**: Intelligent background updates
- **Performance**: Automatic request deduplication
- **DevTools**: Excellent debugging experience

## Contributing

1. Follow the Feature-Sliced Design architecture
2. Use TypeScript with strict mode (no `any` types)
3. Follow import rules and path aliases
4. Run linting and formatting before committing
5. Write tests for new features
6. Update this README when adding new technologies

### Code Quality Rules

- **No `any` types** - Use proper TypeScript types
- **Import order** - Follow ESLint import rules
- **Barrel exports** - Use index.ts files for clean imports
- **Validation** - Use Zod schemas for all external data
- **Error handling** - Wrap components in ErrorBoundary
