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

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Architecture**: Feature-Sliced Design (FSD)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TripRadar.WebUI-1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
src/
├── app/           # Application configuration
├── pages/         # Page components
├── widgets/       # Complex UI blocks
├── features/      # Business logic features
├── entities/      # Business entities
├── shared/        # Shared utilities and components
└── components/    # Reusable UI components
```

## Usage

1. **Home Page** - Landing page with platform overview
2. **Authentication** - Sign up or log in to access features
3. **Dashboard** - View your trips, budgets, and recent activities
4. **Trip Planning** - Create new trips and manage itineraries
5. **Budget Tracking** - Set budgets and track expenses
6. **Search** - Discover new destinations and travel options
7. **Profile** - Manage your account settings

## Development

The project follows Feature-Sliced Design architecture for better maintainability and scalability. Each feature is organized into layers with clear dependencies.

### Key Directories:

- `pages/` - Route-level components
- `features/` - Business logic (auth, budget-tracking, trip-management)
- `entities/` - Data models (user, trip, budget)
- `shared/` - Reusable utilities, UI components, and configurations
- `widgets/` - Composite UI blocks

## Contributing

1. Follow the existing code style and architecture patterns
2. Use TypeScript for type safety
3. Follow the Feature-Sliced Design principles
4. Run linting and formatting before committing

