"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { emit } from "@/lib/bus";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/terminal";
import { SocialLinks } from "@/components/social-links";

const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false });

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const lines = ["hero.h1", "hero.h2", "hero.h3"];
  return (
    <section id="hero" ref={ref} className="relative flex min-h-svh items-center overflow-hidden pt-24"
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest("a,button,input")) return;
        emit("burst");
        if (e.pointerType === "mouse") document.getElementById("zn-term-input")?.focus({ preventScroll: true });
      }}>
      <HeroScene heroRef={ref} />
      <div className="wrap pointer-events-none relative z-10 py-10">
        <Terminal />
        {CONFIG.available && (
          <div className="mb-5 flex items-center gap-2 text-sm text-primary">
            <i className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />{t("hero.avail")}
          </div>
        )}
        <h1 aria-label={lines.map(t).join(" ")} className="mb-6 max-w-[15ch] text-[clamp(1.9rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-tighter">
          {lines.map((k, i) => (
            <span key={k} className="block overflow-hidden">
              <b style={{ animationDelay: `${i * 0.12}s` }}
                className={"block animate-rise " + (i === 2 ? "text-primary [text-shadow:0_0_28px_hsl(var(--primary)/.55)]" : "")}>{t(k)}</b>
            </span>
          ))}
        </h1>
        <p className="max-w-[62ch] text-muted-foreground">{t("hero.p")}</p>
        <div className="pointer-events-auto my-8 flex flex-wrap gap-3">
          <Button asChild><a href="#projects"><span className="opacity-70">$</span>{t("hero.cta1")}</a></Button>
          <Button asChild variant="outline"><a href="#contact">{t("hero.cta2")}</a></Button>
        </div>
        <SocialLinks />
      </div>
    </section>
  );
}
