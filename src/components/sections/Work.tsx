import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { work } from "@/data/content";

export default function Work() {
  const [featured, ...rest] = work.projects;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="flex flex-col gap-4 px-4 pt-20 pb-[50px] lg:gap-14 lg:px-20 lg:pb-[120px] lg:pt-[140px]"
    >
      <div className="px-2 pb-6 lg:px-0 lg:pb-0">
        <SectionHeading id="work-heading" eyebrow={work.eyebrow} title={work.title} />
      </div>
      <div className="reveal">
        <ProjectCard project={featured} featured />
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {rest.map((project, index) => (
          <li
            key={project.slug}
            className="reveal"
            style={index === 1 ? { transitionDelay: ".12s" } : undefined}
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
