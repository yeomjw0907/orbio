import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, WaterDropLoading } from '../../components/ui';
import { blogApi } from '../../lib/api';

export const AdminBlog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    tags: '',
    featured: false
  });

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const data = await blogApi.getAll();
      setBlogPosts(data);
    } catch (error) {
      console.error('블로그 포스트 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    try {
      await blogApi.create({
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        published_at: new Date().toISOString(),
        tags,
        featured: formData.featured,
        image: undefined
      });
      
      setIsCreating(false);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        tags: '',
        featured: false
      });
      
      // 목록 새로고침
      loadBlogPosts();
    } catch (error) {
      console.error('블로그 포스트 생성 실패:', error);
      alert('블로그 포스트 생성에 실패했습니다.');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('정말로 이 글을 삭제하시겠습니까?')) {
      try {
        await blogApi.delete(id);
        loadBlogPosts(); // 목록 새로고침
      } catch (error) {
        console.error('블로그 포스트 삭제 실패:', error);
        alert('블로그 포스트 삭제에 실패했습니다.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <WaterDropLoading 
          size="md" 
          color="gradient" 
          text="블로그 데이터를 불러오는 중..." 
        />
      </div>
    );
  }

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
            블로그 관리
          </h1>
          <p className="text-gray-600">
            블로그 글을 작성하고 관리하세요.
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          새 글 작성
        </Button>
      </motion.div>

      {/* Create/Edit Form */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="toss-card toss-shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              새 글 작성
            </h2>
            <form onSubmit={handleCreatePost} className="space-y-6">
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
                    placeholder="글 제목을 입력하세요"
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
                  요약 *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orbio-blue focus:border-transparent"
                  placeholder="글의 요약을 입력하세요"
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orbio-blue focus:border-transparent"
                  placeholder="글의 내용을 입력하세요 (HTML 태그 사용 가능)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    태그
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full toss-input"
                    placeholder="태그를 쉼표로 구분하여 입력하세요"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      추천 글로 설정
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit" className="toss-button">
                  글 작성
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCreating(false)} className="toss-button">
                  취소
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Blog Posts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="toss-card toss-shadow-lg overflow-hidden">
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
                    태그
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
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
                {blogPosts.map((post, index) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {post.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {post.author}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag: string, idx: number) => (
                          <span
                            key={idx}
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.featured ? '추천' : '일반'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.published_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          수정
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          삭제
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
