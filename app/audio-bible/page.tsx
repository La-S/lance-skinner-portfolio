import type { Metadata } from "next";
import ProductPage, { type ProductConfig } from "../components/ProductPage";
import { getOtherApps } from "../components/appsCatalog";
import { getProductMedia } from "../components/productMedia";

export const metadata: Metadata = {
  title: "Audio Bible — Sharp Edge Technology",
  description:
    "Listen to the Word offline, straight from your Garmin watch. Holy Bible Audio brings the World English Bible to your wrist.",
};

const config: Omit<ProductConfig, "otherApps"> = {
  wordmark: "AUDIO BIBLE",
  eyebrow: "Audio Bible",
  title: "Listen to the Bible from your Wrist",
  description: (
    <>
      Holy Bible Audio is an audio app, created to allow you to{" "}
      <span className="text-black">listen to the Word offline!</span> The setup
      is a bit confusing, so please read the notes below to see how to setup
      Holy Bible Audio.
    </>
  ),
  accent: "#ff9500",
  downloads: "10,000",
  rating: "Rated 4.8 stars, with over 1,100 reviews!",
  watch: "/images/bible/audio-bible-watch.png",
  garminUrl: "https://apps.garmin.com/en-US/apps/cc7185ec-6fd4-4848-a3bb-af8af546c61c",
  features: [
    { title: "Read the Bible Offline", desc: "You can read the whole Bible through this app, install it once, and read it anywhere anytime" },
    { title: "World English Bible (WEB)", desc: "This app features only WEB translation" },
    { title: "Verse of the Day", desc: "A fresh Bible verse every day" },
    { title: "Dark Mode", desc: "For low light settings", dark: true },
  ],
};

export default async function AudioBible() {
  const [otherApps, media] = await Promise.all([
    getOtherApps("Audio Bible"),
    getProductMedia("audio-bible"),
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
