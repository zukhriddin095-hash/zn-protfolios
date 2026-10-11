"use client";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type St = { k: "idle" | "sending" | "ok" | "bad"; m: string };

export function Contact() {
  const { t } = useI18n();
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [st, setSt] = useState<St>({ k: "idle", m: "" });
  const on = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = t("ct.vn");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = t("ct.ve");
    if (f.message.trim().length < 10) er.message = t("ct.vm");
    setErr(er);
    if (Object.keys(er).length) return;
    if (!CONFIG.formEndpoint) { setSt({ k: "bad", m: t("ct.noback") }); return; } // never fake a success
    setSt({ k: "sending", m: t("ct.sending") });
    try {
      const r = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(f) });
      if (!r.ok) throw new Error();
      setSt({ k: "ok", m: t("ct.ok") }); setF({ name: "", email: "", message: "" });
    } catch { setSt({ k: "bad", m: t("ct.fail") }); }
  }
  const field = (id: "name" | "email" | "message", label: string, el: React.ReactNode) => (
    <div className="grid gap-2"><Label htmlFor={id}>{label}</Label>{el}<p id={`${id}-e`} className="min-h-[1em] text-xs font-medium text-destructive">{err[id]}</p></div>
  );
  const a = (id: "name" | "email" | "message") => ({ id, name: id, value: f[id], onChange: on(id), "aria-invalid": !!err[id], "aria-describedby": `${id}-e` });

  return (
    <section id="contact" className="py-28">
      <div className="wrap grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading text={t("ct.h")} />
          <p className="max-w-[62ch] text-muted-foreground">{t("ct.p")}</p>
          <a href={`mailto:${CONFIG.email}`} className="my-6 block break-all text-[clamp(1.1rem,3vw,1.6rem)] font-bold text-primary before:content-['>_']">{CONFIG.email}</a>
          <SocialLinks />
        </Reveal>
        <Reveal delay={0.1}>
          <Card><CardContent className="p-6 pt-6">
            <form onSubmit={submit} noValidate className="grid gap-3">
              {field("name", t("ct.name"), <Input autoComplete="name" {...a("name")} />)}
              {field("email", t("ct.email"), <Input type="email" autoComplete="email" {...a("email")} />)}
              {field("message", t("ct.msg"), <Textarea {...a("message")} />)}
              <Button type="submit" disabled={st.k === "sending"}>{st.k === "sending" ? t("ct.sending") : t("ct.send")}</Button>
              <p role="status" aria-live="polite" className={cn("min-h-[1.4em] text-sm", st.k === "bad" ? "text-destructive" : "text-muted-foreground")}>{st.m}</p>
            </form>
          </CardContent></Card>
        </Reveal>
      </div>
    </section>
  );
}
