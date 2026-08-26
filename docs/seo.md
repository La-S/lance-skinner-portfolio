# SEO & link sharing

What's wired up and the one thing you must set before publishing.

## Required: set your domain

All absolute URLs (Open Graph tags, sitemap, robots) come from
`NEXT_PUBLIC_SITE_URL`. Until it's set they fall back to `https://your-domain.com`.

Set it on your host (e.g. Vercel → Settings → Environment Variables), and in
`.env.local` for local testing:

```
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

## What's included

| Feature | File | Notes |
|---------|------|-------|
| Site metadata (title, description, `metadataBase`) | `app/layout.tsx` | Defaults for every page. |
| Open Graph + Twitter tags | `app/layout.tsx` | `og:title`/`og:description` fall back to each page's own title/description automatically. `summary_large_image` Twitter card. |
| Social share image (1200×630) | `app/opengraph-image.tsx` | Generated at build with `next/og`; applied site-wide. Edit the JSX to restyle. |
| Sitemap | `app/sitemap.ts` → `/sitemap.xml` | Lists every public route (`app/siteConfig.ts` → `SITE_ROUTES`). Add new pages there. |
| robots.txt | `app/robots.ts` → `/robots.txt` | Allows everything except `/keystatic` and `/api/keystatic`; points to the sitemap. |

Per-page `<title>` and `description` already live in each route's `metadata`
export, so search results and shared links show page-specific text.

## Adding a new page

Add its path to `SITE_ROUTES` in `app/siteConfig.ts` so it lands in the sitemap.
Give the page its own `metadata` `{ title, description }` for good per-page tags.

## Verify before launch

After setting `NEXT_PUBLIC_SITE_URL` and deploying, paste your URL into a preview
tool (e.g. opengraph.xyz or a social platform's card validator) to confirm the
title, description, and share image render correctly.
