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
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
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
export type Inquiry = Tables<"inquiries">;

export type PostCategory = Post["category"];
export type ApplicationStatus = JobApplication["status"];
