import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 설정
// 실제 프로젝트에서는 환경변수로 관리해야 합니다
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    };
  };
}
