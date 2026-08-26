// A template re-mounts on every navigation (unlike layout, which persists),
// so wrapping the page in it replays the fade-in animation on each route
// change — giving a smooth transition between pages. Opacity-only so it never
// interferes with sticky/fixed positioning inside the page.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
