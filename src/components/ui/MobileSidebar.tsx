import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  isOpen, 
  onClose, 
  isAdmin = false 
}) => {
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
        { name: '고객센터', path: '/customer/faq', hasDropdown: true },
      ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - 진한 검정 필터 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 200,
              duration: 0.3 
            }}
            className="fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden border-l border-gray-200 flex flex-col overflow-hidden"
            style={{ 
              backgroundColor: '#ffffff !important',
              opacity: '1 !important',
              backgroundImage: 'none !important',
              backdropFilter: 'none !important',
              WebkitBackdropFilter: 'none !important',
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orbio-blue-500 to-orbio-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">O</span>
                </div>
                <span className="text-xl font-black orbio-text-gradient">ORBIO</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 bg-white overscroll-contain">
              <nav className="space-y-2 px-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group"
                        >
                          <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </span>
                        </Link>
                        <div className="ml-4 space-y-1">
                          <Link
                            to="/customer/faq"
                            onClick={onClose}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            자주 묻는 질문
                          </Link>
                          <Link
                            to="/customer/notice"
                            onClick={onClose}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            공지사항
                          </Link>
                          <Link
                            to="/customer/event"
                            onClick={onClose}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            이벤트
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group"
                      >
                        <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* 문의하기 버튼 - 사이드바 하단에 고정 */}
            {!isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-6 pt-4 pb-6 bg-white border-t border-gray-100"
              >
                <Link to="/contact" onClick={onClose}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    문의하기
                  </button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
