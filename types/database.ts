/**
 * Supabase Database Types
 * Auto-generated from Supabase project: lmc (yzqtswhlyoumwsgtbris)
 *
 * To regenerate after schema changes:
 * npx supabase gen types typescript --project-id yzqtswhlyoumwsgtbris > types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          date_of_birth: string
          department: string
          doctor_slug: string | null
          email: string
          full_name: string
          id: string
          ip_address: string | null
          message: string | null
          patient_type: string
          phone: string
          reference_number: string
          sex: string
          status: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          appointment_date: string
          created_at?: string
          date_of_birth: string
          department: string
          doctor_slug?: string | null
          email: string
          full_name: string
          id?: string
          ip_address?: string | null
          message?: string | null
          patient_type: string
          phone: string
          reference_number: string
          sex: string
          status?: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          appointment_date?: string
          created_at?: string
          date_of_birth?: string
          department?: string
          doctor_slug?: string | null
          email?: string
          full_name?: string
          id?: string
          ip_address?: string | null
          message?: string | null
          patient_type?: string
          phone?: string
          reference_number?: string
          sex?: string
          status?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      auth_logs: {
        Row: {
          city: string | null
          country: string | null
          email: string
          id: string
          ip_address: string
          is_datacenter: boolean | null
          is_proxy: boolean | null
          is_vpn: boolean | null
          isp: string | null
          login_at: string
          suspicious: boolean | null
          suspicious_reason: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          email: string
          id?: string
          ip_address: string
          is_datacenter?: boolean | null
          is_proxy?: boolean | null
          is_vpn?: boolean | null
          isp?: string | null
          login_at?: string
          suspicious?: boolean | null
          suspicious_reason?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          city?: string | null
          country?: string | null
          email?: string
          id?: string
          ip_address?: string
          is_datacenter?: boolean | null
          is_proxy?: boolean | null
          is_vpn?: boolean | null
          isp?: string | null
          login_at?: string
          suspicious?: boolean | null
          suspicious_reason?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string | null
          email: string
          id: string
          ip_address: string | null
          is_read: boolean
          message: string
          name: string
          phone: string | null
          reference_number: string
          status: "new" | "read" | "archived"
          subject: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          ip_address?: string | null
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
          reference_number: string
          status?: "new" | "read" | "archived"
          subject?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
          reference_number?: string
          status?: "new" | "read" | "archived"
          subject?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string
          resume_url: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          resume_url?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          resume_url?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string | null
          deadline: string | null
          department: string | null
          description: string | null
          id: string
          is_active: boolean | null
          location: string | null
          requirements: string | null
          slug: string
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          deadline?: string | null
          department?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          requirements?: string | null
          slug: string
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          deadline?: string | null
          department?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          requirements?: string | null
          slug?: string
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      password_history: {
        Row: {
          created_at: string
          id: string
          password_hash: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          password_hash: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          password_hash?: string
          user_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
        }
        Relationships: []
      }
      roster_assignments: {
        Row: {
          created_at: string | null
          day: string
          doctor_id: string
          id: string
          time_block_id: string
        }
        Insert: {
          created_at?: string | null
          day: string
          doctor_id: string
          id?: string
          time_block_id: string
        }
        Update: {
          created_at?: string | null
          day?: string
          doctor_id?: string
          id?: string
          time_block_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roster_assignments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "roster_doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roster_assignments_time_block_id_fkey"
            columns: ["time_block_id"]
            isOneToOne: false
            referencedRelation: "roster_time_blocks"
            referencedColumns: ["id"]
          },
        ]
      }
      roster_departments: {
        Row: {
          color_bg: string
          color_fg: string
          created_at: string | null
          id: string
          name: string
          short_name: string | null
          sort_order: number | null
        }
        Insert: {
          color_bg?: string
          color_fg?: string
          created_at?: string | null
          id: string
          name: string
          short_name?: string | null
          sort_order?: number | null
        }
        Update: {
          color_bg?: string
          color_fg?: string
          created_at?: string | null
          id?: string
          name?: string
          short_name?: string | null
          sort_order?: number | null
        }
        Relationships: []
      }
      roster_doctors: {
        Row: {
          active: boolean | null
          created_at: string | null
          department_id: string | null
          id: string
          name: string
          title: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          department_id?: string | null
          id: string
          name: string
          title?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          department_id?: string | null
          id?: string
          name?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roster_doctors_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "roster_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      roster_time_blocks: {
        Row: {
          created_at: string | null
          end_time: string
          id: string
          sort_order: number | null
          start_time: string
        }
        Insert: {
          created_at?: string | null
          end_time: string
          id: string
          sort_order?: number | null
          start_time: string
        }
        Update: {
          created_at?: string | null
          end_time?: string
          id?: string
          sort_order?: number | null
          start_time?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          slug: string
          sort_order: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          slug: string
          sort_order?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          slug?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      user_ip_summary: {
        Row: {
          email: string | null
          has_suspicious_login: boolean | null
          has_vpn_login: boolean | null
          ip_list: string[] | null
          last_login: string | null
          unique_ips: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_password_to_history: {
        Args: { p_password_hash: string; p_user_id: string }
        Returns: undefined
      }
      check_password_reuse: {
        Args: { p_password_hash: string; p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ===========================================
// SHORTHAND TYPE ALIASES
// ===========================================

export type Service = Tables<"services">
export type Post = Tables<"posts">
export type Job = Tables<"jobs">
export type Profile = Tables<"profiles">
export type JobApplication = Tables<"job_applications">
export type Appointment = Tables<"appointments">
export type Inquiry = Tables<"inquiries">
export type AuthLog = Tables<"auth_logs">
export type UserIpSummary = Database["public"]["Views"]["user_ip_summary"]["Row"]
export type InquiryStatus = Inquiry["status"]
