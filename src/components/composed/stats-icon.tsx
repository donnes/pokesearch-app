import { cn } from "@/lib/utils";
import {
  HeartIcon,
  ShieldIcon,
  ShieldPlusIcon,
  SwordIcon,
  SwordsIcon,
  ZapIcon,
} from "lucide-react";

export function StatsIcon({
  stat,
  className,
}: { stat: string; className?: string }) {
  switch (stat) {
    case "hp":
      return (
        <HeartIcon className={cn("mr-2 inline-flex h-5 w-5", className)} />
      );
    case "defense":
      return (
        <ShieldIcon className={cn("mr-2 inline-flex h-5 w-5", className)} />
      );
    case "special-defense":
      return (
        <ShieldPlusIcon className={cn("mr-2 inline-flex h-5 w-5", className)} />
      );
    case "attack":
      return (
        <SwordIcon className={cn("mr-2 inline-flex h-5 w-5", className)} />
      );
    case "special-attack":
      return (
        <SwordsIcon className={cn("mr-2 inline-flex h-5 w-5", className)} />
      );
    case "speed":
      return <ZapIcon className={cn("mr-2 inline-flex h-5 w-5", className)} />;
    default:
      return null;
  }
}
