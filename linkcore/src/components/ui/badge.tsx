import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-b from-brand-soft to-brand text-white shadow-[0_6px_20px_-8px_rgba(255,59,71,0.8)]",
        secondary: "border-white/10 bg-white/[0.06] text-white/70",
        outline: "border-white/15 text-white/70",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
