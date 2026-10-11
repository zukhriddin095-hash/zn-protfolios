import { Scramble } from "@/components/scramble";
export function SectionHeading({ text }: { text: string }) {
  return (
    <h2 className="mb-10 max-w-[20ch] text-[clamp(1.8rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-tight before:text-primary before:content-['#_']">
      <Scramble auto text={text} />
    </h2>
  );
}
