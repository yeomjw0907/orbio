import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDroplet, 
  faShieldVirus, 
  faGem, 
  faStar,
  faCoins
} from '@fortawesome/free-solid-svg-icons';
import { brandValues, mockProducts } from '../../data';
import { productApi } from '../../lib/api';
import { Product } from '../../types';
import { GradientBackground } from '../../components/background/BackgroundAnimations';
import { AnimatedText, GradientText } from '../../components/animations/AnimatedText';
import { FeatureCard, ProductCard } from '../../components/cards/AnimatedCards';
import Threads from '../../components/animations/Threads';
import { WaterDropLoading, ProductModal } from '../../components/ui';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock'>('mock');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 제품 정렬 함수 메모이제이션
  const sortProductsByCapacity = useCallback((products: Product[]) => {
    return products.sort((a, b) => {
      const capacityA = parseInt(a.specifications?.capacity?.replace('ml', '') || '0');
      const capacityB = parseInt(b.specifications?.capacity?.replace('ml', '') || '0');
      return capacityA - capacityB;
    });
  }, []);

  // 제품 로딩 함수 메모이제이션
  const loadProducts = useCallback(async () => {
    try {
      console.log('🔄 제품 데이터 로딩 시작...');
      const data = await productApi.getAll();
      console.log('📊 Supabase에서 받은 데이터:', data);
      
      if (data && data.length >= 3) {
        const sortedData = sortProductsByCapacity(data);
        setProducts(sortedData.slice(0, 3));
        setDataSource('supabase');
        console.log('✅ Supabase 데이터 사용:', sortedData.slice(0, 3));
      } else {
        const sortedMock = sortProductsByCapacity(mockProducts);
        setProducts(sortedMock.slice(0, 3));
        setDataSource('mock');
        console.log('⚠️ Supabase 데이터 부족, Mock 데이터 사용:', sortedMock.slice(0, 3));
      }
    } catch (error) {
      console.error('❌ 제품 로딩 실패:', error);
      const sortedMock = sortProductsByCapacity(mockProducts);
      setProducts(sortedMock.slice(0, 3));
      setDataSource('mock');
      console.log('🔄 에러로 인해 Mock 데이터 사용:', sortedMock.slice(0, 3));
    } finally {
      setLoading(false);
    }
  }, [sortProductsByCapacity]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // 제품 상세 모달 열기 핸들러
  const handleViewProductDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  // 스크롤 핸들러 최적화 (throttling)
  const handleScroll = useCallback(() => {
    const header = document.querySelector('header');
    if (header) {
      const scrolled = window.pageYOffset;
      const opacity = Math.min(scrolled / 100, 0.95);
      header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    }
  }, []);

  useEffect(() => {
    // 스크롤 이벤트 최적화
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  return (
    <GradientBackground>
      {/* Hero Section - ORBIO 스타일 with Water Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 물방울 애니메이션 배경 */}
        <div className="absolute inset-0 z-0">
          <Threads
            color={[0.1, 0.5, 0.6]} // ORBIO Blue 색상
            amplitude={1.5}
            distance={0.03}
            enableMouseInteraction={false}
            className="w-full h-full opacity-25"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="orbio-fade-in"
          >
            {/* 메인 타이틀 - 반응형 개선 */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-800 mb-6 sm:mb-8 leading-tight">
              <span className="inline-block mr-3">
                <AnimatedText 
                  text="The Circle of Clean" 
                  className="inline"
                  delay={0.2}
                />
              </span>
            </h1>
            
            {/* 서브타이틀 - 반응형 개선 */}
            <div className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 max-w-5xl mx-auto leading-relaxed px-4">
              <p className="mb-2">
                ORBIO는 <span className="font-semibold text-orbio-blue">오염물이 쉽게 씻겨 나가는 초친수(超親水) 코팅 기술</span>을 적용해, 세제 없이도 위생적이고 안전한 세척 환경을 제공합니다.
              </p>
              <p className="text-gray-600">
                국내외 인증기관에서 검증된 기술력으로, 오직 물만으로도 완벽한 청결을 경험할 수 있습니다.
              </p>
            </div>
            
            {/* 버튼들 - 반응형 개선 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
                className="w-full sm:w-auto"
              >
                <Link to="/products">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto transform hover:-translate-y-1">
                    제품 살펴보기
                  </button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="w-full sm:w-auto"
              >
                <button 
                  onClick={() => {
                    const contactSection = document.getElementById('contact-modal');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1"
                >
                  문의하기
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Values Section - ORBIO 스타일 */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 orbio-slide-up"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              <GradientText 
                text="ORBIO의 핵심 가치" 
                gradient="orbio-text-gradient-blue"
              />
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-medium px-4">
              위생, 편의, 친환경, 신뢰를 바탕으로 더 나은 세상을 만들어갑니다.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {brandValues.map((value, index) => (
              <FeatureCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                color={value.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section - ORBIO 스타일 */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-r from-orbio-blue-50/50 to-orbio-green-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 orbio-slide-up"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              <GradientText 
                text="혁신적인 친환경 제품 라인업" 
                gradient="orbio-text-gradient"
              />
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto px-4 leading-relaxed">
              공인 기관에서 위생성과 친환경성을 모두 인정받은 ORBIO Easy-Clean 텀블러 시리즈를 소개합니다. <span className="font-semibold text-orbio-blue">오염물이 쉽게 씻겨 나가는 초친수(超親水) 코팅 기술</span>로 세제 없이도 표면의 오염물질을 효과적으로 제거할 수 있어, 건강과 환경 모두를 생각한 신뢰받는 선택입니다.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {loading ? (
              // 물방울 로딩 애니메이션
              <div className="col-span-full flex justify-center py-20">
                <WaterDropLoading 
                  size="lg" 
                  color="gradient" 
                  text="제품을 불러오는 중..." 
                />
              </div>
            ) : products.length > 0 ? (
              // 제품 카드 렌더링 최적화
              products.map((product, index) => (
                <ProductCard
                  key={`${dataSource}-${product.id}`}
                  product={{
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    features: product.features,
                    specifications: product.specifications
                  }}
                  delay={index * 0.1}
                  onViewDetails={() => handleViewProductDetails(product)}
                />
              ))
            ) : (
              // 데이터가 없을 때 기본 메시지
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">제품 정보를 불러오는 중입니다...</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12 sm:mt-16 orbio-slide-up">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                모든 제품 보기
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* 핵심 포인트 섹션 - ORBIO 스타일 */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 orbio-slide-up"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              <GradientText 
                text="ORBIO의 핵심 포인트" 
                gradient="orbio-text-gradient-blue"
              />
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
              혁신적인 기술로 만든 ORBIO 제품의 핵심 특징을 확인하세요.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {/* 초친수 코팅 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <FontAwesomeIcon icon={faDroplet} className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                초친수 코팅
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                <span className="font-semibold text-blue-700">오염물이 쉽게 씻겨 나가는 초친수(超親水) 코팅 기술</span>로 무세제 완벽 세척이 가능합니다.
              </p>
            </motion.div>

            {/* 항균 효과 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 border-2 border-green-200 hover:border-green-400 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <FontAwesomeIcon icon={faShieldVirus} className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                강력한 항균
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                <span className="font-bold text-green-700 text-lg">99.999% 이상의 강력한 항균 효과</span>로 위생을 보장합니다.
              </p>
            </motion.div>

            {/* 표면경도 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 sm:p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <FontAwesomeIcon icon={faGem} className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                높은 표면경도
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                <span className="font-semibold text-purple-700">표면경도가 높아 스크래치에 강하고 세정이 용이</span>합니다.
              </p>
            </motion.div>

            {/* 색바램 방지 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 sm:p-8 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <FontAwesomeIcon icon={faStar} className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                색바램 방지
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                <span className="font-semibold text-amber-700">시간이 지나도 색이 변하지 않는 견고한 내구성</span>을 자랑합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 가격 정책 섹션 - ORBIO 스타일 */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-r from-orbio-green-50/50 to-orbio-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 orbio-slide-up"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              <GradientText 
                text="합리적인 가격 정책" 
                gradient="orbio-text-gradient"
              />
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border-2 border-orbio-blue-200 shadow-xl max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orbio-blue to-orbio-green rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCoins} className="text-4xl text-white" />
                </div>
              </div>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
                <span className="text-orbio-blue font-bold text-2xl">대량 생산 시 합리적인 가격으로,</span>
                <br className="hidden sm:block" />
                <span className="text-gray-800"> 한정판 제품은 프리미엄 라인으로 제공됩니다.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - ORBIO 스타일 */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-r from-orbio-blue-600 to-orbio-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="orbio-fade-in"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6">
              지금 ORBIO와 함께하세요
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-8 sm:mb-10 max-w-4xl mx-auto px-4 leading-relaxed">
              ORBIO와 함께 신뢰할 수 있는 친환경 생활을 시작해보세요. 
              입증된 기술과 투명한 품질 관리로 여러분의 일상에 안전과 지속가능성을 더합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              {/* 회원가입 버튼 숨김 처리 - 기능은 유지 */}
              {/* 필요시 아래 주석을 해제하여 활성화 가능 */}
              {/* 
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="orbio-button-green px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg w-full sm:w-auto"
                >
                  회원가입
                </motion.button>
              </Link>
              */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact-modal');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto border border-white/20 hover:border-white/40 transform hover:-translate-y-1"
              >
                문의하기
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 제품 상세 모달 */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </GradientBackground>
  );
};