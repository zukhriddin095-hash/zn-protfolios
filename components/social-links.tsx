import { Github, Linkedin, Mail, Send } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { buttonVariants } from "@/components/ui/button";
const items = [
  { n: "Email", h: `mailto:${CONFIG.email}`, I: Mail },
  { n: "Telegram", h: CONFIG.telegram, I: Send },
  { n: "GitHub", h: CONFIG.github, I: Github },
  { n: "LinkedIn", h: CONFIG.linkedin, I: Linkedin },
];
export function SocialLinks() {
  return (
    <div className="pointer-events-auto flex flex-wrap gap-2">
      {items.map(({ n, h, I }) => (
        <a key={n} href={h} aria-label={n} title={n} className={buttonVariants({ variant: "outline", size: "icon" })}
          {...(h.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          <I className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
