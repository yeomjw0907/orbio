import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faShoppingCart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 제품 이미지 배열 (메인 이미지 + 모델컷 등)
  const productImages = product ? [
    product.image || '/images/products/default.jpg',
    // 추가 이미지들 (나중에 product.images 배열로 확장 가능)
    '/images/products/model-cut-1.jpg',
    '/images/products/model-cut-2.jpg'
  ] : [];

  // 다음 이미지로 이동
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  // 이전 이미지로 이동
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
      // 모달이 열릴 때 이미지 인덱스 초기화
      setCurrentImageIndex(0);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* 모달 컨텐츠 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[calc(100vh-6rem)] overflow-hidden pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-200 hover:scale-110"
                  aria-label="닫기"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-lg" />
                </button>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {product.name}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {product.category === 'easy-clean' ? 'Easy-Clean 시리즈' : 
                     product.category === 'antimicrobial' ? '항균 시리즈' : 
                     '친환경 시리즈'}
                  </p>
                </div>
              </div>

              {/* 모달 본문 */}
              <div className="overflow-y-auto flex-1 min-h-0">
                <div className="p-6 space-y-6">
                  {/* 제품 이미지 슬라이드 */}
                  <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl overflow-hidden">
                    <div className="relative h-96 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={productImages[currentImageIndex]}
                          alt={`${product.name} - 이미지 ${currentImageIndex + 1}`}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // 이미지 로드 실패 시 기본 이미지 표시
                            e.currentTarget.src = '/images/products/default.jpg';
                          }}
                        />
                      </AnimatePresence>

                      {/* 이전 버튼 */}
                      {productImages.length > 1 && (
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
                          aria-label="이전 이미지"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700 text-lg" />
                        </button>
                      )}

                      {/* 다음 버튼 */}
                      {productImages.length > 1 && (
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
                          aria-label="다음 이미지"
                        >
                          <FontAwesomeIcon icon={faChevronRight} className="text-gray-700 text-lg" />
                        </button>
                      )}

                      {/* 인디케이터 */}
                      {productImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {productImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === currentImageIndex
                                  ? 'bg-white w-8'
                                  : 'bg-white/50 hover:bg-white/75'
                              }`}
                              aria-label={`이미지 ${index + 1}로 이동`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 제품 설명 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">제품 소개</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* 주요 특징 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">주요 특징</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <FontAwesomeIcon 
                            icon={faCheckCircle} 
                            className="text-emerald-500 text-lg flex-shrink-0"
                          />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 제품 사양 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">제품 사양</h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      {product.specifications.capacity && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">용량</span>
                          <span className="text-gray-900 font-bold">{product.specifications.capacity}</span>
                        </div>
                      )}
                      {product.specifications.material && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">재질</span>
                          <span className="text-gray-900 font-bold">{product.specifications.material}</span>
                        </div>
                      )}
                      {product.specifications.dimensions && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">크기</span>
                          <span className="text-gray-900 font-bold">{product.specifications.dimensions}</span>
                        </div>
                      )}
                      {product.specifications.weight && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">무게</span>
                          <span className="text-gray-900 font-bold">{product.specifications.weight}</span>
                        </div>
                      )}
                      {product.specifications.certifications && product.specifications.certifications.length > 0 && (
                        <div className="flex justify-between items-start">
                          <span className="text-gray-600 font-medium">인증</span>
                          <div className="flex flex-wrap gap-2 justify-end">
                            {product.specifications.certifications.map((cert, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 가격 정보 */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-600 text-sm font-medium">판매가격</span>
                        <div className="text-3xl font-black text-gray-900 mt-1">
                          {product.price.toLocaleString()}원
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">배송비 별도</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 모달 푸터 - 구매하러 가기 버튼 */}
              <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200"
                  >
                    닫기
                  </button>
                  <Link
                    to="/contact"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    구매하러 가기
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

