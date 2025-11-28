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

/**
 * Resolves asset URLs to absolute URLs using the API base URL.
 * Converts relative paths (e.g., /uploads/avatars/...) to full URLs.
 *
 * @param url - The asset URL to resolve (can be relative or absolute)
 * @returns Full absolute URL, or undefined if input is null/undefined
 *
 * @example
 * resolveAssetUrl("/uploads/avatars/123.jpg")  // "http://localhost:3001/uploads/avatars/123.jpg"
 * resolveAssetUrl("https://cdn.example.com/avatar.jpg")  // "https://cdn.example.com/avatar.jpg"
 * resolveAssetUrl(null)  // undefined
 */
export function resolveAssetUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  
  // If already an absolute URL (http:// or https://), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // For relative URLs, prepend the API base URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  // Ensure the URL starts with / and doesn't have double slashes
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  
  return `${apiBaseUrl}${normalizedUrl}`;
}
