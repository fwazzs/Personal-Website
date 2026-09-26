import SectionHeading from "@/components/SectionHeading";
import SkillChip from "@/components/SkillChip";
import { skills } from "@/data/content";
import { skillList } from "@/data/skills";
import styles from "./Skills.module.css";

const LOOP_SECONDS = 48;

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="flex flex-col gap-6 border-t border-line pt-2.5 pb-5 md:gap-10 md:py-[50px]"
    >
      <div className="px-6 lg:px-20">
        <SectionHeading id="skills-heading" eyebrow={skills.eyebrow} title={skills.title} />
      </div>
      <div className={`reveal ${styles.band}`}>
        <ul className={styles.list} aria-label="Skills">
          {skillList.map((skill, index) => (
            <li
              key={skill.name}
              className={styles.item}
              style={{ animationDelay: `-${(index * (LOOP_SECONDS / skillList.length)).toFixed(2)}s` }}
            >
              <SkillChip name={skill.name} path={skill.path} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
