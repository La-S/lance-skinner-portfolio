import type { Metadata } from "next";
import { Yellowtail, Familjen_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollReset from "./components/ScrollReset";
import SiteChrome from "./components/SiteChrome";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./siteConfig";

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yellowtail",
});

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: "Lancelot",
  authors: [{ name: "Lancelot" }],
  // og/twitter title + description fall back to each page's resolved title and
  // description; the OG image comes from app/opengraph-image.tsx (site-wide).
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${yellowtail.variable} ${familjenGrotesk.variable}`}
    >
      <body className="bg-[#f3f3f3]">
        {children}
        <SiteChrome>
          <ScrollReset />
          <Footer />
          <CustomCursor />
        </SiteChrome>
      </body>
    </html>
  );
}
