"use client";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Journey() {
  const { t, raw } = useI18n();
  const items: string[][] = raw("jr.items") ?? [];
  return (
    <section id="journey" className="py-28">
      <div className="wrap">
        <SectionHeading text={t("jr.h")} />
        <ol className="ml-2 border-l">
          {items.map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <li className="relative pb-10 pl-8 before:absolute before:-left-[6px] before:top-2.5 before:h-[11px] before:w-[11px] before:bg-primary before:shadow-[0_0_0_5px_hsl(var(--background)),0_0_14px_hsl(var(--primary))]">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="max-w-[62ch] text-muted-foreground">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">{t("jr.note")}</p>
      </div>
    </section>
  );
}
