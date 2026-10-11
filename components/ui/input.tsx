import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...p }, ref) => (
  <input type={type} ref={ref} className={cn("flex h-11 w-full rounded-sm border border-input bg-background/60 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 aria-[invalid=true]:border-destructive", className)} {...p} />));
Input.displayName = "Input";
export { Input };
