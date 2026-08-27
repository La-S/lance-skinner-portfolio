import type { Metadata } from "next";
import ProductPage, { type ProductConfig } from "../components/ProductPage";
import { getOtherApps } from "../components/appsCatalog";
import { getProductMedia } from "../components/productMedia";

export const metadata: Metadata = {
  title: "Chinese Bible — Sharp Edge Technology",
  description:
    "The entire Bible in Chinese bundled into a completely offline Garmin watch app — install once and read anywhere.",
};

const config: Omit<ProductConfig, "otherApps"> = {
  wordmark: "Chinese Bible",
  eyebrow: "Chinese Bible",
  // Only the hero heading is in Chinese ("圣经 -- 和合本" = Bible — Chinese Union
  // Version); everything else on the page stays in English, mirroring Offline
  // Bible, of which this is the Chinese edition.
  title: "圣经 -- 和合本",
  description: (
    <>
      This is almost the same app as{" "}
      <span className="text-black">Holy Bible</span>. However, this app is{" "}
      <span className="text-black">completely offline</span>{" "}and in Chinese.
      The entire Bible is bundled into this app, so once you install the app,
      you&apos;re good to go!
    </>
  ),
  accent: "#d43d5b",
  downloads: "100",
  watch: "/images/bible/chinese-bible-watch.png",
  garminUrl: "https://apps.garmin.com/apps/15368f52-8b5a-4a49-828a-357a5bf5fa09",
  features: [
    { title: "Read the Bible Offline", desc: "You can read the whole Bible through this app, install it once, and read it anywhere anytime" },
    { title: "World English Bible (WEB)", desc: "This app features only WEB translation" },
    { title: "Verse of the Day", desc: "A fresh Bible verse every day" },
    { title: "Dark Mode", desc: "For low light settings", dark: true },
  ],
};

export default async function ChineseBible() {
  const [otherApps, media] = await Promise.all([
    getOtherApps("Chinese Bible"),
    getProductMedia("chinese-bible"),
  ]);
  return (
    <ProductPage
      config={{
        ...config,
        otherApps,
        watch: media.heroImage ?? config.watch,
        featureWatch: media.featureImage ?? config.watch,
        watchScreens: media.watchStrip,
      }}
    />
  );
}
