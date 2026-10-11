export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="square" style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / .55))" }}>
      <path d="M10 22V10h12M54 22V10H42M10 42v12h12M54 42v12H42" strokeWidth={2.4} />
      <path d="M20 24h10L20 40h10M34 40V24l10 16V24" />
      <path className="animate-blink" d="M47 41h6" />
    </svg>
  );
}
