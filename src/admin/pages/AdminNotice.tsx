import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { noticeApi } from '../../lib/api';

const AdminNotice: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    is_important: false
  });

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const data = await noticeApi.getAll();
      setNotices(data);
    } catch (error) {
      console.error('공지사항 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await noticeApi.create(formData);
      setIsCreating(false);
      setFormData({ title: '', content: '', author: '', is_important: false });
      loadNotices();
    } catch (error) {
      console.error('공지사항 생성 실패:', error);
      alert('공지사항 생성에 실패했습니다.');
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      try {
        await noticeApi.delete(id);
        loadNotices();
      } catch (error) {
        console.error('공지사항 삭제 실패:', error);
        alert('공지사항 삭제에 실패했습니다.');
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
            공지사항 관리
          </h1>
          <p className="text-gray-600">
            공지사항을 작성하고 관리하세요.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="toss-button px-6 py-3"
        >
          새 공지사항 작성
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
            새 공지사항 작성
          </h2>
          <form onSubmit={handleCreateNotice} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full toss-input"
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  작성자 *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  required
                  className="w-full toss-input"
                  placeholder="작성자명을 입력하세요"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                required
                rows={10}
                className="w-full toss-input"
                placeholder="공지사항 내용을 입력하세요 (HTML 태그 사용 가능)"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_important}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_important: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  중요 공지로 설정
                </span>
              </label>
            </div>
            
            <div className="flex space-x-4">
              <button type="submit" className="toss-button">
                공지사항 작성
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

      {/* Notice List */}
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
                  작성자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  조회수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작성일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice, index) => (
                <motion.tr
                  key={notice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {notice.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {notice.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      notice.is_important ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {notice.is_important ? '중요' : '일반'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notice.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(notice.published_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-orbio-blue-600 hover:text-orbio-blue-800">
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
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

export { AdminNotice };
