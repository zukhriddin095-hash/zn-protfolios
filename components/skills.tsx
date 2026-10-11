"use client";
import { useI18n } from "@/lib/i18n";
import { SKILLS } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="py-28">
      <div className="wrap">
        <SectionHeading text={t("skills.h")} />
        <div className="grid gap-4 md:grid-cols-6">
          {SKILLS.map((g, i) => (
            <Reveal key={g.k} delay={i * 0.06} className={g.span}>
              <Card className="h-full">
                <CardHeader><CardTitle className="text-sm font-medium text-primary before:opacity-60 before:content-['//_']">{t(g.k)}</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {g.items.map((x) => (
                    <Badge key={x} variant="outline" className="px-4 py-2 text-sm before:mr-1 before:text-primary before:content-['>'] hover:border-primary hover:bg-primary hover:text-primary-foreground hover:before:text-primary-foreground">{x}</Badge>
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
