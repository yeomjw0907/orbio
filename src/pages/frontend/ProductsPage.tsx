import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from '../../components/ui';
import { mockProducts } from '../../data';

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체', count: mockProducts.length },
    { id: 'easy-clean', name: 'Easy-Clean', count: mockProducts.filter(p => p.category === 'easy-clean').length },
    { id: 'antimicrobial', name: 'Antimicrobial', count: mockProducts.filter(p => p.category === 'antimicrobial').length },
    { id: 'eco', name: 'Eco', count: mockProducts.filter(p => p.category === 'eco').length },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

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
            혁신적인 기술로 만든 ORBIO의 제품들을 만나보세요. 
            Easy-Clean, Antimicrobial, Eco 기술이 적용된 다양한 제품을 확인할 수 있습니다.
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
                    ? 'bg-orbio-blue text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orbio-blue/10 to-orbio-green/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={getCategoryIcon(product.category)} 
                      alt={product.category}
                      className="w-32 h-32 object-cover rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300" style={{display: 'none'}}>
                      🍽️
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(product.category)}`}>
                      {product.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">주요 특징</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{product.features.length - 2}개 더
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orbio-blue">
                        {product.price.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        자세히 보기
                      </Button>
                      <Button size="sm">
                        구매하기
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
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
                name: 'Easy-Clean',
                description: '물만으로 완벽 세척',
                features: ['물만으로 세척', '세제 불필요', '시간 절약', '환경 친화적'],
                color: 'from-blue-500 to-blue-600',
                icon: '/images/icons/easy-clean.svg'
              },
              {
                name: 'Antimicrobial',
                description: '99.9% 항균 효과',
                features: ['항균 코팅', '세균 번식 차단', '위생 보장', '안전성'],
                color: 'from-green-500 to-green-600',
                icon: '/images/icons/antimicrobial.svg'
              },
              {
                name: 'Eco',
                description: '100% 재활용 가능',
                features: ['재활용 소재', '자연 분해', '화학물질 무첨가', '지속가능성'],
                color: 'from-emerald-500 to-emerald-600',
                icon: '/images/icons/eco.svg'
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
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10" />
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
    </div>
  );
};
