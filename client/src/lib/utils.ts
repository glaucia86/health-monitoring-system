import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a UUID or long ID string for display purposes.
 * Shows first N characters followed by ellipsis.
 *
 * @param id - Full ID string to truncate
 * @param length - Number of characters to show (default: 8)
 * @returns Truncated ID with ellipsis, or original if shorter than length
 *
 * @example
 * truncateId("550e8400-e29b-41d4-a716-446655440000")     // "550e8400..."
 * truncateId("550e8400-e29b-41d4-a716-446655440000", 12) // "550e8400-e29..."
 * truncateId("short")                                    // "short"
 */
export function truncateId(id: string, length: number = 8): string {
  if (!id || id.length <= length) {
    return id || "";
  }
  return `${id.slice(0, length)}...`;
}
