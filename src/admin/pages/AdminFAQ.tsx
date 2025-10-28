import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { faqApi } from '../../lib/api';

const AdminFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    category: 'general',
    question: '',
    answer: ''
  });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const data = await faqApi.getAll();
      setFaqs(data);
    } catch (error) {
      console.error('FAQ 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await faqApi.create(formData);
      setIsCreating(false);
      setFormData({ category: 'general', question: '', answer: '' });
      loadFAQs();
    } catch (error) {
      console.error('FAQ 생성 실패:', error);
      alert('FAQ 생성에 실패했습니다.');
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (window.confirm('정말로 이 FAQ를 삭제하시겠습니까?')) {
      try {
        await faqApi.delete(id);
        loadFAQs();
      } catch (error) {
        console.error('FAQ 삭제 실패:', error);
        alert('FAQ 삭제에 실패했습니다.');
      }
    }
  };

  const categories = [
    { value: 'general', label: '일반' },
    { value: 'product', label: '제품' },
    { value: 'shipping', label: '배송' },
    { value: 'payment', label: '결제' },
    { value: 'refund', label: '환불/교환' }
  ];

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
            FAQ 관리
          </h1>
          <p className="text-gray-600">
            자주 묻는 질문을 관리하세요.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="toss-button px-6 py-3"
        >
          새 FAQ 작성
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
            새 FAQ 작성
          </h2>
          <form onSubmit={handleCreateFAQ} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full toss-input"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                질문 *
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                required
                className="w-full toss-input"
                placeholder="질문을 입력하세요"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                답변 *
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                required
                rows={6}
                className="w-full toss-input"
                placeholder="답변을 입력하세요"
              />
            </div>
            
            <div className="flex space-x-4">
              <button type="submit" className="toss-button">
                FAQ 작성
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

      {/* FAQ List */}
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
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  질문
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  답변
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
              {faqs.map((faq, index) => (
                <motion.tr
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {categories.find(cat => cat.value === faq.category)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {faq.question}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {faq.answer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {faq.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-orbio-blue-600 hover:text-orbio-blue-800">
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteFAQ(faq.id)}
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

export { AdminFAQ };
