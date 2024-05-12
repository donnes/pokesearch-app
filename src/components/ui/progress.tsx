import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-zinc-50",
      hp: "bg-green-400",
      defense: "bg-blue-400",
      "special-defense": "bg-cyan-400",
      attack: "bg-orange-400",
      "special-attack": "bg-red-400",
      speed: "bg-yellow-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressIndicatorVariants> {}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, variant, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-zinc-800",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={progressIndicatorVariants({ variant })}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
