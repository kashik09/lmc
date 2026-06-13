"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  Trash2,
  Mail,
  MailOpen,
  Archive,
  Phone,
  Reply,
  ChevronDown,
  Radio,
  X,
  Clock,
  User,
  MessageSquare,
  Calendar,
} from "lucide-react";
import {
  fetchInquiries,
  markAsRead,
  archiveInquiry,
  deleteInquiry,
  bulkUpdateStatus,
  bulkDelete,
  type InboxFilter,
  type InboxCounts,
} from "@/lib/actions/inbox";
import type { Inquiry } from "@/types/database";

type Tab = "all" | "appointments" | "messages";

export default function ReceptionInboxPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [counts, setCounts] = useState<InboxCounts>({
    all: 0,
    appointments: 0,
    messages: 0,
    newCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("messages");
  const [filter, setFilter] = useState<InboxFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    const result = await fetchInquiries(filter, search);
    if (result.success && result.data) {
      setInquiries(result.data);
      if (result.counts) {
        setCounts(result.counts);
      }
    }
    setLoading(false);
  }, [filter, search]);

  useEffect(() => {
    // Using void to handle the promise without triggering the lint rule
    void (async () => {
      await loadInquiries();
    })();
  }, [loadInquiries]);

  const selectedInquiry = inquiries.find((i) => i.id === selectedId);

  const handleSelect = async (inquiry: Inquiry) => {
    setSelectedId(inquiry.id);
    if (inquiry.status === "new") {
      await markAsRead(inquiry.id);
      loadInquiries();
    }
  };

  const handleArchive = async (id: string) => {
    await archiveInquiry(id);
    if (selectedId === id) setSelectedId(null);
    loadInquiries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message permanently?")) return;
    await deleteInquiry(id);
    if (selectedId === id) setSelectedId(null);
    loadInquiries();
  };

  const handleBulkArchive = async () => {
    if (selectedIds.size === 0) return;
    await bulkUpdateStatus(Array.from(selectedIds), "archived");
    setSelectedIds(new Set());
    loadInquiries();
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} messages permanently?`)) return;
    await bulkDelete(Array.from(selectedIds));
    setSelectedIds(new Set());
    setSelectedId(null);
    loadInquiries();
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === inquiries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(inquiries.map((i) => i.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const exportCsv = () => {
    const headers = [
      "Reference",
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Message",
      "Status",
      "Date",
    ];
    const rows = inquiries.map((i) => [
      i.reference_number,
      i.name,
      i.email || "",
      i.phone || "",
      i.subject || "",
      i.message.replace(/"/g, '""'),
      i.status,
      new Date(i.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex h-screen flex-col bg-lmc-pageBg">
      {/* Top App Bar */}
      <header className="flex items-center justify-between bg-lmc-blue px-6 py-4">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-xl font-bold text-white">
            Reception Inbox
          </h1>
          <span className="flex items-center gap-1.5 rounded-full bg-lmc-green/20 px-3 py-1 text-xs font-medium text-lmc-greenOnDark">
            <Radio className="h-3 w-3 animate-pulse" />
            Receiving
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Clock className="h-4 w-4" />
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-lmc-borderLight bg-white px-6">
        {(["all", "appointments", "messages"] as Tab[]).map((tab) => {
          const tabCounts = {
            all: counts.all + counts.appointments,
            appointments: counts.appointments,
            messages: counts.messages,
          };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium capitalize transition-colors ${
                isActive
                  ? "text-lmc-green"
                  : "text-lmc-textSecondary hover:text-lmc-textPrimary"
              }`}
            >
              {tab === "all" && <Mail className="h-4 w-4" />}
              {tab === "appointments" && <Calendar className="h-4 w-4" />}
              {tab === "messages" && <MessageSquare className="h-4 w-4" />}
              {tab}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? "bg-lmc-green/10 text-lmc-green"
                    : "bg-lmc-borderLight text-lmc-textSecondary"
                }`}
              >
                {tabCounts[tab]}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lmc-green" />
              )}
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-lmc-borderLight bg-white px-6 py-3">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lmc-textSecondary" />
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-md border border-lmc-borderLight bg-lmc-pageBg py-2 pl-9 pr-3 text-sm placeholder:text-lmc-textSecondary focus:border-lmc-green focus:outline-none focus:ring-1 focus:ring-lmc-green"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 rounded-md border border-lmc-borderLight bg-white px-3 py-2 text-sm text-lmc-textPrimary hover:bg-lmc-pageBg"
            >
              <Filter className="h-4 w-4" />
              {filter === "all" ? "All Status" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showFilterMenu && (
              <div className="absolute left-0 top-full z-10 mt-1 w-40 rounded-md border border-lmc-borderLight bg-white py-1 shadow-lg">
                {(["all", "new", "read", "archived"] as InboxFilter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setShowFilterMenu(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-lmc-pageBg ${
                      filter === f ? "bg-lmc-green/10 text-lmc-green" : ""
                    }`}
                  >
                    {f === "all" ? "All Status" : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* New count badge */}
          {counts.newCount > 0 && (
            <span className="rounded-full bg-lmc-green px-2.5 py-0.5 text-xs font-medium text-white">
              {counts.newCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <>
              <span className="mr-2 text-sm text-lmc-textSecondary">
                {selectedIds.size} selected
              </span>
              <button
                onClick={handleBulkArchive}
                className="flex items-center gap-1.5 rounded-md border border-lmc-borderLight bg-white px-3 py-2 text-sm text-lmc-textPrimary hover:bg-lmc-pageBg"
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </>
          )}
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 rounded-md border border-lmc-borderLight bg-white px-3 py-2 text-sm text-lmc-textPrimary hover:bg-lmc-pageBg"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* List View */}
        <div className="w-96 flex-shrink-0 overflow-y-auto border-r border-lmc-borderLight bg-white">
          {/* Select All */}
          <div className="flex items-center gap-3 border-b border-lmc-borderLight px-4 py-2">
            <input
              type="checkbox"
              checked={selectedIds.size === inquiries.length && inquiries.length > 0}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border-lmc-borderMedium text-lmc-green focus:ring-lmc-green"
            />
            <span className="text-xs text-lmc-textSecondary">
              Select all ({inquiries.length})
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-lmc-green border-t-transparent" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Mail className="mb-3 h-12 w-12 text-lmc-borderMedium" />
              <p className="text-sm text-lmc-textSecondary">No messages found</p>
            </div>
          ) : (
            <ul>
              {inquiries.map((inquiry) => (
                <li
                  key={inquiry.id}
                  className={`group cursor-pointer border-b border-lmc-borderLight transition-colors ${
                    selectedId === inquiry.id
                      ? "bg-lmc-green/5"
                      : "hover:bg-lmc-pageBg"
                  }`}
                >
                  <div className="flex items-start gap-3 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(inquiry.id)}
                      onChange={() => toggleSelect(inquiry.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 h-4 w-4 rounded border-lmc-borderMedium text-lmc-green focus:ring-lmc-green"
                    />
                    <div
                      className="flex-1 min-w-0"
                      onClick={() => handleSelect(inquiry)}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span
                          className={`truncate text-sm ${
                            inquiry.status === "new"
                              ? "font-semibold text-lmc-textPrimary"
                              : "text-lmc-textSecondary"
                          }`}
                        >
                          {inquiry.name}
                        </span>
                        <span className="flex-shrink-0 text-xs text-lmc-textSecondary">
                          {formatDate(inquiry.created_at)}
                        </span>
                      </div>
                      <p
                        className={`mb-1 truncate text-sm ${
                          inquiry.status === "new"
                            ? "font-medium text-lmc-textPrimary"
                            : "text-lmc-textSecondary"
                        }`}
                      >
                        {inquiry.subject || "(No subject)"}
                      </p>
                      <p className="truncate text-xs text-lmc-textSecondary">
                        {inquiry.message.substring(0, 80)}
                        {inquiry.message.length > 80 ? "..." : ""}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs ${
                            inquiry.status === "new"
                              ? "bg-lmc-green/10 text-lmc-green"
                              : inquiry.status === "archived"
                              ? "bg-lmc-borderLight text-lmc-textSecondary"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {inquiry.status === "new" ? (
                            <Mail className="h-3 w-3" />
                          ) : inquiry.status === "archived" ? (
                            <Archive className="h-3 w-3" />
                          ) : (
                            <MailOpen className="h-3 w-3" />
                          )}
                          {inquiry.status}
                        </span>
                        <span className="text-xs text-lmc-textSecondary">
                          {inquiry.reference_number}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail View */}
        <div className="flex-1 overflow-y-auto bg-lmc-pageBg">
          {selectedInquiry ? (
            <div className="mx-auto max-w-3xl p-6">
              {/* Detail Header */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="mb-1 font-heading text-xl font-bold text-lmc-textPrimary">
                    {selectedInquiry.subject || "(No subject)"}
                  </h2>
                  <p className="text-sm text-lmc-textSecondary">
                    {selectedInquiry.reference_number} ·{" "}
                    {new Date(selectedInquiry.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="rounded-full p-2 text-lmc-textSecondary hover:bg-lmc-borderLight"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Sender Info Card */}
              <div className="mb-6 rounded-lg border border-lmc-borderLight bg-white p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lmc-green/10 text-lmc-green">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lmc-textPrimary">
                      {selectedInquiry.name}
                    </h3>
                    <p className="text-sm text-lmc-textSecondary">Sender</p>
                  </div>
                </div>
                <div className="grid gap-3 text-sm">
                  {selectedInquiry.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-lmc-textSecondary" />
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-lmc-green hover:underline"
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>
                  )}
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-lmc-textSecondary" />
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="text-lmc-green hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="mb-6 rounded-lg border border-lmc-borderLight bg-white p-6">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-lmc-textSecondary">
                  Message
                </h4>
                <p className="whitespace-pre-wrap leading-relaxed text-lmc-textPrimary">
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {selectedInquiry.email && (
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${
                      selectedInquiry.subject || "Your inquiry"
                    }`}
                    className="inline-flex items-center gap-2 rounded-md bg-lmc-green px-4 py-2.5 text-sm font-medium text-white hover:bg-lmc-greenDark"
                  >
                    <Reply className="h-4 w-4" />
                    Reply via Email
                  </a>
                )}
                {selectedInquiry.phone && (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="inline-flex items-center gap-2 rounded-md border border-lmc-green bg-white px-4 py-2.5 text-sm font-medium text-lmc-green hover:bg-lmc-green/5"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                )}
                <button
                  onClick={() => handleArchive(selectedInquiry.id)}
                  className="inline-flex items-center gap-2 rounded-md border border-lmc-borderMedium bg-white px-4 py-2.5 text-sm font-medium text-lmc-textPrimary hover:bg-lmc-pageBg"
                >
                  <Archive className="h-4 w-4" />
                  Archive
                </button>
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Mail className="mb-4 h-16 w-16 text-lmc-borderMedium" />
              <h3 className="mb-2 font-heading text-lg font-semibold text-lmc-textPrimary">
                Select a message
              </h3>
              <p className="text-sm text-lmc-textSecondary">
                Choose a message from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
