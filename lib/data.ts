export const SECTIONS = ["about", "skills", "projects", "journey", "contact"] as const;

export const SKILLS = [
  { k: "sk.core", span: "md:col-span-3", items: ["HTML5", "CSS3", "JavaScript", "TypeScript"] },
  { k: "sk.fw", span: "md:col-span-3", items: ["React.js", "Next.js"] },
  { k: "sk.style", span: "md:col-span-2", items: ["Tailwind CSS"] },
  { k: "sk.state", span: "md:col-span-4", items: ["Redux", "Redux Toolkit", "Zustand"] },
];

/** Demo concepts, NOT real shipped work. Replace with your own (set live / repo). */
export const PROJECTS = [
  { k: "p1", tags: ["React", "TypeScript", "Tailwind CSS"], live: "", repo: "", hue: 0, cls: "md:col-span-7" },
  { k: "p2", tags: ["Next.js", "Redux Toolkit"], live: "", repo: "", hue: 40, cls: "md:col-span-5 md:mt-20" },
  { k: "p3", tags: ["HTML5", "CSS3", "JavaScript"], live: "", repo: "", hue: 80, cls: "md:col-span-5" },
  { k: "p4", tags: ["Three.js", "React"], live: "", repo: "", hue: 120, cls: "md:col-span-7 md:mt-12" },
];
