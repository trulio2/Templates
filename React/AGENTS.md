# AGENTS.md — React + Vite + TypeScript Template

## Commands

| Task    | Command          |
| ------- | ---------------- |
| Dev     | `yarn dev`       |
| Build   | `yarn build`     |
| Lint    | `yarn lint`      |
| Preview | `yarn preview`   |
| Test    | _none installed_ |

No test framework is configured. To add one, install Vitest:

```
yarn add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Then add `"test": "vitest"` to package.json scripts. Run a single test with `yarn vitest <file-pattern>`.

## Architecture

- **Framework:** React 19, Vite 8, TypeScript 5.9 (strict), Tailwind CSS 4
- **State:** Zustand with `persist` middleware
- **Routing:** React Router v7 with auth guards
- **DI:** Custom IoC container (`src/ioc/index.ts`) using singleton pattern
- **Module pattern:** Each feature in `src/modules/<feature>/` has a `.store.ts` (Zustand), `.service.ts` (business logic, default export), and optionally `.repository.ts` (data access, default export)
- **i18n:** Custom translation system in `src/locale/` with interpolation and pluralization
- **Path alias:** `@/` maps to `./src/` (configured in tsconfig + vite.config)

## Code Style

### Imports

- Use `@/` alias for all internal imports: `import IoC from '@/ioc'`
- Use `import type { ... }` for type-only imports (enforced by `verbatimModuleSyntax: true`)
- Group imports: external libraries first, then `@/` internal imports, then relative imports
- Use barrel exports via `index.ts` for modules, hooks, and types

### Formatting

- No Prettier installed — follow existing file formatting
- 2-space indentation, single quotes for strings (per ESLint defaults)
- Semicolons required (TypeScript strict)

### Naming Conventions

- **Interfaces:** `I` prefix + PascalCase — `IAuthService`, `ICatsRepository`
- **Types (union/utility):** PascalCase without prefix — `User`, `Theme`, `Locale`
- **Service classes:** PascalCase + `Service` suffix — `AuthService` (default export)
- **Repository classes:** PascalCase + `Repository` suffix — `CatsRepository` (default export)
- **Zustand stores:** camelCase + `store` suffix — `authStore`, `catsStore` (named export)
- **Custom hooks:** camelCase, `use` prefix — `useTheme`, `useTranslation`
- **Constants:** UPPER_SNAKE_CASE — `SERVICES`, `REPOSITORIES`
- **Components:** PascalCase function declarations — `function Cats() { ... }` (default export)

### TypeScript

- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- Use non-null assertion (`!`) sparingly, only when DOM element is guaranteed
- Use `as` type assertions when narrowing event values: `e.target.value as Locale`
- Generic IoC usage: `IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)`

### Components

- Use **function declarations** (not arrow functions): `function Home() { ... }`
- Default export all components: `export default Home`
- Tailwind CSS classes inline in JSX; custom CSS variables via `var(--accent-bg)` etc.
- Page sections wrapped in `<section id="center">` with consistent layout structure
- Components can only communicate with services, so if you need something from a store or somewhere else, then create a function in a service that will provide it.

### Error Handling

- No global error boundary configured — add one if introducing error handling
- Service methods should throw or return typed results; stores handle error state
- Use Zustand store fields for loading/error states: `{ loading: boolean, error: string | null }`

### ESLint

- Flat config (`eslint.config.js`), ESLint 9.x
- Extends: `@eslint/js:recommended`, `typescript-eslint:recommended`, `react-hooks:recommended`, `react-refresh:vite`
- Ignores `dist/`, targets `**/*.{ts,tsx}`
- Run `yarn lint` before committing
