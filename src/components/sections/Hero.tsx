import CyclingWord from "@/components/CyclingWord";
import HeroParticles from "@/components/HeroParticles";
import { hero, site } from "@/data/content";

const DESKTOP_HORIZONTAL_LINES = [
  "top-[12.5%]",
  "top-[25%]",
  "top-[37.5%]",
  "top-[50%]",
  "top-[62.5%]",
  "top-[75%]",
  "top-[87.5%]",
];

const DESKTOP_VERTICAL_LINES = [
  "left-[8.33%]",
  "left-[16.66%]",
  "left-[25%]",
  "left-[33.33%]",
  "left-[41.66%]",
  "left-[50%]",
  "left-[58.33%]",
  "left-[66.66%]",
  "left-[75%]",
  "left-[83.33%]",
  "left-[91.66%]",
];

const MOBILE_HORIZONTAL_LINES = ["top-[25%]", "top-[50%]", "top-[75%]"];
const MOBILE_VERTICAL_LINES = ["left-[25%]", "left-[50%]", "left-[75%]"];

export default function Hero() {
  const heroLabel = `${hero.lines.join(" ")} ${hero.words.join(", ")}.`;

  return (
    <section
      id="top"
      className="relative flex h-[800px] flex-col justify-end overflow-hidden px-6 pt-[120px] pb-[140px] md:h-[900px] md:justify-center md:py-0 lg:px-0"
    >
      <HeroParticles />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 md:hidden">
        {MOBILE_HORIZONTAL_LINES.map((cls) => (
          <div key={cls} className={`absolute inset-x-0 h-px bg-fg/4 ${cls}`} />
        ))}
        {MOBILE_VERTICAL_LINES.map((cls) => (
          <div key={cls} className={`absolute inset-y-0 w-px bg-fg/4 ${cls}`} />
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        {DESKTOP_HORIZONTAL_LINES.map((cls) => (
          <div key={cls} className={`absolute inset-x-0 h-px bg-fg/4 ${cls}`} />
        ))}
        {DESKTOP_VERTICAL_LINES.map((cls) => (
          <div key={cls} className={`absolute inset-y-0 w-px bg-fg/4 ${cls}`} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-6 md:gap-14 lg:px-20">
        <h1
          aria-label={heroLabel}
          style={{ animationDelay: "80ms" }}
          className="animate-rise font-serif text-hero tracking-[-0.02em]"
        >
          <span className="block">{hero.lines[0]}</span>
          <span className="block">
            {hero.lines[1]} <CyclingWord words={hero.words} />
          </span>
        </h1>
        <p
          style={{ animationDelay: "160ms" }}
          className="animate-rise max-w-[560px] text-[17px] leading-[1.6] text-fg-muted md:text-[22px]"
        >
          {site.tagline}
        </p>
      </div>

      <div
        style={{ animationDelay: "320ms" }}
        className="group animate-rise absolute inset-x-0 bottom-0 z-10 flex h-16 items-center overflow-hidden border-y border-line bg-bg/60 md:h-[88px]"
      >
        <div className="animate-marquee flex w-max shrink-0 whitespace-nowrap font-mono text-sm text-fg-subtle group-hover:[animation-play-state:paused] md:text-[15px]">
          <ul aria-label="Tools I use" className="flex gap-10 pr-10 md:gap-16 md:pr-16">
            {hero.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <ul aria-hidden="true" className="flex gap-10 pr-10 md:gap-16 md:pr-16">
            {hero.tools.map((tool) => (
              <li key={`dup-${tool}`}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
