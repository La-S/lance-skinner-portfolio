/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ASSETS = {
  github: "/images/github.svg",
  instagram: "/images/instagram.svg",
};

// Global site footer — rendered once from the root layout so it appears on
// every page (home, Maps4Garmin, Privacy Policy, …). Uses the .m4g-pad
// responsive padding scale and stacks on small screens.
export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 py-8 m4g-pad sm:flex-row">
      <p className="text-[20px] font-light text-black sm:text-[28px] lg:text-[32px]">
        © 2025 Sharp Edge Technology
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        {/* Privacy Policy sits to the left of All Apps in the link cluster. */}
        <Link
          href="/privacy"
          className="text-[18px] text-[#888] hover:underline sm:text-[24px]"
        >
          Terms &amp; Privacy
        </Link>
        {!isHome && (
          <Link
            href="/"
            className="text-[18px] text-black hover:underline sm:text-[24px]"
          >
            All Apps
          </Link>
        )}
        <a
          href="https://github.com/La-S"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[7px] text-[18px] text-black hover:underline sm:text-[24px]"
        >
          <img src={ASSETS.github} alt="" className="size-6" />
          Github
        </a>
        <a
          href="https://www.instagram.com/sirlancelot_developer/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[7px] text-[18px] text-black hover:underline sm:text-[24px]"
        >
          <img src={ASSETS.instagram} alt="" className="size-6" />
          Instagram
        </a>
      </div>
    </footer>
  );
}
