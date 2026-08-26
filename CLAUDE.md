# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js Version Warning

This project uses **Next.js 16.2.6**, which has breaking changes from versions in your training data. Before writing or modifying any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices — APIs, conventions, and file structure may differ from what you know.

> Specific hint from the docs: If fixing slow client-side navigations, `Suspense` alone is not enough — you must also export `unstable_instant` from the route. Read `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.mdx` before touching navigation.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build
npm run lint     # ESLint (next core-web-vitals + typescript rules)
```

No test suite is configured.

## Architecture

This is a **Next.js App Router** portfolio site for Lancelot — a Christian software developer building apps for Garmin smartwatches and mobile.

- All routes live under `app/` using the App Router convention.
- `app/layout.tsx` — root layout; loads two Google Fonts as CSS variables:
  - `--font-yellowtail` (Yellowtail, decorative)
  - `--font-familjen` (Familjen Grotesk, body/sans)
- `app/globals.css` — imports Tailwind v4 via `@import "tailwindcss"` and registers the font variables under `@theme inline`.
- Path alias `@/*` resolves to the repo root (`./`).

## Stack

- **Next.js 16** (App Router only — no Pages Router)
- **React 19**
- **Tailwind CSS v4** — configured via PostCSS (`postcss.config.mjs`), not a `tailwind.config.js`
- **TypeScript** (strict mode)
- **ESLint 9** — flat config (`eslint.config.mjs`) using `eslint-config-next`
