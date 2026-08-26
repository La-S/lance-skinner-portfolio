"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const FINE_POINTER = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Re-evaluate when the pointer type or reduced-motion preference changes (e.g. a
// mouse is plugged into a tablet, or the user toggles reduced motion).
function subscribePreferences(callback: () => void) {
  const fine = window.matchMedia(FINE_POINTER);
  const reduced = window.matchMedia(REDUCED_MOTION);
  fine.addEventListener("change", callback);
  reduced.addEventListener("change", callback);
  return () => {
    fine.removeEventListener("change", callback);
    reduced.removeEventListener("change", callback);
  };
}

// Only fine pointers (mouse / trackpad) that aren't asking for reduced motion
// get the custom cursor. The server snapshot is `false` so SSR matches the
// first client paint (the native cursor is left untouched otherwise).
const isCursorEnabled = () =>
  window.matchMedia(FINE_POINTER).matches &&
  !window.matchMedia(REDUCED_MOTION).matches;

// Custom cursor inspired by design.google: a single solid dot that trails
// the pointer with smooth easing and inverts whatever is behind it
// (mix-blend-mode: difference). It grows over interactive elements and on
// press. No outline ring.
//
// Disabled on touch / coarse pointers and when the user prefers reduced
// motion — in those cases the native cursor is left untouched.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribePreferences,
    isCursorEnabled,
    () => false
  );

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    if (!dot) return;

    // Target position (true cursor) and the eased dot position.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        document.body.classList.add("cursor-active");
        // Snap to the pointer on first appearance so it doesn't fly in from
        // the screen centre.
        dotX = targetX;
        dotY = targetY;
      }
      // Grow over anything interactive.
      const interactive = (e.target as Element | null)?.closest(
        'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor="hover"]'
      );
      dot.classList.toggle("cursor-dot--hover", Boolean(interactive));
    };

    const onLeave = () => {
      visible = false;
      document.body.classList.remove("cursor-active");
    };

    const onDown = () => dot.classList.add("cursor-dot--press");
    const onUp = () => dot.classList.remove("cursor-dot--press");

    const render = () => {
      // Ease the dot toward the pointer (higher factor = tighter, less lag).
      dotX += (targetX - dotX) * 0.45;
      dotY += (targetY - dotY) * 0.45;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = visible ? "1" : "0";

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className="cursor-dot" aria-hidden />;
}
