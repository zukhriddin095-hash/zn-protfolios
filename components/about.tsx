"use client";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  const { t } = useI18n();
  const corner = "pointer-events-none absolute z-[3] h-[22px] w-[22px] border-2 border-primary";
  return (
    <section id="about" className="py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Reveal>
          <SectionHeading text={t("about.h")} />
          <div className="max-w-[62ch] space-y-4 text-muted-foreground">
            <p>{t("about.p1")}</p><p>{t("about.p2")}</p><p>{t("about.p3")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="max-w-[420px]">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-sm border bg-card">
              <Image src="/photo.jpg" alt="Zukhriddin Nurmatov" width={720} height={900}
                className="h-full w-full object-cover contrast-[1.12] grayscale transition duration-700 group-hover:grayscale-0 group-active:grayscale-0" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-primary opacity-85 mix-blend-color transition-opacity duration-700 group-hover:opacity-0 group-active:opacity-0" />
              <span className="pointer-events-none absolute inset-0 z-[2] bg-[repeating-linear-gradient(0deg,rgba(0,0,0,.2)_0_1px,transparent_1px_3px)]" />
              <span className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-0.5 animate-scan bg-primary opacity-70 shadow-[0_0_14px_3px_hsl(var(--primary))]" />
              <i className={corner + " left-2.5 top-2.5 border-b-0 border-r-0"} /><i className={corner + " right-2.5 top-2.5 border-b-0 border-l-0"} />
              <i className={corner + " bottom-2.5 left-2.5 border-r-0 border-t-0"} /><i className={corner + " bottom-2.5 right-2.5 border-l-0 border-t-0"} />
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground">zn@dev:~$ cat photo.jpg <span className="text-primary">// hover to decrypt</span></figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
