# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint the codebase
npm run lint
```

## Project Architecture

This is a **Next.js 15** application featuring a Bauhaus brutalism-inspired design system for an "App Idea Directory" - a platform showcasing stolen app ideas in a bold, geometric aesthetic.

### Core Structure

- **Next.js App Router**: Uses the new app directory structure (`app/`)
- **Database Integration**: Supabase PostgreSQL with custom SQL functions
- **Component Library**: shadcn/ui components with heavy Brutalist customization
- **Styling**: Tailwind CSS with custom Bauhaus-inspired color scheme and brutal shadows

### Component Organization

```
components/
├── app-idea-directory.tsx          # Main application component
├── idea-card.tsx                   # Individual idea card component
├── sections/                       # Landing page sections
│   ├── hero-section.tsx           # Hero with stats and email signup
│   ├── filters-section.tsx        # Search and filter controls
│   ├── ideas-grid.tsx             # Grid layout for idea cards
│   ├── results-count.tsx          # Results counter display
│   └── footer-section.tsx         # Site footer
└── ui/                            # shadcn/ui component library
```

### Library Structure

```
lib/
├── supabase.ts                    # Supabase client and types
├── ideas.ts                       # Idea CRUD operations
├── filters.ts                     # Filtering and sorting utilities
├── constants.ts                   # App constants and filter options
└── utils.ts                       # General utilities
```

### Key Features

- **Modular Architecture**: Each section is a separate component for maintainability
- **Real-time Data**: Connected to Supabase for live data fetching
- **Advanced Filtering**: Category, type, date, and text search capabilities
- **Click Tracking**: Automatic increment of view counts
- **Responsive Design**: Mobile-first with Brutalist aesthetic

### Database Schema

The application uses a single `ideas` table with:
- Full-text search capabilities across title, description, sourceName
- Filtering by category, type, date ranges
- Click tracking with increment function
- Automatic timestamp management
- Rich metadata including problem/solution descriptions

### Design System

- **Color Scheme**: Forest green primary, Bauhaus blue secondary, bright yellow accents
- **Typography**: Mono font default with sans-serif for headings
- **Visual Style**: Heavy borders (8px), brutal shadows, high contrast
- **Custom CSS Classes**: `.shadow-brutal`, `.shadow-brutal-inverse`, `.shadow-brutal-white`

### Environment Setup

Requires Supabase environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development Notes

- **TypeScript Configuration**: Build errors and ESLint ignored in production build
- **Image Optimization**: Disabled in Next.js config  
- **Package Manager**: Uses npm with legacy peer deps for compatibility
- **Database Scripts**: SQL setup files in `scripts/` directory for Supabase initialization