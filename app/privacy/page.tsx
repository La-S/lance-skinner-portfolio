import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Sharp Edge Technology",
  description:
    "Privacy policy for Sharp Edge Technology apps, including Maps4Garmin.",
};

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
          Privacy Policy
        </h1>
        <p className="mt-2 text-[16px] text-[#888]">Last updated: May 31, 2026</p>

        <div className="mt-10 flex flex-col gap-8 text-[18px] leading-[1.6] text-black">
          <section>
            <p>
              Lance operates the sirlancelot.dev website, which provides the
              SERVICE.
            </p>
            <p className="mt-4">
              This page is used to inform website visitors regarding our policies
              with the collection, use, and disclosure of Personal Information if
              anyone decided to use our Service, the sirlancelot.dev website.
            </p>
            <p className="mt-4">
              If you choose to use our Service, then you agree to the collection
              and use of information in relation with this policy. The Personal
              Information that we collect are used for providing and improving
              the Service. We will not use or share your information with anyone
              except as described in this Privacy Policy. Our Privacy Policy was
              created with the help of the Privacy Policy Template Generator.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              Information Collection and Use
            </h2>
            <p>
              For a better experience while using our Service, we may require you
              to provide us with certain personally identifiable information,
              including but not limited to your name, phone number, and postal
              address. The information that we collect will be used to contact or
              identify you.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">Log Data</h2>
            <p>
              We want to inform you that whenever you visit our Service, we
              collect information that your browser sends to us that is called Log
              Data. This Log Data may include information such as your
              computer&rsquo;s Internet Protocol (&quot;IP&quot;) address, browser
              version, pages of our Service that you visit, the time and date of
              your visit, the time spent on those pages, and other statistics.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">Cookies</h2>
            <p>Our website does not utilize cookies.</p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">Service Providers</h2>
            <p>
              We currently do not employ third-party companies or individuals in
              conjunction with your personal data.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">Security</h2>
            <p>
              We value your trust in providing us your Personal Information, thus
              we are striving to use acceptable means of protecting it. But
              remember that no method of transmission over the internet, or
              method of electronic storage is 100% secure and reliable, and we
              cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              Links to Other Sites
            </h2>
            <p>
              Our Service may contain links to other sites. If you click on a
              third-party link, you will be directed to that site. Note that
              these external sites are not operated by us. Therefore, we strongly
              advise you to review the Privacy Policy of these websites. We have
              no control over, and assume no responsibility for the content,
              privacy policies, or practices of any third-party sites or
              services.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              Children&rsquo;s Privacy
            </h2>
            <p>
              Our Services do not address anyone under the age of 13. We do not
              knowingly collect personal identifiable information from children
              under 13. If you are a parent or guardian and you are aware that
              your child has provided us with personal information, please contact
              us so that we will be able to do necessary actions.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, we advise
              you to review this page periodically for any changes. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              These changes are effective immediately, after they are posted on
              this page.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[24px] font-semibold">Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us via{" "}
              <a
                href="https://github.com/La-S"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>{" "}
              or{" "}
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
        </div>
      </main>
    </div>
  );
}
