/**
 * Supabase Database Types
 * Generated from: supabase/migrations/00001_initial_schema.sql
 *
 * To regenerate after schema changes:
 * npx supabase gen types typescript --project-id <project-id> > types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          icon: string | null;
          image_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string | null;
          excerpt: string | null;
          category: "blog" | "events" | "viruses";
          featured_image: string | null;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content?: string | null;
          excerpt?: string | null;
          category: "blog" | "events" | "viruses";
          featured_image?: string | null;
          published_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string | null;
          excerpt?: string | null;
          category?: "blog" | "events" | "viruses";
          featured_image?: string | null;
          published_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          department: string | null;
          description: string | null;
          requirements: string | null;
          location: string;
          type: string;
          deadline: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          department?: string | null;
          description?: string | null;
          requirements?: string | null;
          location?: string;
          type?: string;
          deadline?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          department?: string | null;
          description?: string | null;
          requirements?: string | null;
          location?: string;
          type?: string;
          deadline?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      job_applications: {
        Row: {
          id: string;
          job_id: string;
          user_id: string;
          resume_url: string | null;
          cover_letter: string | null;
          status: "pending" | "reviewed" | "rejected" | "accepted";
          created_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          user_id: string;
          resume_url?: string | null;
          cover_letter?: string | null;
          status?: "pending" | "reviewed" | "rejected" | "accepted";
          created_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          user_id?: string;
          resume_url?: string | null;
          cover_letter?: string | null;
          status?: "pending" | "reviewed" | "rejected" | "accepted";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "job_applications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      inquiries: {
        Row: {
          id: string;
          reference_number: string;
          name: string;
          email: string | null;
          phone: string;
          subject: string | null;
          message: string;
          status: "new" | "read" | "archived";
          is_read: boolean;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_number: string;
          name: string;
          email?: string | null;
          phone: string;
          subject?: string | null;
          message: string;
          status?: "new" | "read" | "archived";
          is_read?: boolean;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference_number?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          status?: "new" | "read" | "archived";
          is_read?: boolean;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      appointments: {
        Row: {
          id: string;
          reference_number: string;
          department: string;
          doctor_slug: string | null;
          full_name: string;
          patient_type: "adult" | "child";
          date_of_birth: string;
          sex: "male" | "female";
          phone: string;
          email: string | null;
          appointment_date: string;
          message: string | null;
          status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_number: string;
          department: string;
          doctor_slug?: string | null;
          full_name: string;
          patient_type: "adult" | "child";
          date_of_birth: string;
          sex: "male" | "female";
          phone: string;
          email?: string | null;
          appointment_date: string;
          message?: string | null;
          status?: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference_number?: string;
          department?: string;
          doctor_slug?: string | null;
          full_name?: string;
          patient_type?: "adult" | "child";
          date_of_birth?: string;
          sex?: "male" | "female";
          phone?: string;
          email?: string;
          appointment_date?: string;
          message?: string | null;
          status?: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      auth_logs: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          ip_address: string;
          user_agent: string | null;
          is_vpn: boolean;
          is_proxy: boolean;
          is_datacenter: boolean;
          country: string | null;
          city: string | null;
          isp: string | null;
          login_at: string;
          suspicious: boolean;
          suspicious_reason: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          ip_address: string;
          user_agent?: string | null;
          is_vpn?: boolean;
          is_proxy?: boolean;
          is_datacenter?: boolean;
          country?: string | null;
          city?: string | null;
          isp?: string | null;
          login_at?: string;
          suspicious?: boolean;
          suspicious_reason?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          ip_address?: string;
          user_agent?: string | null;
          is_vpn?: boolean;
          is_proxy?: boolean;
          is_datacenter?: boolean;
          country?: string | null;
          city?: string | null;
          isp?: string | null;
          login_at?: string;
          suspicious?: boolean;
          suspicious_reason?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      user_ip_summary: {
        Row: {
          user_id: string;
          email: string;
          unique_ips: number;
          ip_list: string[];
          has_vpn_login: boolean;
          has_suspicious_login: boolean;
          last_login: string;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

// ===========================================
// HELPER TYPES
// ===========================================

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Shorthand aliases
export type Service = Tables<"services">;
export type Post = Tables<"posts">;
export type Job = Tables<"jobs">;
export type Profile = Tables<"profiles">;
export type JobApplication = Tables<"job_applications">;

export type PostCategory = Post["category"];
export type ApplicationStatus = JobApplication["status"];

// ===========================================
// APPOINTMENT TYPES
// ===========================================

export interface Appointment {
  id: string;
  reference_number: string;
  department: string;
  doctor_slug: string | null;
  full_name: string;
  patient_type: "adult" | "child";
  date_of_birth: string; // ISO date
  sex: "male" | "female";
  phone: string;
  email: string;
  appointment_date: string; // ISO date
  message: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
  created_at: string;
  updated_at: string;
}

export type AppointmentInsert = Omit<
  Appointment,
  "id" | "reference_number" | "status" | "created_at" | "updated_at"
>;

export type AppointmentStatus = Appointment["status"];

// ===========================================
// INQUIRY TYPES
// ===========================================

export interface Inquiry {
  id: string;
  reference_number: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: "new" | "read" | "archived";
  is_read: boolean;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

export type InquiryInsert = Omit<Inquiry, "id" | "reference_number" | "status" | "is_read" | "created_at" | "updated_at">;
export type InquiryStatus = Inquiry["status"];

// ===========================================
// AUTH LOG TYPES
// ===========================================

export type AuthLog = Tables<"auth_logs">;
export type UserIpSummary = Database["public"]["Views"]["user_ip_summary"]["Row"];
