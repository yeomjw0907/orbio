import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../components/ui';

export const AdminUsers: React.FC = () => {
  // Mock user data
  const users = [
    {
      id: '1',
      name: '김철수',
      email: 'kim@example.com',
      role: 'user',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-01-20'),
      orders: 3,
      totalSpent: 45000
    },
    {
      id: '2',
      name: '이영희',
      email: 'lee@example.com',
      role: 'enterprise',
      createdAt: new Date('2024-01-10'),
      lastLogin: new Date('2024-01-19'),
      orders: 8,
      totalSpent: 120000
    },
    {
      id: '3',
      name: '박민수',
      email: 'park@example.com',
      role: 'user',
      createdAt: new Date('2024-01-12'),
      lastLogin: new Date('2024-01-18'),
      orders: 1,
      totalSpent: 15000
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'enterprise': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return '관리자';
      case 'enterprise': return '기업';
      case 'user': return '일반';
      default: return role;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          회원 관리
        </h1>
        <p className="text-gray-600">
          가입한 회원들을 관리하고 정보를 확인하세요.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: '총 회원 수', value: users.length, icon: '/images/icons/users.svg' },
          { title: '일반 회원', value: users.filter(u => u.role === 'user').length, icon: '/images/icons/user.svg' },
          { title: '기업 회원', value: users.filter(u => u.role === 'enterprise').length, icon: '/images/icons/enterprise.svg' },
          { title: '관리자', value: users.filter(u => u.role === 'admin').length, icon: '/images/icons/admin.svg' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card glass className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.title}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orbio-blue to-orbio-green rounded-lg flex items-center justify-center">
                  <img src={stat.icon} alt={stat.title} className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card glass className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    회원 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등급
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    주문 수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    총 구매액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    마지막 로그인
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {user.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.orders}건
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalSpent.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt.toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin?.toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          상세보기
                        </Button>
                        <Button size="sm" variant="outline">
                          메시지
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* User Management Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card glass className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            회원 관리 작업
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <img src="/images/icons/email.svg" alt="이메일" className="w-6 h-6" />
              <span>이메일 발송</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <img src="/images/icons/analytics.svg" alt="분석" className="w-6 h-6" />
              <span>회원 분석</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
              <img src="/images/icons/export.svg" alt="내보내기" className="w-6 h-6" />
              <span>회원 내보내기</span>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
