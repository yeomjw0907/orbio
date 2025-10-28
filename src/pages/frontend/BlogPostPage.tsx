import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, WaterDropLoading } from '../../components/ui';
import { blogApi } from '../../lib/api';
import { BlogPost } from '../../types';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        const [postData, allPosts] = await Promise.all([
          blogApi.getById(id),
          blogApi.getAll()
        ]);
        
        setPost(postData);
        
        // 관련 글 찾기
        if (postData) {
          const related = allPosts
            .filter(p => p.id !== id && p.tags?.some(tag => postData.tags?.includes(tag)))
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('블로그 포스트 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <WaterDropLoading 
          size="lg" 
          color="gradient" 
          text="블로그 포스트를 불러오는 중..." 
        />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header - 토스 스타일 */}
      <div className="toss-gradient-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="toss-fade-in"
          >
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Link to="/" className="hover:text-orbio-blue-600">홈</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-orbio-blue-600">블로그</Link>
                <span>/</span>
                <span className="text-gray-800 truncate">{post.title}</span>
              </div>
            </nav>

            {/* Post Meta */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {post.featured && (
                    <span className="px-3 py-1 bg-orbio-blue-100 text-orbio-blue-800 text-sm font-medium rounded-full">
                      추천 글
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    {new Date(post.published_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {post.author}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-orbio-blue-100 hover:text-orbio-blue-800 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>

      {/* Post Content - 토스 스타일 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="toss-card toss-shadow-lg p-8 md:p-12"
        >
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-orbio-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Share Section - 토스 스타일 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 toss-gradient-light rounded-2xl p-8 toss-shadow"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              이 글이 도움이 되었다면 공유해보세요!
            </h3>
            <p className="text-gray-600 mb-6">
              더 많은 사람들이 ORBIO의 혁신적인 기술을 알 수 있도록 도와주세요.
            </p>
            <div className="flex justify-center space-x-4">
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
        </motion.div>
      </div>

      {/* Related Posts - 토스 스타일 */}
      {relatedPosts.length > 0 && (
        <div className="toss-gradient-light py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="toss-fade-in"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                관련 글
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/blog/${relatedPost.id}`}>
                      <div className="toss-card toss-hover overflow-hidden">
                        <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                          <span className="text-3xl">📄</span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{relatedPost.author}</span>
                            <span>{new Date(relatedPost.published_at).toLocaleDateString('ko-KR')}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      )}

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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