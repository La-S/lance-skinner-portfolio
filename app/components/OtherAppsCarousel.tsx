/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type App = { icon: string; name: string; desc: string; href?: string };

// Horizontally-scrolling row of app cards with overlaid arrow buttons, so
// visitors without a trackpad (mouse / touch-less) can still scroll. The
// buttons are half-transparent "glass" pills matching the site's header, and
// auto-hide at each end of the scroll range.
export default function OtherAppsCarousel({ apps }: { apps: App[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Advance by roughly one card (260px + 20px gap), capped to the viewport.
    const amount = Math.min(280, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const arrowBtn =
    "absolute top-[120px] z-10 flex size-11 -translate-y-1/2 items-center justify-center " +
    "rounded-full border border-black/5 bg-white/55 text-[#1e1e1e] shadow-[0_4px_20px_rgba(0,0,0,0.12)] " +
    "backdrop-blur-md backdrop-saturate-150 transition-all duration-200 hover:bg-white/90 " +
    "focus-visible:outline-2 focus-visible:outline-[#00bf5d]";

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        // overflow-x-auto forces the vertical axis to clip too, which would cut
        // off a card's hover lift — so we add top headroom (pt-4) and pull the
        // scroller back up (-mt-4) so cards and arrows keep their position.
        className="-mt-4 flex snap-x scroll-pl-5 gap-5 overflow-x-auto pt-4 pb-4 m4g-pad [scrollbar-width:thin] sm:scroll-pl-10 lg:scroll-pl-20"
      >
        {apps.map((app) => (
          <div
            key={app.name}
            className={`relative flex w-[260px] shrink-0 snap-start flex-col items-center gap-4 rounded-[20px] bg-white px-[20px] py-[36px] transition-transform ${
              app.href ? "hover:-translate-y-1.5" : ""
            }`}
          >
            {/* Whole-card link to the app's page (only for apps that have one). */}
            {app.href && (
              <Link
                href={app.href}
                aria-label={app.name}
                className="absolute inset-0 z-10 rounded-[20px]"
              />
            )}
            <img
              src={app.icon}
              alt={app.name}
              className="app-icon-shadow size-[130px] shrink-0 object-contain"
            />
            <div className="flex w-full flex-col items-center gap-[10px]">
              <p className="font-familjen text-center text-[26px] font-medium tracking-[-0.52px] leading-[1.02] text-[#1e1e1e]">
                {app.name}
              </p>
              <p className="line-clamp-2 text-center text-[18px] leading-snug text-[#1e1e1e]">
                {app.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Left arrow — hidden when already at the start */}
      <button
        type="button"
        aria-label="Scroll apps left"
        onClick={() => scrollByCards(-1)}
        className={`${arrowBtn} left-3 sm:left-5 lg:left-9 ${
          atStart ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Right arrow — hidden when already at the end */}
      <button
        type="button"
        aria-label="Scroll apps right"
        onClick={() => scrollByCards(1)}
        className={`${arrowBtn} right-3 sm:right-5 lg:right-9 ${
          atEnd ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
