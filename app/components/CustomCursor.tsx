"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const FINE_POINTER = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const DOT_SIZE = 20;
const TEXT_WIDTH = 2; // I-beam width when hovering text
const TEXT_HEIGHT = 20; // I-beam height when hovering text
const SMOOTHING = 0.45; // dot easing per frame toward pointer (1 = no smoothing)
const CLICKABLES = [
  "a",
  "button",
  '[role="button"]',
  "label",
  "summary",
  "select",
  '[data-cursor="hover"]',
];
const TEXT = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
  "li",
  "label",
  "blockquote",
  "figcaption",
  "input",
  "textarea",
];

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

/**
 * Custom cursor — a single dot that tracks the pointer with a touch of easing,
 * grows over clickable elements, shrinks on press, and morphs into an I-beam
 * over text.
 *
 * Performance notes:
 *  - No React state updates on mousemove → zero re-renders while moving.
 *  - Positions via `transform: translate3d` → GPU-composited, no layout/reflow.
 *
 * Disabled on touch / coarse pointers and when the user prefers reduced motion —
 * in those cases the native cursor is left untouched.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribePreferences,
    isCursorEnabled,
    () => false
  );

  const active = useRef(false); // mouse down
  const hovering = useRef(false); // over a clickable
  const onText = useRef(false); // over text → morph into I-beam
  const visible = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // Hide the native cursor everywhere, including elements with their own
    // `cursor: pointer` (links/buttons). One global rule beats per-element loops.
    const style = document.createElement("style");
    style.setAttribute("data-animated-cursor", "");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    // Target = pointer position; dot eases toward it for a touch of smoothing.
    let targetX = 0;
    let targetY = 0;
    let dotX = 0;
    let dotY = 0;
    let started = false;
    let rafId = 0;

    // The text element the pointer is currently within, plus the client rects of
    // its actual glyphs. A block-level heading/paragraph is wider than its text
    // (empty space fills the rest of the line), so hovering that empty area must
    // NOT morph the cursor. We test the pointer against these tight text rects
    // instead of the element's full box. Rects are cached on element change and
    // on scroll so mousemove only does cheap point-in-rect math (no reflow).
    let textEl: Element | null = null;
    let textRects: DOMRect[] = [];

    const animate = () => {
      dotX += (targetX - dotX) * SMOOTHING;
      dotY += (targetY - dotY) * SMOOTHING;
      if (dotRef.current) {
        // No scale while in text mode — the shape change carries the effect.
        const scale = onText.current
          ? 1
          : hovering.current
            ? 1.6
            : active.current
              ? 0.8
              : 1;
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const applyShape = () => {
      if (!dotRef.current) return;
      const s = dotRef.current.style;
      if (onText.current) {
        s.width = `${TEXT_WIDTH}px`;
        s.height = `${TEXT_HEIGHT}px`;
        s.borderRadius = "1px";
      } else {
        s.width = `${DOT_SIZE}px`;
        s.height = `${DOT_SIZE}px`;
        s.borderRadius = "50%";
      }
    };

    // Tight bounding rects around the actual text of an element. A block is
    // wider than its glyphs, so we measure the text nodes' ranges rather than
    // the element box. Form fields hold no measurable text — use their box.
    const collectTextRects = (el: Element): DOMRect[] => {
      const tag = el.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea")
        return [el.getBoundingClientRect()];

      const rects: DOMRect[] = [];
      const range = document.createRange();
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.nodeValue || !node.nodeValue.trim()) continue;
        range.selectNodeContents(node);
        for (const rect of Array.from(range.getClientRects())) rects.push(rect);
      }
      return rects;
    };

    const isOverText = (x: number, y: number): boolean => {
      if (hovering.current || !textEl) return false;
      for (const r of textRects) {
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom)
          return true;
      }
      return false;
    };

    const refreshTextState = (x: number, y: number) => {
      const isText = isOverText(x, y);
      if (isText !== onText.current) {
        onText.current = isText;
        applyShape();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!started) {
        // Snap to first position so it doesn't ease in from the corner.
        started = true;
        dotX = targetX;
        dotY = targetY;
      }
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }

      refreshTextState(targetX, targetY);
    };

    const onMouseDown = () => {
      active.current = true;
    };
    const onMouseUp = () => {
      active.current = false;
    };
    const onMouseLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const clickableSelector = CLICKABLES.join(",");
    const textSelector = TEXT.join(",");

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      hovering.current = !!target?.closest?.(clickableSelector);
      // Suppress the I-beam only for a pure wrapper whose entire text IS the
      // clickable (e.g. a nav <li> around an <a>). A paragraph with an inline
      // link still has its own surrounding text, so it should keep morphing.
      const clickableInside = target?.querySelector?.(clickableSelector);
      const wrapsOnlyClickable =
        !!clickableInside &&
        target?.textContent?.trim() === clickableInside.textContent?.trim();

      // Cache the hovered text element and its glyph rects. Whether to actually
      // morph is decided per pointer position in refreshTextState, so the I-beam
      // only appears over the text itself — not the empty part of a heading or
      // short paragraph line that shares the same block box.
      textEl =
        hovering.current || wrapsOnlyClickable
          ? null
          : (target?.closest?.(textSelector) ?? null);
      textRects = textEl ? collectTextRects(textEl) : [];

      refreshTextState(e.clientX, e.clientY);
    };

    // Content scrolling under a stationary pointer changes which glyphs sit
    // beneath it, so recompute the cached rects and re-test the last position.
    const onScroll = () => {
      if (!textEl) return;
      textRects = collectTextRects(textEl);
      refreshTextState(targetX, targetY);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("scroll", onScroll, true);
      cancelAnimationFrame(rafId);
      style.remove();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: "50%",
        // Color + blend are overridable per page via CSS vars. Defaults preserve
        // the adaptive invert-on-anything look.
        backgroundColor: "var(--cursor-color, #ffffff)",
        pointerEvents: "none",
        zIndex: 10000,
        opacity: 0,
        mixBlendMode:
          "var(--cursor-blend, exclusion)" as React.CSSProperties["mixBlendMode"],
        willChange: "transform, width, height",
        transition:
          "opacity 0.2s ease, width 0.18s ease, height 0.18s ease, border-radius 0.18s ease",
      }}
    />
  );
}
