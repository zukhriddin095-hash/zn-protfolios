const items = ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Redux", "Zustand"];
export function Marquee() {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y bg-card/30 py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-medium text-primary/85">
        {[...items, ...items].map((x, i) => <span key={i} className="before:opacity-50 before:content-['>_']">{x}</span>)}
      </div>
    </div>
  );
}
