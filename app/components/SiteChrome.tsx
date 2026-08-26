"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the global site chrome (footer, custom cursor, scroll reset)
 * everywhere EXCEPT the Keystatic admin at /keystatic, which ships its own
 * full-screen UI and shouldn't inherit the site's footer or custom cursor.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/keystatic")) return null;
  return <>{children}</>;
}
