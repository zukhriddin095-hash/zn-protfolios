import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono", display: "swap" });
const title = "Zukhriddin Nurmatov — Junior Frontend Developer";
const description = "Portfolio of Zukhriddin Nurmatov, Junior Frontend Developer in Tashkent, Uzbekistan. React, Next.js, TypeScript.";
export const metadata: Metadata = { title, description, openGraph: { title, description, type: "website" } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={mono.variable}>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
