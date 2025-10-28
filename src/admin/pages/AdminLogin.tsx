import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/ui';
import { useAuthStore } from '../../store';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orbio-gray-50 via-orbio-blue-50 to-orbio-green-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="orbio-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orbio-blue-500 to-orbio-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">O</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ORBIO 관리자
            </h1>
            <p className="text-gray-600">
              관리자 계정으로 로그인하세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orbio-blue-500 focus:border-transparent transition-colors"
                placeholder="admin@orbio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orbio-blue-500 focus:border-transparent transition-colors"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full orbio-button"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-orbio-blue-50 rounded-xl border border-orbio-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              🔐 관리자 접근 방법
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-orbio-blue-600">1️⃣</span>
                <span className="text-gray-700">URL에 <code className="bg-gray-200 px-2 py-1 rounded">/admin</code> 추가</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orbio-blue-600">2️⃣</span>
                <span className="text-gray-700">아래 테스트 계정으로 로그인</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orbio-blue-600">3️⃣</span>
                <span className="text-gray-700">관리자 대시보드 접근</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white rounded-lg border border-orbio-blue-300">
              <p className="font-semibold text-gray-900 mb-2">테스트 계정:</p>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">이메일:</span> admin@orbio.com</p>
                <p><span className="font-medium">비밀번호:</span> admin123</p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <a 
                href="/admin" 
                className="inline-block orbio-button-secondary px-4 py-2 text-sm font-semibold"
              >
                관리자 페이지로 이동
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
