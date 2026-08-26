import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import type { ProductApp } from "./ProductPage";

// Reads the apps catalog managed in the Keystatic admin (/keystatic), which
// stores it as `content/apps.json`. Editing happens through the CMS UI; this
// module is the read side the site renders from.
const reader = createReader(process.cwd(), keystaticConfig);

type CatalogApp = ProductApp & { crossPromote: boolean };

/** Full catalog, in the order set in Keystatic. */
export async function getApps(): Promise<CatalogApp[]> {
  const data = await reader.singletons.apps.read();
  return (data?.items ?? []).map((item) => ({
    icon: item.icon,
    name: item.name,
    desc: item.desc,
    // Empty path → no link (the carousel renders a non-clickable card).
    href: item.href || undefined,
    crossPromote: item.crossPromote,
  }));
}

/**
 * Every cross-promotable app except the one named — for a page's "Other Apps"
 * carousel. Apps with "Show in other apps' carousels" unchecked in Keystatic
 * (e.g. the unreleased Mystery App) are always excluded.
 */
export async function getOtherApps(currentName: string): Promise<ProductApp[]> {
  const apps = await getApps();
  return apps
    .filter((app) => app.name !== currentName && app.crossPromote)
    .map(({ icon, name, desc, href }) => ({ icon, name, desc, href }));
}
