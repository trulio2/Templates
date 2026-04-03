# AGENTS.md

Repository guide for agentic coding in this React template.

## Scope
- This repo is a Vite + React + TypeScript template.
- Source lives in `src/`.
- Path alias `@/*` maps to `src/*`.
- Current stack: React 19, React Router 7, Zustand, Tailwind CSS 4, TypeScript, ESLint 9.

## Tooling
- Package manager: `yarn` is the expected choice here because `yarn.lock` is present.
- Main scripts are defined in `package.json`.
- No Cursor rules were found in `.cursor/rules/` or `.cursorrules`.
- No Copilot instructions were found in `.github/copilot-instructions.md`.

## Common Commands
- Install dependencies: `yarn install`
- Start dev server: `yarn dev`
- Build for production: `yarn build`
- Run lint: `yarn lint`
- Preview production build: `yarn preview`

## Tests
- There is currently no test runner configured in `package.json`.
- There are no `*.test.*` or `*.spec.*` files in the repo.
- Single-test execution is therefore not available yet.
- If tests are added later, prefer a file-targeted command and document it here.

## Build Notes
- `yarn build` runs `tsc -b` first, then `vite build`.
- TypeScript errors will fail the build before bundling starts.
- `src/` is the only included app source directory in `tsconfig.app.json`.

## Lint Notes
- `yarn lint` runs ESLint across the whole repo.
- The active config targets `**/*.{ts,tsx}`.
- `dist/` is globally ignored by ESLint.
- Keep changes lint-clean before handing work back.
- Current baseline lint failures are in `src/ioc/index.ts` (`no-explicit-any`) and
  `src/router/index.tsx` (`react-refresh/only-export-components`).

## Features

### Authentication & Authorization
- **AuthStore** (`src/modules/auth/auth.store.ts`): Zustand store with `persist` middleware, stores auth state to `auth-storage` in localStorage
- **AuthService** (`src/modules/auth/auth.service.ts`): Simple mock auth - accepts any username/password, creates admin user
- **Role-based access control**: Routes support role-based guards (e.g., `RequireRole("admin")`)

### Pages & Routes
| Route | Component | Guard | Purpose |
|-------|-----------|-------|---------|
| `/` | `Home` | None | Welcome message, shows user name if logged in |
| `/login` | `Login` | `RequireGuest` | Login form, redirects if already logged in |
| `/cats` | `Cats` | `RequireAuth` | Increment/decrement cat counter |
| `/admin` | `Admin` | `RequireRole("admin")` | Admin-only page with counter demo |

### Route Guards (`src/router/index.tsx`)
- `RequireAuth`: Redirects to `/login` if no user
- `RequireGuest`: Redirects to `/` if already logged in
- `RequireRole({ role })`: Checks user role before access
- All guards use the `Outlet` pattern for nested rendering

### Layout
- `RootLayout` (`src/router/index.tsx`): Provides sidebar navigation + Outlet
- `Sidebar` (`src/router/Sidebar.tsx`): Collapsible navigation with active link styling

### Service-Store Architecture
- **Stores**: Zustand stores for state management, live alongside their feature module
- **Services**: Business logic wrappers around stores, implement typed interfaces
- **IoC Container** (`src/ioc/index.ts`): Singleton pattern for lazy service instantiation and DI
- Service interfaces: `IAuthService`, `ICatsService`
- `CatsService` demonstrates constructor DI by receiving `IAuthService`

### Barrel Exports
Each feature module uses barrel exports via `index.ts`:
- `src/modules/index.ts` - exports all modules
- `src/modules/auth/index.ts` - exports auth module
- `src/modules/cats/index.ts` - exports cats module
- `src/types/index.ts` - exports all shared types

## File Organization
- Keep feature code grouped by domain, as the repo already does.
- Current top-level source areas:
  - `src/router/` - routing config, sidebar, layout guards
  - `src/views/pages/` - page components (Home, Login, Cats, Admin)
  - `src/modules/` - feature modules with stores and services
  - `src/types/` - shared TypeScript interfaces and types
  - `src/ioc/` - inversion of control container
- Add new code beside the closest related feature, not in a catch-all folder.

## Imports
- Prefer the `@/` alias for imports from `src/`.
- Use relative imports for siblings inside the same small feature folder.
- Keep imports grouped as:
  - external packages
  - internal aliases
  - relative imports
  - styles
