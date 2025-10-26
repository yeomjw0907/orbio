// 기본 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'enterprise';
  createdAt: Date;
  lastLogin?: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'easy-clean' | 'antimicrobial' | 'eco';
  image: string;
  features: string[];
  specifications: {
    material: string;
    dimensions: string;
    weight: string;
    capacity?: string;
    certifications: string[];
  };
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  products: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: {
    name: string;
    address: string;
    phone: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  image?: string;
  featured: boolean;
}

export interface Analytics {
  totalVisitors: number;
  pageViews: number;
  averageSessionDuration: number;
  trafficSources: {
    direct: number;
    social: number;
    search: number;
    referral: number;
  };
  monthlyStats: {
    month: string;
    visitors: number;
    pageViews: number;
  }[];
}

export interface InventoryItem {
  id: string;
  sku: string;
  productName: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  lastUpdated: Date;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}
