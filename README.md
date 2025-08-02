# Laundry Reservation System (LavApp)

**A comprehensive serverless web application for managing laundry machine reservations in student housing**

## Project Overview

LavApp is a full-stack web application designed to streamline laundry machine reservations and usage tracking in student residential facilities. The system provides real-time management of washing machines, user reservations, and active wash cycles with automated scheduling and monitoring capabilities.

## Technology Stack

### Frontend
- **React 19** with **TypeScript** for type-safe component development
- **React Router DOM** for client-side routing and navigation
- **TailwindCSS** for utility-first styling and responsive design
- **HeroUI** component library for consistent and accessible UI components
- **React Hook Form** for efficient form handling and validation

### Backend & Infrastructure
- **Firebase Firestore** for real-time NoSQL database operations
- **Firebase Authentication** for secure user management
- **Firebase Cloud Functions** for serverless backend logic (mentioned in structure)

### Development Tools
- **Bun** as package manager for faster dependency management
- **Vite** as build tool and development server for optimized performance
- **TypeScript** for static type checking across the entire codebase
- **ESLint** with TypeScript support for code quality enforcement

## Project Structure

```
lavapp/
├── src/
│   ├── features/           # Feature-based architecture
│   │   ├── auth/           # Authentication (login, user management)
│   │   ├── reservations/   # Reservation system (booking, viewing)
│   │   └── washes/         # Active wash management
│   ├── components/         # Shared UI components
│   ├── context/           # React Context providers (AuthContext)
│   ├── hooks/             # Custom React hooks (useCountdown, useLiveWashers)
│   ├── layouts/           # Layout components (DefaultLayout)
│   ├── routes/            # Route protection and configuration
│   ├── utils/             # Utility functions and constants
│   └── styles/            # Global styles and CSS configuration
├── app/                   # React Router v7 app directory (future migration)
└── public/                # Static assets
```

## Key Features

### 🔐 Authentication System
- Secure login with email/password authentication
- User role management (user/fiscal)
- Protected routes with session management

### 🏠 Washer Management
- Real-time washer availability tracking
- Visual status indicators (available, in-use, resting, broken)
- Live updates using Firebase listeners

### 📅 Reservation System
- Time-limited reservations (5-minute expiration)
- Maximum 2 active reservations per user
- Automated reservation cleanup
- Historical reservation tracking with pagination

### 🧺 Wash Cycle Management
- Configurable wash duration with validation
- Real-time countdown timers
- Maximum wash time enforcement (2.4 hours + 15min rest)
- Wash completion tracking with penalties for overtime

### 📊 Real-time Data Synchronization
- Live washer status updates
- Active reservation monitoring
- Current wash progress tracking
- Automatic state management

## Development Approach

### Architecture Patterns
- **Feature-based organization** for scalable code structure
- **Custom hooks** for reusable stateful logic
- **Context API** for global state management
- **Service layer** pattern for API interactions

### Code Quality & Type Safety
- Comprehensive TypeScript coverage
- Consistent error handling with user-friendly notifications
- Responsive design with mobile-first approach
- Accessibility-compliant UI components

### Performance Optimizations
- **Vite** for fast development and optimized builds
- **Bun** for rapid package installation and management
- Efficient Firebase queries with pagination
- Component-level code splitting

## Getting Started

### Prerequisites
- Node.js 18+ or Bun runtime
- Firebase project with Firestore and Authentication enabled

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd lavapp

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Configure your Firebase credentials

# Start development server
bun dev
```

### Build for Production

```bash
# Create optimized production build
bun run build

# Preview production build locally
bun run preview
```

## Current Development Status

The application is actively in development with core functionality implemented including user authentication, reservation management, and wash cycle tracking. The system features a modern, responsive interface with real-time data synchronization and comprehensive error handling throughout the user experience.

## Contributing

This project follows a feature-based architecture. When contributing:

1. Create feature branches from `main`
2. Follow TypeScript best practices
3. Ensure responsive design compliance
4. Test Firebase integration thoroughly
5. Update documentation as needed

## License
