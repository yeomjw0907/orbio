import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ContactModal } from '../ContactModal';

interface HeaderProps {
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const location = useLocation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const navItems = isAdmin 
    ? [
        { name: '대시보드', path: '/admin' },
        { name: '주문 관리', path: '/admin/orders' },
        { name: '블로그 관리', path: '/admin/blog' },
        { name: '회원 관리', path: '/admin/users' },
        { name: '재고 관리', path: '/admin/inventory' },
      ]
    : [
        { name: '브랜드', path: '/brand' },
        { name: '제품', path: '/products' },
        { name: '블로그', path: '/blog' },
        { name: '문의', path: '/contact', isModal: true },
      ];

  return (
    <>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 orbio-glass border-b border-orbio-blue-200/30"
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to={isAdmin ? '/admin' : '/'} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orbio-blue-500 to-orbio-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">O</span>
              </div>
              <span className="text-2xl font-black orbio-text-gradient">ORBIO</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.isModal ? (
                  <button
                    key={item.path}
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-sm font-semibold transition-all duration-300 hover:text-orbio-blue-600 text-gray-600"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm font-semibold transition-all duration-300 hover:text-orbio-blue-600 ${
                      location.pathname === item.path
                        ? 'text-orbio-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              {!isAdmin && (
                <>
                        <Link to="/login">
                          <button className="text-gray-600 hover:text-orbio-blue-600 transition-colors duration-300 px-4 py-2">
                            로그인
                          </button>
                        </Link>
                        <Link to="/register">
                          <button className="orbio-button px-6 py-2 text-sm font-semibold">
                            회원가입
                          </button>
                        </Link>
                </>
              )}
              {isAdmin && (
                <button 
                  onClick={() => window.location.href = '/'}
                  className="orbio-button-secondary px-4 py-2 text-sm font-semibold"
                >
                  사이트로
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

interface FooterProps {
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isAdmin = false }) => {
  if (isAdmin) return null;
  
  return (
        <footer className="bg-gradient-to-r from-orbio-blue-50 to-orbio-green-50 border-t border-orbio-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orbio-blue-500 to-orbio-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">O</span>
              </div>
              <span className="text-2xl font-black orbio-text-gradient">ORBIO</span>
            </div>
            <p className="text-gray-600 mb-4">
              🌱 The Circle of Clean - 친환경 세척 기술로 더 깨끗한 지구를 만들어갑니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-orbio-blue-600 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-500 hover:text-orbio-blue-600 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-500 hover:text-orbio-blue-600 transition-colors">
                YouTube
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">제품</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-orbio-blue-600 transition-colors">Easy-Clean</a></li>
              <li><a href="#" className="hover:text-orbio-blue-600 transition-colors">Antimicrobial</a></li>
              <li><a href="#" className="hover:text-orbio-blue-600 transition-colors">Eco</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">고객지원</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-orbio-blue-600 transition-colors">문의하기</a></li>
              <li><a href="#" className="hover:text-orbio-blue-600 transition-colors">배송안내</a></li>
              <li><a href="#" className="hover:text-orbio-blue-600 transition-colors">교환/반품</a></li>
              <li><a href="#" className="hover:text-orbio-blue-600 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-orbio-blue-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 ORBIO. All rights reserved. 🌍 친환경을 실천하는 기업</p>
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
    <div className="min-h-screen bg-gradient-to-br from-orbio-gray-50 via-orbio-blue-50 to-orbio-green-50">
      <Header isAdmin={isAdmin} />
      <main className={`flex-1 ${isAdmin ? 'pt-20' : 'pt-20'}`}>
        {children}
      </main>
      <Footer isAdmin={isAdmin} />
    </div>
  );
};