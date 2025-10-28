import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogApi, subscriptionApi } from '../../lib/api';
import { BlogPost } from '../../types';
import { WaterDropLoading, Button, Input } from '../../components/ui';

export const BlogPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 구독 관련 상태
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const data = await blogApi.getAll();
        setBlogPosts(data);
      } catch (error) {
        console.error('블로그 포스트 로딩 실패:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // 모든 태그 추출
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags || [])));
  const tags = ['all', ...allTags];

  const filteredPosts = selectedTag === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags?.includes(selectedTag));

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // 구독 처리 함수
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeMessage('');
    
    if (!subscribeEmail) {
      setSubscribeMessage('이메일을 입력해주세요.');
      return;
    }
    
    if (!privacyAgreed) {
      setSubscribeMessage('개인정보처리방침에 동의해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 실제 구독 API 호출
      await subscriptionApi.subscribe(subscribeEmail);
      
      setSubscribeMessage('구독이 완료되었습니다! 새로운 블로그 포스트가 발행되면 알려드리겠습니다.');
      setSubscribeEmail('');
      setPrivacyAgreed(false);
      
      // 3초 후 모달 닫기
      setTimeout(() => {
        setIsSubscribeModalOpen(false);
        setSubscribeMessage('');
      }, 3000);
      
    } catch (error: any) {
      console.error('구독 에러:', error);
      
      // 중복 구독 에러 처리
      if (error.message?.includes('duplicate') || error.code === '23505') {
        setSubscribeMessage('이미 구독된 이메일입니다.');
      } else {
        setSubscribeMessage('구독 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 토스 스타일 */}
      <div className="toss-gradient-light py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center toss-fade-in"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 toss-text-gradient">
              ORBIO 블로그
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              친환경 세척 기술의 혁신과 일상 속 깨끗함에 대한 이야기를 전합니다.
            </p>
            
            {/* 구독하기 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <button 
                onClick={() => setIsSubscribeModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                📧 블로그 구독하기
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Featured Post - 토스 스타일 */}
      {featuredPost && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="toss-card toss-hover toss-shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-orbio-blue-50 to-orbio-green-50 flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-orbio-blue-100 text-orbio-blue-800 text-sm font-medium rounded-full">
                    추천 글
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{featuredPost.author}</span>
                    <span>•</span>
                    <span>{new Date(featuredPost.published_at).toLocaleDateString('ko-KR')}</span>
                  </div>
                  <Link 
                    to={`/blog/${featuredPost.id}`}
                    className="text-orbio-blue-600 hover:text-orbio-blue-700 font-medium"
                  >
                    읽어보기 →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tag Filter - 토스 스타일 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {tags.map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'toss-gradient text-white toss-shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-50 toss-shadow-sm border border-gray-200'
              }`}
            >
              {tag === 'all' ? '전체' : `#${tag}`}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Blog Posts Grid - 토스 스타일 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <WaterDropLoading 
              size="lg" 
              color="gradient" 
              text="블로그 포스트를 불러오는 중..." 
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="toss-card toss-hover overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-4xl">📄</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.published_at).toLocaleDateString('ko-KR')}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
        
        {!loading && regularPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">해당 태그의 블로그 포스트가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 구독 모달 */}
      {isSubscribeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">블로그 구독하기</h2>
                <button
                  onClick={() => setIsSubscribeModalOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-1">
                새로운 블로그 포스트가 발행되면 이메일로 알려드립니다.
              </p>
            </div>

            {/* 폼 내용 */}
            <div className="p-6">
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  label="이메일 주소"
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
                
                {/* 개인정보처리방침 동의 */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacyAgreed"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacyAgreed" className="text-sm text-gray-700">
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                      개인정보처리방침
                    </Link>
                    에 동의합니다.
                  </label>
                </div>
                
                {/* 메시지 */}
                {subscribeMessage && (
                  <div className={`px-4 py-3 rounded-lg text-sm ${
                    subscribeMessage.includes('완료') 
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}>
                    {subscribeMessage}
                  </div>
                )}
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '구독 중...' : '구독하기'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};