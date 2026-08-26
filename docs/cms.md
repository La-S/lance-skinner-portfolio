# Content editing (Keystatic CMS)

This site uses [Keystatic](https://keystatic.com) in **local mode** to edit the
apps catalog through a UI instead of editing TypeScript by hand. There is **no
external account or API key** — edits are written to a file in this repo, which
you then commit and push. The content travels with the Git history.

## Editing content

1. Run the dev server: `npm run dev`
2. Open <http://localhost:3000/keystatic>
3. Open **Apps catalog**. Add / edit / reorder / delete apps, then **Save**.
4. Saving writes to [`content/apps.json`](../content/apps.json). Commit & push
   it like any other change; the live site rebuilds from it.

### Fields per app
- **Name** — display name (also the carousel exclusion key).
- **Description** — one-line blurb shown on the card.
- **Page path** — internal route, e.g. `/holy-bible`. Blank = non-clickable card.
- **Icon path** — path under `/public`, e.g. `/images/holy-bible.svg`.
- **Show in other apps' carousels** — uncheck for unreleased teasers (the
  Mystery App) so they never appear in another page's "Other Apps" section.

## How it's wired

| Piece | File |
|-------|------|
| Schema / config | `keystatic.config.ts` |
| Content data | `content/apps.json` |
| Admin UI route | `app/keystatic/[[...params]]/page.tsx` |
| Admin backend | `app/api/keystatic/[[...params]]/route.ts` |
| Read side (site) | `app/components/appsCatalog.ts` → `getApps()` / `getOtherApps()` |

The site reads the catalog via Keystatic's Reader API in `appsCatalog.ts`. The
"Other Apps" carousels on every product page are driven by it. The home-page
grid (`app/components/AppsSection.tsx`) is intentionally **not** CMS-driven — it
carries per-card scroll-animation values, so it stays in code for now.

## App media (per-app images)

The **App media** collection holds per-app images. One entry per product page,
keyed by a slug that **must match the page route** (`holy-bible`, `maps4garmin`,
`race-day`, `offline-bible`, `audio-bible`, `in-town`). All six are pre-created.

Every field is optional — until you upload an image, the page keeps its current
look. Open an entry in `/keystatic` → **App media** → pick the app. Each entry
has a **Platform** switch that shows only the relevant fields:

**Garmin watch app** (Maps4Garmin, Holy Bible, Offline Bible, Audio Bible):

| Field | What it does |
|-------|--------------|
| **Hero image** | Watch render shown at the top of the page (hero). |
| **Features card image** | Watch render shown in the first "Features" card. Independent of the hero — they can be two different pictures. |
| **Watch strip screenshots** | Composited into the watch screens in the scrolling watch strip. Cycled across the watches in order. Use square / circular Garmin watch-screen captures. |

**Mobile app** (In Town, Race Day):

| Field | What it does |
|-------|--------------|
| **Mobile app screenshots** | Phone screenshots for the hero gallery, each with a short caption. |

> Switching an app's **Platform** swaps which fields show. Mobile screenshots
> never appear on Garmin apps, and watch images never appear on mobile apps.

> **Adding several images:** Keystatic uploads one file per "Add" (its picker is
> single-file — there's no batch select). For a multi-image field, click **Add**,
> choose a file, repeat. Items can then be reordered by dragging.

Uploaded files are written under `public/images/cms/products/` and committed
alongside the JSON entry in `content/products/<app>.json`.

| Piece | File |
|-------|------|
| Schema | `keystatic.config.ts` → `collections.products` |
| Content data | `content/products/<app>.json` |
| Uploaded images | `public/images/cms/products/` |
| Read side (site) | `app/components/productMedia.ts` → `getProductMedia(slug)` |
| Watch-strip render | `app/components/WatchMarquee.tsx` |
| Mobile-shots render | `app/components/HeroScreenshots.tsx` |

The watch-strip compositing relies on per-body screen-circle geometry baked into
`WatchMarquee.tsx` (`SCREENS`). If the watch artwork in `WatchBodiesSprite.tsx`
ever changes, re-measure those circles.

## GitHub mode — editing from the hosted site

By default the CMS uses **local mode** (edits write to files you commit). Storage
is env-driven (`keystatic.config.ts`), so you can switch the *deployed* admin to
**GitHub mode** — where edits commit straight to the repo from `your-site.com/keystatic`
— without breaking local dev. One-time setup:

1. **Push this repo to GitHub** (it isn't on a remote yet). Create a repo, then:
   ```bash
   git remote add origin git@github.com:OWNER/REPO.git
   git push -u origin main
   ```
2. **Set the repo env var** so the admin knows which repo to write to. Locally,
   add to `.env.local` (see `.env.example`); in production set it on your host:
   ```
   NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=OWNER/REPO
   ```
3. **Run the GitHub App wizard:** start the app and open `/keystatic`. Because the
   repo is set but the GitHub App credentials aren't, Keystatic shows a setup flow
   that **creates a GitHub App for you and writes the four secrets into `.env`**
   (`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`).
4. **Copy those four secrets into your host's env vars** (e.g. Vercel → Settings →
   Environment Variables) alongside `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`, and redeploy.

> Tip for local dev: leave `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` **unset** in
> `.env.local` to keep using fast local mode while developing, and only set it in
> production. Either way nothing breaks — local mode is the fallback.

## Going further (optional)
- **More content types:** add collections/singletons in `keystatic.config.ts`
  (e.g. move each product page's copy into the CMS).
