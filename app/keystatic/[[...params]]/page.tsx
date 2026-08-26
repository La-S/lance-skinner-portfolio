import KeystaticApp from "../keystatic";

// Catch-all so the Keystatic client router owns /keystatic and every nested
// path (/keystatic/singleton/apps, etc.). KeystaticApp renders the admin UI.
export default function Page() {
  return <KeystaticApp />;
}
