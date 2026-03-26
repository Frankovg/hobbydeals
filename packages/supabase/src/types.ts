export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          keyword: string
          last_triggered_at: string | null
          max_price: number | null
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          keyword: string
          last_triggered_at?: string | null
          max_price?: number | null
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          keyword?: string
          last_triggered_at?: string | null
          max_price?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string
          created_at: string | null
          deals_count: number | null
          description: string | null
          icon: string
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          color: string
          created_at?: string | null
          deals_count?: number | null
          description?: string | null
          icon: string
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          color?: string
          created_at?: string | null
          deals_count?: number | null
          description?: string | null
          icon?: string
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          deal_id: string
          id: string
          is_deleted: boolean | null
          parent_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          deal_id: string
          id?: string
          is_deleted?: boolean | null
          parent_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          deal_id?: string
          id?: string
          is_deleted?: boolean | null
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_tags: {
        Row: {
          deal_id: string
          tag_id: string
        }
        Insert: {
          deal_id: string
          tag_id: string
        }
        Update: {
          deal_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_tags_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_votes: {
        Row: {
          created_at: string | null
          deal_id: string
          id: string
          user_id: string
          vote: Database["public"]["Enums"]["vote_value"]
        }
        Insert: {
          created_at?: string | null
          deal_id: string
          id?: string
          user_id: string
          vote: Database["public"]["Enums"]["vote_value"]
        }
        Update: {
          created_at?: string | null
          deal_id?: string
          id?: string
          user_id?: string
          vote?: Database["public"]["Enums"]["vote_value"]
        }
        Relationships: [
          {
            foreignKeyName: "deal_votes_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          category_id: string | null
          comments_count: number | null
          created_at: string | null
          currency: string | null
          description: string | null
          discount_pct: number | null
          expires_at: string | null
          id: string
          image_source: string | null
          image_url: string | null
          is_featured: boolean | null
          is_sponsored: boolean | null
          original_price: number | null
          price: number | null
          status: Database["public"]["Enums"]["deal_status"] | null
          store_id: string | null
          temperature: number | null
          title: string
          updated_at: string | null
          url: string
          user_id: string | null
          views_count: number | null
          votes_cold: number | null
          votes_hot: number | null
        }
        Insert: {
          category_id?: string | null
          comments_count?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          discount_pct?: number | null
          expires_at?: string | null
          id?: string
          image_source?: string | null
          image_url?: string | null
          is_featured?: boolean | null
          is_sponsored?: boolean | null
          original_price?: number | null
          price?: number | null
          status?: Database["public"]["Enums"]["deal_status"] | null
          store_id?: string | null
          temperature?: number | null
          title: string
          updated_at?: string | null
          url: string
          user_id?: string | null
          views_count?: number | null
          votes_cold?: number | null
          votes_hot?: number | null
        }
        Update: {
          category_id?: string | null
          comments_count?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          discount_pct?: number | null
          expires_at?: string | null
          id?: string
          image_source?: string | null
          image_url?: string | null
          is_featured?: boolean | null
          is_sponsored?: boolean | null
          original_price?: number | null
          price?: number | null
          status?: Database["public"]["Enums"]["deal_status"] | null
          store_id?: string | null
          temperature?: number | null
          title?: string
          updated_at?: string | null
          url?: string
          user_id?: string | null
          views_count?: number | null
          votes_cold?: number | null
          votes_hot?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          deal_id: string | null
          id: string
          is_read: boolean | null
          title: string
          type: Database["public"]["Enums"]["notif_type"]
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          deal_id?: string | null
          id?: string
          is_read?: boolean | null
          title: string
          type: Database["public"]["Enums"]["notif_type"]
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          deal_id?: string | null
          id?: string
          is_read?: boolean | null
          title?: string
          type?: Database["public"]["Enums"]["notif_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          deals_count: number | null
          display_name: string | null
          id: string
          is_verified: boolean | null
          notif_prefs: Json | null
          reputation: number | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          deals_count?: number | null
          display_name?: string | null
          id: string
          is_verified?: boolean | null
          notif_prefs?: Json | null
          reputation?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          deals_count?: number | null
          display_name?: string | null
          id?: string
          is_verified?: boolean | null
          notif_prefs?: Json | null
          reputation?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          comment_id: string | null
          created_at: string | null
          deal_id: string | null
          description: string | null
          id: string
          reason: string
          reporter_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["report_status"] | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          id?: string
          reason: string
          reporter_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          id?: string
          reason?: string
          reporter_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_deals: {
        Row: {
          created_at: string | null
          deal_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deal_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          deal_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_deals_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_deals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          affiliate_tpl: string | null
          created_at: string | null
          deals_count: number | null
          id: string
          is_verified: boolean | null
          logo_url: string | null
          name: string
          slug: string
          website_url: string
        }
        Insert: {
          affiliate_tpl?: string | null
          created_at?: string | null
          deals_count?: number | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          slug: string
          website_url: string
        }
        Update: {
          affiliate_tpl?: string | null
          created_at?: string | null
          deals_count?: number | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          slug?: string
          website_url?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          category_id: string | null
          deals_count: number | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          category_id?: string | null
          deals_count?: number | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          category_id?: string | null
          deals_count?: number | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_category_follows: {
        Row: {
          category_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_category_follows_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_category_follows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      deal_status: "pending" | "active" | "expired" | "rejected" | "archived"
      notif_type:
        | "alert_match"
        | "comment_reply"
        | "deal_hot"
        | "deal_expired"
        | "system"
      report_status: "pending" | "reviewed" | "resolved" | "dismissed"
      user_role: "user" | "moderator" | "admin"
      vote_value: "hot" | "cold"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      deal_status: ["pending", "active", "expired", "rejected", "archived"],
      notif_type: [
        "alert_match",
        "comment_reply",
        "deal_hot",
        "deal_expired",
        "system",
      ],
      report_status: ["pending", "reviewed", "resolved", "dismissed"],
      user_role: ["user", "moderator", "admin"],
      vote_value: ["hot", "cold"],
    },
  },
} as const

