"use client";
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import uz from "@/locales/uz.json";

export type Lang = "en" | "ru" | "uz";
export const LANGS: Lang[] = ["en", "ru", "uz"];
const dicts: Record<Lang, any> = { en, ru, uz };
const get = (o: any, p: string) => p.split(".").reduce((a, k) => a?.[k], o);

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; raw: (k: string) => any };
const I18n = createContext<Ctx>(null as unknown as Ctx);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, set] = useState<Lang>("en");
  useEffect(() => {
    try {
      const s = localStorage.getItem("lang") as Lang;
      const n = navigator.language.slice(0, 2) as Lang;
      set(LANGS.includes(s) ? s : LANGS.includes(n) ? n : "en");
    } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = useCallback((l: Lang) => { set(l); try { localStorage.setItem("lang", l); } catch {} }, []);
  const raw = useCallback((k: string) => get(dicts[lang], k) ?? get(dicts.en, k), [lang]);
  return <I18n.Provider value={{ lang, setLang, raw, t: (k) => String(raw(k) ?? k) }}>{children}</I18n.Provider>;
}
export const useI18n = () => useContext(I18n);
