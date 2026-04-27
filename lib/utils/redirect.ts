/**
 * Validates that a redirect URL is safe (same-origin or relative path).
 * Prevents open redirect attacks.
 */
export function isAllowedRedirect(url: string, requestHost: string): boolean {
  try {
    // Relative paths are always allowed (but not protocol-relative //)
    if (url.startsWith("/") && !url.startsWith("//")) {
      return true;
    }

    const parsed = new URL(url);
    // Only allow same-origin redirects
    return parsed.host === requestHost;
  } catch {
    // Invalid URL, reject
    return false;
  }
}
