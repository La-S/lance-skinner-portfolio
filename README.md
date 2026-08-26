# Lancelot — Sharp Edge Technology

Portfolio site for Lancelot, a Christian software developer building apps for
Garmin smartwatches and mobile. Built with the Next.js App Router, with a
Git-based CMS (Keystatic) for editing the apps catalog and per-app media.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (via PostCSS — no `tailwind.config.js`)
- **Keystatic** CMS (Git-based, edits stored as files in this repo)
- **ESLint 9** (flat config)

> ⚠️ This is a **server-rendered Next.js app**, not a static export — it has
> dynamic routes (`/keystatic`, `/api/keystatic`) and uses `next/image`
> optimization. It needs a Node.js/SSR-capable host. See
> [`docs/deploy.md`](docs/deploy.md) for AWS hosting guidance.

## Prerequisites

- **Node.js 20.9+** (an `.nvmrc` is included → `nvm use`)
- npm

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build locally
npm run lint       # ESLint
```

## Project structure

- `app/` — routes (App Router). Each app has its own page, e.g. `app/holy-bible/`.
- `app/components/` — shared UI (ProductPage, WatchMarquee, AppsSection, …).
- `app/siteConfig.ts` — site URL + SEO constants.
- `keystatic.config.ts` — CMS schema (apps catalog + per-app media).
- `content/` — CMS content (JSON), edited via `/keystatic`.
- `public/images/` — assets (incl. `public/images/cms/` for CMS uploads).
- `docs/` — [CMS](docs/cms.md), [SEO](docs/seo.md), [Deploy](docs/deploy.md).

## Editing content

Content is managed through Keystatic at **`/keystatic`** (run `npm run dev`,
open <http://localhost:3000/keystatic>). Edits are written to files under
`content/` and `public/images/cms/` — **commit and push them** like code.

See [`docs/cms.md`](docs/cms.md) for the full guide (apps catalog, per-app
media, and the GitHub-mode notes).

> **Heads-up:** the CMS currently runs in **local mode** — edit on your machine
> and commit. Hosted editing (GitHub mode) is wired but disabled: the current
> Keystatic release's GitHub-mode admin UI doesn't render on Next 16. Re-enable
> it (one env var) once Keystatic ships Next 16 support. Details in `docs/cms.md`.

## Environment variables

Copy `.env.example` → `.env.local` (local) and set the same vars on your host
(production). The only one needed for a basic deploy:

- `NEXT_PUBLIC_SITE_URL` — your public domain (drives SEO/Open Graph + sitemap).

See [`docs/seo.md`](docs/seo.md) and `.env.example` for the rest.

## Notes for Claude Code

`CLAUDE.md` contains repo-specific guidance (notably the Next.js 16 caveats).
