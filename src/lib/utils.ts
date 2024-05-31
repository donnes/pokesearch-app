import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractIdFromUrl(url: string) {
  const parts = url.split("/");
  return Number.parseInt(parts[parts.length - 2], 10);
}

export function extractOffsetFromUrl(url: string | null) {
  if (!url) return undefined;
  const offset = new URL(url).searchParams.get("offset");
  return offset ? Number.parseInt(offset, 10) : undefined;
}

export function renderId(id: number) {
  const idString = id.toString();
  if (idString.length === 1) return `#00${id}`;
  if (idString.length === 2) return `#0${id}`;
  return `#${id}`;
}

export function normalizePokemonName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
