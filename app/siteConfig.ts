// Central site constants used by metadata, the sitemap, robots, and the OG
// image. Set NEXT_PUBLIC_SITE_URL to your real domain in production (e.g. in
// Vercel's env vars) so all the absolute URLs and share tags are correct.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Lancelot — Sharp Edge Technology";

export const SITE_DESCRIPTION =
  "Christian software developer building meaningful apps for Garmin smartwatches and mobile.";

// Public routes, used to generate the sitemap.
export const SITE_ROUTES = [
  "",
  "/holy-bible",
  "/maps4garmin",
  "/race-day",
  "/offline-bible",
  "/audio-bible",
  "/in-town",
  "/privacy",
] as const;
