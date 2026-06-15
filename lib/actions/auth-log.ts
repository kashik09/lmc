"use server";

import { createClient } from "@/lib/supabase/server";
import {
  getClientIp,
  getClientIpFromRequest,
  getUserAgentFromRequest,
  checkIpReputation,
  analyzeLoginSecurity,
  type IpInfo,
} from "@/lib/utils/ip-security";

/**
 * Log admin/staff login with IP security analysis
 *
 * Called after successful authentication to track:
 * - IP address and location
 * - VPN/proxy detection
 * - Suspicious patterns (>3 IPs)
 */
export async function logAdminLogin(userId: string, email: string) {
  const supabase = await createClient();

  try {
    // Get IP and check reputation
    const ip = await getClientIp();
    const ipInfo = await checkIpReputation(ip);

    // Get existing IPs for this user (last 30 days)
    const { data: existingLogs } = await supabase
      .from("auth_logs")
      .select("ip_address")
      .eq("user_id", userId)
      .gte("login_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    const existingIps = existingLogs?.map((log) => log.ip_address) || [];

    // Analyze for suspicious activity
    const analysis = await analyzeLoginSecurity(ipInfo, existingIps);

    // Insert log entry
    const { error } = await supabase.from("auth_logs").insert({
      user_id: userId,
      email,
      ip_address: analysis.ip,
      user_agent: analysis.userAgent,
      is_vpn: analysis.isVpn,
      is_proxy: analysis.isProxy,
      is_datacenter: analysis.isDatacenter,
      country: analysis.country,
      city: analysis.city,
      isp: analysis.isp,
      suspicious: analysis.suspicious,
      suspicious_reason: analysis.suspiciousReason,
    });

    if (error) {
      console.error("Failed to log admin login:", error);
    }

    // Return analysis for potential UI warning
    return {
      logged: !error,
      suspicious: analysis.suspicious,
      reason: analysis.suspiciousReason,
      uniqueIps: new Set([...existingIps, ip]).size,
    };
  } catch (error) {
    console.error("Auth logging error:", error);
    return { logged: false, suspicious: false, reason: null, uniqueIps: 0 };
  }
}

/**
 * Get login history for current user
 */
export async function getMyLoginHistory(limit = 10) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("auth_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("login_at", { ascending: false })
    .limit(limit);

  return data || [];
}

/**
 * Get suspicious logins (admin only)
 */
export async function getSuspiciousLogins(limit = 50) {
  const supabase = await createClient();

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return [];

  const { data } = await supabase
    .from("auth_logs")
    .select("*")
    .eq("suspicious", true)
    .order("login_at", { ascending: false })
    .limit(limit);

  return data || [];
}

/**
 * Get users with more than 3 unique IPs
 */
export async function getHighRiskUsers() {
  const supabase = await createClient();

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return [];

  const { data } = await supabase
    .from("user_ip_summary")
    .select("*")
    .gt("unique_ips", 3)
    .order("unique_ips", { ascending: false });

  return data || [];
}

/**
 * Log admin login from a route handler (uses Request object)
 * Called from auth/callback after magic link authentication
 */
export async function logAdminLoginFromRequest(
  request: Request,
  userId: string,
  email: string
) {
  const supabase = await createClient();

  try {
    const ip = getClientIpFromRequest(request);
    const userAgent = getUserAgentFromRequest(request);

    // Check IP reputation
    const ipInfo = await checkIpReputationDirect(ip, userAgent);

    // Get existing IPs for this user (last 30 days)
    const { data: existingLogs } = await supabase
      .from("auth_logs")
      .select("ip_address")
      .eq("user_id", userId)
      .gte("login_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    const existingIps = existingLogs?.map((log) => log.ip_address) || [];

    // Analyze for suspicious activity
    const analysis = await analyzeLoginSecurity(ipInfo, existingIps);

    // Insert log entry
    const { error } = await supabase.from("auth_logs").insert({
      user_id: userId,
      email,
      ip_address: analysis.ip,
      user_agent: analysis.userAgent,
      is_vpn: analysis.isVpn,
      is_proxy: analysis.isProxy,
      is_datacenter: analysis.isDatacenter,
      country: analysis.country,
      city: analysis.city,
      isp: analysis.isp,
      suspicious: analysis.suspicious,
      suspicious_reason: analysis.suspiciousReason,
    });

    if (error) {
      console.error("Failed to log admin login:", error);
    }

    return {
      logged: !error,
      suspicious: analysis.suspicious,
      reason: analysis.suspiciousReason,
    };
  } catch (error) {
    console.error("Auth logging error:", error);
    return { logged: false, suspicious: false, reason: null };
  }
}

/**
 * Direct IP reputation check (doesn't use headers())
 */
async function checkIpReputationDirect(ip: string, userAgent: string): Promise<IpInfo> {
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
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,city,isp,proxy,hosting`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return { ip, userAgent, isVpn: false, isProxy: false, isDatacenter: false, country: null, city: null, isp: null };
    }

    const data = await response.json();

    if (data.status !== "success") {
      return { ip, userAgent, isVpn: false, isProxy: false, isDatacenter: false, country: null, city: null, isp: null };
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
    return { ip, userAgent, isVpn: false, isProxy: false, isDatacenter: false, country: null, city: null, isp: null };
  }
}