- Use type-only imports with `type`, matching existing code.
- Keep import lists ordered and minimal.
- Avoid unused imports; TypeScript strictness and ESLint should catch them.

## TypeScript
- The project uses `strict: true`.
- Prefer explicit types for exported interfaces and public methods.
- Use `interface` for service contracts and public domain shapes where that matches the codebase.
- Use `type` aliases for local state objects and unions.
- Keep parameter and return types explicit on public APIs.
- Avoid `any` unless you are constrained by existing code and cannot improve it safely.
- Prefer `null` over `undefined` where the repo already uses `null` for absence.

### Key Types
```typescript
interface User { name: string; role: string }
interface IAuthService { getUser(): User | null; setUser(data: User): void; login(username: string, password: string): boolean; logout(): void }
interface ICatsService { getCats(): number; addCat(): void; removeCat(): void; userName(): string }
```

## Naming
- Components use PascalCase file names and default exports, e.g. `Home.tsx`.
- Services use PascalCase classes and filenames like `auth.service.ts`.
- Stores use camelCase exports like `authStore` and `catsStore`.
- Types and interfaces use PascalCase, e.g. `IAuthService`, `User`.
- Constants use uppercase names, e.g. `SERVICES`.
- Route guards and helpers use descriptive verb-based names like `RequireAuth`.

## React Patterns
- Keep function components small and focused.
- Prefer local helper functions inside a component when they are only used there.
- Use hooks at the top level of components.
- Follow the existing pattern of exporting one default component per page file.
- Keep router guards simple and explicit.
- Use `Outlet` for nested route layouts and guards.

## State and Services
- Zustand stores live alongside their feature and expose the store instance directly.
- Services are thin wrappers over store state and other services.
- The IoC container is used to lazily create shared service instances.
- Preserve the existing service/store separation when adding new features.
- If you add a new service, register it through `src/ioc/index.ts` and `src/types/services.type.ts`.

## Error Handling
- The current codebase has minimal explicit error handling.
- Prefer failing early and clearly instead of hiding errors.
- Do not swallow errors unless there is a deliberate fallback.
- If you add async code, handle rejected promises explicitly.
- If you add user-facing failures, surface a clear message rather than logging only.

## Logging
- Avoid adding new `console.log` calls.
- Remove temporary logs before finishing work.
- Keep runtime output intentional and low-noise.

## Formatting
- Follow the existing Prettier-like style enforced by ESLint/TypeScript.
- Use single quotes.
- Omit semicolons.
- Use two-space indentation.
- Prefer trailing commas where the formatter naturally keeps them.
- Keep line breaks consistent with the current files.

## CSS
- **Tailwind CSS v4** is the primary styling approach (via `@tailwindcss/vite` plugin)
- **CSS Variables** for theming with light/dark mode support (`@media (prefers-color-scheme: dark)`)
- Global variables: `--text`, `--text-h`, `--bg`, `--border`, `--accent`, `--accent-bg`, `--sans`, `--heading`, `--mono`
- Component styles live next to the component
- Global styles live in `src/index.css`
- Router-specific styles in `src/router/router.css`
- Keep class names descriptive and feature-scoped
- Preserve existing responsive patterns and layout structure

## Editing Discipline
- Make the smallest change that correctly solves the task.
- Do not refactor unrelated code while touching a feature.
- Do not rename public paths, exports, or service IDs unless required.
- If a change touches multiple layers, keep the API shape consistent.
- Avoid adding abstraction unless there is repeated code or a clear need.

## Verification
- After code changes, prefer running at least:
  - `yarn lint`
  - `yarn build`
- For UI changes, also sanity-check the relevant route in `yarn dev`.
- If a command fails, fix the root cause rather than papering over it.

## Repository Conventions Observed
- Route definitions live in `src/router/index.tsx`.
- App bootstrap lives in `src/main.tsx`.
- Shared type exports are centralized in `src/types/index.ts`.
- Shared module exports are centralized in `src/modules/index.ts`.
- The IoC container currently instantiates `AuthService` and `CatsService`.

## When In Doubt
- Match the style of nearby code.
- Keep changes local.
- Prefer explicitness over cleverness.
- If a new rule conflicts with existing code, follow the existing code unless you are intentionally fixing it.
