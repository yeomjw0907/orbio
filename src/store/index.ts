import { create } from 'zustand';
import { User, Order, BlogPost, Analytics, InventoryItem } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface AdminState {
  orders: Order[];
  blogPosts: BlogPost[];
  analytics: Analytics | null;
  inventory: InventoryItem[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  fetchBlogPosts: () => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  fetchInventory: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  createBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Mock login logic - 실제로는 API 호출
      if (email === 'admin@orbio.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          name: '관리자',
          email: 'admin@orbio.com',
          role: 'admin',
          createdAt: new Date(),
          lastLogin: new Date(),
        };
        set({ user, isAuthenticated: true, isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export const useAdminStore = create<AdminState>((set, get) => ({
  orders: [],
  blogPosts: [],
  analytics: null,
  inventory: [],
  isLoading: false,
  
  fetchOrders: async () => {
    set({ isLoading: true });
    // Mock data - 실제로는 API 호출
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: '1',
        userName: '김철수',
        products: [
          {
            productId: '1',
            productName: 'ORBIO Easy-Clean 컵',
            quantity: 2,
            price: 15000,
          },
        ],
        totalAmount: 30000,
        status: 'pending',
        createdAt: new Date('2024-01-15'),
        shippingAddress: {
          name: '김철수',
          address: '서울시 강남구 테헤란로 123',
          phone: '010-1234-5678',
        },
      },
    ];
    set({ orders: mockOrders, isLoading: false });
  },
  
  fetchBlogPosts: async () => {
    set({ isLoading: true });
    // Mock data
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'ORBIO의 혁신적인 Easy-Clean 기술',
        content: 'ORBIO의 Easy-Clean 기술은...',
        excerpt: '혁신적인 세척 기술로 더 이상 어려운 청소는 없습니다.',
        author: 'ORBIO 팀',
        published_at: new Date('2024-01-10').toISOString(),
        tags: ['기술', '혁신', 'Easy-Clean'],
        featured: true,
      },
    ];
    set({ blogPosts: mockPosts, isLoading: false });
  },
  
  fetchAnalytics: async () => {
    set({ isLoading: true });
    // Mock data
    const mockAnalytics: Analytics = {
      totalVisitors: 12543,
      pageViews: 45678,
      averageSessionDuration: 245,
      trafficSources: {
        direct: 45,
        social: 25,
        search: 20,
        referral: 10,
      },
      monthlyStats: [
        { month: '2024-01', visitors: 1200, pageViews: 4500 },
        { month: '2024-02', visitors: 1350, pageViews: 5200 },
        { month: '2024-03', visitors: 1500, pageViews: 5800 },
      ],
    };
    set({ analytics: mockAnalytics, isLoading: false });
  },
  
  fetchInventory: async () => {
    set({ isLoading: true });
    // Mock data
    const mockInventory: InventoryItem[] = [
      {
        id: '1',
        sku: 'ORB-EC-001',
        productName: 'ORBIO Easy-Clean 컵',
        currentStock: 150,
        minStock: 50,
        maxStock: 500,
        lastUpdated: new Date(),
        status: 'in-stock',
      },
    ];
    set({ inventory: mockInventory, isLoading: false });
  },
  
  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    const orders = get().orders;
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    set({ orders: updatedOrders });
  },
  
  createBlogPost: async (post: Omit<BlogPost, 'id' | 'published_at'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      published_at: new Date().toISOString(),
    };
    const blogPosts = get().blogPosts;
    set({ blogPosts: [...blogPosts, newPost] });
  },
  
  updateBlogPost: async (id: string, post: Partial<BlogPost>) => {
    const blogPosts = get().blogPosts;
    const updatedPosts = blogPosts.map(p =>
      p.id === id ? { ...p, ...post } : p
    );
    set({ blogPosts: updatedPosts });
  },
  
  deleteBlogPost: async (id: string) => {
    const blogPosts = get().blogPosts;
    const filteredPosts = blogPosts.filter(p => p.id !== id);
    set({ blogPosts: filteredPosts });
  },
}));
