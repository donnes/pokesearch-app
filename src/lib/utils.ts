import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractIdFromUrl(url: string) {
  const parts = url.split("/");
  return parts[parts.length - 2];
}

export function extractOffsetFromUrl(url: string | null) {
  if (!url) return undefined;
  const offset = new URL(url).searchParams.get("offset");
  return offset ? Number.parseInt(offset, 10) : undefined;
}

export function renderId(id: string) {
  if (id.length === 1) return `#00${id}`;
  if (id.length === 2) return `#0${id}`;
  return `#${id}`;
}
