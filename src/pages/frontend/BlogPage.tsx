import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, Button } from '../../components/ui';
import { mockBlogPosts } from '../../data';

export const BlogPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // 모든 태그 추출
  const allTags = Array.from(new Set(mockBlogPosts.flatMap(post => post.tags)));
  const tags = ['all', ...allTags];

  const filteredPosts = selectedTag === 'all' 
    ? mockBlogPosts 
    : mockBlogPosts.filter(post => post.tags.includes(selectedTag));

  const featuredPost = mockBlogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            ORBIO 블로그
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            ORBIO의 최신 소식, 기술 정보, 그리고 일상생활에 도움이 되는 
            다양한 콘텐츠를 만나보세요.
          </p>
        </motion.div>

        {/* Tag Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-orbio-blue text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tag === 'all' ? '전체' : tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedTag === 'all' && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <Card glass className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-64 lg:h-auto bg-gradient-to-br from-orbio-blue/20 to-orbio-green/20 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                    <img src="/images/icons/blog.svg" alt="블로그" className="w-16 h-16" />
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-3 py-1 bg-orbio-blue text-white text-sm rounded-full">
                      추천 글
                    </span>
                    <span className="text-sm text-gray-500">
                      {featuredPost.publishedAt.toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/blog/${featuredPost.id}`}>
                    <Button size="lg">
                      자세히 보기
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.section>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Post Image */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    <img src="/images/icons/search.svg" alt="검색" className="w-5 h-5" />
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">
                      {post.publishedAt.toLocaleDateString('ko-KR')}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <Link to={`/blog/${post.id}`}>
                    <Button size="sm" variant="outline" className="w-full">
                      자세히 보기
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card glass className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              블로그 구독하기
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              ORBIO의 최신 소식과 유용한 정보를 이메일로 받아보세요. 
              매주 새로운 콘텐츠를 만나보실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orbio-blue focus:border-transparent"
              />
              <Button size="lg" className="px-8">
                구독하기
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};
