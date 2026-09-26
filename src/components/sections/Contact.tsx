import ArrowUpRight from "@/components/ArrowUpRight";
import { MISSING_URL, contact, site } from "@/data/content";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.06),transparent_55%)] border-t border-line px-6 pt-5 pb-10 md:border-t-0 md:pt-0 md:pb-14 lg:px-20"
    >
      <div className="reveal flex flex-col gap-6 md:gap-10">
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-subtle md:text-[13px]">
          {contact.eyebrow}
        </p>
        <h2 id="contact-heading" className="font-serif text-contact tracking-[-0.02em]">
          {contact.titleLines[0]}
          <br />
          <span className="text-fg-faint">{contact.titleLines[1]}</span>
        </h2>
        <p className="max-w-[560px] text-[17px] leading-[1.55] text-fg-muted md:text-[19px]">
          {contact.subtitle}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-fg px-6 text-[16px] font-medium text-bg transition-transform duration-200 ease-smooth hover:scale-[1.03] hover:bg-fg-hover sm:w-auto"
          >
            <span>{site.email}</span>
            <ArrowUpRight />
          </a>
          <div className="grid grid-cols-3 gap-2 sm:contents">
            {contact.socials.map((social) => {
              const isMissing = social.href === MISSING_URL;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  {...(!isMissing && { target: "_blank", rel: "noopener noreferrer" })}
                  className="inline-flex h-[52px] items-center justify-center rounded-full border border-line-ghost px-0 text-[15px] sm:px-6 font-medium text-fg transition-colors duration-200 hover:border-line-ghost-hover hover:bg-surface-hover sm:text-[16px]"
                >
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
