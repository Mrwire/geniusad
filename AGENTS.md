# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router pages, layouts, and API routes.
- `src/components`: Reusable React components (TSX, mostly kebab-case filenames).
- `src/lib`, `src/utils`, `src/hooks`: Shared logic, helpers, and hooks.
- `src/i18n`: Internationalization config and message files.
- `src/styles`: Global and theme CSS (Tailwind enabled).
- `sanity/`: Sanity Studio schemas and structure; Studio served at `/studio`.
- `public/`: Static assets (images, icons). 

## Build, Test, and Development Commands
- `npm run dev`: Start the dev server at `http://localhost:3000`.
- `npm run build`: Production build (`.next/`).
- `npm start`: Launch the production server.
- `npm run lint`: Run ESLint with Next.js/TypeScript rules.
- Type check: `npx tsc --noEmit` (uses `tsconfig.json`).

## Coding Style & Naming Conventions
- **Language**: TypeScript, React 18, Next.js 14 App Router.
- **Formatting**: Prettier (2 spaces, single quotes, semi, width 100) with `prettier-plugin-tailwindcss`.
- **Linting**: ESLint (`next/core-web-vitals`, TypeScript, `unused-imports`, organized imports).
- **Files**: Components in `src/components` with descriptive kebab-case; exports named where reasonable.
- **Imports**: Prefer `@/*` alias for `src/*` (see `tsconfig.json`).

## Testing Guidelines
- No formal test runner is configured yet. For additions, prefer **Vitest** for unit tests and **Playwright** for e2e.
- Suggested patterns: colocate `*.test.ts(x)` beside source or use `tests/`.
- Minimum checks before PR: `npm run lint` and `npx tsc --noEmit`.

## Commit & Pull Request Guidelines
- **Commits**: Use Conventional Commits (e.g., `feat: add hero carousel`, `fix: correct image domain config`).
- **PRs**: Provide a clear summary, link issues, and include screenshots or clips for UI changes. Note any i18n strings added/changed (`src/i18n/messages/*`).
- **Scope**: Keep PRs focused; update docs when touching `sanity/` schemas or public API.

## Security & Configuration Tips
- Secrets via `.env.local` (never commit): e.g., `NEXTAUTH_SECRET`, Sanity tokens, API keys.
- Images/domains are restricted in `next.config.js`; update when integrating new asset hosts.
- Sanity configuration lives in `sanity.config.ts` and `sanity/`; validate schema changes locally at `/studio`.

