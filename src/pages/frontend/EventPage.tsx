import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { eventApi } from '../../lib/api';

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await eventApi.getActive();
        setEvents(data);
      } catch (error) {
        console.error('이벤트 로딩 실패:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
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
              이벤트
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              ORBIO의 다양한 이벤트와 프로모션을 만나보세요.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Event List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orbio-blue mx-auto mb-4"></div>
            <p className="text-gray-600">이벤트를 불러오는 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="toss-card toss-hover"
              >
                <div className="h-40 md:h-48 bg-gradient-to-br from-orbio-blue-50 to-orbio-green-50 flex items-center justify-center">
                  {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl md:text-5xl">🎁</span>
                  )}
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <span className="text-xs md:text-sm font-medium text-orbio-blue-600 mb-1 md:mb-0">
                      진행중
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(event.start_date).toLocaleDateString('ko-KR')} ~ {new Date(event.end_date).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">진행 중인 이벤트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { EventPage };
