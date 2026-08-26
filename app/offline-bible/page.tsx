import type { Metadata } from "next";
import ProductPage, { type ProductConfig } from "../components/ProductPage";
import { getOtherApps } from "../components/appsCatalog";
import { getProductMedia } from "../components/productMedia";

export const metadata: Metadata = {
  title: "Offline Bible — Sharp Edge Technology",
  description:
    "The entire World English Bible bundled into a completely offline Garmin watch app — install once and read anywhere.",
};

const config: Omit<ProductConfig, "otherApps"> = {
  wordmark: "OFFLINE BIBLE",
  eyebrow: "Offline Bible",
  title: "Read Offline Bible on your Wrist",
  description: (
    <>
      This is almost the same app as{" "}
      <span className="text-black">Holy Bible</span>. However, this app is{" "}
      <span className="text-black">completely offline.</span> The entire World
      English Bible is bundled into this app, so once you install the app,
      you&apos;re good to go!
    </>
  ),
  accent: "#445ce8",
  downloads: "1,000",
  watch: "/images/bible/offline-bible-watch.png",
  garminUrl: "https://apps.garmin.com/en-US/developer/2a11ab8d-2c66-4a71-a20d-b8a6d81754e8/apps",
  features: [
    { title: "Read the Bible Offline", desc: "You can read the whole Bible through this app, install it once, and read it anywhere anytime" },
    { title: "World English Bible (WEB)", desc: "This app features only WEB translation" },
    { title: "Verse of the Day", desc: "A fresh Bible verse every day" },
    { title: "Dark Mode", desc: "For low light settings", dark: true },
  ],
};

export default async function OfflineBible() {
  const [otherApps, media] = await Promise.all([
    getOtherApps("Offline Bible"),
    getProductMedia("offline-bible"),
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
