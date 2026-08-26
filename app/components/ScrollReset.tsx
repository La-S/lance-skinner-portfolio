"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Resets scroll to the top on every route change. Next.js normally does this,
// but the global `html { scroll-behavior: smooth }` (used for the in-page
// anchor nav) interferes with the router's scroll restoration. Forcing an
// instant jump here keeps anchor links smooth while making page-to-page
// navigation always start at the top. Hash navigations (e.g. #features) don't
// change the pathname, so they keep their smooth behavior.
export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Defer to the next frame so this runs after Next's own scroll handling,
    // then force an instant jump to the top. `behavior: "instant"` overrides
    // the global `html { scroll-behavior: smooth }` (used for anchor links),
    // which otherwise animates/blocks the reset on route changes.
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
