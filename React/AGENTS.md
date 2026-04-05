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
- **i18n**: Custom system. Locale files in `src/locale/{en,pt}/`. Use the global `t(key, values?)` function anywhere — no hooks needed. Initialized in `src/setup/global.ts`.
- **Themes**: CSS files in `src/themes/` — imported in `main.tsx`. Theme switching via `ThemeService`.
- **Path alias**: `@` resolves to `./src` (configured in `vite.config.ts`).

## Conventions

- Services may depend on repositories or other services via IoC — follow the existing wiring pattern in `src/ioc/index.ts`.
- New modules should follow the `service + store + (optional) repository` pattern and be exported from their `index.ts` and `src/modules/index.ts`.
- Protected routes use wrapper components from `src/router/Layout.tsx`.
- Components can only communicate directly with services.

## Folder Structure

```text
src/
|   main.tsx
|
+---hooks
|       index.ts
|
+---ioc
|       index.ts
|
+---locale
|   |   index.ts
|   |
|   +---en
|   |       index.ts
|   |
|   \---pt
|           index.ts
|
+---modules
|   |   index.ts
|   |
|   +---auth
|   |       auth.repository.ts
|   |       auth.service.ts
|   |       auth.store.ts
|   |       index.ts
|   |
|   +---bitmex
|   |       bitmex.service.ts
|   |       bitmex.store.ts
|   |       index.ts
|   |
|   +---cats
|   |       cats.repository.ts
|   |       cats.service.ts
|   |       cats.store.ts
|   |       index.ts
|   |
|   +---locale
|   |       index.ts
|   |       locale.service.ts
|   |       locale.store.ts
|   |
|   +---root
|   |       index.ts
|   |       root.service.ts
|   |       root.store.ts
|   |
|   \---theme
|           index.ts
|           theme.service.ts
|           theme.store.ts
|
+---router
|       index.tsx
|       Layout.tsx
|
+---setup
|       global.ts
|
+---themes
|       dark-purple.css
|       dark.css
|       index.css
|       light.css
|
+---types
|       auth.types.ts
|       bitmex.types.ts
|       cats.type.ts
|       index.ts
|       locale.types.ts
|       repositories.types.ts
|       root.types.ts
|       services.type.ts
|       sidebar.types.ts
|       theme.type.ts
|       user.type.ts
|
\---views
    +---components
    |   |   index.tsx
    |   |
    |   +---button
    |   |       Button.tsx
    |   |
    |   +---input
    |   |       Input.tsx
    |   |
    |   \---sidebar
    |           Sidebar.tsx
    |
    \---pages
        |   index.tsx
        |
        +---admin
        |       Admin.tsx
        |
        +---cats
        |       Cats.tsx
        |
        +---home
        |       Home.css
        |       Home.tsx
        |
        +---login
        |       Login.tsx
        |
        \---notFound
                NotFound.tsx
```
