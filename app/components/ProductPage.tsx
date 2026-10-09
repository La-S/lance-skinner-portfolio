/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import ProductHeader from "./ProductHeader";
import OtherAppsCarousel from "./OtherAppsCarousel";
import WatchMarquee from "./WatchMarquee";

const ASSETS = {
  star: "/images/m4g/star.svg",
  starHalf: "/images/m4g/star-half.svg",
  profile: "/images/Lance.avif",
  github: "/images/github.svg",
  instagram: "/images/instagram.svg",
};

export type ProductFeature = {
  title: string;
  desc: string;
  /** Render as a dark card (matches the Figma "Dark Mode" tile). */
  dark?: boolean;
};

export type ProductApp = { icon: string; name: string; desc: string; href?: string };

export type ProductConfig = {
  /** Sticky-header wordmark, e.g. "HOLY BIBLE". */
  wordmark: string;
  /** Small grey label above the hero title. */
  eyebrow: string;
  /** Hero headline. */
  title: string;
  /** Hero supporting paragraph (JSX so words can be emphasised). */
  description: ReactNode;
  /** Themeable accent colour (hex) — drives headings, the button and links. */
  accent: string;
  /** Download count, e.g. "10,000". */
  downloads: string;
  /** Optional rating line; omit to hide the star block (e.g. Offline Bible). */
  rating?: string;
  /** Watch render shown in the hero. */
  watch: string;
  /** Watch render shown in the first feature card. Defaults to `watch`. */
  featureWatch?: string;
  /** "Get for Free" destination (Garmin Connect IQ store). */
  garminUrl: string;
  /** First feature becomes the tall card that holds the watch render. */
  features: ProductFeature[];
  /** Cards for the "Other Apps" carousel (current app omitted). */
  otherApps: ProductApp[];
  /** Optional screenshots composited into the watch-strip watch screens. */
  watchScreens?: string[];
};

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

export default function ProductPage({ config }: { config: ProductConfig }) {
  const {
    wordmark,
    eyebrow,
    title,
    description,
    accent,
    downloads,
    rating,
    watch,
    featureWatch = watch,
    garminUrl,
    features,
    otherApps,
    watchScreens,
  } = config;

  // Expose the accent to `.brand-gradient` (heading/stat gradient end-stop).
  const themeStyle = { "--brand-accent": accent } as CSSProperties;

  // With four features we mirror the Maps4Garmin bento exactly (tall + wide +
  // two). With five (Holy Bible) the tall card pairs with a full 2×2 of
  // regular cards, so there's no wide card.
  const hasWide = features.length === 4;

  const buttonBase =
    "inline-flex h-[57px] w-[179px] items-center justify-center rounded-full text-[22px]";
  // Solid button (hero): accent fill, subtle fade on hover.
  const solidButton = `${buttonBase} text-white transition-opacity hover:opacity-90`;
  // Outline button (features): accent border + text, fills with the accent on
  // hover. Colours pull from the page's `--brand-accent` so the fill matches.
  const outlineButton = `${buttonBase} border-2 border-[color:var(--brand-accent)] bg-transparent text-[color:var(--brand-accent)] transition-colors hover:bg-[var(--brand-accent)] hover:text-white`;

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#1e1e1e]" style={themeStyle}>
      <ProductHeader wordmark={wordmark} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="m4g-pad mx-auto max-w-[1440px] flex flex-col items-center pt-[20px] pb-[40px] text-center sm:pt-[28px] sm:pb-[44px]">
          <h1 className="brand-gradient mx-auto max-w-[900px] text-balance text-[34px] font-semibold leading-[1.08] tracking-tight sm:text-[44px] lg:text-[56px]">
            {title}
          </h1>
          <img
            src={watch}
            alt={`Garmin watch displaying the ${eyebrow} app`}
            className="mt-8 w-[200px] sm:mt-10 sm:w-[240px] lg:w-[264px]"
          />
          <a
            href={garminUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${solidButton} mt-10 lg:mt-20`}
            style={{ backgroundColor: accent }}
          >
            Get for Free
          </a>
        </section>

        {/* ── Description ──────────────────────────────────────── */}
        <section className="m4g-pad mx-auto max-w-[1440px] pt-[48px] pb-[56px] sm:pt-[72px] sm:pb-[72px]">
          <p className="mx-auto max-w-[640px] text-center text-[19px] font-semibold leading-[1.5] text-[#888] sm:text-[21px]">
            {description}
          </p>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section className="m4g-pad mx-auto max-w-[1440px] flex flex-col items-center gap-12 pb-[72px] lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-16 lg:gap-y-10">
          <p className="brand-gradient text-center font-semibold leading-none">
            <span className="align-middle text-[21px] text-[#888]">Over </span>
            <span className="align-middle text-[56px] sm:text-[72px] lg:text-[80px]">
              {downloads}
            </span>
            <span className="align-middle text-[21px] text-[#888]"> Downloads</span>
          </p>

          {rating && (
            <div className="flex shrink-0 flex-col items-center gap-3">
              <Stars />
              <p className="body-sm text-center text-black lg:whitespace-nowrap">
                {rating}
              </p>
            </div>
          )}
        </section>

        {/* ── Features (bento) ─────────────────────────────────── */}
        <section id="features" className="m4g-pad mx-auto max-w-[1440px] scroll-mt-[90px] pt-[40px] pb-[80px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
            {features.map((feature, i) => {
              const isTall = i === 0;
              const isWide = hasWide && i === 1;
              const cardClasses = [
                "flex flex-col overflow-hidden rounded-[20px] p-7",
                // "Dark Mode" cards keep the normal card's text treatment but
                // sit a touch darker than the page background instead of white.
                feature.dark ? "bg-[#e8e8e8]" : "bg-white",
                isTall ? "md:row-span-2 lg:row-span-2" : "",
                isWide ? "md:col-span-1 lg:col-span-2" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <article key={feature.title} className={cardClasses}>
                  <p className="text-[16px] font-semibold text-black/30">
                    FEATURE #{i + 1}
                  </p>
                  <h3 className="brand-gradient mt-5 text-[30px] font-semibold leading-tight sm:text-[32px]">
                    {feature.title}
                  </h3>
                  <p
                    className={`mt-2 text-[18px] text-black ${
                      isWide ? "max-w-[494px]" : ""
                    }`}
                  >
                    {feature.desc}
                  </p>
                  {isTall && (
                    <img
                      src={featureWatch}
                      alt={`Garmin watch showing the ${eyebrow} app`}
                      className="mx-auto mt-8 w-[240px] max-w-full"
                    />
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center lg:justify-end">
            <a
              href={garminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineButton}
            >
              Get for Free
            </a>
          </div>
        </section>

        {/* ── Endless watch marquee ────────────────────────────── */}
        <WatchMarquee screenshots={watchScreens} />

        {/* ── About Developer ──────────────────────────────────── */}
        <section id="developer" className="m4g-pad mx-auto max-w-[1440px] scroll-mt-[90px] py-[72px]">
          <h2 className="brand-gradient mb-12 text-center text-[40px] font-semibold leading-tight sm:text-left sm:text-[48px] lg:text-[56px]">
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
          <h2 className="brand-gradient m4g-pad mx-auto mb-8 max-w-[1440px] text-center text-[40px] font-semibold leading-tight sm:text-left sm:text-[48px] lg:text-[56px]">
            Other Apps by SirLancelot
          </h2>
          <OtherAppsCarousel apps={otherApps} />
        </section>
      </main>
    </div>
  );
}
