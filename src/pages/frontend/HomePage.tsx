import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brandValues, mockProducts } from '../../data';
import { useMouseFollow } from '../../hooks/useInteractions';
import { GradientBackground } from '../../components/background/BackgroundAnimations';
import { AnimatedText, GradientText, TypewriterText } from '../../components/animations/AnimatedText';
import { FeatureCard, ProductCard } from '../../components/cards/AnimatedCards';
import Threads from '../../components/animations/Threads';

export const HomePage: React.FC = () => {
  const mousePosition = useMouseFollow();
  
  // 마우스 팔로우 효과를 위한 플로팅 요소들
  const floatingElements = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // 스크롤에 따른 헤더 투명도 조절
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 0.95);
        header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 마우스 팔로우 효과
  useEffect(() => {
    floatingElements.current.forEach((element, index) => {
      if (element) {
        const speed = (index + 1) * 0.02;
        const x = (mousePosition.x - window.innerWidth / 2) * speed;
        const y = (mousePosition.y - window.innerHeight / 2) * speed;
        element.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  }, [mousePosition]);

  return (
    <GradientBackground>
      {/* Hero Section - ORBIO 스타일 with Water Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 물방울 애니메이션 배경 */}
        <div className="absolute inset-0 z-0">
          <Threads
            color={[0.1, 0.5, 0.6]} // ORBIO Blue 색상
            amplitude={1.2}
            distance={0.1}
            enableMouseInteraction={true}
            className="w-full h-full opacity-30"
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
              <AnimatedText 
                text="The Circle of" 
                className="block"
                delay={0.2}
              />
              <GradientText 
                text="Clean" 
                className="block mt-1 sm:mt-2"
                gradient="orbio-text-gradient"
              />
            </h1>
            
            {/* 서브타이틀 - 반응형 개선 */}
            <div className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              <TypewriterText 
                text="친환경 Easy-Clean 기술로 더 이상 어려운 청소는 없습니다. 물만으로도 완벽하게 세척되는 ORBIO의 혁신적인 제품을 만나보세요."
                speed={30}
                delay={1}
                className="block"
              />
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
                  <button className="orbio-button px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg w-full sm:w-auto">
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
                  className="orbio-button-secondary px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg w-full sm:w-auto"
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
                color="from-orbio-blue-400 to-orbio-green-400"
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
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-medium px-4">
              Easy-Clean 기술을 적용한 ORBIO의 혁신적인 텀블러를 만나보세요.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {mockProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <div className="text-center mt-12 sm:mt-16 orbio-slide-up">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="orbio-button-secondary px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg"
              >
                모든 제품 보기
              </motion.button>
            </Link>
          </div>
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
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto font-medium px-4">
              더 깨끗하고 지속 가능한 미래를 위한 여정에 동참하세요. 
              지금 바로 ORBIO의 혁신적인 친환경 제품들을 만나보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="orbio-button-green px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg w-full sm:w-auto"
                >
                  회원가입
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact-modal');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg w-full sm:w-auto"
              >
                문의하기
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </GradientBackground>
  );
};