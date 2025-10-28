import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MobileSidebar, HamburgerMenu } from '../ui';

interface HeaderProps {
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
        { name: '고객센터', path: '#', hasDropdown: true },
        { name: '문의하기', path: '/contact' },
      ];

  return (
    <>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 orbio-glass border-b border-orbio-blue-200/30"
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            {/* 로고 */}
            <Link to={isAdmin ? '/admin' : '/'} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orbio-blue-500 to-orbio-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">O</span>
              </div>
              <span className="text-2xl font-black orbio-text-gradient">ORBIO</span>
            </Link>
            
            {/* 데스크톱 네비게이션 - 가운데 정렬 */}
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navItems.map((item) => (
                <div key={item.path} className="relative">
                  {item.hasDropdown ? (
                    <div className="relative group">
                      <Link
                        to="/customer/faq"
                        className={`text-sm font-semibold transition-all duration-300 hover:text-orbio-blue-600 ${
                          location.pathname.startsWith('/customer')
                            ? 'text-orbio-blue-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {item.name}
                      </Link>
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        <Link
                          to="/customer/faq"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orbio-blue-600"
                        >
                          자주 묻는 질문
                        </Link>
                        <Link
                          to="/customer/notice"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orbio-blue-600"
                        >
                          공지사항
                        </Link>
                        <Link
                          to="/customer/event"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orbio-blue-600"
                        >
                          이벤트
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-sm font-semibold transition-all duration-300 hover:text-orbio-blue-600 ${
                        location.pathname === item.path
                          ? 'text-orbio-blue-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            {/* 우측 영역 - 햄버거 메뉴와 데스크톱 버튼들 */}
            <div className="flex items-center space-x-4">
              {/* 데스크톱 버튼들 */}
              <div className="hidden md:flex items-center space-x-4">
                {!isAdmin && (
                  <>
                    {/* 로그인/회원가입 버튼 숨김 처리 - 기능은 유지 */}
                    {/* 필요시 아래 주석을 해제하여 활성화 가능 */}
                    {/* 
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
                    */}
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
              
              {/* 모바일 햄버거 메뉴 - 우측에 위치 (변경 없음) */}
              <HamburgerMenu 
                isOpen={isMobileMenuOpen} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
            </div>
          </div>
        </div>
        
        {/* Mobile Sidebar - 토스 스타일 */}
        <MobileSidebar 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
          isAdmin={isAdmin}
        />
      </motion.header>
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
              The Circle of Clean - 친환경 세척 기술로 더 깨끗한 지구를 만들어갑니다.
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
              <li><Link to="/contact" className="hover:text-orbio-blue-600 transition-colors">문의하기</Link></li>
              <li><Link to="/customer/faq" className="hover:text-orbio-blue-600 transition-colors">자주 묻는 질문</Link></li>
              <li><Link to="/customer/notice" className="hover:text-orbio-blue-600 transition-colors">공지사항</Link></li>
              <li><Link to="/customer/event" className="hover:text-orbio-blue-600 transition-colors">이벤트</Link></li>
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