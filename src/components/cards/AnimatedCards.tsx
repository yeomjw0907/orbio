import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldVirus, 
  faDroplet, 
  faLeaf, 
  faCertificate 
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
  return (
    <AnimatedCard delay={delay} className="p-8 text-center group">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
      >
        <FontAwesomeIcon 
          icon={iconMap[icon] || faShieldVirus} 
          className="text-3xl text-white" 
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
    <AnimatedCard delay={delay} className="overflow-hidden group">
      <div className="relative h-64 bg-gradient-to-br from-orbio-blue-50 to-orbio-green-50 flex items-center justify-center p-6 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-6xl">🥤</span>
        </motion.div>
        <div className="absolute top-4 right-4 bg-orbio-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.specifications.capacity}
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
          <h4 className="text-sm font-semibold text-gray-700 mb-2">주요 특징:</h4>
          <ul className="space-y-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-orbio-green-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold orbio-text-gradient-blue">
            {product.price.toLocaleString()}원
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="orbio-button-green px-6 py-2 text-sm font-semibold"
          >
            자세히 보기
          </motion.button>
        </div>
      </div>
    </AnimatedCard>
  );
};
