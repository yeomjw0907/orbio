import { supabase } from './supabase';
import { Product, BlogPost, Order, InventoryItem } from '../types';

// 제품 관련 API
export const productApi = {
  // 모든 제품 조회 (캐싱 최적화)
  async getAll(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase 제품 조회 에러:', error);
        throw error;
      }
      
      console.log('📊 Supabase에서 제품 데이터 조회 성공:', data?.length || 0, '개');
      return data || [];
    } catch (error) {
      console.error('❌ 제품 API 호출 실패:', error);
      throw error;
    }
  },

  // 제품 ID로 조회
  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 카테고리별 제품 조회
  async getByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 제품 생성 (관리자용)
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 제품 수정 (관리자용)
  async update(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 제품 삭제 (관리자용)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// 블로그 포스트 관련 API
export const blogApi = {
  // 모든 블로그 포스트 조회
  async getAll(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 블로그 포스트 ID로 조회
  async getById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 피처드 포스트 조회
  async getFeatured(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 블로그 포스트 생성 (관리자용)
  async create(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 블로그 포스트 수정 (관리자용)
  async update(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 블로그 포스트 삭제 (관리자용)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// 주문 관련 API
export const orderApi = {
  // 모든 주문 조회 (관리자용)
  async getAll(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 사용자별 주문 조회
  async getByUserId(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 주문 생성
  async create(order: Omit<Order, 'id'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 주문 상태 업데이트 (관리자용)
  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// 재고 관련 API
export const inventoryApi = {
  // 모든 재고 조회
  async getAll(): Promise<InventoryItem[]> {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('product_name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // 재고 업데이트
  async updateStock(id: string, currentStock: number): Promise<InventoryItem> {
    const status = currentStock === 0 ? 'out-of-stock' : 
                   currentStock < 50 ? 'low-stock' : 'in-stock';
    
    const { data, error } = await supabase
      .from('inventory')
      .update({ 
        current_stock: currentStock, 
        status,
        last_updated: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 재고 항목 생성
  async create(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const { data, error } = await supabase
      .from('inventory')
      .insert([item])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// 문의 관련 API
export const inquiryApi = {
  // 문의 생성
  async create(inquiry: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
    privacy_agreed: boolean;
  }): Promise<any> {
    const { data, error } = await supabase
      .from('inquiries')
      .insert(inquiry)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 모든 문의 조회 (관리자용)
  async getAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 문의 상태 업데이트 (관리자용)
  async updateStatus(id: string, status: string): Promise<any> {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// 고객센터 관련 API
export const faqApi = {
  // 모든 FAQ 조회
  async getAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 카테고리별 FAQ 조회
  async getByCategory(category: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // FAQ 생성 (관리자용)
  async create(faq: { category: string; question: string; answer: string }): Promise<any> {
    const { data, error } = await supabase
      .from('faqs')
      .insert([faq])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // FAQ 수정 (관리자용)
  async update(id: string, updates: any): Promise<any> {
    const { data, error } = await supabase
      .from('faqs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // FAQ 삭제 (관리자용)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const noticeApi = {
  // 모든 공지사항 조회
  async getAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 공지사항 ID로 조회
  async getById(id: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 공지사항 생성 (관리자용)
  async create(notice: { title: string; content: string; author: string; is_important?: boolean }): Promise<any> {
    const { data, error } = await supabase
      .from('notices')
      .insert([notice])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 공지사항 수정 (관리자용)
  async update(id: string, updates: any): Promise<any> {
    const { data, error } = await supabase
      .from('notices')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 공지사항 삭제 (관리자용)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('notices')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// 구독 관련 API
export const subscriptionApi = {
  // 블로그 구독
  async subscribe(email: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([{
          email,
          type: 'blog',
          subscribed_at: new Date().toISOString(),
          is_active: true
        }])
        .select()
        .single();
      
      if (error) {
        console.error('구독 API 에러:', error);
        throw error;
      }
      
      console.log('✅ 구독 성공:', data);
      return data;
    } catch (error) {
      console.error('❌ 구독 API 호출 실패:', error);
      throw error;
    }
  },

  // 구독 해지
  async unsubscribe(email: string): Promise<any> {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
      .eq('email', email)
      .eq('type', 'blog')
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 구독 상태 확인
  async getSubscriptionStatus(email: string): Promise<any> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('email', email)
      .eq('type', 'blog')
      .eq('is_active', true)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116은 "not found" 에러
    return data;
  }
};

export const eventApi = {
  // 모든 이벤트 조회
  async getAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 활성 이벤트 조회
  async getActive(): Promise<any[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 이벤트 ID로 조회
  async getById(id: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 이벤트 생성 (관리자용)
  async create(event: { title: string; description: string; start_date: string; end_date: string; image?: string }): Promise<any> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 이벤트 수정 (관리자용)
  async update(id: string, updates: any): Promise<any> {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 이벤트 삭제 (관리자용)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
