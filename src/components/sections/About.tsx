import HalftonePortrait from "@/components/HalftonePortrait";
import SectionHeading from "@/components/SectionHeading";
import { about } from "@/data/content";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="flex flex-col gap-7 border-t border-line px-6 py-5 lg:grid lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20 lg:px-20 lg:pt-0 lg:pb-2.5"
    >
      <div className="relative aspect-[160/202] w-full max-w-[420px] overflow-hidden rounded-[28px] bg-bg lg:max-w-none">
        <HalftonePortrait
          src={about.portrait.src}
          alt={about.portrait.alt}
          halftoneLabel={about.portrait.halftoneLabel}
        />
      </div>
      <div className="flex flex-col gap-7">
        <SectionHeading id="about-heading" eyebrow={about.eyebrow} title={about.title} />
        <p className="reveal text-[17px] leading-[1.6] text-fg-muted lg:text-[19px]">
          {about.bio.before}{" "}
          <span className="font-mono text-[14px] text-fg lg:text-[16px]">
            {about.bio.major}
          </span>{" "}
          {about.bio.after}
        </p>
        <dl className="reveal grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-5 lg:gap-x-10 lg:gap-y-6 lg:pt-6">
          {about.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 lg:gap-1.5">
              <dt className="font-mono text-[12px] text-fg-subtle">{fact.label}</dt>
              <dd className="text-[15px] text-fg lg:text-[16px]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
