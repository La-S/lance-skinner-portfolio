import type { CSSProperties } from "react";
import WatchBodiesSprite, { WATCH_BODIES } from "./WatchBodiesSprite";

// Screen-circle geometry per watch body, in that body's own viewBox units
// (derived from the SVG art). Each watch face is drawn with the screen as a
// transparent hole, so a screenshot painted *behind* the body shows through it.
const SCREENS: Record<number, { cx: number; cy: number; r: number }> = {
  1: { cx: 221.1, cy: 307.2, r: 164.5 },
  2: { cx: 217.4, cy: 305.4, r: 146.1 },
  3: { cx: 193.9, cy: 293.4, r: 145.9 },
  4: { cx: 219.4, cy: 291.2, r: 145.5 },
  5: { cx: 212.7, cy: 291.3, r: 157.6 },
};

// Overfill the screen hole slightly so the bezel (drawn on top) hides the seam
// and no page background peeks between screenshot and bezel.
const OVERFILL = 1.04;

/**
 * The endless watch marquee. Watch bodies are inlined once as <symbol>s and
 * tiled with cheap <use> refs. When `screenshots` are provided they're
 * composited into each watch's screen (cycled in order); otherwise the watches
 * render as plain outlines, exactly as before. Purely decorative (aria-hidden).
 *
 * `accent` overrides --brand-accent for the strap fill (e.g. Maps4Garmin's
 * bright orange marquee over its rust page accent).
 */
export default function WatchMarquee({
  screenshots = [],
  accent,
}: {
  screenshots?: string[];
  accent?: string;
}) {
  const watches = Array.from({ length: 8 }).flatMap(() => WATCH_BODIES);
  const style = accent
    ? ({ "--brand-accent": accent } as CSSProperties)
    : undefined;

  return (
    <section className="overflow-hidden py-6" aria-hidden style={style}>
      <WatchBodiesSprite />
      {/* Rendered as one long tiled row; the CSS marquee translates it to loop. */}
      <div className="marquee">
        {watches.map((body, i) => {
          const shot = screenshots.length
            ? screenshots[i % screenshots.length]
            : null;
          const s = SCREENS[body.id];
          const r = s.r * OVERFILL;
          const clipId = `watch-screen-${i}`;

          return (
            <svg
              key={i}
              viewBox={body.viewBox}
              className="h-[213px] w-auto px-4 sm:h-[266px] sm:px-6 lg:h-[342px] lg:px-9"
            >
              {shot && (
                <>
                  <defs>
                    <clipPath id={clipId}>
                      <circle cx={s.cx} cy={s.cy} r={r} />
                    </clipPath>
                  </defs>
                  {/* Behind the body: the screen hole reveals it, clip trims it. */}
                  <image
                    href={shot}
                    x={s.cx - r}
                    y={s.cy - r}
                    width={r * 2}
                    height={r * 2}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#${clipId})`}
                  />
                </>
              )}
              <use href={`#watch-body-${body.id}`} />
            </svg>
          );
        })}
      </div>
    </section>
  );
}
