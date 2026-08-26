/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import AppsSection from "./components/AppsSection";
import Header from "./components/Header";

const ASSETS = {
  profile: "/images/Lance.avif",
  github: "/images/github.svg",
  instagram: "/images/instagram.svg",
};

export default function Home() {
  return (
    <div className="relative bg-[#f3f3f3]">
      {/* Fixed header — fades out on scroll (client component) */}
      <Header />

      {/* Apps section with scroll-driven scatter animation */}
      <div className="mx-auto max-w-[1440px]">
        <AppsSection />
      </div>

      {/* About section — photo + bio + socials (ported from Maps4Garmin),
          with the heading matched to the "Apps" display treatment. */}
      <section className="apps-aligned mx-auto max-w-[1440px] pb-[clamp(72px,9vw,128px)] pt-[clamp(32px,5vw,56px)]">
        <h2
          className="font-familjen text-[#888] text-center leading-[1.02] mb-12"
          style={{ fontSize: 113.717, letterSpacing: "-2.2743px" }}
        >
          About
        </h2>
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start lg:gap-[54px]">
          <div className="relative size-[200px] shrink-0 overflow-hidden rounded-full lg:size-[282px]">
            <Image
              src={ASSETS.profile}
              alt="Lance, smiling outdoors"
              fill
              sizes="(min-width: 1024px) 282px, 200px"
              className="object-cover object-center"
            />
          </div>
          <div className="flex max-w-[795px] flex-col items-center gap-7 text-center md:items-start md:text-left">
            <p className="text-[24px] leading-normal text-black">
              Lance is a Christian software developer with a passion for creating
              meaningful technology. As a fun-loving programmer, he is dedicated
              to both his faith and his craft. Lance has developed a variety of
              apps for Garmin smartwatches and for phones. His most popular app,{" "}
              <strong>Maps4Garmin</strong>, has reached over{" "}
              <strong>1.5 million downloads</strong>, helping users around the
              world navigate and look at the weather right from their wrists. He
              continues to build innovative projects with a desire to make a
              positive impact.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/La-S"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <img src={ASSETS.github} alt="" className="size-6" />
              </a>
              <a
                href="https://www.instagram.com/sirlancelot_developer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src={ASSETS.instagram} alt="" className="size-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
