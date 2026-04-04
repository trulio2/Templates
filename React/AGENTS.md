# AGENTS.md

## Commands

```bash
yarn dev          # Start dev server
yarn build        # Type-check and build (tsc -b && vite build)
yarn lint         # Run ESLint on all files
yarn preview      # Preview production build
```

**No test framework is installed.** To add one, install Vitest + Testing Library:
```bash
yarn add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```
Then add `"test": "vitest"` and `"test:ui": "vitest --ui"` to scripts. Run a single test with `yarn vitest path/to/file.test.tsx`.

## Code Style

### Imports
- No semicolons
- Use explicit `type` keyword for type-only imports (`verbatimModuleSyntax` enforced)
- Use `@/` path alias for all `src/` imports (e.g., `@/types`, `@/modules`, `@/ioc`)
- Barrel exports via `index.ts` files in each directory
- Relative imports only for sibling files

### Formatting
- 2-space indentation
- Single quotes for strings
- Trailing commas in multi-line structures
- `function` keyword for React components (not arrow functions)
- Default exports for page components and services; named exports for stores, types, utilities

### TypeScript
- `strict: true` — no `any`, strict null checks enforced
- `noUnusedLocals` and `noUnusedParameters` enforced
- Interface names prefixed with `I` (`IAuthService`, `ICatsState`)
- Type aliases prefixed with `T` where applicable
- Type definition files: `*.types.ts` (plural) or `*.type.ts` (singular)
- Inline type literals for Zustand state types

### Naming Conventions
- Components: PascalCase (`Home.tsx`, `Login.tsx`)
- Services: PascalCase classes (`AuthService`)
- Stores: camelCase with `Store` suffix (`authStore`)
- Hooks: camelCase with `use` prefix (`useTranslation`)
- Constants: UPPER_SNAKE_CASE (`SERVICES`)
- Directories: kebab-case (`cats/`, `home/`, `login/`)

### Error Handling
- Guard clauses and early returns (no try/catch in current codebase)
- Form validation via early returns with string error messages
- Optional chaining (`user?.name`) and nullish coalescing (`??`) for fallbacks
- Null checks via early returns with redirects (e.g., `RequireAuth` guard)

### Architecture
- **IoC container**: singleton `IoC` class with `getOrCreateInstance<T>()` (`src/ioc/index.ts`)
- **Services**: classes implementing `I*Service` interfaces, registered in IoC
- **State**: Zustand stores with `persist` middleware for auth/locale
- **Routing**: react-router-dom v7 with `createBrowserRouter`, nested routes, route guards (`RequireAuth`, `RequireGuest`, `RequireRole`)
- **i18n**: custom translation system with `en`/`pt` locales, `{key}` interpolation, plural support
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin + CSS custom properties for theming

### ESLint
- Flat config (`eslint.config.js`), ESLint 9.x
- Extends: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- Targets `**/*.{ts,tsx}`, ignores `dist/`
