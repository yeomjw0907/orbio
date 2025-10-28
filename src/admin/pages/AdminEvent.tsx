import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { eventApi } from '../../lib/api';

const AdminEvent: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    image: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await eventApi.getAll();
      setEvents(data);
    } catch (error) {
      console.error('이벤트 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await eventApi.create(formData);
      setIsCreating(false);
      setFormData({ title: '', description: '', start_date: '', end_date: '', image: '' });
      loadEvents();
    } catch (error) {
      console.error('이벤트 생성 실패:', error);
      alert('이벤트 생성에 실패했습니다.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('정말로 이 이벤트를 삭제하시겠습니까?')) {
      try {
        await eventApi.delete(id);
        loadEvents();
      } catch (error) {
        console.error('이벤트 삭제 실패:', error);
        alert('이벤트 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            이벤트 관리
          </h1>
          <p className="text-gray-600">
            이벤트를 작성하고 관리하세요.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="toss-button px-6 py-3"
        >
          새 이벤트 작성
        </button>
      </motion.div>

      {/* Create Form */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="toss-card toss-shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            새 이벤트 작성
          </h2>
          <form onSubmit={handleCreateEvent} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이벤트 제목 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full toss-input"
                placeholder="이벤트 제목을 입력하세요"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이벤트 설명 *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={6}
                className="w-full toss-input"
                placeholder="이벤트 설명을 입력하세요"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  시작일 *
                </label>
                <input
                  type="datetime-local"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  required
                  className="w-full toss-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  종료일 *
                </label>
                <input
                  type="datetime-local"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  required
                  className="w-full toss-input"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이미지 URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full toss-input"
                placeholder="이벤트 이미지 URL을 입력하세요"
              />
            </div>
            
            <div className="flex space-x-4">
              <button type="submit" className="toss-button">
                이벤트 작성
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Event List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="toss-card toss-shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  조회수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event, index) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {event.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.start_date).toLocaleDateString('ko-KR')} ~ {new Date(event.end_date).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.is_active ? '진행중' : '종료'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-orbio-blue-600 hover:text-orbio-blue-800">
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export { AdminEvent };
