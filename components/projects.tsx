"use client";
import { useI18n } from "@/lib/i18n";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Preview({ i, hue, label }: { i: number; hue: number; label: string }) {
  return (
    <svg role="img" aria-label={label} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice"
      className="h-full w-full transition-transform duration-700 group-hover:scale-105" style={{ filter: `hue-rotate(${hue - 105}deg) saturate(1.1)` }}>
      <defs><linearGradient id={`g${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8b5cf6" /><stop offset="1" stopColor="#22d3ee" /></linearGradient></defs>
      <rect width="320" height="200" fill="#0d0d16" />
      <circle cx={210 - i * 20} cy={70 + i * 12} r={70 + i * 8} fill={`url(#g${i})`} opacity=".85" />
      <rect x="28" y="30" width="110" height="10" rx="5" fill="#fff" opacity=".85" /><rect x="28" y="52" width="70" height="7" rx="3.5" fill="#fff" opacity=".4" />
      <rect x="28" y="130" width={100 + i * 22} height="46" rx="10" fill="#fff" opacity=".1" stroke="#fff" strokeOpacity=".25" />
    </svg>
  );
}

export function Projects() {
  const { t } = useI18n();
  const link = (u: string, l: string) =>
    u ? <Button asChild variant="link" size="sm" className="px-0"><a href={u} target="_blank" rel="noopener noreferrer">{l}</a></Button>
      : <span className="text-sm text-muted-foreground">{l}: {t("soon")}</span>;
  return (
    <section id="projects" className="py-28">
      <div className="wrap">
        <SectionHeading text={t("proj.h")} />
        <p className="-mt-6 mb-12 max-w-[62ch] text-muted-foreground">{t("proj.note")}</p>
        <div className="grid gap-8 md:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.k} className={p.cls}>
              <Card className="group h-full overflow-hidden p-3 transition duration-300 hover:-translate-y-1.5 hover:border-primary">
                <div className="aspect-[16/10] overflow-hidden rounded-sm border bg-card"><Preview i={i} hue={p.hue} label={t(p.k + ".t")} /></div>
                <CardContent className="p-4 pt-5">
                  <h3 className="text-2xl font-bold tracking-tight">{t(p.k + ".t")} <span className="text-sm font-normal text-primary">· {t("demo")}</span></h3>
                  <p className="mt-2 text-muted-foreground">{t(p.k + ".d")}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((x) => <Badge key={x} variant="outline" className="text-muted-foreground">{x}</Badge>)}</div>
                  <div className={cn("mt-3 flex gap-5")}>{link(p.live, t("live"))}{link(p.repo, t("repo"))}</div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
