import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "./siteConfig";

// Site-wide social share image (1200×630). Applied to every route via the
// metadata file convention, so links unfurl with this card unless a route
// provides its own opengraph-image.
export const alt = "Lancelot — Sharp Edge Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#f3f3f3",
          padding: "96px",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 700,
            color: "#1e1e1e",
            letterSpacing: "-5px",
            lineHeight: 1,
          }}
        >
          Lancelot
        </div>
        <div
          style={{
            fontSize: 42,
            color: "#888",
            marginTop: 28,
            maxWidth: 940,
            lineHeight: 1.3,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#445ce8",
            marginTop: 48,
            fontWeight: 600,
          }}
        >
          Sharp Edge Technology
        </div>
      </div>
    ),
    size
  );
}
