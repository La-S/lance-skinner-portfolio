import Link from "next/link";

// Sticky, frosted header for the Maps4Garmin product page.
// A 3-equal-column grid keeps the wordmark perfectly centered on screen
// regardless of the side columns' widths: back link · wordmark · section nav.
// On small screens the section nav collapses but the wordmark stays centered.
export default function Maps4GarminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full px-[clamp(12px,3vw,24px)] pt-[clamp(12px,2vw,20px)]">
      <div className="mx-auto grid h-[68px] max-w-[1440px] grid-cols-3 items-center rounded-[20px] border border-white/30 bg-[#f3f3f3]/40 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150 m4g-pad">
        {/* Back to all apps */}
        <Link
          href="/"
          className="flex w-fit items-center gap-[10px] text-[#888] transition-colors hover:text-[#1e1e1e]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="shrink-0"
          >
            <path
              d="M6 19H9V14C9 13.7167 9.096 13.4793 9.288 13.288C9.48 13.0967 9.71733 13.0007 10 13H14C14.2833 13 14.521 13.096 14.713 13.288C14.905 13.48 15.0007 13.7173 15 14V19H18V10L12 5.5L6 10V19ZM4 19V10C4 9.68333 4.071 9.38333 4.213 9.1C4.355 8.81667 4.55067 8.58333 4.8 8.4L10.8 3.9C11.15 3.63333 11.55 3.5 12 3.5C12.45 3.5 12.85 3.63333 13.2 3.9L19.2 8.4C19.45 8.58333 19.646 8.81667 19.788 9.1C19.93 9.38333 20.0007 9.68333 20 10V19C20 19.55 19.804 20.021 19.412 20.413C19.02 20.805 18.5493 21.0007 18 21H14C13.7167 21 13.4793 20.904 13.288 20.712C13.0967 20.52 13.0007 20.2827 13 20V15H11V20C11 20.2833 10.904 20.521 10.712 20.713C10.52 20.905 10.2827 21.0007 10 21H6C5.45 21 4.97933 20.8043 4.588 20.413C4.19667 20.0217 4.00067 19.5507 4 19Z"
              fill="currentColor"
            />
          </svg>
          <span className="hidden text-[16px] font-semibold sm:inline sm:text-[18px]">
            All Apps
          </span>
        </Link>

        {/* Wordmark — centered third of the grid = screen center */}
        <p className="text-center text-[18px] font-semibold tracking-tight text-[#1e1e1e] sm:text-[24px]">
          Maps4Garmin
        </p>

        {/* Section nav — hidden on small screens */}
        <nav className="hidden items-center justify-self-end gap-5 lg:flex xl:gap-7">
          <a
            href="#features"
            className="whitespace-nowrap text-[18px] font-semibold text-[#888] transition-colors hover:text-[#1e1e1e]"
          >
            Features
          </a>
          <a
            href="#developer"
            className="whitespace-nowrap text-[18px] font-semibold text-[#888] transition-colors hover:text-[#1e1e1e]"
          >
            Developer
          </a>
          <a
            href="#other-apps"
            className="whitespace-nowrap text-[18px] font-semibold text-[#888] transition-colors hover:text-[#1e1e1e]"
          >
            Other Apps
          </a>
        </nav>
      </div>
    </header>
  );
}
