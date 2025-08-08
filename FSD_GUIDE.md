# TripRadar FSD Architecture Guide

## 🏗️ Project Structure

```
src/
├── shared/         # Reusable resources
├── entities/       # Business entities
├── features/       # Business features
├── widgets/        # Composite UI blocks
├── pages/          # Application pages
└── app/            # Application settings
```

## 📋 Architecture Layers (bottom-up)

### 1. 🔧 Shared Layer
**Purpose**: Reusable resources without business logic

**Structure**:
```
shared/
├── ui/             # UI components (Button, Input, Modal)
├── lib/            # Utilities and hooks
│   ├── hooks/      # Common hooks (useApi, useForm)
│   ├── utils/      # Utilities (formatDate, validation)
│   └── validation/ # Validation schemas
├── api/            # API configuration
└── config/         # Constants and settings
```

**What to add**:
- ✅ Reusable UI components
- ✅ Common hooks and utilities
- ✅ API configuration
- ✅ Application constants

**What NOT to add**:
- ❌ Business logic
- ❌ Domain-specific components

### 2. 🏢 Entities Layer
**Purpose**: Business entities and their APIs

**Structure**:
```
entities/
├── user/
│   ├── model/types.ts    # User, UserProfile types
│   ├── api/userApi.ts    # API methods for user
│   └── index.ts          # Exports
├── trip/
└── budget/
```

**What to add**:
- ✅ Business entity types
- ✅ API methods for working with entities
- ✅ Basic selectors and transformers

**What NOT to add**:
- ❌ UI components
- ❌ Business processes
- ❌ Dependencies on other entities

### 3. ⚡ Features Layer
**Purpose**: Business functions and processes

**Structure**:
```
features/
├── auth/
│   ├── ui/LoginForm.tsx      # Feature UI components
│   ├── model/useAuth.ts      # Business logic
│   ├── api/authApi.ts        # Feature-specific API
│   └── index.ts              # Exports
├── trip-management/
├── budget-tracking/
└── ai-integration/
```

**What to add**:
- ✅ Forms and UI specific to business processes
- ✅ Hooks with business logic
- ✅ Feature-specific API methods

**What NOT to add**:
- ❌ Reusable UI components (put in shared)
- ❌ Compositions of multiple features (put in widgets)

### 4. 🧩 Widgets Layer
**Purpose**: Composite UI blocks from multiple features

**Structure**:
```
widgets/
├── header/
│   ├── ui/Header.tsx         # Navigation + auth composition
│   └── index.ts
├── trip-card/
│   ├── ui/TripCard.tsx       # Card with trip + budget data
│   └── index.ts
└── dashboard-stats/
```

**What to add**:
- ✅ Compositions from multiple features
- ✅ Complex UI blocks for reuse
- ✅ Widgets with their own logic

**What NOT to add**:
- ❌ Simple UI components (put in shared)
- ❌ Entire pages (put in pages)

### 5. 📄 Pages Layer
**Purpose**: Application pages

**Structure**:
```
pages/
├── home/
│   ├── ui/HomePage.tsx       # Composition of widgets + features
│   └── index.ts
├── dashboard/
├── trips/
└── auth/
```

**What to add**:
- ✅ Pages as compositions of widgets and features
- ✅ Routing logic
- ✅ SEO metadata

### 6. 🚀 App Layer
**Purpose**: Application settings and providers

**Structure**:
```
app/
├── providers/              # React providers
├── router/                 # Routing
├── store/                  # Global state
└── App.tsx                 # Root component
```

## 🔄 Interaction Rules

### Imports (who can import whom):

```
app     → pages, widgets, features, entities, shared
pages   → widgets, features, entities, shared
widgets → features, entities, shared
features → entities, shared
entities → shared
shared  → nothing
```

### ✅ Correct imports:
```typescript
// In features/auth
import { Button } from 'shared/ui';
import { User } from 'entities/user';

// In widgets/header
import { useAuth } from 'features/auth';
import { Button } from 'shared/ui';

// In pages/dashboard
import { Header } from 'widgets/header';
import { CreateTripForm } from 'features/trip-management';
```

### ❌ Incorrect imports:
```typescript
// shared CANNOT import other layers
import { User } from 'entities/user'; // ❌

// entities CANNOT import features
import { useAuth } from 'features/auth'; // ❌

// features CANNOT import widgets/pages
import { Header } from 'widgets/header'; // ❌
```

## 📝 Naming Conventions

### Files and folders:
- **Components**: `PascalCase.tsx` (Button.tsx)
- **Hooks**: `camelCase.ts` with `use` prefix (useAuth.ts)
- **Types**: `camelCase.ts` (types.ts)
- **API**: `camelCase.ts` with `Api` suffix (userApi.ts)
- **Folders**: `kebab-case` (trip-management)

### Exports:
```typescript
// index.ts in each layer
export { Button } from './ui/Button';
export { useValidation } from './lib/useValidation';
export type { User } from './model/types';
```

## 🎯 How to Add New Functionality

### 1. New UI component (shared/ui):
```bash
mkdir src/shared/ui/NewComponent
# Create NewComponent.tsx and index.ts
# Add export to src/shared/ui/index.ts
```

### 2. New business entity (entities):
```bash
mkdir src/entities/new-entity/{model,api}
# Create types.ts, api.ts, index.ts
```

### 3. New feature (features):
```bash
mkdir src/features/new-feature/{ui,model,api}
# Create components, hooks, API
```

### 4. New widget (widgets):
```bash
mkdir src/widgets/new-widget/ui
# Composition from features + entities + shared
```

### 5. New page (pages):
```bash
mkdir src/pages/new-page/ui
# Composition from widgets + features
```

## 🔍 Usage Examples

### Creating login form:
1. **shared/ui**: Button, Input components
2. **shared/lib**: useForm hook, validation
3. **entities/user**: User types
4. **features/auth**: LoginForm component + useAuth hook
5. **pages/auth**: LoginPage as composition

### Adding new "Hotel" entity:
1. **entities/hotel**: Hotel, HotelBooking types
2. **entities/hotel/api**: hotelApi with search methods
3. **features/hotel-booking**: booking form
4. **widgets/hotel-card**: hotel card
5. **pages/hotels**: page with hotel list

## 🚨 Common Mistakes

1. **Importing from internal files**:
   ```typescript
   // ❌ Wrong
   import { LoginForm } from 'features/auth/ui/LoginForm';
   
   // ✅ Correct
   import { LoginForm } from 'features/auth';
   ```

2. **Breaking import hierarchy**:
   ```typescript
   // ❌ shared importing entities
   import { User } from 'entities/user';
   ```

3. **Mixing responsibilities**:
   ```typescript
   // ❌ Business logic in shared
   // ❌ UI components in entities
   ```

## 🎉 Architecture Benefits

- **Scalability**: Easy to add new features
- **Reusability**: Shared components everywhere
- **Isolation**: Each layer has clear responsibility
- **Testability**: Isolated units
- **Team collaboration**: Clear ownership boundaries
- **Refactoring**: Safe changes thanks to hierarchy

This architecture ensures sustainable project development and simplifies team collaboration!