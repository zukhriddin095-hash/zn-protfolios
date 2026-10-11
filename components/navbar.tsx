"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { LANGS, useI18n } from "@/lib/i18n";
import { SECTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Scramble } from "@/components/scramble";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => {
      removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur">
        <nav aria-label="Main" className="wrap flex h-16 items-center gap-3">
          <a
            href="#hero"
            aria-label="Zukhriddin Nurmatov"
            className="mr-auto flex items-center gap-2 font-bold text-primary"
          >
            <Logo className="h-8 w-8" />
            <span>zn@dev:~$</span>
          </a>
          <div className="hidden items-center gap-5 lg:flex">
            {SECTIONS.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className={cn(
                  "border-b border-transparent text-xs text-muted-foreground transition-colors before:text-primary before:content-['./'] hover:text-foreground",
                  active === s && "border-primary text-foreground",
                )}
              >
                <Scramble text={t(`nav.${s}`)} />
              </a>
            ))}
          </div>
          <div
            role="group"
            aria-label={t("a.lang")}
            className="flex overflow-hidden rounded-sm border"
          >
            {LANGS.map((l) => (
              <button
                key={l}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className={cn(
                  "h-11 min-w-11 text-xs font-bold text-muted-foreground transition-colors",
                  lang === l && "bg-primary text-primary-foreground",
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label={t("a.th")}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={t(open ? "a.close" : "a.menu")}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col gap-2 bg-background px-6 pt-24 lg:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setOpen(false)}
              className="py-2 text-3xl font-bold before:text-primary before:content-['./']"
            >
              {t(`nav.${s}`)}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
