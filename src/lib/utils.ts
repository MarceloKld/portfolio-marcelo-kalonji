import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() = "class names"
 * Cette fonction combine plusieurs classes Tailwind intelligemment.
 * Elle évite les conflits (ex: si on a "p-4" et "p-2" en même temps,
 * elle garde la bonne sans bug visuel).
 *
 * Exemple d'utilisation :
 * cn("bg-black text-white", isActive && "bg-accent")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}