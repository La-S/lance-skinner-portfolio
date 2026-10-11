/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Maps4GarminHeader from "./Maps4GarminHeader";
import OtherAppsCarousel from "../components/OtherAppsCarousel";
import Image from "next/image";
import WatchMarquee from "../components/WatchMarquee";
import { getOtherApps } from "../components/appsCatalog";
import { getProductMedia } from "../components/productMedia";

/** Page accent (burnt-sienna rust, sampled from the supplied swatch). Drives
    the headings and buttons via --brand-accent. */
const ACCENT = "#834420";

/** Watch marquee accent — bright orange, scoped to the marquee only (overrides
    --brand-accent there) so the watch straps pop against the rust page accent. */
const WATCH_ACCENT = "#ff9500";

export const metadata: Metadata = {
  title: "Maps4Garmin — Sharp Edge Technology",
  description:
    "Offline maps, weather radar, and more on your Garmin watch. Over 1.5 million downloads.",
};

const ASSETS = {
  heroWatch: "/images/m4g/hero-watch.png",
  featureWatch: "/images/m4g/feature-weather-watch.png",
  mapPath: "/images/m4g/offline-map-path.svg",
  star: "/images/m4g/star.svg",
  starHalf: "/images/m4g/star-half.svg",
  profile: "/images/Lance.avif",
  github: "/images/github.svg",
  instagram: "/images/instagram.svg",
};


