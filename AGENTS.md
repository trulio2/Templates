# AGENTS.md - React Template Guidelines

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

**Note:** No test framework is configured. Add Vitest/Jest before writing tests.

## Project Structure

```
src/
  main.tsx              # Entry point
  setup/                # App initialization config
  router/               # React Router v7 config
  ioc/                  # Dependency injection container
  hooks/                # Custom hooks (useTheme, useTranslation)
  locale/               # Translation files (en, pt)
  modules/              # Feature modules (auth, cats, theme, locale)
    <module>/
      <module>.service.ts    # Business logic (implements interface)
      <module>.store.ts      # Zustand state
      <module>.repository.ts # Data access layer
      index.ts               # Barrel exports
  types/                # TypeScript interfaces and types
  views/
    pages/              # Route-level components
    components/         # Shared UI components
```

## Code Style

### Imports
- Use `@/` path alias for all src imports (e.g., `import { X } from '@/types'`)
- Group imports: external libs → `@/` modules → relative imports
- Use `type` keyword for type-only imports: `import { type User } from '@/types'`
- Default exports for components/services; named exports for types/hooks

### TypeScript
- **Strict mode enabled** — no `any`, explicit types required
- `noUnusedLocals` and `noUnusedParameters` are enforced
- Define interfaces for services (e.g., `IAuthService`) and implement them
- Use `type` for unions/aliases, `interface` for object shapes
- Barrel export types via `src/types/index.ts`

### Components
- Functional components only (no class components)
- PascalCase for component names and files
- Default export page components
- Use Tailwind CSS v4 utility classes for styling
- Keep components small and focused

### State Management (Zustand)
- Define state type explicitly: `type AuthState = { user: User | null; setUser: ... }`
- Use `persist` middleware when state should survive reloads
- Access state via selectors: `authStore((state) => state.user)`
- Updates via `set()` in store or `getState()` in services

### Services & DI
- Services are classes implementing interfaces (e.g., `class AuthService implements IAuthService`)
- Access via IoC container: `IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)`
- Service constants defined in `SERVICES` enum
- Repository pattern for data access layer

### Custom Hooks
- Prefix with `use` (e.g., `useTheme`, `useTranslation`)
- Export from `src/hooks/index.ts` barrel
- Instantiate services outside hook body to avoid recreation

### Naming Conventions
- Components: `PascalCase` (Home.tsx, Sidebar.tsx)
- Services/Stores: `camelCase` with domain prefix (auth.service.ts, cats.store.ts)
- Types/Interfaces: `PascalCase` with `I` prefix for interfaces (IAuthService)
- Constants/Enums: `UPPER_SNAKE_CASE` (SERVICES)
- Hooks: `camelCase` with `use` prefix (useTheme)

### Error Handling
- No global error boundary configured — add one for production
- Services return boolean/null for simple operations
- No try/catch in current codebase — add for async operations

### Routing
- React Router DOM v7 with `createBrowserRouter`
- Route guards as components: `RequireAuth`, `RequireGuest`, `RequireRole`
- Nested routes with `<Outlet />`
- Layout pattern with Sidebar + main content

### ESLint
- Config: `eslint.config.js` (flat config)
- Plugins: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- Ignores `dist/` directory
- Run `npm run lint` before committing
