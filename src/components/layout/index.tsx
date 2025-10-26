import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui';

interface HeaderProps {
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const location = useLocation();
  
  const navItems = isAdmin 
    ? [
        { name: '대시보드', path: '/admin' },
        { name: '주문 관리', path: '/admin/orders' },
        { name: '블로그 관리', path: '/admin/blog' },
        { name: '회원 관리', path: '/admin/users' },
        { name: '재고 관리', path: '/admin/inventory' },
      ]
    : [
        { name: '홈', path: '/' },
        { name: '브랜드', path: '/brand' },
        { name: '제품', path: '/products' },
        { name: '블로그', path: '/blog' },
        { name: '문의', path: '/contact' },
      ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={isAdmin ? '/admin' : '/'} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orbio-blue to-orbio-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-gray-800">ORBIO</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-orbio-blue'
                    : 'text-gray-600 hover:text-orbio-blue'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {!isAdmin && (
              <>
                <Button variant="ghost" size="sm">
                  로그인
                </Button>
                <Button variant="primary" size="sm">
                  구매하기
                </Button>
              </>
            )}
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
                사이트로
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

interface FooterProps {
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isAdmin = false }) => {
  if (isAdmin) return null;
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orbio-blue to-orbio-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold">ORBIO</span>
            </div>
            <p className="text-gray-400 mb-4">
              The Circle of Clean - 혁신적인 세척 기술로 더 깨끗한 세상을 만들어갑니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">제품</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Easy-Clean</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Antimicrobial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eco</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">고객지원</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
              <li><a href="#" className="hover:text-white transition-colors">배송안내</a></li>
              <li><a href="#" className="hover:text-white transition-colors">교환/반품</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ORBIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAdmin = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin={isAdmin} />
      <main className={`flex-1 ${isAdmin ? 'pt-16' : 'pt-16'}`}>
        {children}
      </main>
      <Footer isAdmin={isAdmin} />
    </div>
  );
};
