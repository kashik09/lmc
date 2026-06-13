"use server";

import { createClient } from "@/lib/supabase/server";
import type { Inquiry, InquiryStatus } from "@/types/database";

export type InboxFilter = "all" | "new" | "read" | "archived";
export type InboxTab = "all" | "appointments" | "messages";

export interface InboxCounts {
  all: number;
  appointments: number;
  messages: number;
  newCount: number;
}

export interface FetchInboxResult {
  success: boolean;
  data?: Inquiry[];
  counts?: InboxCounts;
  error?: string;
}

export async function fetchInquiries(
  filter: InboxFilter = "all",
  search?: string
): Promise<FetchInboxResult> {
  const supabase = await createClient();

  let query = supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  // Apply status filter
  if (filter !== "all") {
    query = query.eq("status", filter);
  }

  // Apply search
  if (search && search.trim()) {
    const searchTerm = `%${search.trim()}%`;
    query = query.or(
      `name.ilike.${searchTerm},email.ilike.${searchTerm},subject.ilike.${searchTerm},reference_number.ilike.${searchTerm}`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("[inbox] fetch inquiries failed:", error);
    return { success: false, error: error.message };
  }

  // Get counts
  const { count: totalCount } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true });

  const { count: newCount } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  return {
    success: true,
    data: data as Inquiry[],
    counts: {
      all: totalCount ?? 0,
      appointments: 0, // Will be populated when appointments inbox is added
      messages: totalCount ?? 0,
      newCount: newCount ?? 0,
    },
  };
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("inquiries")
    .update({
      status,
      is_read: status !== "new",
    })
    .eq("id", id);

  if (error) {
    console.error("[inbox] update status failed:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function markAsRead(
  id: string
): Promise<{ success: boolean; error?: string }> {
  return updateInquiryStatus(id, "read");
}

export async function archiveInquiry(
  id: string
): Promise<{ success: boolean; error?: string }> {
  return updateInquiryStatus(id, "archived");
}

export async function deleteInquiry(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("inquiries").delete().eq("id", id);

  if (error) {
    console.error("[inbox] delete failed:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function bulkUpdateStatus(
  ids: string[],
  status: InquiryStatus
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("inquiries")
    .update({
      status,
      is_read: status !== "new",
    })
    .in("id", ids);

  if (error) {
    console.error("[inbox] bulk update failed:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function bulkDelete(
  ids: string[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("inquiries").delete().in("id", ids);

  if (error) {
    console.error("[inbox] bulk delete failed:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
