import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldVirus, 
  faDroplet, 
  faLeaf, 
  faCertificate,
  faCoffee
} from '@fortawesome/free-solid-svg-icons';

// 아이콘 매핑
const iconMap: { [key: string]: any } = {
  'shield-virus': faShieldVirus,
  'droplet': faDroplet,
  'leaf': faLeaf,
  'certificate': faCertificate
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export const AnimatedCard: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {}}
      className={`orbio-card ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  intensity = 'medium'
}) => {
  const intensityClasses = {
    light: 'orbio-glass-light',
    medium: 'orbio-glass',
    strong: 'bg-white/95 backdrop-blur-xl border-2 border-orbio-blue-200/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${intensityClasses[intensity]} rounded-2xl p-6 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color,
  delay = 0
}) => {
  // Map gradient class to icon color
  const getIconColor = (colorString: string) => {
    if (colorString.includes('from-blue')) return '#2563eb'; // blue-600
    if (colorString.includes('from-green')) return '#059669'; // emerald-600
    if (colorString.includes('from-emerald')) return '#047857'; // emerald-700
    if (colorString.includes('from-purple')) return '#7c3aed'; // purple-600
    return '#6b7280'; // gray-500
  };

  const iconColor = getIconColor(color);

  return (
    <AnimatedCard delay={delay} className="p-8 text-center group">
      <motion.div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <FontAwesomeIcon 
          icon={iconMap[icon] || faShieldVirus} 
          className="text-5xl"
          style={{
            color: iconColor
          }}
        />
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orbio-blue-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 text-base leading-relaxed">
        {description}
      </p>
    </AnimatedCard>
  );
};

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    features: string[];
    specifications: {
      capacity?: string;
    };
  };
  delay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  delay = 0
}) => {
  return (
    <AnimatedCard delay={delay} className="overflow-hidden group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-64 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="w-32 h-32 bg-gradient-to-br from-white to-gray-50 rounded-3xl flex items-center justify-center shadow-xl border border-gray-200"
        >
          <FontAwesomeIcon icon={faCoffee} className="text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" />
        </motion.div>
        {/* 토스 스타일 용량 태그 - 왼쪽 상단, 회전 없음 */}
        <div className="absolute top-4 left-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-2xl text-sm font-bold shadow-lg transition-transform duration-200 hover:scale-105">
            {product.specifications.capacity}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orbio-blue-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mb-4">
          <h4 className="text-sm font-bold text-gray-800 mb-3">주요 특징</h4>
          <ul className="space-y-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-center bg-gray-50 px-3 py-2 rounded-xl">
                <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mr-3 flex-shrink-0"></span>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">가격</span>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {product.price.toLocaleString()}원
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-0"
          >
            자세히 보기
          </motion.button>
        </div>
      </div>
    </AnimatedCard>
  );
};
