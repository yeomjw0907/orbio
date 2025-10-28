import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../components/ui';
import { inquiryApi } from '../../lib/api';

export const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const data = await inquiryApi.getAll();
      setInquiries(data);
    } catch (error) {
      console.error('문의 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await inquiryApi.updateStatus(id, status);
      loadInquiries(); // 목록 새로고침
    } catch (error) {
      console.error('상태 업데이트 실패:', error);
    }
  };

  const filteredInquiries = selectedStatus === 'all' 
    ? inquiries 
    : inquiries.filter(inquiry => inquiry.status === selectedStatus);

  const statusOptions = [
    { value: 'all', label: '전체', count: inquiries.length },
    { value: 'pending', label: '대기', count: inquiries.filter(i => i.status === 'pending').length },
    { value: 'processing', label: '처리중', count: inquiries.filter(i => i.status === 'processing').length },
    { value: 'completed', label: '완료', count: inquiries.filter(i => i.status === 'completed').length },
    { value: 'cancelled', label: '취소', count: inquiries.filter(i => i.status === 'cancelled').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '대기';
      case 'processing': return '처리중';
      case 'completed': return '완료';
      case 'cancelled': return '취소';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">문의 관리</h1>
        <p className="text-gray-600">고객 문의를 확인하고 처리하세요.</p>
      </div>

      {/* 상태 필터 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === option.value
                  ? 'bg-orbio-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      {/* 문의 목록 */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">문의가 없습니다.</p>
          </Card>
        ) : (
          filteredInquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {inquiry.subject}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{inquiry.name}</span>
                      <span>{inquiry.email}</span>
                      <span>{new Date(inquiry.created_at).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inquiry.status)}`}>
                    {getStatusLabel(inquiry.status)}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                </div>

                {inquiry.company && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">회사: </span>
                    <span className="text-sm text-gray-900">{inquiry.company}</span>
                  </div>
                )}

                {inquiry.phone && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">연락처: </span>
                    <span className="text-sm text-gray-900">{inquiry.phone}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">개인정보처리방침 동의:</span>
                    <span className={`text-sm font-medium ${inquiry.privacy_agreed ? 'text-green-600' : 'text-red-600'}`}>
                      {inquiry.privacy_agreed ? '동의' : '미동의'}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    {inquiry.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(inquiry.id, 'processing')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        처리 시작
                      </Button>
                    )}
                    {inquiry.status === 'processing' && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(inquiry.id, 'completed')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        완료
                      </Button>
                    )}
                    {inquiry.status !== 'cancelled' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(inquiry.id, 'cancelled')}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        취소
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

