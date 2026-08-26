"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";

export type ShotItem = { label: string; src?: string };

/* A real screenshot once a `src` is provided (uploaded in the CMS), otherwise
   a labelled placeholder. Both share the site's rounded-card shape. */
function Shot({
  label,
  src,
  className = "",
}: {
  label: string;
  src?: string;
  className?: string;
}) {
  const cardBase = `aspect-[9/16] overflow-hidden rounded-[20px] border border-black/5 bg-white ${className}`;

  if (src) {
    return (
      <div className={cardBase}>
        <img
          src={src}
          alt={label}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center text-center ${cardBase}`}>
      <div className="flex flex-col items-center gap-2 px-4 text-[#bbb]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.5" cy="8.5" r="1.8" fill="currentColor" />
          <path d="M5 17l4.5-5 3 3.2L16 11l3 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[13px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
    </div>
  );
}

/**
 * Hero screenshot gallery. On phones (< sm) it's a horizontal, swipeable
 * scroll-snap carousel (App Store style) with peeking neighbours and a row of
 * page dots tracking the active screenshot. At sm+ it falls back to the static
 * 3-up grid with the staggered offset, exactly as before.
 */
export default function HeroScreenshots({ shots }: { shots: ShotItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll position that centres card `i` in the scroller. Computed from real
  // geometry (offsetLeft + the scroller's side padding) so it's correct
  // regardless of the `11vw` padding, gap, or card width.
  const scrollLeftFor = (el: HTMLElement, i: number) => {
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return 0;
    return card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
  };

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Pick the card whose centred scroll position is nearest the current scroll.
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const d = Math.abs(el.scrollLeft - scrollLeftFor(el, i));
      if (d < best) {
        best = d;
        nearest = i;
      }
    }
    setActive(nearest);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    setActive(i); // reflect the tap immediately; scroll listener keeps it in sync
    // Jump straight to the card's snap point. A multi-step tween would fight
    // `snap-mandatory` (the browser re-snaps to the nearest point between
    // steps), and `behavior:"smooth"` is swallowed by the page's global
    // `scroll-behavior: smooth`. Native swipe remains smooth (user-driven).
    el.scrollTo({ left: scrollLeftFor(el, i), behavior: "instant" });
  };

  return (
    // Full-bleed on mobile: cancel the hero section's m4g-pad (20px) with -mx-5
    // so the peeking card reaches the true screen edge. Reset at sm where the
    // grid should sit within the page padding.
    <div className="mt-12 -mx-5 w-[calc(100%+40px)] sm:mx-0 sm:w-full">
      {/*
        Mobile (< sm): flex scroll-snap carousel. Horizontal padding centres the
        first/last cards so neighbours peek at the edges. Scrollbar hidden.
        sm+: revert to the original centred 3-up grid.
      */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   sm:mx-auto sm:max-w-[760px] sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:snap-none"
      >
        {shots.map((shot, i) => (
          <Shot
            key={i}
            label={shot.label}
            src={shot.src}
            className={`w-[78vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink ${
              i % 2 === 0 ? "sm:translate-y-4" : ""
            }`}
          />
        ))}
      </div>

      {/* Page dots — mobile only. */}
      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        {shots.map((shot, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to ${shot.label || `screenshot ${i + 1}`}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={`size-2 rounded-full transition-colors ${
              i === active
                ? "bg-[color:var(--brand-accent)]"
                : "bg-black/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
