# Deployment

This is a **server-rendered Next.js 16 app**, not a static site. Plan hosting
accordingly.

## What the app needs from a host

- **A Node.js server runtime (SSR).** It is *not* a static export:
  - `/keystatic` and `/api/keystatic/[[...params]]` are dynamic routes.
  - `next/image` runs an image optimizer at request time.
  - So **plain S3 + CloudFront (static only) will not work as-is.**
- **Node.js 20.9+** for the build (see `.nvmrc`).
- Build/run:
  ```bash
  npm ci
  npm run build
  npm run start   # serves the production build (default port 3000)
  ```

## AWS options (pick one)

| Option | Notes |
|--------|-------|
| **AWS Amplify Hosting** | Native managed Next.js SSR support — connect the GitHub repo, it builds & hosts. Easiest path; handles SSR + image optimization for you. |
| **OpenNext** (`open-next` / SST) | Deploys Next.js onto Lambda + CloudFront + S3. More control, infra-as-code. Good if the rest of the stack is AWS-native. |
| **Container** (ECS/Fargate, App Runner, or Elastic Beanstalk) | Dockerize `next start` (Next supports `output: "standalone"` for a slim image). Straightforward Node server. |

Avoid: trying to `next export` / static-only S3 — it'll break on the dynamic
routes and the image optimizer.

### If a fully static build is ever required
You'd need to (a) remove or externalize the Keystatic admin/API routes, and
(b) set `images: { unoptimized: true }` (or a custom loader) in `next.config`.
Not recommended — the managed/SSR options above are simpler.

## Environment variables to set on the host

| Var | Required | Purpose |
|-----|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Public domain — drives Open Graph/Twitter tags, `sitemap.xml`, `robots.txt`. Set to the final domain. |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | No | Leave unset (local CMS mode). Only set to enable GitHub-mode editing — currently blocked on Next 16 (see `docs/cms.md`). |
| `KEYSTATIC_GITHUB_*`, `KEYSTATIC_SECRET` | No | Only for GitHub-mode editing. |

After changing env vars, **rebuild/redeploy** — `NEXT_PUBLIC_*` values are
inlined at build time.

## Content editing in production

The CMS runs in **local mode**: content is edited on a developer's machine at
`/keystatic` and committed to Git. Production instances have read-only/ephemeral
filesystems, so the deployed `/keystatic` page can't save — that's expected.
The deploy pipeline rebuilds from the committed `content/` files.

(Hosted editing via Keystatic GitHub mode is wired but disabled pending Next 16
support — see `docs/cms.md`.)

## Custom domain

Point the domain at whichever host is chosen, then update `NEXT_PUBLIC_SITE_URL`
to that domain and redeploy so SEO/share tags and the sitemap use it.
