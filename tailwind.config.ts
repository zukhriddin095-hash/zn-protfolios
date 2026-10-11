import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
const h = (v: string) => `hsl(var(--${v}) / <alpha-value>)`;
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-mono)", "ui-monospace", "monospace"], mono: ["var(--font-mono)", "ui-monospace", "monospace"] },
      colors: {
        border: h("border"), input: h("input"), ring: h("ring"), background: h("background"), foreground: h("foreground"),
        primary: { DEFAULT: h("primary"), foreground: h("primary-foreground") },
        secondary: { DEFAULT: h("secondary"), foreground: h("secondary-foreground") },
        muted: { DEFAULT: h("muted"), foreground: h("muted-foreground") },
        accent: { DEFAULT: h("accent"), foreground: h("accent-foreground") },
        destructive: { DEFAULT: h("destructive"), foreground: h("destructive-foreground") },
        card: { DEFAULT: h("card"), foreground: h("card-foreground") },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 1px)", sm: "calc(var(--radius) - 2px)" },
      keyframes: {
        rise: { from: { transform: "translateY(105%)" } },
        scan: { to: { top: "100%" } },
        blink: { "50%": { opacity: "0" } },
        marquee: { to: { transform: "translateX(-50%)" } },
      },
      animation: {
        rise: "rise 1s cubic-bezier(.2,.8,.2,1) both", scan: "scan 4.5s linear infinite",
        blink: "blink 1s steps(1) infinite", marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [animate],
};
export default config;
