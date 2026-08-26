import type { Metadata } from "next";
import ProductPage, { type ProductConfig } from "../components/ProductPage";
import { getOtherApps } from "../components/appsCatalog";
import { getProductMedia } from "../components/productMedia";

export const metadata: Metadata = {
  title: "Holy Bible — Sharp Edge Technology",
  description:
    "Read the whole Bible from your Garmin watch — free, with Verse of the Day notifications, multiple versions and dark mode.",
};

const config: Omit<ProductConfig, "otherApps"> = {
  wordmark: "Holy Bible",
  eyebrow: "Holy Bible",
  title: "Read the Bible on your Wrist",
  description: (
    <>
      The Bible is God&apos;s word,{" "}
      <span className="text-black">essential to our lives.</span> Therefore, it
      is very important to stay connected with the scriptures. This{" "}
      <span className="text-black">free</span> app provides an easy way to read
      the Bible. Not only can you read any passage of the Bible from your wrist,
      but you can also get <span className="text-black">Verse of the Day</span>{" "}
      notifications!
    </>
  ),
  accent: "#445ce8",
  downloads: "10,000",
  rating: "Rated 4.8 stars, with over 1,100 reviews!",
  watch: "/images/bible/holy-bible-watch.png",
  garminUrl: "https://apps.garmin.com/en-US/apps/f6bd69ba-ff5e-4af1-941a-31cfd37c3dec",
  features: [
    { title: "Read the Bible", desc: "You can read the whole Bible through this app" },
    { title: "Verse of the Day", desc: "A fresh Bible verse every day" },
    { title: "Multiple Bible versions", desc: "Choose the version between NIV and KJV" },
    { title: "Faves menu", desc: "You can save your favorite passages for offline reading and quick access" },
    { title: "Dark Mode", desc: "For low light settings", dark: true },
  ],
};

export default async function HolyBible() {
  const [otherApps, media] = await Promise.all([
    getOtherApps("Holy Bible"),
    getProductMedia("holy-bible"),
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
