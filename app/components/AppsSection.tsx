"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type App = {
  icon: string;
  name: string;
  desc: string;
  row: number;
  scatter: number;
  href?: string;
};

const ASSETS = {
  inTown: "/images/in-town.svg",
  maps4Garmin: "/images/maps4garmin.svg",
  raceDay: "/images/race-day.svg",
  holyBible: "/images/holy-bible.svg",
  offlineBible: "/images/offline-bible.svg",
  audioBible: "/images/audio-bible.svg",
  chineseBible: "/images/chinese-bible.svg",
};

// `row` (1 or 2) is the card's row in the desktop 4-col grid.
// `scatter` (px) is how far below (or above, if negative) the grid position
// each card starts on desktop — the entire scatter→grid animation is vertical.
const APPS: App[] = [
  { icon: ASSETS.holyBible,    name: "Holy Bible",    desc: "Read the Bible directly from your wrist",     row: 1, scatter: 316, href: "/holy-bible" },
  { icon: ASSETS.maps4Garmin,  name: "Maps4Garmin",   desc: "Offline Maps, Weather Radar (Paid), and more on your wrist",                row: 1, scatter: 132, href: "/maps4garmin" },
  { icon: ASSETS.raceDay,      name: "Race Day",      desc: "Real-time runner tracking for coaches and friends",  row: 1, scatter: 375, href: "/race-day" },
  { icon: ASSETS.audioBible,   name: "Audio Bible",   desc: "Listen to the Bible directly from your Garmin Watch",                       row: 2, scatter: -135, href: "/audio-bible" },
  { icon: ASSETS.offlineBible, name: "Offline Bible", desc: "Download portions of the Bible to read on your wrist offline",              row: 2, scatter: 659, href: "/offline-bible" },
  { icon: ASSETS.chineseBible, name: "Chinese Bible", desc: "Read the entire Bible in Chinese, completely offline on your wrist",     row: 2, scatter: 459, href: "/chinese-bible" },
  { icon: ASSETS.inTown,       name: "In Town",       desc: "Reconnect with friends on the go, without sharing exact location", row: 2, scatter: -334, href: "/in-town" },
];

