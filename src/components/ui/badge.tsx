import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full capitalize px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        normal: "bg-pokemon-style-normal/70 text-white",
        fighting: "bg-pokemon-style-fighting/70 text-white",
        flying: "bg-pokemon-style-flying/70 text-white",
        poison: "bg-pokemon-style-poison/70 text-white",
        ground: "bg-pokemon-style-ground/70 text-white",
        rock: "bg-pokemon-style-rock/70 text-white",
        bug: "bg-pokemon-style-bug/70 text-white",
        ghost: "bg-pokemon-style-ghost/70 text-white",
        steel: "bg-pokemon-style-steel/70 text-white",
        fire: "bg-pokemon-style-fire/70 text-white",
        water: "bg-pokemon-style-water/70 text-white",
        grass: "bg-pokemon-style-grass/70 text-white",
        electric: "bg-pokemon-style-electric/70 text-white",
        psychic: "bg-pokemon-style-psychic/70 text-white",
        ice: "bg-pokemon-style-ice/70 text-white",
        dragon: "bg-pokemon-style-dragon/70 text-white",
        dark: "bg-pokemon-style-dark/70 text-white",
        fairy: "bg-pokemon-style-fairy/70 text-white",
      },
    },
    defaultVariants: {
      variant: "normal",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
