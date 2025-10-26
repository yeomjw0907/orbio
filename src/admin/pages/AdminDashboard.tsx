import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../components/ui';
import { useAdminStore } from '../../store';
import { useEffect } from 'react';

export const AdminDashboard: React.FC = () => {
  const { analytics, isLoading, fetchAnalytics } = useAdminStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orbio-blue mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const stats = [
    {
      title: '총 방문자',
      value: analytics.totalVisitors.toLocaleString(),
      change: '+12%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: '페이지뷰',
      value: analytics.pageViews.toLocaleString(),
      change: '+8%',
      changeType: 'positive',
      icon: '📄'
    },
    {
      title: '평균 체류시간',
      value: `${Math.floor(analytics.averageSessionDuration / 60)}분 ${analytics.averageSessionDuration % 60}초`,
      change: '+5%',
      changeType: 'positive',
      icon: '⏱️'
    },
    {
      title: '전환율',
      value: '3.2%',
      change: '+2%',
      changeType: 'positive',
      icon: '📈'
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
        {stats.map((stat, index) => (
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
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card glass className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              트래픽 소스
            </h3>
            <div className="space-y-4">
              {Object.entries(analytics.trafficSources).map(([source, percentage]) => (
                <div key={source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      source === 'direct' ? 'bg-orbio-blue' :
                      source === 'social' ? 'bg-orbio-green' :
                      source === 'search' ? 'bg-orbio-gray' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-gray-700 capitalize">
                      {source === 'direct' ? '직접 방문' :
                       source === 'social' ? '소셜 미디어' :
                       source === 'search' ? '검색 엔진' : '기타'}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {percentage}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Monthly Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card glass className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              월별 방문자 현황
            </h3>
            <div className="space-y-4">
              {analytics.monthlyStats.map((stat, index) => (
                <div key={stat.month} className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {stat.month}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        방문자: {stat.visitors.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        페이지뷰: {stat.pageViews.toLocaleString()}
                      </div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orbio-blue to-orbio-green rounded-full"
                        style={{ width: `${(stat.visitors / Math.max(...analytics.monthlyStats.map(s => s.visitors))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl">📝</span>
              <span>새 블로그 글 작성</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl">📦</span>
              <span>주문 관리</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl">📊</span>
              <span>상세 분석 보기</span>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
