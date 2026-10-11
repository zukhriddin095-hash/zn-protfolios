import * as React from "react";
import { cn } from "@/lib/utils";
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...p }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card/60 text-card-foreground backdrop-blur-sm", className)} {...p} />));
Card.displayName = "Card";
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...p }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...p} />));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...p }, ref) => (
  <h3 ref={ref} className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...p} />));
CardTitle.displayName = "CardTitle";
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...p }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...p} />));
CardContent.displayName = "CardContent";
export { Card, CardHeader, CardTitle, CardContent };
