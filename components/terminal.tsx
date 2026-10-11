"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { LANGS, Lang, useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { PROJECTS, SECTIONS, SKILLS } from "@/lib/data";
import { emit } from "@/lib/bus";

type Line = { t: string; c?: "dim" | "cmd" | "err" };
const cls = { dim: "text-muted-foreground", cmd: "text-primary", err: "text-destructive" };

export function Terminal() {
  const { t, lang, setLang } = useI18n();
  const { setTheme } = useTheme();
  const [out, setOut] = useState<Line[]>([{ t: 'type "help" — or click anywhere on the hero', c: "dim" }]);
  const [v, setV] = useState("");
  const [ty, setTy] = useState("");
  const keep = useRef("");
  const hist = useRef<string[]>([]);
  const hi = useRef(0);

  useEffect(() => {
    const c = "whoami --role"; let i = 0;
    const id = setInterval(() => { setTy(c.slice(0, ++i)); if (i >= c.length) clearInterval(id); }, 80);
    return () => clearInterval(id);
  }, []);

  const say = (text: string, c?: Line["c"]) => setOut((o) => [...o, { t: text, c }].slice(-8));
  const go = (h: string) => setTimeout(() => (location.hash = h), 450);

  const H: Record<string, (...a: string[]) => void> = {
    help: () => say("help whoami neofetch skills projects ls cd contact theme lang echo hack explode reset clear"),
    whoami: () => say(`Zukhriddin Nurmatov — ${t("role")} — Tashkent, UZ — Najot Ta’lim`),
    neofetch: () => ["zn@dev", "------", `Role: ${t("role")}`, "Edu: Najot Ta’lim", "Loc: Tashkent, UZ", "Stack: React, Next.js, TypeScript"].forEach((x) => say(x)),
    skills: () => SKILLS.forEach((g) => say(`${t(g.k)}: ${g.items.join(", ")}`)),
    projects: () => PROJECTS.forEach((p) => say(`• ${t(p.k + ".t")} (${t("demo")})`)),
    ls: () => say(SECTIONS.map((s) => s + "/").join(" ")),
    cd: (a = "") => { const s = SECTIONS.find((x) => x === a.replace("/", "")); if (s) { say("→ " + s); document.getElementById(s)?.scrollIntoView({ behavior: "smooth" }); } else say(`cd: no such directory: ${a}`, "err"); },
    contact: () => { say(CONFIG.email); say(CONFIG.telegram); go("#contact"); },
    sudo: () => { say("permission granted. opening contact…"); go("#contact"); },
    theme: (a) => (a === "dark" || a === "light" ? (setTheme(a), say("theme → " + a)) : say("usage: theme dark|light", "err")),
    lang: (a) => (LANGS.includes(a as Lang) ? (setLang(a as Lang), say("lang → " + a)) : say("usage: lang en|ru|uz", "err")),
    echo: (...a) => { keep.current = a.join(" ").slice(0, 12); emit("text", keep.current); say(keep.current ? "particles → " + keep.current : "usage: echo <text>", "dim"); },
    reset: () => { keep.current = ""; emit("text", ""); say("static </> restored", "dim"); },
    explode: () => { emit("burst"); say("boom."); },
    clear: () => setOut([]),
    hack: () => {
      ["[+] scanning ports...", "[+] bypassing firewall...", "[+] injecting <3 ...", "[ok] access granted to... nothing. just a portfolio."].forEach((x, i) => setTimeout(() => say(x, "cmd"), i * 600));
      emit("burst");
    },
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") { e.preventDefault(); const m = Object.keys(H).filter((k) => k.startsWith(v.trim())); if (m.length === 1) setV(m[0]); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); hi.current = Math.max(0, hi.current - 1); setV(hist.current[hi.current] ?? ""); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); hi.current = Math.min(hist.current.length, hi.current + 1); setV(hist.current[hi.current] ?? ""); return; }
    if (e.key !== "Enter") return;
    const raw = v.trim(); setV(""); if (!raw) return;
    hist.current.push(raw); hi.current = hist.current.length; say("$ " + raw, "cmd");
    const [c, ...r] = raw.split(/\s+/);
    (H[c.toLowerCase()] ?? (() => say(`command not found: ${c} (try help)`, "err")))(...r);
    if (c.toLowerCase() !== "echo") emit("text", keep.current);
  };

  return (
    <div className="pointer-events-none mb-8 max-w-xl">
      <div className="flex items-center gap-2 border bg-card/60 px-3 py-2 text-xs text-muted-foreground">
        <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2">~/zukhriddin/portfolio — zsh</span>
      </div>
      <div className="border border-t-0 bg-background/75 p-4 text-sm">
        <span className="text-primary">zn@dev:~$</span> {ty}
        <div aria-live="polite" className="mt-2 space-y-0.5 text-[.85rem]">
          {out.map((l, i) => <div key={i} className={l.c ? cls[l.c] : ""}>{l.t}</div>)}
        </div>
        <label className="pointer-events-auto mt-2 flex gap-2 font-normal">
          <span className="text-primary">$</span>
          <input id="zn-term-input" value={v} onChange={(e) => { setV(e.target.value); emit("text", e.target.value.trim().slice(0, 12) || keep.current); }}
            onKeyDown={onKey} autoComplete="off" spellCheck={false} aria-label="terminal" placeholder="help"
            className="min-w-0 flex-1 bg-transparent caret-primary outline-none placeholder:text-muted-foreground/50" />
        </label>
      </div>
    </div>
  );
}
