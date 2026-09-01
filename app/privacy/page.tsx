import type { Metadata } from "next";
import Link from "next/link";

// Combined website terms + privacy notice for sirlancelot.dev. The route stays
// at /privacy so existing links (the footer, any bookmarks) keep working, even
// though the document now covers both halves.
//
// Every factual claim below was checked against the code: no forms, no fetch
// calls, no cookies or localStorage, and next/font self-hosts the Google Fonts
// at build time. Keep it that way — if the site starts collecting something,
// this page changes first. "A false balance is abomination to the LORD, but a
// just weight is his delight." (Proverbs 11:1)

export const metadata: Metadata = {
  title: "Website Terms & Privacy Notice — Sharp Edge Technology",
  description:
    "The terms and privacy notice covering the sirlancelot.dev website. Individual apps are governed by their own policies.",
};

const EMAIL = "sirlancelot2604@outlook.com";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#1e1e1e]">
      <main className="mx-auto max-w-[820px] px-5 py-16 sm:px-10 sm:py-24">
        <Link
          href="/"
          className="text-[16px] text-[#888] transition-colors hover:text-[#1e1e1e]"
        >
          ← All Apps
        </Link>

        <h1 className="brand-gradient mt-6 text-[40px] font-semibold leading-tight tracking-tight sm:text-[56px]">
          Website Terms &amp; Privacy Notice
        </h1>
        <p className="mt-2 text-[16px] text-[#888]">
          Last updated: August 31, 2026
        </p>

        <div className="mt-10 flex flex-col gap-8 text-[18px] leading-[1.6] text-black">
          <section>
            <p>
              This notice covers <strong>sirlancelot.dev</strong>{" "}
              (&quot;this site&quot;), operated by Sharp Edge Technology LLC
              (&quot;we,&quot;
              &quot;us,&quot; &quot;our&quot;). It is short because this site is
              a simple informational portfolio.
            </p>
            <p className="mt-4">
              <strong>It does not cover the apps themselves.</strong> Each app —
              Maps4Garmin, Holy Bible, Race Day, In Town, and the rest — is
              governed by the terms and privacy policy published with its own
              store listing. Those are the documents that apply once you install
              one.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              1. What This Site Is
            </h2>
            <p>
              This site exists to describe the apps we build and link you to
              where you can get them. There are no accounts, no sign-in, no
              purchases, and no forms on it. Nothing you do here creates a
              relationship with us beyond reading the page.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              2. What We Collect
            </h2>
            <p>
              <strong>Directly, nothing.</strong> This site sets no cookies, uses
              no local or session storage, and runs no advertising or tracking
              scripts. There is no form anywhere on it, so we never ask for your
              name, email address, phone number, or postal address. Our web
              fonts are compiled into the site and served from our own domain
              rather than loaded from Google, so viewing a page here sends no
              request to Google or to any third party other than our hosting
              provider, described next.
            </p>
            <p className="mt-4">
              <strong>Through our hosting provider.</strong> This site is hosted
              on Vercel. Like every web host, Vercel automatically records
              standard server request data for each visit:
            </p>
            <ul className="mt-4 list-disc pl-6">
              <li>IP address</li>
              <li>Browser type and user agent</li>
              <li>The page requested and the response status</li>
              <li>Date and time of the request</li>
            </ul>
            <p className="mt-4">
              This is used to serve the site, keep it available, and defend
              against abuse. Vercel processes it on our behalf as our service
              provider. We do not use it to build a profile of you, and we do
              not connect it to any app account.
            </p>
            <p className="mt-4">
              We may also use Vercel&apos;s aggregate traffic measurement, which
              reports counts such as how many people viewed a page.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              3. What We Don&apos;t Do
            </h2>
            <ul className="list-disc pl-6">
              <li>We do not sell your personal information.</li>
              <li>
                We do not share it for cross-context behavioral advertising, as
                that term is defined under the California Consumer Privacy Act
                (CCPA/CPRA).
              </li>
              <li>
                We do not run advertising networks or third-party ad trackers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              4. Children&apos;s Privacy
            </h2>
            <p>
              This site is not directed to children under 13, and because it
              collects nothing directly, we do not knowingly collect personal
              information from them. If you believe a child has sent us personal
              information some other way, contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              5. Links to Other Places
            </h2>
            <p>
              This site links out to app stores, to our GitHub and Instagram
              profiles, and to our support email. Once you follow one of those
              links, that provider&apos;s own terms and privacy policy govern
              what happens there. We have no control over, and assume no
              responsibility for, the content or practices of third-party sites.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              6. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="mt-4 list-disc pl-6">
              <li>
                Scrape, crawl, or use automated tools to access this site in a
                way that burdens or disrupts it.
              </li>
              <li>
                Attempt to gain unauthorized access to the site, its hosting, or
                any connected system.
              </li>
              <li>Use the site in any way that violates applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              7. Content and Ownership
            </h2>
            <p>
              The content, design, graphics, screenshots, and code of this site
              are owned by Sharp Edge Technology LLC, to the fullest extent of
              the law. You may read and share links to it, but you don&apos;t
              receive any ownership or license rights in it.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              8. Informational Only
            </h2>
            <p>
              The descriptions of our apps on this site are provided for general
              information and may not reflect the most current released version.
              Where anything here differs from an app&apos;s own terms or
              privacy policy, that app&apos;s documents control. This site is
              provided &quot;as is,&quot; without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              9. Security
            </h2>
            <p>
              We value your trust, and we strive to use acceptable means of
              protecting any information that reaches us. But no method of
              transmission over the internet, or method of electronic storage,
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              10. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Sharp Edge Technology LLC
              is not liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of this
              site.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              11. Governing Law
            </h2>
            <p>
              This notice is governed by the laws of the State of Oklahoma,
              without regard to its conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">12. Changes</h2>
            <p>
              We may update this notice from time to time by posting a revised
              version here with a new &quot;Last updated&quot; date. Changes are
              effective when posted.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">13. Contact</h2>
            <p>
              Questions about this site? Reach us at{" "}
              <a href={`mailto:${EMAIL}`} className="underline">
                {EMAIL}
              </a>
              , or find us on{" "}
              <a
                href="https://github.com/La-S"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>{" "}
              and{" "}
              <a
                href="https://www.instagram.com/sirlancelot_developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Instagram
              </a>
              .
            </p>
          </section>

          <hr className="border-[#ddd]" />
          <p className="text-[16px] text-[#888]">
            Sharp Edge Technology LLC, an Oklahoma limited liability company
          </p>
        </div>
      </main>
    </div>
  );
}