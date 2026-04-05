# React Template

A production-ready React template with TypeScript, featuring a modular architecture with dependency injection, state management, routing guards, internationalization, and theming.

## Tech Stack

- **React 19** with TypeScript
- **Vite** — build tool and dev server
- **React Router v7** — client-side routing with lazy loading
- **Zustand** — state management with persistence middleware
- **Tailwind CSS v4** — utility-first styling
- **Axios** — HTTP client
- **ESLint** — code linting (flat config)

## Getting Started

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev

# Build for production
yarn build

# Lint code
yarn lint

# Preview production build
yarn preview
```

## Architecture

```
src/
├── main.tsx              # App entry — renders RouterProvider
├── setup/                # App initialization logic
├── ioc/                  # Dependency injection container (singleton)
├── router/               # Route definitions + layout/guard components
├── modules/              # Feature modules (service + store + optional repository)
│   ├── auth/             # Authentication
│   ├── bitmex/           # BitMEX WebSocket integration
│   ├── cats/             # Demo feature with external API
│   ├── locale/           # Internationalization
│   ├── root/             # App-level state
│   └── theme/            # Theme management
├── hooks/                # Shared custom hooks
├── views/                # UI layer
│   ├── pages/            # Route-level page components
│   └── components/       # Reusable UI components
├── locale/               # Translation files (en, pt)
├── themes/               # CSS theme files
├── types/                # Shared TypeScript interfaces and types
└── setup/                # App initialization
```

## Core Patterns

### Dependency Injection (IoC)

All services and repositories are managed by a singleton IoC container. Never instantiate services directly — always use `IoC.getOrCreateInstance()`.

```typescript
import IoC from '@/ioc'
import { SERVICES, type ICatsService } from '@/types'

const catsService = IoC.getOrCreateInstance<ICatsService>(SERVICES.CATS)
```

Services can depend on other services or repositories. Dependencies are wired in `src/ioc/index.ts`:

```typescript
case SERVICES.CATS:
  newInstance = new CatsService(
    this.getOrCreateInstance<IAuthService>(SERVICES.AUTH),
    this.getOrCreateInstance<ICatsRepository>(REPOSITORIES.CATS)
  )
```

### Module Structure

Each feature module follows a consistent pattern:

- **Service** (`*.service.ts`) — business logic, interacts with stores and repositories
- **Store** (`*.store.ts`) — Zustand state, co-located with the module
- **Repository** (`*.repository.ts`) — data access layer (optional, for external APIs)
- **Barrel export** (`index.ts`) — re-exports service and repository

Modules are barrel re-exported from `src/modules/index.ts`.

### State Management

Zustand stores live inside each module. Services read/write state via `getState()` for mutations and selector functions for subscriptions:

```typescript
// Subscribe (in components)
const cats = catsStore((state) => state.cats)

// Mutate (in services)
const { setCats } = catsStore.getState()
setCats(cats + 1)
```

The auth store uses Zustand's `persist` middleware to save user data to localStorage.

### Routing & Guards

Routes are defined in `src/router/index.tsx` using React Router v7 with lazy-loaded pages:

- **`RequireAuth`** — redirects to `/login` if no authenticated user
- **`RequireGuest`** — redirects to `/` if user is already authenticated
- **`RequireRole`** — checks user role and redirects if insufficient permissions
- **`LazyPage`** — wraps pages with `Suspense` and a loading spinner

### Internationalization

Custom i18n system (no external library). Translations are plain objects in `src/locale/{en,pt}/`. Components should use `useLocale()` from `src/hooks` to access `locale`, `setLocale`, and `t`:

```typescript
const { t, locale, setLocale } = useLocale()

t('pages.cats.hasCats', { name: 'Alice', count: 5 })
// → "Alice has 5 cats"
```

Supported locales: English (`en`), Portuguese (`pt`).

### Theming

Three themes available: `light`, `dark`, `dark-purple`. Themes are CSS files in `src/themes/` imported in `main.tsx`.

## Features

### Authentication

- Mock login/logout (accepts any non-empty username + password)
- User data persisted to localStorage via Zustand persist
- Role-based access (`admin` / `user`)

### Pages

| Route    | Guard              | Description                                           |
| -------- | ------------------ | ----------------------------------------------------- |
| `/`      | None               | Home page with greeting                               |
| `/login` | RequireGuest       | Login form                                            |
| `/cats`  | RequireAuth        | Cat counter with random cat images from thecatapi.com |
| `/admin` | RequireRole: admin | Admin-only page                                       |
| `*`      | None               | 404 Not Found                                         |

### Sidebar

- Collapsible navigation with smooth transitions
- Dynamic links based on auth state and user role
- Locale selector (en/pt)
- Theme selector (light/dark/dark-purple)
- Logout button

### BitMEX WebSocket

Real-time trade data subscription from BitMEX WebSocket (`trade:XBTUSD`). Demonstrates WebSocket integration within the DI container with proper socket lifecycle management.

## Path Aliases

`@` resolves to `./src` (configured in `vite.config.ts`).

## Adding a New Module

1. Create directory under `src/modules/your-module/`
2. Add `your-module.service.ts`, `your-module.store.ts`, and optionally `your-module.repository.ts`
3. Export from `src/modules/your-module/index.ts`
4. Register in `src/modules/index.ts`
5. Wire dependencies in `src/ioc/index.ts`
6. Add types to `src/types/`

## Adding a New Locale

1. Create `src/locale/{code}/index.ts` following the `ITranslations` interface
2. Export from `src/locale/index.ts`
3. Add to locale selector in `Sidebar.tsx`

## Adding a New Theme

1. Create `src/themes/your-theme.css`
2. Import in `src/themes/index.css`
3. Add to `Theme` type in `src/types/theme.type.ts`
4. Add to theme selector in `Sidebar.tsx`