function AccentButton({
  variant = "solid",
  className = "",
}: {
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex h-[57px] w-[179px] items-center justify-center rounded-full text-[22px]";
  // Both variants pull the page's --brand-accent so they track ACCENT. Solid
  // fills with the accent and fades on hover; outline fills on hover.
  const styles =
    variant === "solid"
      ? "bg-[var(--brand-accent)] text-white transition-opacity hover:opacity-90"
      : "border-2 border-[color:var(--brand-accent)] bg-transparent text-[color:var(--brand-accent)] transition-colors hover:bg-[var(--brand-accent)] hover:text-white";
  return (
    <a
      href="https://apps.garmin.com/en-US/apps/f2cde121-a834-4718-a4ba-bf79d28a4e27"
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      Get for Free
    </a>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-[6px]">
      {[0, 1, 2, 3].map((i) => (
        <img key={i} src={ASSETS.star} alt="" className="size-[52px] sm:size-[64px]" />
      ))}
      <img src={ASSETS.starHalf} alt="" className="size-[52px] sm:size-[64px]" />
    </div>
  );
}

export default async function Maps4Garmin() {
  // "Other apps" shown in the footer carousel (Maps4Garmin itself omitted);
  // cards link through to each app's page where one exists.
  const [OTHER_APPS, media] = await Promise.all([
    getOtherApps("Maps4Garmin"),
    getProductMedia("maps4garmin"),
  ]);
  const heroWatch = media.heroImage ?? ASSETS.heroWatch;
  const featureWatch = media.featureImage ?? ASSETS.featureWatch;
  return (
    <div
      className="min-h-screen bg-[#f3f3f3] text-[#1e1e1e]"
      style={{ "--brand-accent": ACCENT } as CSSProperties}
    >
      <Maps4GarminHeader />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        {/* Fixed gap between the watch and the button so the hero looks the
            same on every screen height (it used to stretch to fill the
            viewport, which left a huge gap on tall monitors). */}
        <section className="m4g-pad mx-auto max-w-[1440px] flex flex-col items-center pt-[20px] pb-[40px] text-center sm:pt-[28px] sm:pb-[44px]">
          <h1 className="brand-gradient mx-auto max-w-[820px] text-balance text-[34px] font-semibold leading-[1.08] tracking-tight sm:text-[44px] lg:text-[56px]">
            Take your Garmin to the next level
          </h1>
          <img
            src={heroWatch}
            alt="Garmin watch displaying the Maps4Garmin app"
            className="mt-8 w-[200px] sm:mt-10 sm:w-[240px] lg:w-[264px]"
          />
          <AccentButton className="mt-10 lg:mt-20" />
        </section>

        {/* ── Description ──────────────────────────────────────── */}
        <section className="m4g-pad mx-auto max-w-[1440px] pt-[48px] pb-[56px] sm:pt-[72px] sm:pb-[72px]">
          <p className="mx-auto max-w-[640px] text-center text-[19px] font-semibold leading-[1.5] text-[#888] sm:text-[21px]">
            Maps4Garmin is the perfect companion for all your adventures. It
            gives you access to high-quality{" "}
            <span className="text-black">offline maps</span>, shows your current
            location, and lets you drop a pin—completely free. For a small fee
            of $3.50 you get the <span className="text-black">weather radar</span>
            , navigation to your saved pin, and ability to switch between
            different map types. Whether you&apos;re off the grid or planning your
            next big trip, Maps4Garmin keeps you{" "}
            <span className="text-black">in control</span>, online or off.
          </p>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        {/* The two blocks sit centered as a group; flex-wrap lets the whole
            rating block drop to its own (still-centered) row when there isn't
            room, so the single-line rating text never spills into the
            downloads column. */}
        <section className="m4g-pad mx-auto max-w-[1440px] flex flex-col items-center gap-12 pb-[72px] lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-16 lg:gap-y-10">
          <p className="brand-gradient text-center font-semibold leading-none">
            <span className="align-middle text-[21px] text-[#888]">Over </span>
            <span className="align-middle text-[56px] sm:text-[72px] lg:text-[80px]">
              1,500,000
            </span>
            <span className="align-middle text-[21px] text-[#888]"> Downloads</span>
          </p>

          <div className="flex shrink-0 flex-col items-center gap-3">
            <Stars />
            <p className="body-sm text-center text-black lg:whitespace-nowrap">
              Rated 4.6 stars, with over 37,000 five star reviews!
            </p>
          </div>
        </section>

        {/* ── Features (bento) ─────────────────────────────────── */}
        <section id="features" className="m4g-pad mx-auto max-w-[1440px] scroll-mt-[90px] pt-[40px] pb-[80px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
            {/* Feature 1 — Weather Radar (tall, spans both rows on desktop) */}
            <article className="flex flex-col overflow-hidden rounded-[20px] bg-white p-7 md:row-span-2 lg:row-span-2">
              <p className="text-[16px] font-semibold text-black/30">FEATURE #1</p>
              <h3 className="brand-gradient mt-5 text-[30px] font-semibold leading-tight sm:text-[32px]">
                Weather Radar
              </h3>
              <p className="mt-2 text-[18px] text-black">
                View real-time weather radar (premium feature) to track storms
                and precipitation in your area
              </p>
              <img
                src={featureWatch}
                alt="Garmin watch showing the weather radar map"
                className="mx-auto mt-8 w-[240px] max-w-full"
              />
              <p className="mt-10 text-[12px] text-gray">
                &copy; <a href="https://stadiamaps.com/" target="_blank" rel="noopener">Stadia Maps</a>{' '}
                &copy; <a href="https://openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a>{' '}
                &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors{' '}
                &copy; <a href="https://stamen.com/" target="_blank" rel="noopener">Stamen Design</a>
              </p>
              <a  className="mt-4 text-[12px] text-gray" href="https://www.xweather.com/" target="_blank" title="Powered by Vaisala Xweather">Powered by Vaisala Xweather</a>
            </article>

            {/* Feature 2 — Free Offline Maps (wide, top-right on desktop) */}
            <article className="flex flex-col overflow-hidden rounded-[20px] bg-white p-7 md:col-span-1 lg:col-span-2">
              <p className="text-[16px] font-semibold text-black/30">FEATURE #2</p>
              <h3 className="brand-gradient mt-5 text-[30px] font-semibold leading-tight sm:text-[32px]">
                Free Offline Maps
              </h3>
              <p className="mt-2 max-w-[494px] text-[18px] text-black">
                Access offline maps to navigate even without an internet
                connection
              </p>
              <div className="mt-8 flex flex-1 items-end justify-center lg:justify-end">
                <img
                  src={ASSETS.mapPath}
                  alt="Route path on an offline map"
                  className="h-[140px] w-auto sm:h-[180px] lg:h-[200px]"
                />
              </div>
            </article>

            {/* Feature 3 — Change Map Types */}
            <article className="flex flex-col rounded-[20px] bg-white p-7">
              <p className="text-[16px] font-semibold text-black/30">FEATURE #3</p>
              <h3 className="brand-gradient mt-5 text-[30px] font-semibold leading-tight sm:text-[32px]">
                Change Map Types
              </h3>
              <p className="mt-2 text-[18px] text-black">
                Switch between different map types (premium feature) to customize
                your viewing experience (e.g., topographic, street, satellite).
              </p>
            </article>

            {/* Feature 4 — Navigation to the pin */}
            <article className="flex flex-col rounded-[20px] bg-white p-7">
              <p className="text-[16px] font-semibold text-black/30">FEATURE #4</p>
              <h3 className="brand-gradient mt-5 text-[30px] font-semibold leading-tight sm:text-[32px]">
                Navigation to the pin
              </h3>
              <p className="mt-2 text-[18px] text-black">
                Paid users can access the Weather Radar indefinitely while it
                remains available in the app
              </p>
            </article>
          </div>

          <div className="mt-8 flex justify-center lg:justify-end">
            <AccentButton variant="outline" />
          </div>
        </section>

        {/* ── Endless watch marquee ────────────────────────────── */}
        {/* WATCH_ACCENT (bright orange) overrides the rust page accent so the
            straps pop; screenshots (if uploaded) composite into the screens. */}
        <WatchMarquee screenshots={media.watchStrip} accent={WATCH_ACCENT} />

        {/* ── About Developer ──────────────────────────────────── */}
        <section id="developer" className="m4g-pad mx-auto max-w-[1440px] scroll-mt-[90px] py-[72px]">
          <h2 className="brand-gradient mb-12 text-[40px] font-semibold leading-tight sm:text-[48px] lg:text-[56px]">
            About Developer
          </h2>
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start lg:gap-[54px]">
            <div className="relative size-[200px] shrink-0 overflow-hidden rounded-full lg:size-[282px]">
              <Image
                src={ASSETS.profile}
                alt="Lance"
                fill
                sizes="(min-width: 1024px) 282px, 200px"
                className="object-cover object-center"
              />
            </div>
            <div className="flex max-w-[795px] flex-col items-center gap-7 text-center md:items-start md:text-left">
              <p className="text-[20px] leading-normal text-black sm:text-[24px]">
                Lance is a Christian software developer with a passion for
                creating meaningful technology. As a fun-loving programmer, he is
                dedicated to both his faith and his craft. Lance has developed a
                variety of apps for Garmin smartwatches and for phones. His most
                popular app, <strong>Maps4Garmin</strong>, has reached over{" "}
                <strong>1.5 million downloads</strong>, helping users around the
                world navigate and look at the weather right from their wrists.
                He continues to build innovative projects with a desire to make a
                positive impact.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://github.com/La-S" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <img src={ASSETS.github} alt="" className="size-6" />
                </a>
                <a href="https://www.instagram.com/sirlancelot_developer/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <img src={ASSETS.instagram} alt="" className="size-6" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Other Apps ───────────────────────────────────────── */}
        <section id="other-apps" className="scroll-mt-[90px] py-[40px]">
          <h2 className="brand-gradient m4g-pad mx-auto mb-8 max-w-[1440px] text-[40px] font-semibold leading-tight sm:text-[48px] lg:text-[56px]">
            Other Apps by SirLancelot
          </h2>
          <OtherAppsCarousel apps={OTHER_APPS} />
        </section>
      </main>
    </div>
  );
}
