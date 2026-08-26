/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroScreenshots from "../components/HeroScreenshots";
import OtherAppsCarousel from "../components/OtherAppsCarousel";
import WatchMarquee from "../components/WatchMarquee";
import { getOtherApps } from "../components/appsCatalog";
import { getProductMedia } from "../components/productMedia";

// Page accent — the In Town icon blue, for a consistent identity.
const ACCENT = "#184496";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/in-town-nearby-friends/id6590605827";

export const metadata: Metadata = {
  title: "In Town — Sharp Edge Technology",
  description:
    "Reconnect with friends on the go without sharing your exact location. In Town notifies you when a friend comes within 70 miles — privacy-centered friend alerts.",
};

const ASSETS = {
  profile: "/images/Lance.avif",
  github: "/images/github.svg",
  instagram: "/images/instagram.svg",
};


function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-[15px] font-semibold"
        style={{ borderColor: ACCENT, color: ACCENT }}
      >
        {n}
      </span>
      <p className="pt-[3px] text-[17px] leading-snug text-black">{children}</p>
    </li>
  );
}

export default async function InTown() {
  const [OTHER_APPS, media] = await Promise.all([
    getOtherApps("In Town"),
    getProductMedia("in-town"),
  ]);
  // Uploaded phone screenshots, or the labelled placeholders until they exist.
  const shots = media.mobileScreenshots.length
    ? media.mobileScreenshots.map((s) => ({ label: s.label, src: s.src }))
    : [{ label: "Nearby Alert" }, { label: "Friends" }, { label: "QR Connect" }];
  const themeStyle = { "--brand-accent": ACCENT } as CSSProperties;

  // Solid button: accent fill, subtle fade on hover.
  const solid =
    "inline-flex h-[57px] items-center justify-center rounded-full px-8 text-[22px] text-white transition-opacity hover:opacity-90";
  // Outline button: accent border + text, fills with the accent on hover.
  // Colours pull from --brand-accent so they track the page accent.
  const outline =
    "inline-flex h-[57px] items-center justify-center rounded-full border-2 border-[color:var(--brand-accent)] bg-transparent px-8 text-[22px] text-[color:var(--brand-accent)] transition-colors hover:bg-[var(--brand-accent)] hover:text-white";

  return (
    <div
      className="min-h-screen bg-[#f3f3f3] text-[#1e1e1e]"
      style={themeStyle}
    >
      {/* ── Header (reuses the product-header look) ── */}
      <header className="sticky top-0 z-50 w-full px-[clamp(12px,3vw,24px)] pt-[clamp(12px,2vw,20px)]">
        <div className="mx-auto grid h-[68px] max-w-[1440px] grid-cols-3 items-center rounded-[20px] border border-white/30 bg-[#f3f3f3]/40 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150 m4g-pad">
          <Link
            href="/"
            className="flex w-fit items-center gap-[10px] text-[#888] transition-colors hover:text-[#1e1e1e]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
              <path
                d="M6 19H9V14C9 13.7167 9.096 13.4793 9.288 13.288C9.48 13.0967 9.71733 13.0007 10 13H14C14.2833 13 14.521 13.096 14.713 13.288C14.905 13.48 15.0007 13.7173 15 14V19H18V10L12 5.5L6 10V19ZM4 19V10C4 9.68333 4.071 9.38333 4.213 9.1C4.355 8.81667 4.55067 8.58333 4.8 8.4L10.8 3.9C11.15 3.63333 11.55 3.5 12 3.5C12.45 3.5 12.85 3.63333 13.2 3.9L19.2 8.4C19.45 8.58333 19.646 8.81667 19.788 9.1C19.93 9.38333 20.0007 9.68333 20 10V19C20 19.55 19.804 20.021 19.412 20.413C19.02 20.805 18.5493 21.0007 18 21H14C13.7167 21 13.4793 20.904 13.288 20.712C13.0967 20.52 13.0007 20.2827 13 20V15H11V20C11 20.2833 10.904 20.521 10.712 20.713C10.52 20.905 10.2827 21.0007 10 21H6C5.45 21 4.97933 20.8043 4.588 20.413C4.19667 20.0217 4.00067 19.5507 4 19Z"
                fill="currentColor"
              />
            </svg>
            <span className="hidden text-[16px] font-semibold sm:inline sm:text-[18px]">All Apps</span>
          </Link>

          <p className="text-center text-[18px] font-semibold tracking-tight text-[#1e1e1e] sm:text-[24px]">
            In Town
          </p>

          <nav className="hidden items-center justify-self-end gap-5 lg:flex xl:gap-7">
            <a href="#features" className="whitespace-nowrap text-[18px] font-semibold text-[#888] transition-colors hover:text-[#1e1e1e]">Features</a>
            <a href="#install" className="whitespace-nowrap text-[18px] font-semibold text-[#888] transition-colors hover:text-[#1e1e1e]">Install</a>
            <a href="#other-apps" className="whitespace-nowrap text-[18px] font-semibold text-[#888] transition-colors hover:text-[#1e1e1e]">Other Apps</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px]">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="m4g-pad flex flex-col items-center pt-[20px] pb-[48px] text-center sm:pt-[40px] sm:pb-[64px]">
          <h1 className="brand-gradient mx-auto max-w-[820px] text-balance pb-[0.12em] text-[34px] font-semibold leading-[1.08] tracking-tight sm:text-[44px] lg:text-[56px]">
            Privacy Centered Friend Alerts
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[18px] font-semibold leading-[1.5] text-[#888] sm:text-[20px]">
            Reconnect with old friends on the go,{" "}
            <span className="text-black">WITHOUT</span> having to share your{" "}
            <span className="text-black">precise location</span> with them!
          </p>
          {/* Hero screenshots — swipe carousel on mobile, 3-up grid on desktop */}
          <HeroScreenshots shots={shots} />

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${solid} mt-12`}
            style={{ backgroundColor: ACCENT }}
          >
            Get on the App Store
          </a>
        </section>

        {/* ── Description ──────────────────────────────────────── */}
        <section className="m4g-pad pt-[24px] pb-[56px]">
          <p className="mx-auto max-w-[640px] text-center text-[19px] font-semibold leading-[1.5] text-[#888] sm:text-[21px]">
            In Town sends you a notification when you and a friend are within{" "}
            <span className="text-black">70 miles</span> of each other, giving you
            both the opportunity to catch up – without ever sharing exact
            locations. While preserving your{" "}
            <span className="text-black">privacy</span>, In Town ensures that{" "}
            <span className="text-black">staying connected remains easy!</span>{" "}
            Whether you&apos;re traveling, moving, or just out and about, let In
            Town: Nearby Friends help you make those unexpected meetups happen!
          </p>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section id="features" className="m4g-pad scroll-mt-[90px] pt-[24px] pb-[72px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { t: "Privacy First", d: "Only coarse location is ever shared — friends see that you're nearby, never your exact coordinates." },
              { t: "Nearby Alerts", d: "Get notified the moment a friend comes within 70 miles, so you can plan to meet up." },
              { t: "Connect in a Tap", d: "Share a QR code or link to add friends — no usernames or phone numbers required." },
            ].map((f, i) => (
              <article key={f.t} className="flex flex-col rounded-[20px] bg-white p-7">
                <p className="text-[16px] font-semibold text-black/30">FEATURE #{i + 1}</p>
                <h3 className="brand-gradient mt-5 text-[28px] font-semibold leading-tight sm:text-[30px]">{f.t}</h3>
                <p className="mt-2 text-[18px] text-black">{f.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Install ──────────────────────────────────────────── */}
        <section id="install" className="m4g-pad scroll-mt-[90px] pt-[16px] pb-[80px]">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="brand-gradient text-[34px] font-semibold leading-tight sm:text-[44px]">
              How to get started
            </h2>
            <p className="mx-auto mt-3 max-w-[520px] text-[18px] font-semibold text-[#888]">
              Free on the App Store. Three steps and you&apos;re connected.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[720px] rounded-[24px] bg-white p-8">
            <ol className="flex flex-col gap-5">
              <Step n={1}>Download <strong>In Town</strong> free from the App Store (iOS 15.0 or later).</Step>
              <Step n={2}>Share your QR code or link to connect with friends you want to keep in touch with.</Step>
              <Step n={3}>Get a notification whenever a friend comes within 70 miles — then meet up.</Step>
            </ol>
            <div className="mt-8 flex justify-center">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={outline}>
                Get on the App Store
              </a>
            </div>
          </div>
        </section>

        {/* ── Watch marquee ────────────────────────────────────── */}
        <WatchMarquee screenshots={media.watchStrip} />

        {/* ── About Developer ──────────────────────────────────── */}
        <section id="developer" className="m4g-pad scroll-mt-[90px] py-[72px]">
          <h2 className="brand-gradient mb-12 text-[40px] font-semibold leading-tight sm:text-[48px] lg:text-[56px]">
            About Developer
          </h2>
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start lg:gap-[54px]">
            <div className="relative size-[200px] shrink-0 overflow-hidden rounded-full lg:size-[282px]">
              <Image src={ASSETS.profile} alt="Lance" fill sizes="(min-width: 1024px) 282px, 200px" className="object-cover object-center" />
            </div>
            <div className="flex max-w-[795px] flex-col items-center gap-7 text-center md:items-start md:text-left">
              <p className="text-[20px] leading-normal text-black sm:text-[24px]">
                Lance is a Christian software developer with a passion for creating
                meaningful technology. As a fun-loving programmer, he is dedicated
                to both his faith and his craft. Lance has developed a variety of
                apps for Garmin smartwatches and for phones. His most popular app,{" "}
                <strong>Maps4Garmin</strong>, has reached over{" "}
                <strong>1.5 million downloads</strong>, helping users around the
                world navigate and look at the weather right from their wrists. He
                continues to build innovative projects with a desire to make a
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
          <h2 className="brand-gradient m4g-pad mb-8 text-[40px] font-semibold leading-tight sm:text-[48px] lg:text-[56px]">
            Other Apps by SirLancelot
          </h2>
          <OtherAppsCarousel apps={OTHER_APPS} />
        </section>
      </main>
    </div>
  );
}
