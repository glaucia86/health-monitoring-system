import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a UUID or long ID string for display purposes.
 * Shows first N characters + ellipsis + last N characters.
 *
 * @param id - Full ID string to truncate
 * @param length - Number of characters to show at start and end (default: 8)
 * @returns Truncated ID with ellipsis in the middle, or original if shorter than 2*length
 *
 * @example
 * truncateId("550e8400-e29b-41d4-a716-446655440000")     // "550e8400...55440000"
 * truncateId("conv_1764190975625_a0ef607a-31b9-4451")    // "conv_176...b9-4451"
 * truncateId("short")                                    // "short"
 */
export function truncateId(id: string, length: number = 8): string {
  // Threshold must account for the 3 characters of "..." in the truncated output
  // Only truncate if the result (length + 3 + length) is shorter than the original
  if (!id || id.length <= length * 2 + 3) {
    return id || "";
  }
  return `${id.slice(0, length)}...${id.slice(-length)}`;
}
