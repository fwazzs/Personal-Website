interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ id, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="reveal flex flex-col gap-3.5 md:gap-4">
      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-subtle md:text-[13px]">
        {eyebrow}
      </p>
      <h2 id={id} className="font-serif text-section tracking-[-0.01em]">
        {title}
      </h2>
    </div>
  );
}
