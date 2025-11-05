import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../components/ui';
import { mockProducts } from '../../data';
import { ProductCard } from '../../components/cards/AnimatedCards';
import { ProductModal, WaterDropLoading } from '../../components/ui';
import { Product } from '../../types';
import { productApi } from '../../lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faShieldVirus, faGem } from '@fortawesome/free-solid-svg-icons';

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock'>('mock');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 제품 로딩 함수
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll();
      
      if (data && data.length > 0) {
        setProducts(data);
        setDataSource('supabase');
      } else {
        setProducts(mockProducts);
        setDataSource('mock');
      }
    } catch (error) {
      console.error('❌ 제품 로딩 실패:', error);
      setProducts(mockProducts);
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }, []);

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

  const categories = [
    { id: 'all', name: '전체', count: products.length },
    { id: 'easy-clean', name: 'Easy-Clean', count: products.filter(p => p.category === 'easy-clean').length },
    { id: 'antimicrobial', name: 'Antimicrobial', count: products.filter(p => p.category === 'antimicrobial').length },
    { id: 'eco', name: 'Eco', count: products.filter(p => p.category === 'eco').length },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'easy-clean': return 'from-blue-500 to-blue-600';
      case 'antimicrobial': return 'from-green-500 to-green-600';
      case 'eco': return 'from-emerald-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'easy-clean': return '/images/icons/easy-clean.svg';
      case 'antimicrobial': return '/images/icons/antimicrobial.svg';
      case 'eco': return '/images/icons/eco.svg';
      default: return '/images/icons/product.svg';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            제품 라인업
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            <span className="font-semibold text-orbio-blue">오염물이 쉽게 씻겨 나가는 초친수(超親水) 코팅 기술</span>로 만든 ORBIO의 제품들을 만나보세요. 
            무세제 세척, <span className="font-bold text-green-700">99.999% 이상의 강력한 항균 효과</span>, <span className="font-semibold text-purple-700">표면경도가 높아 스크래치에 강하고 세정이 용이</span>한 다양한 제품을 확인할 수 있습니다.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 text-orbio-blue-600 border-2 border-orbio-blue-600 shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
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
          ) : filteredProducts.length > 0 ? (
            // 제품 카드 렌더링
            filteredProducts.map((product, index) => (
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

        {/* Product Comparison Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              기술 비교
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              각 기술의 특징과 장점을 비교해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: '초친수 코팅',
                description: '무세제로 완벽 세척',
                features: ['무세제 세척', '초친수 코팅', '표면경도 높음', '세정 용이', '색바램 방지'],
                color: 'from-blue-500 to-blue-600',
                icon: faDroplet
              },
              {
                name: '항균 코팅',
                description: '99.999% 이상 항균력',
                features: ['99.999% 이상 항균력', '세균 번식 차단', '위생 보장', '안전성', '10배 강력'],
                color: 'from-green-500 to-green-600',
                icon: faShieldVirus
              },
              {
                name: '내구성 설계',
                description: '높은 표면경도',
                features: ['스크래치 방지', '세정 용이', '내구성 강함', '색바램 없는 표면'],
                color: 'from-emerald-500 to-emerald-600',
                icon: faGem
              }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card glass className="p-8 text-center h-full">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${tech.color} flex items-center justify-center`}>
                    <FontAwesomeIcon icon={tech.icon} className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {tech.description}
                  </p>
                  <ul className="space-y-2 text-left">
                    {tech.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orbio-blue rounded-full"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card glass className="p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              맞춤형 제품 추천
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              어떤 제품이 나에게 맞는지 궁금하신가요? 
              간단한 설문을 통해 최적의 제품을 추천해드립니다.
            </p>
            <Button size="lg" className="text-lg px-8 py-4">
              제품 추천 받기
            </Button>
          </Card>
        </motion.section>
      </div>

      {/* 제품 상세 모달 */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
