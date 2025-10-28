import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, WaterDropLoading } from '../../components/ui';
import { productApi, orderApi, inquiryApi, blogApi } from '../../lib/api';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalInquiries: 0,
    totalBlogPosts: 0,
    pendingInquiries: 0,
    pendingOrders: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [products, orders, inquiries, blogPosts] = await Promise.all([
          productApi.getAll(),
          orderApi.getAll(),
          inquiryApi.getAll(),
          blogApi.getAll()
        ]);

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalInquiries: inquiries.length,
          totalBlogPosts: blogPosts.length,
          pendingInquiries: inquiries.filter((i: any) => i.status === 'pending').length,
          pendingOrders: orders.filter((o: any) => o.status === 'pending').length
        });
      } catch (error) {
        console.error('통계 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <WaterDropLoading 
          size="md" 
          color="gradient" 
          text="데이터를 불러오는 중..." 
        />
      </div>
    );
  }

  const statsCards = [
    {
      title: '총 제품',
      value: stats.totalProducts.toLocaleString(),
      change: '활성',
      changeType: 'positive',
      icon: '📦'
    },
    {
      title: '총 주문',
      value: stats.totalOrders.toLocaleString(),
      change: `${stats.pendingOrders} 대기`,
      changeType: stats.pendingOrders > 0 ? 'warning' : 'positive',
      icon: '🛒'
    },
    {
      title: '총 문의',
      value: stats.totalInquiries.toLocaleString(),
      change: `${stats.pendingInquiries} 대기`,
      changeType: stats.pendingInquiries > 0 ? 'warning' : 'positive',
      icon: '📧'
    },
    {
      title: '블로그 포스트',
      value: stats.totalBlogPosts.toLocaleString(),
      change: '게시됨',
      changeType: 'positive',
      icon: '📝'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          대시보드
        </h1>
        <p className="text-gray-600">
          ORBIO 웹사이트의 주요 지표와 현황을 확인하세요.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card glass className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orbio-blue to-orbio-green rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600">
                {stat.title}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card glass className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              최근 문의
            </h3>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <p>최근 문의가 없습니다.</p>
                <p className="text-sm">문의가 들어오면 여기에 표시됩니다.</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card glass className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              최근 주문
            </h3>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <p>최근 주문이 없습니다.</p>
                <p className="text-sm">주문이 들어오면 여기에 표시됩니다.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card glass className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            빠른 작업
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl">📝</span>
              <span>새 블로그 글 작성</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl">🛒</span>
              <span>주문 관리</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl">📧</span>
              <span>문의 관리</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl">📦</span>
              <span>제품 관리</span>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
