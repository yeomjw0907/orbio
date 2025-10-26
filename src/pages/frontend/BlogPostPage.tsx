import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button } from '../../components/ui';
import { mockBlogPosts } from '../../data';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockBlogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">글을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-8">요청하신 블로그 글이 존재하지 않습니다.</p>
          <Link to="/blog">
            <Button>블로그로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = mockBlogPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-orbio-blue">홈</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-orbio-blue">블로그</Link>
              <span>/</span>
              <span className="text-gray-800">{post.title}</span>
            </div>
          </nav>

          {/* Post Meta */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-orbio-blue text-white text-sm rounded-full">
                  {post.featured ? '추천 글' : '일반 글'}
                </span>
                <span className="text-sm text-gray-500">
                  {post.publishedAt.toLocaleDateString('ko-KR')}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                작성자: {post.author}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-orbio-blue hover:text-white transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <div className="h-64 md:h-96 bg-gradient-to-br from-orbio-blue/20 to-orbio-green/20 rounded-xl flex items-center justify-center">
              <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                <span className="text-6xl">📝</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <Card className="p-8 md:p-12 mb-12">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>

          {/* Share Section */}
          <Card glass className="p-6 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  이 글이 도움이 되었다면 공유해보세요!
                </h3>
                <p className="text-gray-600">
                  더 많은 사람들이 ORBIO의 혁신적인 기술을 알 수 있도록 도와주세요.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  페이스북
                </Button>
                <Button variant="outline" size="sm">
                  트위터
                </Button>
                <Button variant="outline" size="sm">
                  링크 복사
                </Button>
              </div>
            </div>
          </Card>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              관련 글
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-2xl">
                        📝
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {relatedPost.publishedAt.toLocaleDateString('ko-KR')}
                        </span>
                        <Link to={`/blog/${relatedPost.id}`}>
                          <Button size="sm" variant="ghost">
                            읽기
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Back to Blog */}
        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline" size="lg">
              블로그 목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
