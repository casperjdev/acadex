export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          school_email: string | null
          trust_score: number
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          school_email?: string | null
          trust_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          school_email?: string | null
          trust_score?: number
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          seller_id: string
          title: string
          description: string | null
          price: number
          subject: string | null
          category: 'TEXTBOOK' | 'NOTES' | 'EQUIPMENT' | 'OTHER'
          condition: 'NEW' | 'USED_LIKE_NEW' | 'USED_GOOD' | 'USED_FAIR'
          status: 'available' | 'reserved' | 'sold'
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          title: string
          description?: string | null
          price: number
          subject?: string | null
          category: 'TEXTBOOK' | 'NOTES' | 'EQUIPMENT' | 'OTHER'
          condition: 'NEW' | 'USED_LIKE_NEW' | 'USED_GOOD' | 'USED_FAIR'
          status?: 'available' | 'reserved' | 'sold'
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          title?: string
          description?: string | null
          price?: number
          subject?: string | null
          category?: 'TEXTBOOK' | 'NOTES' | 'EQUIPMENT' | 'OTHER'
          condition?: 'NEW' | 'USED_LIKE_NEW' | 'USED_GOOD' | 'USED_FAIR'
          status?: 'available' | 'reserved' | 'sold'
          image_url?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          listing_id: string
          sender_id: string
          receiver_id: string
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          sender_id: string
          receiver_id: string
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}
