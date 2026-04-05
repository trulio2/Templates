# AGENTS.md

## Commands

| Task          | Command                                    |
| ------------- | ------------------------------------------ |
| Dev server    | `yarn dev`                                 |
| Build         | `yarn build` (runs `tsc -b && vite build`) |
| Lint          | `yarn lint`                                |
| Preview build | `yarn preview`                             |

No test framework is configured.

## Architecture

- **Entry**: `src/main.tsx` — renders `<RouterProvider>` with routes from `src/router/`
- **Router**: `src/router/index.tsx` — React Router v7 with lazy-loaded pages and auth guards (`RequireAuth`, `RequireGuest`, `RequireRole`)
- **IoC**: `src/ioc/index.ts` — singleton DI container. All services/repositories are resolved through `IoC.getOrCreateInstance()`. Do not instantiate services directly.
- **Modules**: `src/modules/` — each module exports a service, store, and optionally a repository. Barrel re-exported from `src/modules/index.ts`.
  - `auth/` — auth service + store
  - `bitmex/` — BitMEX WebSocket service + store
  - `cats/` — cats service, repository, store
  - `locale/` — locale service + store (custom i18n, no external lib)
  - `root/` — root service + store
  - `theme/` — theme service + store
- **State**: Zustand stores live inside each module (`*.store.ts`). Access via `create()` from zustand.
- **i18n**: Custom system. Locale files in `src/locale/{en,pt}/`. Use `useTranslation()` hook from `src/hooks/`.
- **Themes**: CSS files in `src/themes/` — imported in `main.tsx`.
- **Path alias**: `@` resolves to `./src` (configured in `vite.config.ts`).

## Conventions

- Services may depend on repositories or other services via IoC — follow the existing wiring pattern in `src/ioc/index.ts`.
- New modules should follow the `service + store + (optional) repository` pattern and be exported from their `index.ts` and `src/modules/index.ts`.
- Protected routes use wrapper components from `src/router/Layout.tsx`.
- Components can only communicate directly with services.
