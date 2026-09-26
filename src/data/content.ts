export interface NavLink {
  label: string;
  href: string;
}

export type ProjectMedia = "house" | "wave" | "bars";

export interface Project {
  slug: string;
  title: string;
  description: string;
  href: string;
  media: ProjectMedia;
}

export interface Fact {
  label: string;
  value: string;
}

// Placeholder until Fawwaz sends the real URLs — grep for it before deploying.
export const MISSING_URL = "#";

export const site = {
  name: "Naufal Fawwaz Rahman",
  firstName: "Fawwaz",
  email: "naufal.fawwaz.rahman@gmail.com",
  tagline:
    "Converting prompts into UI/UX designs and realizing them into applications using AI's powers.",
};

export const navLinks: NavLink[] = [
  { label: "Project", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
];

export const hero = {
  lines: ["I prompt and", "design to"],
  words: ["Build", "Deploy", "Experiment"],
  tools: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Three.js",
    "React Three Fiber",
    "Motion",
    "Figma",
    "Supabase",
    "Vite",
    "Vitest",
    "Git & GitHub",
  ],
};

export const work = {
  eyebrow: "Project list",
  title: "Things I've Built.",
  projects: [
    {
      slug: "arsitekindo",
      title: "Arsitekindo",
      description:
        "Marketing site for Arsitekindo, an architecture studio that takes clients from floor plans to construction-ready drawings, 3D visuals and cost estimates.",
      href: "https://arsitekindo.vercel.app/",
      media: "house",
    },
    {
      slug: "omni-calculator",
      title: "Omni Calculator",
      description:
        "Ten calculators in one app, from scientific and 2D/3D graphing to chemistry and finance. 128 unit tests and a sandboxed math engine.",
      href: "https://all-in-one-calculator-indol.vercel.app/",
      media: "wave",
    },
    {
      slug: "finman",
      title: "Financial Management (FinMan)",
      description:
        "A finance app for small businesses. AI turns a photo of a receipt into a logged transaction, a POS terminal deducts stock as it sells, and category analytics track cash flow in real time.",
      href: "https://juaravibecoding.vercel.app/",
      media: "bars",
    },
  ] satisfies Project[],
};

export const skills = {
  eyebrow: "Skills",
  title: "What I work with.",
};

export const about = {
  eyebrow: "About",
  title: `Hi, I'm ${site.firstName}.`,
  bio: {
    before: "I'm an",
    major: "Information System",
    after:
      "student at ITS who loves turning simple prompts into intuitive UI/UX designs, and then pushing them into real, interactive apps using AI.",
  },
  portrait: {
    src: "/portrait.jpg",
    alt: `Portrait of ${site.firstName}`,
    halftoneLabel: `Black-and-white halftone portrait of ${site.firstName}`,
  },
  facts: [
    { label: "Studying", value: "Information System, ITS" },
    { label: "Based in", value: "Surabaya, Indonesia" },
    { label: "Currently building", value: "Financial Management (FinMan)" },
    { label: "Toolbox", value: "Figma, VS Code, Claude Code" },
  ] satisfies Fact[],
};

export const contact = {
  eyebrow: "Contact",
  titleLines: ["Let's build something", "together."],
  subtitle: "Open to Front-End and UI/UX roles, internships and collaborations.",
  socials: [
    { label: "GitHub", href: "https://github.com/fwazzs" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/naufal-fawwaz-rahman/" },
    { label: "Instagram", href: "https://www.instagram.com/fawazrz_/" },
  ] satisfies NavLink[],
  credit: "Designed and built by me · Next.js, Tailwind CSS",
};
