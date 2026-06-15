import { headers } from "next/headers";

/**
 * IP Security Utilities
 *
 * - Extract client IP from request headers
 * - Detect VPN/proxy/datacenter IPs
 * - Check for suspicious login patterns
 */

/**
 * Extract client IP from a Request object (for route handlers)
 */
export function getClientIpFromRequest(request: Request): string {
  const headersList = request.headers;

  // Vercel
  const vercelIp = headersList.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.split(",")[0].trim();

  // Cloudflare
  const cfIp = headersList.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  // Standard proxy headers
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = headersList.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

/**
 * Get user agent from a Request object
 */
export function getUserAgentFromRequest(request: Request): string {
  return request.headers.get("user-agent") || "unknown";
}

export interface IpInfo {
  ip: string;
  userAgent: string;
  isVpn: boolean;
  isProxy: boolean;
  isDatacenter: boolean;
  country: string | null;
  city: string | null;
  isp: string | null;
}

export interface IpCheckResult extends IpInfo {
  suspicious: boolean;
  suspiciousReason: string | null;
}

/**
 * Extract client IP from request headers
 * Handles Vercel, Cloudflare, and standard proxies
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  // Vercel
  const vercelIp = headersList.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.split(",")[0].trim();

  // Cloudflare
  const cfIp = headersList.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  // Standard proxy headers
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = headersList.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

/**
 * Get user agent from headers
 */
export async function getUserAgent(): Promise<string> {
  const headersList = await headers();
  return headersList.get("user-agent") || "unknown";
}

/**
 * Check IP against ip-api.com for VPN/proxy detection
 * Free tier: 45 requests/minute
 */
export async function checkIpReputation(ip: string): Promise<IpInfo> {
  const userAgent = await getUserAgent();

  // Skip check for localhost/unknown
  if (ip === "unknown" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return {
      ip,
      userAgent,
      isVpn: false,
      isProxy: false,
      isDatacenter: false,
      country: "Local",
      city: null,
      isp: "Local Network",
    };
  }

  try {
    // ip-api.com free endpoint with proxy/hosting detection
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,city,isp,proxy,hosting`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      console.error("IP API request failed:", response.status);
      return defaultIpInfo(ip, userAgent);
    }

    const data = await response.json();

    if (data.status !== "success") {
      return defaultIpInfo(ip, userAgent);
    }

    return {
      ip,
      userAgent,
      isVpn: data.proxy === true,
      isProxy: data.proxy === true,
      isDatacenter: data.hosting === true,
      country: data.country || null,
      city: data.city || null,
      isp: data.isp || null,
    };
  } catch (error) {
    console.error("IP reputation check failed:", error);
    return defaultIpInfo(ip, userAgent);
  }
}

function defaultIpInfo(ip: string, userAgent: string): IpInfo {
  return {
    ip,
    userAgent,
    isVpn: false,
    isProxy: false,
    isDatacenter: false,
    country: null,
    city: null,
    isp: null,
  };
}

/**
 * Check if login is suspicious based on IP patterns
 * Flags: VPN, datacenter, or >3 unique IPs in 30 days
 */
export async function analyzeLoginSecurity(
  ipInfo: IpInfo,
  existingIps: string[]
): Promise<IpCheckResult> {
  const reasons: string[] = [];

  // Check VPN/proxy
  if (ipInfo.isVpn || ipInfo.isProxy) {
    reasons.push("VPN/proxy detected");
  }

  // Check datacenter IP (cloud servers, not residential)
  if (ipInfo.isDatacenter) {
    reasons.push("Datacenter IP (not residential)");
  }

  // Check if this is a new IP and user already has 3+
  const uniqueIps = new Set([...existingIps, ipInfo.ip]);
  if (uniqueIps.size > 3 && !existingIps.includes(ipInfo.ip)) {
    reasons.push(`New IP added (${uniqueIps.size} unique IPs in 30 days)`);
  }

  return {
    ...ipInfo,
    suspicious: reasons.length > 0,
    suspiciousReason: reasons.length > 0 ? reasons.join("; ") : null,
  };
}

/**
 * Common VPN/proxy detection via headers
 * Quick check without external API
 */
export async function quickProxyCheck(): Promise<boolean> {
  const headersList = await headers();

  // Headers commonly set by proxies/VPNs
  const proxyHeaders = [
    "via",
    "x-forwarded-host",
    "x-originating-ip",
    "x-remote-ip",
    "x-remote-addr",
    "x-proxy-id",
    "proxy-connection",
  ];

  for (const header of proxyHeaders) {
    if (headersList.get(header)) {
      return true;
    }
  }

  return false;
}
