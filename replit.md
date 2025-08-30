# EMR Professional - Electronic Medical Records System

## Overview

This is a comprehensive Electronic Medical Records (EMR) system built with React and Express, designed for Vietnamese healthcare facilities. The application provides patient management, medical record keeping, department switching, and healthcare workflow management. It features a modern UI built with shadcn/ui components and Tailwind CSS, with a focus on Vietnamese language support and healthcare-specific workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern React features
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing
- **shadcn/ui** component library providing accessible, customizable UI components
- **Tailwind CSS** for utility-first styling with custom healthcare-themed design tokens
- **TanStack Query** for server state management and caching
- **React Hook Form** with Zod validation for form handling

### Backend Architecture
- **Express.js** server with TypeScript support
- **In-memory storage** using a Map-based storage system for development/testing
- **RESTful API** design with `/api` prefix for all endpoints
- **Session-based** request logging and error handling middleware

### Data Layer
- **Drizzle ORM** configured for PostgreSQL with schema-first approach
- **PostgreSQL** database (configured but not actively used in current implementation)
- **Zod schemas** for runtime type validation and API contract enforcement
- Database migrations managed through `drizzle-kit`

### UI Component System
- **Design System**: Implements a cohesive design language with CSS custom properties
- **Accessibility**: Built on Radix UI primitives ensuring ARIA compliance
- **Responsive Design**: Mobile-first approach with breakpoint-aware components
- **Theme Support**: CSS variables for consistent theming across light/dark modes

### State Management
- **Server State**: TanStack Query for API data fetching, caching, and synchronization
- **Client State**: React hooks (useState, useContext) for local component state
- **Form State**: React Hook Form for complex form handling with validation

### Development Workflow
- **TypeScript**: Strict type checking across frontend, backend, and shared schemas
- **Hot Reloading**: Vite dev server with HMR for rapid development
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)
- **Replit Integration**: Custom plugins for development environment optimization

### Key Features Architecture
- **Patient Management**: Complete CRUD operations with modal-based editing
- **Department Switching**: Context-aware department selection with persistent state
- **Medical Records**: Structured data handling for patient information and medical history
- **Calendar Integration**: Real-time clock and date display with Vietnamese localization
- **Notification System**: Toast-based feedback and alert management

### Security Considerations
- **Input Validation**: Zod schemas for all user inputs
- **Type Safety**: End-to-end TypeScript coverage
- **Error Boundaries**: Graceful error handling with user-friendly messages

### Performance Optimizations
- **Code Splitting**: Vite handles automatic chunking for optimal loading
- **Component Lazy Loading**: Strategic component loading for better initial page load
- **Query Caching**: TanStack Query provides intelligent data caching
- **Asset Optimization**: Vite optimizes images, fonts, and other static assets

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver for database connectivity
- **drizzle-orm** and **drizzle-kit**: Type-safe SQL query builder and migration tool
- **@tanstack/react-query**: Server state management and data fetching
- **wouter**: Lightweight routing library for React applications

### UI Component Libraries
- **@radix-ui/***: Comprehensive set of accessible, unstyled UI primitives
- **class-variance-authority**: Utility for creating type-safe CSS class variants
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Feather-based icon library

### Form and Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation library resolvers for React Hook Form
- **zod**: TypeScript-first schema validation library

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **postcss** and **autoprefixer**: CSS processing and browser compatibility

### Date and Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx** and **tailwind-merge**: Utility for constructing className strings
- **nanoid**: URL-safe unique string ID generator