const SCROLL_RANGE = 1200;
// Sticky pane fills the viewport, with a floor so the compact 2-row grid
// (which needs ~750px) is never clipped on shorter viewports.
const MIN_SECTION_HEIGHT = 888;
// Approximate Y of each grid row inside the sticky desktop pane — used both
// as the sticky pane's `paddingTop` and for the opacity-fade calculation.
// With pt-[80px] + ~330px row 1 + 20px gap, row 2's natural top is ~430.
const ROW1_Y = 80;
const ROW2_Y = 430;
// Space kept below the finished grid before the next section — matches the
// mobile/tablet layout's pb-12.
const GRID_TAIL_GAP = 48;
// Share of the sticky pane's unused space that the next section is pulled up
// into. 1 = gap fully closed, but About slides a long way under the pinned
// cards on tall screens; 0.5 halves that slide.
const PULL_UP_RATIO = 0.5;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function AppsSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealRef = useRef<HTMLDivElement>(null);

  // Down-arrow scroll cue (desktop only): appears after a 3s delay and plays
  // the scatter→grid animation when clicked. `armed` = the 3s delay has
  // elapsed; `past` = the user has already scrolled into the animation, so the
  // cue hides itself to avoid overlapping the grid.
  const [armed, setArmed] = useState(false);
  const [past, setPast] = useState(false);
  const pastRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Smoothly scroll the window through the full SCROLL_RANGE so the cards
  // animate from scatter to grid, start to finish.
  const playAnimation = () => {
    const el = outerRef.current;
    if (!el) return;
    const startY = window.scrollY + el.getBoundingClientRect().top;
    const endY = startY + SCROLL_RANGE;
    const fromY = window.scrollY;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: endY, behavior: "instant" });
      return;
    }

    // Drive the scroll ourselves with an eased rAF tween. `behavior: "instant"`
    // is required because the page sets `scroll-behavior: smooth` globally — and
    // a `scrollTo` with the default `"auto"` behavior defers to that CSS value,
    // so each per-frame call would restart the CSS smooth animation and the
    // playthrough would never advance. `"instant"` forces an immediate jump.
    const startTime = performance.now();
    const duration = 2000;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      window.scrollTo({ top: fromY + (endY - fromY) * easeInOut(t), behavior: "instant" });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Desktop (≥ 1280px): sticky scatter → grid animation. Cards are laid out
  // by CSS Grid (so they're naturally responsive and centered); only a
  // vertical translate is animated per card.
  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;
      if (window.innerWidth < 1280) return;
      const rect = outerRef.current.getBoundingClientRect();
      const raw = Math.max(0, Math.min(1, -rect.top / SCROLL_RANGE));
      const p = easeInOut(raw);

      // Hide the scroll cue once the animation has visibly begun.
      const isPast = raw > 0.04;
      if (isPast !== pastRef.current) {
        pastRef.current = isPast;
        setPast(isPast);
      }

      // Fade thresholds track the viewport height so cards reveal from the
      // bottom of the screen on tall viewports. 108px = original buffer
      // (FADE_START was 780 with SECTION_HEIGHT 888 → 108 from the bottom).
      const sectionHeight = Math.max(window.innerHeight, MIN_SECTION_HEIGHT);
      const fadeStart = sectionHeight - 108;
      const fadeEnd = sectionHeight + 12;

      APPS.forEach((app, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const dy = app.scatter * (1 - p);
        el.style.transform = `translateY(${dy}px)`;
        const gridY = app.row === 1 ? ROW1_Y : ROW2_Y;
        const currentY = gridY + dy;
        const opacity =
          currentY >= fadeStart
            ? Math.max(0, 1 - (currentY - fadeStart) / (fadeEnd - fadeStart))
            : 1;
        el.style.opacity = String(opacity);
      });
    };

    // The sticky pane is a full screen tall, but the finished grid only uses
    // ~724px of it — on tall monitors that left a big empty band above the
    // next section. Pull the following content up into part of that unused
    // space (PULL_UP_RATIO). The band is empty once the cards have settled,
    // so nothing overlaps.
    const fitToGrid = () => {
      const outer = outerRef.current;
      const grid = gridRef.current;
      if (!outer || !grid) return;
      if (window.innerWidth < 1280) {
        outer.style.marginBottom = "";
        return;
      }
      const pane = grid.parentElement as HTMLElement;
      const used = grid.offsetTop + grid.offsetHeight + GRID_TAIL_GAP;
      outer.style.marginBottom = `-${Math.round(Math.max(0, pane.offsetHeight - used) * PULL_UP_RATIO)}px`;
    };
    const handleResize = () => {
      fitToGrid();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mobile/tablet (< 1280px): reveal each responsive card as it scrolls into view.
  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".app-reveal"));

    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    // Cards already within the first screen on load (e.g. all three rows of the
    // 2-col tablet grid) reveal immediately — no scroll required. Only cards
    // genuinely below the fold wait for the scroll-reveal observer.
    cards.forEach((c) => {
      if (c.getBoundingClientRect().top < window.innerHeight) {
        c.classList.add("is-visible");
      } else {
        observer.observe(c);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Mobile + Tablet layout (< 1280px) — no animation ── */}
      {/*
          CSS Grid lets us change column-count and padding at EXACTLY the same
          breakpoints — no flex-wrap math, no trailing placeholder needed.

          Breakpoints (all three fire simultaneously for columns + padding):
            < sm  (< 640px)   → 1 col,  px-5   (20px)
            sm+   (≥ 640px)   → 2 cols, px-[30px]
            900px+ (≥ 900px)  → 3 cols, px-[40px]
      */}
      <div ref={revealRef} className="apps-responsive pt-[40px] pb-12">

        <p className="apps-heading font-familjen text-[#1e1e1e] leading-[1.02] px-5 sm:px-[30px] apps-grid-padding">
          Apps
        </p>

        <div className="grid gap-5 grid-cols-1 px-5 sm:grid-cols-2 sm:px-[30px] apps-grid">
          {APPS.map((app, i) => (
            <div
              key={app.name}
              className={`app-reveal relative bg-white rounded-[20px] px-[20px] py-[36px]
                         flex items-center justify-center min-h-[290px]${
                           app.name === "Mystery App" ? " sm:hidden" : ""
                         }`}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              {app.href && (
                <Link
                  href={app.href}
                  aria-label={app.name}
                  className="absolute inset-0 z-10 rounded-[20px]"
                />
              )}
              <div className="flex flex-col gap-6 items-center w-full">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="size-[130px] object-contain shrink-0 app-icon-shadow"
                />
                <div className="flex flex-col gap-[10px] items-center w-full">
                  <p className="font-familjen font-medium text-[26px] text-[#1e1e1e] tracking-[-0.52px] leading-[1.02] text-center w-full">
                    {app.name}
                  </p>
                  <p className="text-[18px] text-[#1e1e1e] leading-snug text-center w-full">
                    {app.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop layout (≥ 1280px) — sticky scatter→grid animation ── */}
      {/*
          The compact layout is now a CSS Grid (grid-cols-4) inside the
          centered page wrapper (max-w-[1440px] mx-auto in page.tsx) — so:
            • Cards scale with viewport (no fixed pixel widths)
            • The whole layout stays centered at any viewport ≥ 1280px
            • Card widths range from ~276px (1280px viewport) to ~316px (1440px+)
          Apps heading is the first grid item — occupies col-1 / row-1.
      */}
      <div
        ref={outerRef}
        className="apps-desktop"
        style={{ height: `calc(max(100vh, ${MIN_SECTION_HEIGHT}px) + ${SCROLL_RANGE}px)` }}
      >
        <div
          className="sticky top-0 overflow-hidden px-[58px]"
          style={{ height: `max(100vh, ${MIN_SECTION_HEIGHT}px)`, paddingTop: ROW1_Y }}
        >
          <div ref={gridRef} className="grid grid-cols-4 gap-5">
            {/* APPS heading — first grid cell (col-1 / row-1). */}
            <p
              className="font-familjen text-[#1e1e1e] whitespace-nowrap leading-[1.02] self-start"
              style={{ fontSize: 113.717, letterSpacing: "-2.2743px" }}
            >
              Apps
            </p>

            {APPS.map((app, i) => (
              <div
                key={app.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative"
                style={{ willChange: "transform, opacity" }}
              >
                <div
                  className="app-card-hover relative bg-white rounded-[20px] px-[20px] py-[36px]
                             flex items-center justify-center min-h-[290px]"
                >
                  {app.href && (
                    <Link
                      href={app.href}
                      aria-label={app.name}
                      className="absolute inset-0 z-10 rounded-[20px]"
                    />
                  )}
                  <div className="flex flex-col gap-6 items-center w-full">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="size-[130px] object-contain shrink-0 app-icon-shadow"
                    />
                    <div className="flex flex-col gap-[10px] items-center w-full">
                      <p className="font-familjen font-medium text-[26px] text-[#1e1e1e] tracking-[-0.52px] leading-[1.02] text-center w-full">
                        {app.name}
                      </p>
                      <p className="text-[18px] text-[#1e1e1e] leading-snug text-center w-full">
                        {app.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Down-arrow scroll cue — full-desktop only (≥ 1280px), revealed after
          a 3s delay. Click plays the scatter→grid animation start to finish. */}
      <button
        type="button"
        onClick={playAnimation}
        aria-label="Scroll through the apps animation"
        className={`hidden xl:flex fixed bottom-8 left-1/2 z-50 size-12 -translate-x-1/2
                    items-center justify-center rounded-full bg-[#1e1e1e]/90 text-white
                    shadow-lg backdrop-blur transition-opacity duration-500
                    hover:bg-[#1e1e1e] ${
                      armed && !past ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
      >
        <svg
          className="size-6 animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </button>
    </>
  );
}
