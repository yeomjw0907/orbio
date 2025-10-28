import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { noticeApi } from '../../lib/api';

const NoticePage: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await noticeApi.getAll();
        setNotices(data);
      } catch (error) {
        console.error('공지사항 로딩 실패:', error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 토스 스타일 */}
      <div className="toss-gradient-light py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center toss-fade-in"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 toss-text-gradient">
              공지사항
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              ORBIO의 최신 소식과 공지사항을 확인하세요.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Notice List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orbio-blue mx-auto mb-4"></div>
            <p className="text-gray-600">공지사항을 불러오는 중...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="toss-card toss-hover"
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2 md:mb-0">
                      {notice.is_important && (
                        <span className="px-2 md:px-3 py-1 bg-red-100 text-red-800 text-xs md:text-sm font-medium rounded-full w-fit">
                          중요
                        </span>
                      )}
                      <span className="text-xs md:text-sm text-gray-500">
                        {new Date(notice.published_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-gray-500">{notice.author}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 line-clamp-2">
                    {notice.content.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && notices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">공지사항이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { NoticePage };
