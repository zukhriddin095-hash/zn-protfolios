"use client";
import { useI18n } from "@/lib/i18n";
import { SECTIONS } from "@/lib/data";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t py-10">
      <div className="wrap flex flex-wrap items-start justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold"><Logo className="h-8 w-8 text-primary" />Zukhriddin Nurmatov</div>
          <p className="text-sm text-muted-foreground">{t("role")}</p>
          <p className="mt-2 text-xs text-muted-foreground">© {new Date().getFullYear()} Zukhriddin Nurmatov. {t("ft.c")}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          {SECTIONS.map((s) => <a key={s} href={`#${s}`} className="hover:text-foreground">{t(`nav.${s}`)}</a>)}
        </nav>
        <div className="grid justify-items-start gap-3"><SocialLinks /><Button asChild variant="outline" size="sm"><a href="#hero">{t("ft.top")}</a></Button></div>
      </div>
    </footer>
  );
}
