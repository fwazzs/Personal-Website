interface SkillChipProps {
  name: string;
  path: string;
}

export default function SkillChip({ name, path }: SkillChipProps) {
  return (
    <span className="group relative flex size-[60px] shrink-0 items-center justify-center rounded-full border border-line-card bg-surface-raised text-fg transition-[background-color,border-color,scale] duration-[350ms] ease-smooth hover:scale-[1.08] hover:border-line-ghost-hover hover:bg-surface-active md:size-[84px]">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-[22px] md:size-[30px]"
      >
        <path d={path} />
      </svg>
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-fg px-2.5 py-1 font-mono text-[12px] text-bg opacity-0 transition-[opacity,translate] duration-200 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
        {name}
      </span>
    </span>
  );
}
