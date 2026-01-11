import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge tailwind classes with ease and safety.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
