"use client";
import { useEffect, useRef, useState } from "react";
const CH = "01{}[]<>/$#%&*+=?";
/** Text that "decrypts" on hover (or once when scrolled into view with `auto`). */
export function Scramble({ text, auto = false, className }: { text: string; auto?: boolean; className?: string }) {
  const [s, setS] = useState(text);
  const busy = useRef(false);
  const el = useRef<HTMLSpanElement>(null);
  const cur = useRef(text);
  useEffect(() => { cur.current = text; setS(text); }, [text]);
  const go = () => {
    if (busy.current || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    busy.current = true;
    const o = cur.current; let i = 0;
    const id = setInterval(() => {
      setS(o.split("").map((c, k) => (k < i || c === " " ? c : CH[(Math.random() * CH.length) | 0])).join(""));
      i += Math.max(0.5, o.length / 14);
      if (i > o.length) { clearInterval(id); setS(o); busy.current = false; }
    }, 32);
  };
  useEffect(() => {
    if (!auto || !el.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { go(); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el.current);
    return () => io.disconnect();
  }, [auto]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={el} className={className} aria-label={text} onMouseEnter={go}>{s}</span>;
}
