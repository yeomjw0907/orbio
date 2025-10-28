import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 설정
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 환경변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.');
  console.error('REACT_APP_SUPABASE_URL:', supabaseUrl);
  console.error('REACT_APP_SUPABASE_ANON_KEY:', supabaseAnonKey ? '설정됨' : '설정되지 않음');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// 데이터베이스 타입 정의
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image: string;
          features: string[];
          specifications: {
            material: string;
            dimensions: string;
            weight: string;
            capacity: string;
            certifications: string[];
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image: string;
          features: string[];
          specifications: {
            material: string;
            dimensions: string;
            weight: string;
            capacity: string;
            certifications: string[];
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          category?: string;
          image?: string;
          features?: string[];
          specifications?: {
            material: string;
            dimensions: string;
            weight: string;
            capacity: string;
            certifications: string[];
          };
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          author: string;
          published_at: string;
          tags: string[];
          featured: boolean;
          image: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt: string;
          author: string;
          published_at: string;
          tags: string[];
          featured: boolean;
          image: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string;
          author?: string;
          published_at?: string;
          tags?: string[];
          featured?: boolean;
          image?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          user_name: string;
          products: {
            product_id: string;
            product_name: string;
            quantity: number;
            price: number;
          }[];
          total_amount: number;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          shipping_address: {
            name: string;
            address: string;
            phone: string;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_name: string;
          products: {
            product_id: string;
            product_name: string;
            quantity: number;
            price: number;
          }[];
          total_amount: number;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          shipping_address: {
            name: string;
            address: string;
            phone: string;
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          user_name?: string;
          products?: {
            product_id: string;
            product_name: string;
            quantity: number;
            price: number;
          }[];
          total_amount?: number;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          shipping_address?: {
            name: string;
            address: string;
            phone: string;
          };
          created_at?: string;
          updated_at?: string;
        };
      };
      inventory: {
        Row: {
          id: string;
          sku: string;
          product_name: string;
          current_stock: number;
          min_stock: number;
          max_stock: number;
          last_updated: string;
          status: 'in-stock' | 'low-stock' | 'out-of-stock';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          sku: string;
          product_name: string;
          current_stock: number;
          min_stock: number;
          max_stock: number;
          last_updated: string;
          status: 'in-stock' | 'low-stock' | 'out-of-stock';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          sku?: string;
          product_name?: string;
          current_stock?: number;
          min_stock?: number;
          max_stock?: number;
          last_updated?: string;
          status?: 'in-stock' | 'low-stock' | 'out-of-stock';
          created_at?: string;
          updated_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          subject: string;
          message: string;
          status: 'pending' | 'processing' | 'completed' | 'cancelled';
          privacy_agreed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          subject: string;
          message: string;
          status?: 'pending' | 'processing' | 'completed' | 'cancelled';
          privacy_agreed: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          subject?: string;
          message?: string;
          status?: 'pending' | 'processing' | 'completed' | 'cancelled';
          privacy_agreed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;
