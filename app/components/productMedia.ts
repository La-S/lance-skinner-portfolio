import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

// Read side for the per-app media managed in the Keystatic "App media"
// collection (/keystatic). Each product page calls getProductMedia(slug) and
// renders whatever has been uploaded, falling back to its built-in visuals.
const reader = createReader(process.cwd(), keystaticConfig);

export type ProductMedia = {
  /** Override for the hero watch render, or null. */
  heroImage: string | null;
  /** Override for the first "Features" card watch render, or null. */
  featureImage: string | null;
  /** Screenshots composited into the watch-strip watch screens. */
  watchStrip: string[];
  /** Phone screenshots for the mobile hero gallery. */
  mobileScreenshots: { src: string; label: string }[];
};

const EMPTY: ProductMedia = {
  heroImage: null,
  featureImage: null,
  watchStrip: [],
  mobileScreenshots: [],
};

export async function getProductMedia(slug: string): Promise<ProductMedia> {
  const entry = await reader.collections.products.read(slug);
  if (!entry) return EMPTY;
  const media = entry.media;

  if (media.discriminant === "garmin") {
    const v = media.value;
    return {
      heroImage: v.heroImage ?? null,
      featureImage: v.featureImage ?? null,
      watchStrip: (v.watchStrip ?? []).filter(
        (src): src is string => Boolean(src)
      ),
      mobileScreenshots: [],
    };
  }

  const v = media.value; // mobile
  return {
    heroImage: null,
    featureImage: null,
    watchStrip: [],
    mobileScreenshots: (v.mobileScreenshots ?? [])
      .filter((shot) => shot.image)
      .map((shot) => ({ src: shot.image as string, label: shot.label })),
  };
}
