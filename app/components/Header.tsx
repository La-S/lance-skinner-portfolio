// Fixed transparent header — "Lancelot" wordmark centered, always visible.
// pointer-events-none throughout since the wordmark is decorative — never
// blocks clicks on the page content beneath it.
export default function Header() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[75px] max-w-[1440px] items-center">
        <div className="flex-1 text-center font-yellowtail text-[45px] text-[#1e1e1e] tracking-[-0.9px] leading-none">
          Lancelot
        </div>
      </div>
    </div>
  );
}
