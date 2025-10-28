import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqApi } from '../../lib/api';
import { WaterDropLoading } from '../../components/ui';

const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories = [
    { value: 'all', label: '전체' },
    { value: '제품문의', label: '제품문의' },
    { value: '배송문의', label: '배송문의' },
    { value: '교환/환불', label: '교환/환불' },
    { value: 'A/S', label: 'A/S' },
    { value: '기타', label: '기타' }
  ];

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const data = selectedCategory === 'all' 
          ? await faqApi.getAll()
          : await faqApi.getByCategory(selectedCategory);
        setFaqs(data);
      } catch (error) {
        console.error('FAQ 로딩 실패:', error);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, [selectedCategory]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
              자주 묻는 질문
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              ORBIO에 대해 궁금한 점이 있으시면 FAQ를 확인해보세요.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 md:gap-3 justify-center"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat.value
                  ? 'toss-gradient text-white toss-shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-50 toss-shadow-sm border border-gray-200'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* FAQ List - 토스 스타일 아코디언 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <WaterDropLoading 
              size="lg" 
              color="gradient" 
              text="FAQ를 불러오는 중..." 
            />
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {faq.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        조회 {faq.views}회
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedItems.has(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedItems.has(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                도움됨 {faq.helpful_count}
                              </button>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                              도움이 되었어요
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && faqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">FAQ가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { FAQPage };
