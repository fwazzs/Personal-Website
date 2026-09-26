import { contact, site } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-6 font-mono text-[12px] text-fg-subtle lg:h-[88px] lg:px-20 lg:py-0 lg:text-[13px]">
      <div className="flex flex-col gap-2 lg:h-full lg:flex-row lg:items-center lg:justify-between">
        <span>
          © {year} {site.name}
        </span>
        <span>{contact.credit}</span>
        <a href="#top" className="flex min-h-[44px] items-center text-fg-muted">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
