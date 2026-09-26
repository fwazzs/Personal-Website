import ArrowUpRight from "@/components/ArrowUpRight";
import ProjectMedia from "@/components/ProjectMedia";
import type { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { title, description, href, media } = project;

  return (
    <a
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-[28px] border border-line-card bg-surface transition-[translate,border-color] duration-500 ease-smooth hover:-translate-y-1.5 hover:border-line-card-hover ${
        featured ? "lg:grid lg:h-[540px] lg:grid-cols-[5fr_7fr]" : ""
      }`}
    >
      <div
        className={`h-[220px] border-b border-line ${
          featured ? "lg:order-2 lg:h-auto lg:border-b-0 lg:border-l" : "lg:h-[260px]"
        }`}
      >
        <ProjectMedia media={media} />
      </div>
      <div className={`flex flex-col justify-between gap-5 p-6 ${featured ? "lg:order-1 lg:p-12" : "lg:p-8"}`}>
        <div className="flex flex-col gap-5">
          <h3
            className={`font-sans font-semibold tracking-[-0.02em] ${
              featured
                ? "text-2xl lg:text-[40px] lg:leading-[1.1] lg:tracking-[-0.03em]"
                : "text-[22px] lg:text-2xl"
            }`}
          >
            {title}
          </h3>
          <p className={`text-[15px] leading-relaxed text-fg-muted ${featured ? "lg:text-[17px]" : ""}`}>
            {description}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-sm font-medium">
          See detail
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 ease-smooth group-hover:translate-x-[3px]"
          />
        </span>
      </div>
    </a>
  );
}
