import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary font-bold text-primary-foreground shadow-[0_0_24px_-6px_hsl(var(--primary))] hover:-translate-y-0.5 hover:shadow-[0_0_32px_-2px_hsl(var(--primary))]",
        outline: "border border-border bg-card/40 hover:-translate-y-0.5 hover:border-primary hover:text-primary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: { default: "h-12 px-6", sm: "h-9 px-3", icon: "h-11 w-11" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };
